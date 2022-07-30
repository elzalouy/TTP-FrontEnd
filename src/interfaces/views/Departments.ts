import Joi from "joi";

export interface IEditDepartmentProps {
  Show: string;
  setShow: (value: string) => void;
}
export interface ICreateDepartmentProps {}

export interface ICreateDepartmentState {
  department: {
    name: string;
    color: string;
    teams: { name: string }[];
    totalInProgress: number;
    totalDone: number;
  };
  formData: { name: string; color: string; team: string };
  colors: string[];
  show: string;
  loading: boolean;
  error: {
    error?: Joi.ValidationError;
    warning?: Joi.ValidationError | undefined;
    value?: any;
  };
}
export interface IEditDepartmentState extends ICreateDepartmentState {}

const color = [
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

export const IcreateDepartmentInit: ICreateDepartmentState = {
  department: {
    name: "",
    color: "blue",
    teams: [],
    totalInProgress: 0,
    totalDone: 0,
  },
  colors: color,
  formData: { team: "", name: "", color: "blue" },
  show: "none",
  loading: false,
  error: {
    error: undefined,
    value: undefined,
    warning: undefined,
  },
};
export const editDepartmentInitState: ICreateDepartmentState =
  IcreateDepartmentInit;
