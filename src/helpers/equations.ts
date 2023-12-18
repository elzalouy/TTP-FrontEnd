import _ from "lodash";
import { Task } from "../types/models/Projects";

// Add comment to see in this commit
export const isCloseToDeadline = (
  deadline: string,
  start: string,
  percent: number
) => {
  let startDate = new Date(start);
  let endDate = new Date(deadline);
  // if deadline passed it should be closed it's passed the deadline already.
  if (new Date().getTime() > endDate.getTime()) return false;
  else {
    // the total duration from the start to end
    let totalDuration = endDate.getTime() - startDate.getTime();
    // the total duration should be spent to insure the closing of end date.
    let precentageDuration = totalDuration * percent;
    // getting the current date that if it was less than perecentageDuration
    let currentDate = new Date();
    let elapsedTime = currentDate.getTime() - startDate.getTime();
    return elapsedTime > precentageDuration;
  }
};

export const setTasksToArrays = (tasks: Task[]) => {
  let dates = tasks?.flatMap((item) => {
    let date = new Date(item?.createdAt);
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).toDateString();
  });
  dates = _.uniq(dates);
  let sortedTasks: Task[][] | any = dates.map((Item) => {
    if (Item) {
      let item = new Date(Item);
      let day = item?.getDate();
      let month = item?.getMonth();
      let year = item?.getFullYear();
      return tasks.filter((item) => {
        let date = new Date(item?.createdAt);
        return (
          date.getDate() === day &&
          date.getMonth() === month &&
          date.getFullYear() === year &&
          item
        );
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
  return sortedTasks;
};
export const formatFileName = (name: string) => {
  let val = _.split(name, ".");
  let zeroval = _.truncate(val[0], { length: 10, omission: "..." });
  return `${zeroval}.${val[val.length - 1]}`;
};

export const getTaskNotificationsDate = (tasks: Task[]) => {
  let day = "",
    year = "",
    month = 0,
    currentDay = "";

  let date = new Date(tasks[0].createdAt);
  day = date?.getDate().toString();
  month = date?.getMonth();
  year = date?.getFullYear().toString();
  currentDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date?.getDay()];

  return { day, month, year, currentDay };
};
