import { ProjectsInterface } from "../../types/models/Projects";

const ProjectsState: ProjectsInterface = {
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
      projectStatus: "In Progress",
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
    loading: false,
    tasks: [],
    project: null,
  },
  deleteProject: undefined,
  deleteProjectTasks: undefined,
  deleteTask: undefined,
  deleteTaskLoading: false,
  editProject: undefined,
  editTask: "",
  editTaskLoading: undefined,
  uploadLoading: { id: undefined, loading: undefined },
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
  setTasksStatisticsHook: undefined,
  setProjectsStatisticsHook: undefined,
};
export default ProjectsState;
