import { Department } from "../Departments";

export interface Task {
  _id: string;
  name: string;
  projectId: string;
  categoryId: string;
  subCategoryId: string;
  memberId: string;
  countNotClear?: any;
  countShared?: any;
  status: string;
  start: any;
  deadline?: any;
  deliveryDate?: any;
  done: any;
  turnoverTime: any;
  attachedFiles: string;
  attachedCard: string;
  listId?: string;
  cardId?: string;
  boardId?: string;
  file?: any;
  description: string;
}
export interface Project {
  _id: string;
  name: string;
  projectManager: { _id: string; name: string } | null;
  projectManagerName: string | null;
  teamsId?: any[];
  numberOfTasks?: any;
  numberOfFinishedTasks?: any;
  projectDeadline: any;
  startDate?: Date | any;
  completedDate?: any;
  projectStatus?: string;
  clientId: string;
  tasks: Task[];
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
  editTask: Task | null;
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
      projectManagerName: null,
      teamsId: [],
      numberOfTasks: 0,
      numberOfFinishedTasks: 0,
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
      memberId: "",
      countNotClear: 0,
      countShared: 0,
      status: "",
      start: new Date(),
      deadline: new Date(),
      deliveryDate: new Date(),
      done: new Date(),
      turnoverTime: 0,
      attachedFiles: "",
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
  editProject: undefined,
  editTask: null,
  sorting: null,
  filteredProjects: null,
};
export default PorjectsState;
