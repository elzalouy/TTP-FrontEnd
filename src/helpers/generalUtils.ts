import moment from "moment";
import { Task } from "../redux/Projects";

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
  let formattedDeadline = moment(data).format("MM-DD-YYYY");
  let formattedToday = moment(new Date().toUTCString()).format("MM-DD-YYYY");
  let onTime = moment(formattedToday).isSame(formattedDeadline);
  let beforeDeadline = moment(formattedToday).isBefore(formattedDeadline);
  let afterDeadline = moment(formattedToday).isAfter(formattedDeadline);
  if (afterDeadline) {
    return "late";
  } else if (beforeDeadline) {
    return "deliver before deadline";
  } else if (onTime) {
    return "deliver on time";
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
}

export const getDisabledDrag = (status: string, deadline: string | null) => {
  if (status === "Not Started") {
    if (deadline === null) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}