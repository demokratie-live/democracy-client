export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const formatDateToDDMMYY = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return [padTo2Digits(d.getDate()), padTo2Digits(d.getMonth() + 1), d.getFullYear()].join('.');
};
