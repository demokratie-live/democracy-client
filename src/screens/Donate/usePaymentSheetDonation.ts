import { useCallback } from "react";
import { Keyboard, Platform } from "react-native";
import * as Application from "expo-application";
import Constants from "expo-constants";
import { PaymentIntent, PaymentSheet, PaymentSheetError, PlatformPay, useStripe } from "@stripe/stripe-react-native";
import { DonationApiError, donationRequest, newIdempotencyKey } from "../../api/donations/client";
import {
  MonthlyDonationCreatedSchema,
  OneTimeDonationResponseSchema,
  type DonationConfig,
  type DonationInterval,
  type DonationRequestBody,
} from "../../api/donations/types";
import { generateDonorKey, loadDonorKey, saveDonorKey } from "../../lib/donorKey";
import { formatEuro } from "../../lib/formatEuro";
import { STRIPE_RETURN_URL } from "./StripeDonationProvider";

/**
 * Öffnet das Stripe-Zahlungsfenster im Deferred-Intent-Verfahren (research.md R2, T031):
 * Das Fenster zeigt den Betrag; erst wenn die Spender:in bestätigt, legt democracy-api den
 * PaymentIntent an (`confirmHandler`), und das SDK bestätigt ihn mit dem zurückgegebenen clientSecret.
 * Zahlungsarten kommen aus dem Standard-Zahlungsprofil des Stripe-Kontos.
 *
 * Monatlich (T044): Der Server legt eine Subscription an und liefert das clientSecret der ersten
 * Rechnung; `setupFutureUsage: OffSession` speichert die Zahlungsart für die Folgemonate. Der
 * Spender-Schlüssel wird vorher erzeugt (bzw. wiederverwendet) und erst nach `200` gespeichert.
 */

export type DonationOutcome =
  | {
      status: "succeeded" | "processing";
      chargedAmountCents: number;
      interval: DonationInterval;
      /** Dauerspende: nächster Abbuchungstermin (ISO 8601) */
      nextChargeAt: string | null;
    }
  | { status: "canceled" }
  | { status: "failed"; message: string };

export interface DonationInput {
  interval: DonationInterval;
  /** Gewählter Betrag ohne Gebührenaufschlag (Cent) */
  amountCents: number;
  /** Angezeigter, belasteter Betrag inkl. Gebührenübernahme (Cent) – verbindlich rechnet der Server */
  chargedAmountCents: number;
  coverFees: boolean;
  email: string | null;
  config: DonationConfig;
}

const isInternalVariant = (Constants.expoConfig?.extra?.appVariant ?? "internal") === "internal";
// Ohne Merchant ID (lokale Builds vor T006) wird Apple Pay nicht angeboten
const applePayAvailable = Boolean(Constants.expoConfig?.extra?.applePayMerchantId);
const appVersion = Application.nativeApplicationVersion ?? undefined;
const platform = Platform.OS === "android" ? "android" : "ios";

const GENERIC_ERROR = "Die Spende konnte nicht abgeschlossen werden. Bitte versuche es erneut.";
const EMAIL_REQUIRED = "Für eine monatliche Spende brauchen wir Deine E-Mail-Adresse.";

/**
 * Apple Pay zeigt bei Dauerspenden „monatlich" samt Verwaltungslink an (iOS 16+). Ohne Login-Link
 * des Kundenportals bleibt es bei der normalen Anzeige.
 */
const recurringApplePayRequest = (chargedAmountCents: number, config: DonationConfig) =>
  config.portalLoginUrl
    ? {
        type: PlatformPay.PaymentRequestType.Recurring as const,
        description: `Monatliche Spende an ${config.merchantDisplayName}`,
        managementUrl: config.portalLoginUrl,
        billing: {
          paymentType: PlatformPay.PaymentType.Recurring as const,
          intervalUnit: PlatformPay.IntervalUnit.Month,
          intervalCount: 1,
          label: "Monatliche Spende",
          amount: (chargedAmountCents / 100).toFixed(2),
        },
      }
    : undefined;

