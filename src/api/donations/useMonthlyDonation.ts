import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { deleteDonorKeyIfUnchanged, loadDonorKey } from "../../lib/donorKey";
import { DonationApiError, donationRequest, newIdempotencyKey } from "./client";
import { MonthlyDonationStatusSchema, PortalSessionSchema, type MonthlyDonationStatus } from "./types";

/**
 * Dauerspende verwalten (T053): Status laden, Betrag ändern, kündigen, Kundenportal öffnen.
 * Ohne Spender-Schlüssel auf dem Gerät gibt es nichts zu laden. Antwortet der Server mit `404`
 * (Zuordnung 90 Tage nach Ende gelöscht), wird der lokale Schlüssel entfernt.
 */

/** Muss zu `PORTAL_RETURN_URL` in democracy-api (routes/manage.ts) passen. */
const PORTAL_RETURN_URL = "democracy://donate/manage";
const GENERIC_ERROR = "Das hat leider nicht geklappt. Bitte versuche es später erneut.";
const KEYCHAIN_ERROR = "Deine Dauerspende konnte auf diesem Gerät gerade nicht geladen werden. Bitte versuche es erneut.";

/** Nur die ausdrückliche Antwort „keine Dauerspende zu diesem Schlüssel" – keine beliebige 404. */
const isNotFound = (error: unknown) =>
  error instanceof DonationApiError && error.status === 404 && error.code === "not_found";

/** Dauerspende läuft noch (ggf. mit Zahlungsproblem oder vorgemerkter Kündigung) – Karte anzeigen. */
export const isOngoing = (status: MonthlyDonationStatus | null): status is MonthlyDonationStatus =>
  status?.status === "active" || status?.status === "past_due";

/** Eine neue Dauerspende ist gesperrt, solange die bestehende läuft und nicht schon gekündigt ist. */
export const blocksNewMonthly = (status: MonthlyDonationStatus | null): boolean =>
  isOngoing(status) && !status.cancelAtPeriodEnd;

type Action = "update" | "cancel" | "portal";

interface State {
  loading: boolean;
  status: MonthlyDonationStatus | null;
  error: string | null;
}

const messageOf = (error: unknown) => (error instanceof DonationApiError ? error.message : GENERIC_ERROR);

export const useMonthlyDonation = () => {
  const [state, setState] = useState<State>({ loading: true, status: null, error: null });
  const [busy, setBusy] = useState<Action | null>(null);

  /** Gibt die Fehlermeldung zurück (oder null, wenn die Dauerspende nicht mehr existiert). */
  const handleError = useCallback(
    async (error: unknown, donorKey: string, requestStartedAt: number): Promise<string | null> => {
    if (isNotFound(error)) {
      await deleteDonorKeyIfUnchanged(donorKey, requestStartedAt).catch(() => undefined);
      setState({ loading: false, status: null, error: null });
      return null;
    }
    const message = messageOf(error);
    setState((previous) => ({ ...previous, loading: false, error: message }));
    return message;
    },
    [],
  );

  const refresh = useCallback(async () => {
    let donorKey: string | null;
    try {
      donorKey = await loadDonorKey();
    } catch {
      // Lesefehler ≠ „kein Schlüssel": sonst entfiele die Sperre gegen eine zweite Dauerspende.
      setState({ loading: false, status: null, error: KEYCHAIN_ERROR });
      return;
    }
    if (!donorKey) {
      setState({ loading: false, status: null, error: null });
      return;
    }
    setState((previous) => ({ ...previous, loading: true, error: null }));
    const requestStartedAt = Date.now();
    try {
      const status = await donationRequest("/monthly", { donorKey, schema: MonthlyDonationStatusSchema });
      setState({ loading: false, status, error: null });
    } catch (error) {
      await handleError(error, donorKey, requestStartedAt);
    }
  }, [handleError]);

  // Bei jedem Anzeigen neu laden (z. B. nach Rückkehr aus Verwaltung oder Danke-Screen).
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  /** Führt eine Aktion aus; Rückgabe: Fehlermeldung oder null bei Erfolg. */
  const run = useCallback(
    async (action: Action, request: (donorKey: string) => Promise<MonthlyDonationStatus | null>) => {
      const donorKey = await loadDonorKey().catch(() => null);
      if (!donorKey) return KEYCHAIN_ERROR;
      setBusy(action);
      const requestStartedAt = Date.now();
      try {
        const status = await request(donorKey);
        if (status) setState({ loading: false, status, error: null });
        return null;
      } catch (error) {
        return (await handleError(error, donorKey, requestStartedAt)) ?? GENERIC_ERROR;
      } finally {
        setBusy(null);
      }
    },
    [handleError],
  );

  const updateAmount = (amountCents: number, coverFees: boolean) =>
    run("update", (donorKey) =>
      donationRequest("/monthly", {
        method: "PATCH",
        body: { amountCents, coverFees },
        donorKey,
        idempotencyKey: newIdempotencyKey(),
        schema: MonthlyDonationStatusSchema,
      }),
    );

  const cancel = () =>
    run("cancel", (donorKey) =>
      donationRequest("/monthly", { method: "DELETE", donorKey, schema: MonthlyDonationStatusSchema }),
    );

  /** Zahlungsart ändern und Belege: Stripe-Kundenportal im In-App-Browser, danach neu laden. */
  const openPortal = () =>
    run("portal", async (donorKey) => {
      const { url } = await donationRequest("/monthly/portal-session", {
        method: "POST",
        donorKey,
        schema: PortalSessionSchema,
      });
      await WebBrowser.openAuthSessionAsync(url, PORTAL_RETURN_URL);
      return donationRequest("/monthly", { donorKey, schema: MonthlyDonationStatusSchema });
    });

  return { ...state, busy, refresh, updateAmount, cancel, openPortal };
};
