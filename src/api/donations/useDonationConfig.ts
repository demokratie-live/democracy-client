import { useCallback, useEffect, useState } from "react";
import {
  donate3Link1,
  donate3Link3,
  donateList1Text,
  donateList2Text,
  donateList3Text,
} from "../../screens/Donate/content";
import { fetchDonationConfig } from "./client";
import type { DonationConfig } from "./types";

/**
 * Lädt die Spendenkonfiguration (`GET /donations/v1/config`).
 *
 * Fallback (FR-013, Edge Case „Zahlungsdienst nicht erreichbar"): Ist der Server nicht erreichbar
 * oder die Antwort ungültig, gilt die In-App-Zahlung als deaktiviert; die App zeigt dann nur
 * Finanzierungsstand und Bankverbindung aus dem App-Bundle.
 */

const CACHE_TTL_MS = 5 * 60 * 1000;

export const FALLBACK_DONATION_CONFIG: DonationConfig = {
  enabled: false,
  publishableKey: null,
  merchantDisplayName: "DEMOCRACY Deutschland e.V.",
  merchantCountryCode: "DE",
  defaultInterval: "monthly",
  minAmountCents: 500,
  maxAmountCents: 100000,
  presets: { one_time: [1000, 2500, 5000, 10000], monthly: [500, 1000, 1500, 2500] },
  fees: { cardPct: 1.5, cardFixedCents: 25, sepaFixedCents: 35, billingPct: 0.7 },
  portalLoginUrl: null,
  bankTransfer: { holder: donateList1Text, iban: donateList2Text, bic: donateList3Text },
  legal: {
    privacyUrl: "https://democracy-deutschland.de/datenschutz/",
    nonprofitProofUrl: donate3Link1,
    simplifiedReceiptUrl: donate3Link3,
  },
};

let cache: { config: DonationConfig; fetchedAt: number } | null = null;

/** Erzwingt beim nächsten Öffnen ein Neuladen (z. B. wenn der Server einen anderen Betrag berechnet). */
export const invalidateDonationConfig = () => {
  cache = null;
};

interface DonationConfigState {
  config: DonationConfig;
  loading: boolean;
  /** true, wenn die Fallback-Konfiguration aktiv ist, weil der Server nicht antwortete. */
  isFallback: boolean;
}

export const useDonationConfig = () => {
  const isFresh = cache !== null && Date.now() - cache.fetchedAt < CACHE_TTL_MS;
  const [state, setState] = useState<DonationConfigState>({
    config: cache?.config ?? FALLBACK_DONATION_CONFIG,
    loading: !isFresh,
    isFallback: cache === null,
  });

  const load = useCallback(async (force = false) => {
    if (!force && cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
      setState({ config: cache.config, loading: false, isFallback: false });
      return;
    }
    setState((previous) => ({ ...previous, loading: true }));
    try {
      const config = await fetchDonationConfig();
      cache = { config, fetchedAt: Date.now() };
      setState({ config, loading: false, isFallback: false });
    } catch {
      setState({ config: FALLBACK_DONATION_CONFIG, loading: false, isFallback: true });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: () => load(true) };
};
