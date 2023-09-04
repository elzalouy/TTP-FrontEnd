import _ from "lodash";
import { Task } from "../types/models/Projects";

export const isCloseToDeadline = (
  deadline: string,
  start: string,
  percent: number
) => {
  if (deadline.length > 0) {
    let startDate = new Date(start);
    let deadlineDate = new Date(deadline);
    let totalDays = Math.floor(
      deadlineDate.getTime() / (1000 * 60 * 60 * 24) -
        startDate.getTime() / (1000 * 60 * 60 * 24)
    );
    if (totalDays > 0) {
      let remained = Math.floor(
        deadlineDate.getTime() / (1000 * 60 * 60 * 24) -
          new Date().getTime() / (1000 * 60 * 60 * 24)
      );
      if (remained <= 0) return true;
      else if (remained > 0 && (remained / totalDays) * 100 > percent)
        return false;
      else return true;
    } else return true;
  } else {
    return false;
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
          date.getMonth() == month &&
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
