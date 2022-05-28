import moment from "moment";

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