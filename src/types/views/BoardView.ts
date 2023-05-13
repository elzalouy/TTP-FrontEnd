import Joi from "joi";
import { Category } from "../../models/Categories";
import { IDepartmentState, ITeam } from "../models/Departments";
import { Project, Task, TaskFile } from "../models/Projects";
import CreateNewTask from "src/views/TaskViewBoard/Read/CreateTaskBtn";
import React from "react";

export type EditTaskProps = {
  show: string;
  setShow: (val: string) => void;
};

export interface CRUDTaskState {
  loading: boolean;
  selectedProject?: Project;
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
  selectedDepartmentId?: string;
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
  loading: false,
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
    attachedFiles: [],
    attachedCard: "",
    description: "",
    cardId: "",
    listId: "",
    boardId: "",
    createdAt: "",
    movements: [],
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
  loading: false,
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
    attachedFiles: [],
    attachedCard: "",
    description: "",
    cardId: "",
    listId: "",
    boardId: "",
    movements: [],
    createdAt: "",
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
  | "In Progress"
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

export type DragCloumnType = {
  name: string;
  header: string;
  body: string;
  items?: Task[];
  border: string;
  NewTask?: React.FC;
  value: string;
  footer: string;
};

export const moveListsObject: any = {
  TasksBoard: "Tasks Board",
  NotClear: "Not Clear",
  InProgress: "In Progress",
  Review: "Review",
  Shared: "Shared",
  Done: "Done",
  Cancled: "Cancled",
};
export const moveListsIndexes: any = {
  TasksBoard: 0,
  NotClear: 1,
  InProgress: 2,
  Review: 3,
  Shared: 4,
  Done: 5,
  Cancled: 6,
};
export type moveListsValuesType =
  | "TasksBoard"
  | "NotClear"
  | "InProgress"
  | "Review"
  | "Shared"
  | "Done"
  | "Cancled"
  | "";
export const moveListsValues = [
  "TasksBoard",
  "NotClear",
  "InProgress",
  "Review",
  "Shared",
  "Done",
  "Cancled",
];
export const columnsValues: {
  TasksBoard: DragCloumnType;
  NotClear: DragCloumnType;
  InProgress: DragCloumnType;
  Review: DragCloumnType;
  Shared: DragCloumnType;
  Done: DragCloumnType;
  Cancled: DragCloumnType;
} = {
  TasksBoard: {
    name: "Tasks Board",
    header: "not-started-header",
    body: "not-started-task",
    border: "not-started-border",
    NewTask: CreateNewTask,
    value: "Tasks Board",
    footer: "task-card-footer-notstarted",
  },
  NotClear: {
    name: "Not clear",
    header: "not-clear-header",
    body: "not-clear-task",
    border: "not-clear-border",
    value: "Not Clear",
    footer: "task-card-footer-notclear",
  },
  InProgress: {
    name: "In Progress",
    header: "in-progress-header",
    body: "in-progress-task",
    border: "in-progress-border",
    value: "In Progress",
    footer: "task-card-footer-inprogress",
  },
  Review: {
    name: "Review",
    header: "review-header",
    body: "review-task",
    border: "review-border",
    value: "Review",
    footer: "task-card-footer-review",
  },
  Shared: {
    name: "Shared",
    header: "canceled-header",
    body: "canceled-task",
    border: "canceled-border",
    value: "Shared",
    footer: "task-card-footer-shared",
  },
  Done: {
    name: "Done",
    header: "done-header",
    body: "done-task",
    border: "done-border",
    value: "Done",
    footer: "task-card-footer-done",
  },
  Cancled: {
    name: "Cancled",
    header: "canceled-header",
    body: "canceled-task",
    border: "canceled-border",
    value: "Cancled",
    footer: "task-card-footer-cancled",
  },
};
