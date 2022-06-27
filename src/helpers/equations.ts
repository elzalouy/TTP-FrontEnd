import _ from "lodash";
import { Task } from "../interfaces/models/Projects";

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
          startDate.getTime() / (1000 * 60 * 60 * 24)
      );
      if (remained <= 0) return false;
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
  return sortedTasks;
};
