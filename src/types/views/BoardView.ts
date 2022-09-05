import Joi from "joi";
import { Category } from "../../models/Categories";
import { IDepartmentState, ITeam } from "../models/Departments";
import { Task, TaskFile } from "../models/Projects";

export type EditTaskProps = {
  show: string;
  setShow: (val: string) => void;
};

export interface CRUDTaskState {
  updated?: boolean;
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
  filesRef: any;
  newFiles: (File | null)[];
  oldFiles?: TaskFile[];
  register: any;
  onSetFiles: any;
  onRemoveFile: any;
  onChangeFiles: any;
}
export interface IInitialinitialHookFormTaskState {
  name: string;
  projectId: string;
  categoryId: string;
  subCategoryId: string;
  teamId: string;
  status: string;
  description: string;
  selectedDepartmentId: string;
  deadline: string;
  attachedFiles: File[] | TaskFile[];
  file: File | null;
}
export const initialHookFormTaskState: IInitialinitialHookFormTaskState = {
  name: "",
  projectId: "",
  categoryId: "",
  subCategoryId: "",
  teamId: "",
  status: "",
  description: "",
  selectedDepartmentId: "",
  deadline: "",
  attachedFiles: [],
  file: null,
};
export const initialEditState: CRUDTaskState = {
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
export const initialCreateState: CRUDTaskState = {
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
