import { ProjectsInterface } from "../../interfaces/models/Projects";

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
  editProject: undefined,
  editTask: "",
  editTaskLoading: undefined,
  sorting: null,
  filteredProjects: null,
  openTaskDetails: {
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
};
export default PorjectsState;
