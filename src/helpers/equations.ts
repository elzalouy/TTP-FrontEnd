export const getStartEndDayOfWeek = (date: Date) => {
  var dt = new Date(date); // current date of week
  var currentWeekDay = dt.getUTCDay();
  var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
  var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
  var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
  return { start: wkStart, end: wkEnd };
};
