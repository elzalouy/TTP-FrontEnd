export interface Task {
  id?: string;
  name: string;
  projectId: string;
  categoryId: string;
  subCategoryId: string;
  teamId: string;
  countNotClear?: any;
  countShared?: any;
  status?: string;
  start?: any;
  deadline?: any;
  deliveryDate?: any;
  done?: any;
  turnoverTime?: any;
  attachedFiles?: string;
  attachedCard?: string;
  listId?: string;
  cardId?: string;
  boardId?: string;
  file?: any;
  description: string;
}
export interface Project {
  id?: string;
  name: string;
  projectManager: string;
  teamsId?: any[];
  numberOfTasks?: any;
  numberOfFinshedTasks?: any;
  projectDeadline: any;
  startDate?: Date | any;
  completedDate?: any;
  projectStatus?: string;
  clientId: string;
}
export interface ProjectsInterface {
  loading: boolean;
  projects: Project[];
  newProject: {
    showPopUp: string;
    project: Project;
    tasks: Task[];
    newTask: Task;
  };
}

const PorjectsState: ProjectsInterface = {
  loading: true,
  projects: [],
  newProject: {
    showPopUp: "none",
    project: {
      id: "",
      name: "",
      projectManager: "",
      teamsId: [],
      numberOfTasks: 0,
      numberOfFinshedTasks: 0,
      projectDeadline: new Date(),
      startDate: new Date(),
      completedDate: new Date(),
      projectStatus: "inProgress",
      clientId: "",
    },
    tasks: [],
    newTask: {
      id: "",
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
      attachedFiles: "",
      attachedCard: "",
      listId: "",
      cardId: "",
      boardId: "",
      file: undefined,
      description: "",
    },
  },
};
export default PorjectsState;
