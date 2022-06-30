import Joi, { string } from "joi";
import { Category } from "../../redux/Categories";
import { Department, Team } from "../../redux/Departments";
import { Task } from "../models/Projects";

export type EditTaskProps = {
  show: string;
  setShow: (val: string) => void;
};
export interface InputProps {
  name: string;
  control: any;
  register: any;
  state: any;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  id?: string;
}

export interface DateInputProps {
  name: string;
  control: any;
  register: any;
  state: any;
  setValue: any;
  placeholder: string;
  label: string;
}

export interface CRUDTaskState {
  newFiles: (File | null)[];
  deleteFiles: {
    name: string;
    mimeType: string;
    trelloId: string;
    url: string;
  }[];
  task: Task;
  error: {
    error: Joi.ValidationError | undefined;
    value: any;
    warning: Joi.ValidationError | undefined;
  };
  selectedDepartment: Department | any;
  selectedDepatmentTeams: Team[] | undefined;
  selectedCategory: Category | null | undefined;
}

export interface AttachetFilesProps {
  register: any;
  onSetFiles: any;
  files: any;
  onChangeFiles: any;
  state: any;
  onRemoveFile: any;
}
export const initialHookFormTaskState: any = {
  name: "",
  projectId: "",
  categoryId: "",
  subCategoryId: "",
  teamId: "",
  status: "",
  description: "",
  selectedDepartmentId: "",
  deadline: null,
  attachedFiles: undefined,
  file: null,
};
export const initialState: CRUDTaskState = {
  newFiles: [],
  deleteFiles: [],
  task: {
    _id: "",
    name: "",
    projectId: "",
    categoryId: "",
    subCategoryId: "",
    teamId: "",
    status: "",
    start: "",
    deliveryDate: "",
    done: "",
    turnoverTime: "",
    attachedFiles: [],
    attachedCard: "",
    description: "",
    cardId: "",
    listId: "",
    boardId: "",
  },
  error: {
    error: undefined,
    value: null,
    warning: undefined,
  },
  selectedDepartment: null,
  selectedCategory: null,
  selectedDepatmentTeams: [],
};
