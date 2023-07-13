import Joi from "joi";
import { IDepartmentState, IList, ITeam } from "../models/Departments";
// constants

export const color = [
  "blue",
  "orange",
  "green",
  "red",
  "purple",
  "pink",
  "lime",
  "sky",
  "grey",
];
export const cardColorsValues: any = {
  blue: ["#0079BF1A", "#0079BF"],
  orange: ["#D290341A", "#D29034"],
  green: ["#5198391A", "#519839"],
  red: ["#B046321A", "#B04632"],
  purple: ["#89609E1A", "#89609E"],
  pink: ["#CD5A911A", "#CD5A91"],
  lime: ["#4BBF6B1A", "#4BBF6B"],
  sky: ["#00AECC1A", "#00AECC"],
  grey: ["#838C911A", "#838C91"],
};
// Read
export interface IDepartmentsComponentProps {
  cardColors?: any;
  department: IDepartmentState;
}
export interface IDepartmentsComponentState {
  doneTasks: number;
  notDoneTasks: number;
}
// Create
export interface ICreateDepartmentProps {}
export interface ICreateDepartmentState {
  teams: ITeam[];
  mainLists: IList[];
  formData: { name: string; color: string; team: string; list: string };
  colors: string[];
  show: string;
  loading: boolean;
  error: {
    error?: Joi.ValidationError;
    warning?: Joi.ValidationError | undefined;
    value?: any;
  };
}

export const IcreateDepartmentInit: ICreateDepartmentState = {
  teams: [],
  mainLists: [],
  colors: color,
  formData: { team: "", name: "", color: "blue", list: "" },
  show: "none",
  loading: false,
  error: {
    error: undefined,
    value: undefined,
    warning: undefined,
  },
};

// Edit
export interface IEditDepartmentProps {
  Show: string;
  setShow: (value: string) => void;
}

export interface IEditDepartmentState {
  _id?: string;
  teams: ITeam[];
  lists: IList[];
  addTeams?: string[];
  removeTeams?: string[];
  addLists?: string[];
  removeLists?: string[];
  formData: { name: string; color: string; team: string; list: string };
  colors: string[];
  show: string;
  loading: boolean;
  error: {
    error?: Joi.ValidationError;
    warning?: Joi.ValidationError | undefined;
    value?: any;
  };
}

export const editDepartmentInitState: IEditDepartmentState = {
  addTeams: [],
  removeTeams: [],
  addLists: [],
  removeLists: [],
  teams: [],
  lists: [],
  colors: color,
  formData: { team: "", name: "", color: "blue", list: "" },
  show: "none",
  loading: false,
  error: {
    error: undefined,
    value: undefined,
    warning: undefined,
  },
};
