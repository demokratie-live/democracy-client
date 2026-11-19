/** Euro-Beträge für die Anzeige (Cent → „10,41 €"; ganze Euro ohne Nachkommastellen: „5 €"). */
const withCents = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const wholeEuros = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatEuro = (cents: number): string => withCents.format(cents / 100);

export const formatEuroShort = (cents: number): string =>
  cents % 100 === 0 ? wholeEuros.format(cents / 100) : formatEuro(cents);

/**
 * Wandelt eine Eingabe wie „12", „12,5", „12,50" oder „12.50" in Cent um.
 * Gibt `null` zurück, wenn die Eingabe leer oder keine gültige Euro-Angabe ist.
 */
export const parseEuroInput = (input: string): number | null => {
  const normalized = input.trim().replace(/\s|€/g, "").replace(",", ".");
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(normalized)) return null;
  const [euros, cents = ""] = normalized.split(".");
  return Number(euros) * 100 + Number(cents.padEnd(2, "0"));
};
