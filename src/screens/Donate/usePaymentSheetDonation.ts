import { useCallback } from "react";
import { Platform } from "react-native";
import * as Application from "expo-application";
import Constants from "expo-constants";
import { PaymentIntent, PaymentSheet, PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { DonationApiError, donationRequest, newIdempotencyKey } from "../../api/donations/client";
import {
  OneTimeDonationResponseSchema,
  type DonationConfig,
  type DonationInterval,
} from "../../api/donations/types";
import { formatEuro } from "../../lib/formatEuro";
import { STRIPE_RETURN_URL } from "./StripeDonationProvider";

/**
 * Öffnet das Stripe-Zahlungsfenster im Deferred-Intent-Verfahren (research.md R2, T031):
 * Das Fenster zeigt den Betrag; erst wenn die Spender:in bestätigt, legt democracy-api den
 * PaymentIntent an (`confirmHandler`), und das SDK bestätigt ihn mit dem zurückgegebenen clientSecret.
 * Zahlungsarten kommen aus dem Standard-Zahlungsprofil des Stripe-Kontos.
 */

export type DonationOutcome =
  | { status: "succeeded" | "processing"; chargedAmountCents: number; interval: DonationInterval }
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
const appVersion = Application.nativeApplicationVersion ?? undefined;
const platform = Platform.OS === "android" ? "android" : "ios";

const GENERIC_ERROR = "Die Spende konnte nicht abgeschlossen werden. Bitte versuche es erneut.";

export const usePaymentSheetDonation = () => {
  const { initPaymentSheet, presentPaymentSheet, retrievePaymentIntent } = useStripe();

  const donate = useCallback(
    async ({ interval, amountCents, chargedAmountCents, coverFees, email, config }: DonationInput): Promise<DonationOutcome> => {
      if (interval === "monthly") {
        // Phase 4 (T044): Dauerspende über POST /monthly mit Spender-Schlüssel.
        return {
          status: "failed",
          message: "Monatliche Spenden sind in Kürze direkt in der App möglich – bis dahin gerne per Dauerauftrag.",
        };
      }

      let clientSecret: string | null = null;

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: config.merchantDisplayName,
        style: "alwaysLight",
        primaryButtonLabel: `${formatEuro(chargedAmountCents)} spenden`,
        returnURL: STRIPE_RETURN_URL,
        allowsDelayedPaymentMethods: true,
        paymentMethodOrder: ["apple_pay", "google_pay", "sepa_debit", "paypal", "card"],
        applePay: { merchantCountryCode: config.merchantCountryCode },
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
          mode: { amount: chargedAmountCents, currencyCode: "EUR" },
          confirmHandler: async (paymentMethod, _shouldSavePaymentMethod, intentCreationCallback) => {
            try {
              const response = await donationRequest("/one-time", {
                method: "POST",
                body: {
                  amountCents,
                  coverFees,
                  email: email ?? undefined,
                  paymentMethodId: paymentMethod.id,
                  platform,
                  appVersion,
                },
                // Neuer Key je Bezahlversuch; Wiederholung nur bei Netzwerkfehlern mit demselben Key.
                idempotencyKey: newIdempotencyKey(),
                schema: OneTimeDonationResponseSchema,
              });
              clientSecret = response.clientSecret;
              intentCreationCallback({ clientSecret: response.clientSecret });
            } catch (error) {
              const message = error instanceof DonationApiError ? error.message : GENERIC_ERROR;
              intentCreationCallback({ error: { code: "Failed", message, localizedMessage: message } });
            }
          },
        },
      });
      if (initError) {
        return { status: "failed", message: initError.localizedMessage ?? GENERIC_ERROR };
      }

      const { error: presentError } = await presentPaymentSheet();
      if (presentError) {
        if (presentError.code === PaymentSheetError.Canceled) return { status: "canceled" };
        return { status: "failed", message: presentError.localizedMessage ?? GENERIC_ERROR };
      }

      // SEPA-Lastschriften sind nach der Bestätigung zunächst „processing" (FR-010: „wird eingezogen").
      let status: "succeeded" | "processing" = "succeeded";
      if (clientSecret) {
        const { paymentIntent } = await retrievePaymentIntent(clientSecret);
        if (paymentIntent?.status === PaymentIntent.Status.Processing) status = "processing";
      }
      return { status, chargedAmountCents, interval };
    },
    [initPaymentSheet, presentPaymentSheet, retrievePaymentIntent],
  );

  return { donate };
};
