import { Task } from "../redux/Projects/projects.state";
import _ from "lodash";
export const getStartEndDayOfWeek = (date: Date) => {
  var dt = new Date(date); // current date of week
  var currentWeekDay = dt.getUTCDay();
  var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
  var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
  var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
  return { start: wkStart, end: wkEnd };
};
export const isCloseToDeadline = (date: Date) => {
  var today = new Date();
  var nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );
  if (date && date.getTime() > nextweek.getTime()) return false;
  else return true;
};
export const setTasksToArrays = (tasks: Task[]) => {
  let dates = tasks?.flatMap((item) => {
    if (item?.lastMoveDate && item?.lastMove) {
      let date = new Date(item?.lastMoveDate);
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).toDateString();
    }
  });
  dates = _.uniq(dates);
  let sortedTasks: Task[][] | any = dates.map((Item) => {
    if (Item) {
      let item = new Date(Item);
      let day = item?.getDate();
      let month = item?.getMonth();
      let year = item?.getFullYear();
      return tasks.filter((item) => {
        if (item?.lastMoveDate) {
          let date = new Date(item?.lastMoveDate);
          return (
            date.getDate() === day &&
            date.getMonth() == month &&
            date.getFullYear() === year &&
            item
          );
        }
      });
    }
  });
  return sortedTasks;
};
export const setTasksBoardToArrays = (tasks: Task[]) => {
  let dates = tasks?.flatMap((item) => {
    if (item?.createdAt) {
      let date = new Date(item.createdAt);
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).toDateString();
    }
  });
  dates = _.uniq(dates);
  let sortedTasks: Task[][] | any = dates.map((Item) => {
    if (Item) {
      let item = new Date(Item);
      let day = item?.getDate();
      let month = item?.getMonth();
      let year = item?.getFullYear();
      return tasks.filter((item) => {
        if (item?.createdAt) {
          let date = new Date(item.createdAt);
          return (
            date.getDate() === day &&
            date.getMonth() == month &&
            date.getFullYear() === year &&
            item
          );
        }
      });
    }
  });
  console.log(sortedTasks);
  return sortedTasks;
};
