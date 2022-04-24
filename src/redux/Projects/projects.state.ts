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
  numberOfFinshedTasks?: any;
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
  };
  selectedProject: {
    loading: boolean | null;
    tasks: Task[];
    project: Project | null;
  };
  allTasks: Task[];
  deleteProject: string | undefined;
  deleteProjectTasks: string[] | undefined;
  editProject: Project | undefined;
  sorting: string | null;
}

const PorjectsState: ProjectsInterface = {
  loading: true,
  projects: [],
  allTasks: [],
  newProject: {
    showPopUp: "none",
    project: {
      _id: "",
      name: "",
      projectManager: null,
      projectManagerName: null,
      teamsId: [],
      numberOfTasks: 0,
      numberOfFinshedTasks: 0,
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
  editProject: undefined,
  sorting: null,
};
export default PorjectsState;