export const usePaymentSheetDonation = () => {
  const { initPaymentSheet, presentPaymentSheet, retrievePaymentIntent } = useStripe();

  const donate = useCallback(
    async ({ interval, amountCents, chargedAmountCents, coverFees, email, config }: DonationInput): Promise<DonationOutcome> => {
      const monthly = interval === "monthly";
      if (monthly && !email) return { status: "failed", message: EMAIL_REQUIRED };

      // Fokus aus E-Mail-/Betragsfeld nehmen: iOS gibt ihn sonst nach dem Schließen des Zahlungsfensters
      // zurück, und die Tastatur blitzt kurz auf, bevor der Danke-Screen erscheint.
      Keyboard.dismiss();

      // Vorhandenen Schlüssel wiederverwenden: Der Server ersetzt eine unbezahlte Dauerspende und
      // sperrt eine zweite aktive (409). Ist der Keychain nicht lesbar, gilt ein neuer Schlüssel.
      let donorKey: string | null = null;
      if (monthly) {
        donorKey = await loadDonorKey().catch(() => null);
        donorKey ??= generateDonorKey();
      }

      let clientSecret: string | null = null;
      let nextChargeAt: string | null = null;

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: config.merchantDisplayName,
        style: "alwaysLight",
        primaryButtonLabel: monthly
          ? `${formatEuro(chargedAmountCents)} monatlich spenden`
          : `${formatEuro(chargedAmountCents)} spenden`,
        returnURL: STRIPE_RETURN_URL,
        allowsDelayedPaymentMethods: true,
        paymentMethodOrder: ["apple_pay", "google_pay", "sepa_debit", "paypal", "card"],
        applePay: applePayAvailable
          ? {
              merchantCountryCode: config.merchantCountryCode,
              request: monthly ? recurringApplePayRequest(chargedAmountCents, config) : undefined,
            }
          : undefined,
        googlePay: {
          merchantCountryCode: config.merchantCountryCode,
          currencyCode: "EUR",
          testEnv: isInternalVariant,
        },
        defaultBillingDetails: email ? { email } : undefined,
        // FR-008: nur erheben, was die gewählte Zahlungsart zwingend verlangt (z. B. Name + E-Mail bei SEPA)
        billingDetailsCollectionConfiguration: {
          name: PaymentSheet.CollectionMode.AUTOMATIC,
          email: PaymentSheet.CollectionMode.AUTOMATIC,
          phone: PaymentSheet.CollectionMode.NEVER,
          address: PaymentSheet.AddressCollectionMode.AUTOMATIC,
          attachDefaultsToPaymentMethod: Boolean(email),
        },
        appearance: { primaryButton: { colors: { background: "#4494d3" } } },
        intentConfiguration: {
          // capture_method muss exakt zum PaymentIntent passen (das SDK prüft das vor dem Bestätigen).
          // stripe-ios in SDK 0.38.6 liest „automatic_async" als „unknown" ein und lehnt es immer ab –
          // daher legt der Server PaymentIntents ausdrücklich mit „automatic" an. Nach einem SDK-Update
          // (mit dem nächsten Expo-Upgrade) kann auf automatic_async umgestellt werden.
          // Für Rechnungen von Subscriptions legt Stripe den PaymentIntent selbst mit „automatic" an
          // (geprüft 2026-11-19, research.md R12) – passt also auch für monatlich.
          mode: {
            amount: chargedAmountCents,
            currencyCode: "EUR",
            captureMethod: PaymentSheet.CaptureMethod.Automatic,
            setupFutureUsage: monthly ? "OffSession" : undefined,
          },
          confirmHandler: async (paymentMethod, _shouldSavePaymentMethod, intentCreationCallback) => {
            const body: DonationRequestBody = {
              amountCents,
              coverFees,
              email: email ?? undefined,
              paymentMethodId: paymentMethod.id,
              platform,
              appVersion,
            };
            // Neuer Idempotency-Key je Bezahlversuch; Wiederholung nur bei Netzwerkfehlern mit demselben Key.
            const idempotencyKey = newIdempotencyKey();
            try {
              if (monthly && donorKey) {
                const response = await donationRequest("/monthly", {
                  method: "POST",
                  body,
                  donorKey,
                  idempotencyKey,
                  schema: MonthlyDonationCreatedSchema,
                });
                // Erst jetzt dauerhaft speichern (contracts/donations-api.md). Scheitert das, bleibt die
                // Dauerspende über den Login-Link aus der Willkommensmail verwaltbar.
                await saveDonorKey(donorKey).catch((error: unknown) => {
                  if (__DEV__) console.warn("[donations] saveDonorKey", String(error));
                });
                clientSecret = response.clientSecret;
                nextChargeAt = response.currentPeriodEnd ?? null;
              } else {
                const response = await donationRequest("/one-time", {
                  method: "POST",
                  body,
                  idempotencyKey,
                  schema: OneTimeDonationResponseSchema,
                });
                clientSecret = response.clientSecret;
              }
              intentCreationCallback({ clientSecret });
            } catch (error) {
              const message = error instanceof DonationApiError ? error.message : GENERIC_ERROR;
              intentCreationCallback({ error: { code: "Failed", message, localizedMessage: message } });
            }
          },
        },
      });
      if (initError) {
        if (__DEV__) console.warn("[donations] initPaymentSheet", JSON.stringify(initError));
        return { status: "failed", message: initError.localizedMessage ?? GENERIC_ERROR };
      }

      const { error: presentError } = await presentPaymentSheet();
      if (presentError) {
        if (presentError.code === PaymentSheetError.Canceled) return { status: "canceled" };
        if (__DEV__) console.warn("[donations] presentPaymentSheet", JSON.stringify(presentError));
        return { status: "failed", message: presentError.localizedMessage ?? GENERIC_ERROR };
      }

      // SEPA-Lastschriften sind nach der Bestätigung zunächst „processing" (FR-010: „wird eingezogen").
      let status: "succeeded" | "processing" = "succeeded";
      if (clientSecret) {
        const { paymentIntent } = await retrievePaymentIntent(clientSecret);
        if (paymentIntent?.status === PaymentIntent.Status.Processing) status = "processing";
      }
      return { status, chargedAmountCents, interval, nextChargeAt };
    },
    [initPaymentSheet, presentPaymentSheet, retrievePaymentIntent],
  );

  return { donate };
};
