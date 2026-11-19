export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const formatDateToDDMMYY = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return [padTo2Digits(d.getDate()), padTo2Digits(d.getMonth() + 1), d.getFullYear()].join('.');
};

const longDate = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

/** „19. Dezember 2026" – für ISO-Strings aus der Donations-API oder Date-Objekte; ungültig → null. */
export const formatLongDate = (value: string | Date | null | undefined): string | null => {
  if (!value) return null;
  const date = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? null : longDate.format(date);
};
