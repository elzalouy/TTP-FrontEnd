import moment from "moment";
import { Task } from "../interfaces/models/Projects";
import { NotifiData } from "../redux/notification";

interface options {
  id?: string;
  value?: string;
  text?: string;
}

export const setWidth = (size: boolean, open: boolean) => {
  if (size && open) {
    return "80%";
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

export const removeDuplicatesFromArrayOfObjectsUsingOneProperty = (data: any[]) => {
  let flag = 0;
  //This flag here return one instance of the notification from all duplicates
  let test = data.filter((notifi: NotifiData) => {
    let newdata = data.some((item: NotifiData) => {
      if (notifi.title === item.title) {
        if (flag === 0) {
          //Here we filter and return the element once and then set the flag closed to returning duplicates
          flag++;
          return true;
        } else {
          return false;
        }
      }
    })
    return newdata;
  })
  return test;

}