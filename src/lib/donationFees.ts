import type { DonationFees, DonationInterval } from "../api/donations/types";

/**
 * Anzeige der Gebührenübernahme (FR-001b). Identische Formel wie
 * democracy-api `src/donations/fees.ts` – verbindlich ist der Server, die App zeigt den Betrag nur
 * vorab an:
 *
 *   T = max( (A + fixCard) / (1 − pctCard − b), (A + fixSepa) / (1 − b) ),  b = billingPct nur monatlich
 *
 * Ganzzahlig in Cent und Basispunkten, aufgerundet auf volle Cent.
 */

const BASIS_POINTS = 10_000;

const toBasisPoints = (percent: number): number => Math.round(percent * 100);

const ceilDiv = (numerator: number, denominator: number): number =>
  Math.floor((numerator + denominator - 1) / denominator);

const grossUp = (amountCents: number, fixedCents: number, percentBp: number): number =>
  ceilDiv((amountCents + fixedCents) * BASIS_POINTS, BASIS_POINTS - percentBp);

export const chargedAmountCents = (
  baseAmountCents: number,
  options: { coverFees: boolean; interval: DonationInterval },
  fees: DonationFees,
): number => {
  if (!options.coverFees || baseAmountCents <= 0) {
    return baseAmountCents;
  }
  const billingBp = options.interval === "monthly" ? toBasisPoints(fees.billingPct) : 0;
  const viaCard = grossUp(baseAmountCents, fees.cardFixedCents, toBasisPoints(fees.cardPct) + billingBp);
  const viaSepa = grossUp(baseAmountCents, fees.sepaFixedCents, billingBp);
  return Math.max(viaCard, viaSepa);
};

/** Aufschlag in Cent, der bei Gebührenübernahme zur Spende hinzukommt. */
export const feeSurchargeCents = (
  baseAmountCents: number,
  interval: DonationInterval,
  fees: DonationFees,
): number => chargedAmountCents(baseAmountCents, { coverFees: true, interval }, fees) - baseAmountCents;
