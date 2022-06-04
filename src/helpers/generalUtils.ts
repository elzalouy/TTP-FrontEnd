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

export const checkProjectStatus = (status: string | undefined) => {
  if (status === "deliver before deadline" || status === "deliver on time" || status === "late") {
    return false;
  } else {
    return true;
  }
}

export const checkIndexForLastRow = (index: number, tasks: Task[]) => {
  let length = tasks.length - 1;
  //Taking length of whole array and finding the last row to make changes
  if (index === length) {
    return true;
  } else {
    return false;
  }
}

export const checkStatusAndSetBorder = (status: string) => {
  if (status === "Not Started") {
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
  if (status === "Not Started") {
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