import { RouteComponentProps } from "react-router";
import { IDepartmentState } from "./Departments";

export interface TaskFile {
  _id: string;
  name: string;
  mimeType: string;
  trelloId: string;
  url: string;
  error?: boolean;
}
export interface Task {
  _id: string;
  name: string;
  projectId: string;
  categoryId: string;
  subCategoryId: string;
  teamId: string;
  countNotClear?: any;
  countShared?: any;
  status: string;
  start: any;
  deadline?: any;
  deliveryDate?: any;
  done: any;
  turnoverTime: any;
  attachedFiles: TaskFile[];
  attachedCard: string;
  listId: string;
  cardId: string;
  boardId: string;
  file?: any;
  description: string;
  lastMove?: string;
  lastMoveDate?: string;
  createdAt?: string;
  trelloShortUrl?: string;
  categoryName?: string;
  projectName?: string;
}

export interface IProjectsPage {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

export interface Project {
  _id: string;
  name: string;
  projectManager: { _id: string; name: string } | null | string | any;
  projectManagerName: string | null;
  teamsId?: any[];
  projectDeadline: any;
  startDate?: Date | any;
  completedDate?: any;
  projectStatus: ProjectStatus;
  clientId: string;
  tasks: Task[];
  NoOfFinishedTasks: any;
  NoOfTasks: any;
  associateProjectManager?: string;
  cardId?: string;
  boardId?: string;
  listId?: string;
}
export interface TasksStatistics {
  numberOfTasks: number | null;
  numberOfFinishedTasks: number | null;
  progress: number | null;
}
export interface ProjectsInterface {
  loading: boolean;
  projects: Project[];
  uploadLoading: {
    id: string | undefined;
    loading: boolean | undefined;
  };
  newProject: {
    showPopUp: string;
    project: Project;
    tasks: Task[];
    newTask: Task;
    selectedDepartment: IDepartmentState | null;
    newProjectHook: boolean;
  };
  selectedProject: {
    loading: boolean | null;
    tasks: Task[];
    project: Project | undefined | null;
  };
  allTasks: Task[];
  filteredTasks: Task[];
  deleteProject: string | undefined;
  deleteProjectTasks: string[] | undefined;
  deleteTask: string | undefined;
  deleteTaskLoading?: boolean;
  deleteProjectLoading?: boolean;
  editProject: Project | undefined;
  editTask: string | undefined;
  editTaskLoading: boolean | undefined;
  sorting: string | null;
  filteredProjects?: Project[];
  openTaskDetails: Task;
  setTasksStatisticsHook: boolean | undefined;
  setProjectsStatisticsHook: boolean | undefined;
}

export type ProjectStatus =
  | "Not Started"
  | "In Progress"
  | "late"
  | "delivered on time"
  | "delivered before deadline"
  | "delivered after deadline";

export const DoneStatusList = [
  "delivered on time",
  "delivered before deadline",
  "delivered after deadline",
];
