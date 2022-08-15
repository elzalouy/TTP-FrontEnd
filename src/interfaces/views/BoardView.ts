import Joi from "joi";
import { Category } from "../../redux/Categories";
import { IDepartmentState, ITeam } from "../models/Departments";
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
  dataTestId?: string;
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
  selectedDepartment?: IDepartmentState;
  selectedDepatmentTeams: ITeam[] | undefined;
  selectedCategory: Category | null | undefined;
}

export interface AttachetFilesProps {
  state: any;
  files: any;
  register: any;
  onSetFiles: any;
  onRemoveFile: any;
  onChangeFiles: any;
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
  selectedDepartment: undefined,
  selectedCategory: null,
  selectedDepatmentTeams: [],
};

//Constants
export type Status =
  | "Tasks Board"
  | "Review"
  | "Shared"
  | "Done"
  | "Cancled"
  | "inProgress"
  | "Not Clear";

export const videoTypes = [
  "video/mp4",
  "video/3gpp",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/x-msvideo",
  "video/mpeg",
  "video/dvd",
  "video/xvid",
  "video/x-flv",
  "video/x-f4v",
  "video/divx",
  "video/mov",
];
