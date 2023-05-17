export const findMonday = (date: string) => {
  const currDate = new Date(date);
  const dayOfWeek = currDate.getDay();
  const daysToAdd = dayOfWeek == 0 ? -6 : 1;
  const newDate = currDate.getDate() - dayOfWeek + daysToAdd;
  return new Date(currDate.setDate(newDate));
};

export const findSunday = function (date: string) {
  const currDate = new Date(date);
  const dayOfWeek = currDate.getDay();
  return new Date(currDate.setDate(currDate.getDate() - dayOfWeek + 7));
};
