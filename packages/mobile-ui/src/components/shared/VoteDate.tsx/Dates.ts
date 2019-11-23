export const generateDates = () => {
  const now = new Date();
  return [
    {
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() + 1,
        now.getMinutes(),
      ),
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() + 1,
        now.getMinutes() + 5,
      ),
    },
    {
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes() + 5,
      ),
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes() + 10,
      ),
    },
    {
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes() - 2,
      ),
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes() + 5,
      ),
    },
    {
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes() - 5,
      ),
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes() - 1,
      ),
    },
    {
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() - 1,
        now.getMinutes() - 5,
      ),
      endDate: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() - 1,
        now.getMinutes() + 5,
      ),
    },
    {
      date: new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate() - 1,
        now.getHours() - 1,
        now.getMinutes() - 5,
      ),
      endDate: new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate() - 1,
        now.getHours() - 1,
        now.getMinutes() + 5,
      ),
    },
  ];
};
