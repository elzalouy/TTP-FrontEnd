import { Department } from "../Departments";

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
  attachedFiles: {
    _id: string;
    name: string;
    mimeType: string;
    trelloId: string;
    url: string;
  }[];
  attachedCard: string;
  listId: string;
  cardId: string;
  boardId: string;
  file?: any;
  description: string;
  lastMove?: string;
  lastMoveDate?: string;
  createdAt?: string;
}
export interface Project {
  _id: string;
  name: string;
  projectManager: { _id: string; name: string } | null;
  projectManagerName: string | null;
  teamsId?: any[];
  projectDeadline: any;
  startDate?: Date | any;
  completedDate?: any;
  projectStatus?: string;
  clientId: string;
  tasks: Task[];
  NoOfFinishedTasks: any;
  NoOfTasks: any;
}
export interface TasksStatistics {
  numberOfTasks: number | null;
  numberOfFinishedTasks: number | null;
  progress: number | null;
}
export interface ProjectsInterface {
  loading: boolean;
  projects: Project[];
  newProject: {
    showPopUp: string;
    project: Project;
    tasks: Task[];
    newTask: Task;
    selectedDepartment: Department | null;
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
  editProject: Project | undefined;
  editTask: string | undefined;
  viewTask: Task;
  editTaskLoading: boolean | undefined;
  sorting: string | null;
  filteredProjects: Project[] | null;
}

const PorjectsState: ProjectsInterface = {
  loading: true,
  projects: [],
  allTasks: [],
  filteredTasks: [],
  newProject: {
    newProjectHook: false,
    showPopUp: "none",
    project: {
      _id: "",
      name: "",
      projectManager: null,
      NoOfFinishedTasks: null,
      NoOfTasks: null,
      projectManagerName: null,
      teamsId: [],
      projectDeadline: new Date(),
      startDate: new Date(),
      completedDate: new Date(),
      projectStatus: "inProgress",
      clientId: "",
      tasks: [],
    },
    tasks: [],
    newTask: {
      _id: "",
      name: "",
      projectId: "",
      categoryId: "",
      subCategoryId: "",
      teamId: "",
      countNotClear: 0,
      countShared: 0,
      status: "",
      start: new Date(),
      deadline: new Date(),
      deliveryDate: new Date(),
      done: new Date(),
      turnoverTime: 0,
      attachedFiles: [],
      attachedCard: "",
      listId: "",
      cardId: "",
      boardId: "",
      file: undefined,
      description: "",
    },
    selectedDepartment: null,
  },
  selectedProject: {
    loading: null,
    tasks: [],
    project: null,
  },
  deleteProject: undefined,
  deleteProjectTasks: undefined,
  deleteTask: undefined,
  viewTask: {
    _id: "",
    name: "",
    projectId: "",
    categoryId: "",
    subCategoryId: "",
    teamId: "",
    countNotClear: 0,
    countShared: 0,
    status: "",
    start: new Date(),
    deadline: new Date(),
    deliveryDate: new Date(),
    done: new Date(),
    turnoverTime: 0,
    attachedFiles: [],
    attachedCard: "",
    listId: "",
    cardId: "",
    boardId: "",
    file: undefined,
    description: "",
  },
  editProject: undefined,
  editTask: "",
  editTaskLoading: undefined,
  sorting: null,
  filteredProjects: null,
};
export default PorjectsState;
