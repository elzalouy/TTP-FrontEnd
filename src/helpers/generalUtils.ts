import { isAfter, isSameDay, isBefore, format, parse } from "date-fns";
import _, { words } from "lodash";
import { Manager } from "src/models/Managers";
import { Status } from "src/types/views/BoardView";
import {
  Project,
  ProjectsInterface,
  Task,
  TaskMovement,
} from "../types/models/Projects";
import { ITaskInfo, Journey, Journies } from "src/types/views/Statistics";

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
  } else if (status === "In Progress") {
    return "In Progress";
  } else if (status === "Done") {
    return "Done";
  }
};
export const getDifBetweenDates = (start: Date, end: Date) => {
  let d1 = start.getTime();
  let d2 = end.getTime();
  const diffInMs = Math.abs(d2 - d1);
  const remainingDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Convert the difference in milliseconds to days, hours, and minutes
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  // calculate the total number of hours in the time difference
  const totalHours = diffInDays * 24 + diffInHours;
  const totalMins = Math.floor(diffInMs / 60000);
  return {
    isLate: d2 > d1 ? false : true,
    difference: { days: diffInDays, hours: diffInHours, mins: diffInMinutes },
    remainingDays,
    totalMins,
    totalHours,
  };
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
  } else {
    return status;
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
  } else if (status === "In Progress") {
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
  } else if (status === "In Progress") {
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

export const getTasksByClientIdAndStatus = (
  __status__: Status,
  projects: ProjectsInterface,
  tasks: Task[],
  _id: string | undefined
) => {
  if (_id) {
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
  } else return 0;
};

export const checkValueAndShowOptions = (value: string | undefined) => {
  if (value) {
    if (
      ["Done", "late", "deliver on time", "deliver before deadline"].includes(
        value
      )
    ) {
      return [{ value: "In Progress", text: "In Progress" }];
    } else {
      return [
        { value: "In Progress", text: "In Progress" },
        { value: "Done", text: "Done" },
      ];
    }
  } else {
    return [{ value: "", text: "" }];
  }
};

export const showDotsOverLimit = (value: string, limit: number) => {
  if (value.length > limit) {
    let newValue = value.substring(0, limit) + "...";
    return newValue;
  } else {
    return value;
  }
};

/* Options data : The below data cannot be set to be dynamic as they as static */

export const getDepartmentOptions = (data: any[]) => {
  if (data) {
    return data.map((item) => {
      return {
        id: item,
        value: item,
        text: item,
      };
    });
  } else return [];
};

export const filterOptions = [
  [
    { id: "asc", text: "Ascending", value: "asc" },
    { id: "desc", text: "Descending", value: "desc" },
  ],
  [
    { id: "Not Started", value: "Not Started", text: "Not Started" },
    {
      id: "delivered on time",
      value: "delivered on time",
      text: "Delivered on time",
    },
    {
      id: "delivered before deadline",
      value: "delivered before deadline",
      text: "Delivered earlier",
    },
    {
      id: "delivered after deadline",
      value: "delivered after deadline",
      text: "Delivered late",
    },
    { id: "In Progress", value: "In Progress", text: "In Progress" },
  ],
];

export const checkProjectStatus = (status: string | undefined) => {
  if (
    status === "deliver before deadline" ||
    status === "deliver on time" ||
    status === "late"
  ) {
    return false;
  } else {
    return true;
  }
};

export const hasMoreItems = (
  NestedTasks: Task[][] | null,
  Nested = 2,
  Array = 3
) => {
  if (NestedTasks) {
    let more = false;
    if (NestedTasks && NestedTasks?.length >= Nested) more = true;
    else
      more =
        NestedTasks && NestedTasks[0] && NestedTasks[0].length >= Array
          ? true
          : false;
    return more;
  } else return false;
};

export const setProjectManagerId = (name: any): string => {
  if (typeof name === "string") {
    return name;
  } else {
    return "";
  }
};

export const getTaskJournies = (task: ITaskInfo) => {
  let getJourney = (): Journey => {
    return {
      clientId: task.clientId,
      projectManager: task.projectManager,
      categoryId: task.categoryId,
      taskId: task._id,
      index: journies.length,
      teamId: task.teamId,
      movements: [],
      sharedAtMonth: "",
      journeyFinishedAt: null,
      revision: journies.length > 1,
      unique: false,
      sharedAt: "",
      startedAt: "",
      boardId: task.boardId,
      journeyDeadline: null,
    };
  };
  let journies: Journies = [];
  let movements = task.movements,
    endOfJourney = ["Cancled", "Shared", "Done"],
    journey: Journey = getJourney();

  movements.forEach((item, index) => {
    journey.journeyDeadline = item.journeyDeadline
      ? new Date(item.journeyDeadline)
      : null;
    if (
      endOfJourney.includes(item.status) &&
      movements[index + 1] &&
      movements[index + 1].status === "Tasks Board"
    ) {
      journey.movements.push(item);
      journey.journeyFinishedAtDate = new Date(item.movedAt);
      journey.journeyFinishedAt = journey.journeyFinishedAtDate.toLocaleString(
        "en-us",
        {
          month: "long",
        }
      );
      journies.push(journey);
      journey = getJourney();
    } else {
      journey.movements.push(item);
      if (index === movements.length - 1) {
        journies.push(journey);
        journey = getJourney();
      }
    }
  });
  if (journies.length === 1) journies[0].unique = true;
  return { id: task._id, name: task.name, journies };
};

export function getRandomColor(colors: string[]): {
  color: string;
  borderColor: string;
} {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * (100 - 50 + 1) + 50);
  const lightness = Math.floor(Math.random() * (80 - 40 + 1) + 40);
  const rgb = hslToRgb(hue / 360, saturation / 100, lightness / 100);
  const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`;
  const borderColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  if (colors.indexOf(color) === -1) {
    return { color, borderColor };
  } else {
    return getRandomColor(colors);
  }
}

function hslToRgb(h: number, s: number, l: number): number[] {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const randomColors = [
  [255, 198, 0],
  [112, 11, 111],
  [0, 173, 187],
  [245, 51, 63],
  [119, 61, 189],
  [255, 193, 7],
  [233, 30, 99],
  [33, 150, 243],
  [255, 87, 34],
  [139, 195, 74],
  [103, 58, 183],
  [255, 152, 0],
  [63, 81, 181],
  [205, 220, 57],
  [96, 125, 139],
  [255, 64, 129],
  [0, 188, 212],
  [255, 235, 59],
  [76, 175, 80],
  [156, 39, 176],
  [255, 193, 7],
  [233, 30, 99],
  [33, 150, 243],
  [255, 87, 34],
  [139, 195, 74],
  [103, 58, 183],
  [255, 152, 0],
  [63, 81, 181],
  [205, 220, 57],
  [96, 125, 139],
  [255, 64, 129],
  [0, 188, 212],
  [255, 235, 59],
  [76, 175, 80],
  [156, 39, 176],
  [255, 193, 7],
  [233, 30, 99],
  [33, 150, 243],
  [255, 87, 34],
  [139, 195, 74],
  [103, 58, 183],
  [255, 152, 0],
  [63, 81, 181],
  [205, 220, 57],
  [96, 125, 139],
  [255, 64, 129],
  [0, 188, 212],
  [255, 235, 59],
  [76, 175, 80],
  [156, 39, 176],
  [255, 193, 7],
  [233, 30, 99],
  [33, 150, 243],
  [255, 87, 34],
  [139, 195, 74],
  [103, 58, 183],
  [255, 152, 0],
  [63, 81, 181],
  [205, 220, 57],
  [96, 125, 139],
  [255, 64, 129],
  [0, 188, 212],
  [255, 235, 59],
  [76, 175, 80],
  [156, 39, 176],
  [255, 193, 7],
  [233, 30, 99],
  [33, 150, 243],
  [255, 87, 34],
  [139, 195, 74],
  [103, 58, 183],
  [255, 152, 0],
  [63, 81, 181],
  [205, 220, 57],
  [96, 125, 139],
  [255, 64, 129],
  [0, 188, 212],
  [255, 235, 59],
  [76, 175, 80],
  [156, 39, 176],
  [255, 193, 7],
  [233, 30, 99],
  [33, 150, 243],
  [255, 87, 34],
  [139, 195, 74],
  [103, 58, 183],
  [255, 152, 0],
  [63, 81, 181],
  [205, 220, 57],
  [96, 125, 139],
  [255, 64, 129],
  [0, 188, 212],
  [255, 235, 59],
  [76, 175, 80],
  [156, 39, 176],
  [255, 193, 7],
  [233, 30, 99],
  [33, 150, 243],
  [255, 87, 34],
];
