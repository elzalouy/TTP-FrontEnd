import { isAfter, isSameDay, isBefore, format, parse } from "date-fns";
import moment from "moment";
import { Status } from "src/types/views/BoardView";
import { ProjectsInterface, Task } from "../types/models/Projects";

interface options {
  id?: string;
  value?: string;
  text?: string;
}

export const setWidth = (size: boolean, open: boolean) => {
  if (size && open) {
    return "100%";
  } else if (!size && open) {
    return "29.5%";
  } else if (!size && !open) {
    return "inherit";
  } else {
    return "inherit";
  }
};

export const getStatus = (status: string | undefined) => {
  if (status === "late") {
    return "Delivered Late";
  } else if (status === "deliver on time") {
    return "Delivered on time";
  } else if (status === "deliver before deadline") {
    return "Delivered earlier";
  } else if (status === "inProgress") {
    return "In Progress";
  } else if (status === "Done") {
    return "Done";
  }
};

export const calculateStatusBasedOnDeadline = (data: any) => {
  if (![typeof data, data].includes("undefined" || "null")) {
    let formattedDeadline = format(new Date(data), "dd-mm-yyyy");
    let deadlineDate = parse(formattedDeadline, "dd-mm-yyyy", new Date());
    let formattedToday = format(new Date(), "dd-mm-yyyy");
    let todayDate = parse(formattedToday, "dd-mm-yyyy", new Date());
    let onTime = isSameDay(todayDate, deadlineDate);
    let beforeDeadline = isBefore(todayDate, deadlineDate);
    let afterDeadline = isAfter(todayDate, deadlineDate);
    if (afterDeadline) {
      return "late";
    } else if (beforeDeadline) {
      return "deliver before deadline";
    } else if (onTime) {
      return "deliver on time";
    }
  }
};

export const checkProjectStatusName = (status: string | undefined) => {
  if (
    status === "deliver before deadline" ||
    status === "deliver on time" ||
    status === "late"
  ) {
    return "Done";
  }
};

export const checkIndexForLastRow = (index: number, tasks: Task[]) => {
  let length = tasks.length - 1;
  //Taking length of whole array and finding the last row to make changes
  if (index === length) {
    return true;
  } else {
    return false;
  }
};

export const checkStatusAndSetBorder = (status: string) => {
  if (status === "Tasks Board") {
    return "#9fa1ab1a solid 2px";
  } else if (status === "Not Clear") {
    return "#d2903456 solid 1px";
  } else if (status === "Review") {
    return "#0079bf solid 1px";
  } else if (status === "Done") {
    return "#00aaba4b solid 1px";
  } else if (status === "inProgress") {
    return "#ffc500 solid 1px";
  } else if (status === "Cancled") {
    return "#d2343441 solid 1px";
  } else if (status === "Shared") {
    return "#9fa1ab1a solid 2px";
  }
};

export const checkStatusAndSetBackground = (status: string) => {
  if (status === "Tasks Board") {
    return "#F1F1F2";
  } else if (status === "Not Clear") {
    return "#f7f0e7";
  } else if (status === "Review") {
    return "#E1F3F5";
  } else if (status === "Done") {
    return "#E1F3F5";
  } else if (status === "inProgress") {
    return "#FBF5E2";
  } else if (status === "Cancled") {
    return "#F7E6E7";
  } else if (status === "Shared") {
    return "#F7E6E7";
  }
};

export const isOptionsEmpty = (options: options[]) => {
  let checkOptions = options.map((op) => {
    //Mapping all options array with true or false
    if (op.id?.length === 0) {
      return true;
    } else {
      return false;
    }
  });
  let finalResult = checkOptions.filter((op) => op === false);
  //Finding length of filtered array to determine true or false
  if (finalResult.length === 0) {
    return true;
  } else {
    return false;
  }
};

export const getYesterdaysDate = () => {
  let today = new Date();
  today.setDate(today.getDate() - 1);
  return today;
};

export const notNullorFalsy = (date: string | null | undefined) => {
  if ([undefined, null, "", 0].includes(date)) {
    return false;
  } else {
    return true;
  }
};

export const getTasksByClientIdAndStatus = (__status__: Status , projects : ProjectsInterface , tasks:Task[],_id:string) => {
  let clientProjects = projects.projects.filter(
    (item) => item.clientId === _id
  );
  //Filter project based on client
  let clientTasks = tasks.filter((item) =>
    clientProjects.some((project) => project._id === item.projectId)
  );
  //Filter tasks based on client's projects
  let tasksBasedStatus = clientTasks.filter(
    (item) => item.status === __status__
  );
  //Filter tasks based on status need from the client's tasks
  return tasksBasedStatus.length;
};
