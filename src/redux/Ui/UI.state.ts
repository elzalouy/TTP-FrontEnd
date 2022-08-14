export interface UiInterface {
  deleteProjectPopup: string;
  deleteTaskPopup: string;
  editProjectPopup: string;
  editTaskPopup: string;
  editClientPopup: string;
  deleteClientPopup: string;
  createTaskPopup: string;
  viewTaskPopup: string;
  editProjectManagerPopup: string;
  deleteProjectManagerPopup: string;
  openTask: string;
  logoutPopup: string;
  createProjectPopup: string;
  editDepartmentPopup: string;
  deleteDepartmentPopup: string;
  moveTaskOnTrelloHook: any;
  isSideMenuOpened: boolean;
  /*
    this hooks shouldn't be used except for updating
    the state of the project while a certain exndpoint or function called 
    and the state must be changed after.
  */
  newProjectHook: boolean | undefined;
  updateProjectHook: boolean | undefined;
  deleteTasksHook: boolean | undefined;
  deleteProjectHook: boolean | undefined;
  createTeamHook: boolean | undefined;
  updateDepartmentHook: boolean | undefined;
  createDepartmentHook: boolean | undefined;
  editTaskHook: boolean | undefined;
  createPMHook: boolean | undefined;
  editPMHook: boolean | undefined;
  moveTaskHook: boolean | undefined;
  createProjectHook: boolean | undefined;
  createCategoryHook: boolean | undefined;
  deleteDepartmentHook: boolean | undefined;
  deleteCategoryHook: boolean | undefined;
  deleteTeamHook: boolean | undefined;
}
const UiState: UiInterface = {
  deleteProjectPopup: "none",
  deleteTaskPopup: "none",
  editProjectPopup: "none",
  editDepartmentPopup: "none",
  deleteDepartmentPopup: "none",
  editTaskPopup: "none",
  editClientPopup: "none",
  deleteClientPopup: "none",
  viewTaskPopup: "none",
  createTaskPopup: "none",
  editProjectManagerPopup: "none",
  deleteProjectManagerPopup: "none",
  logoutPopup: "none",
  isSideMenuOpened: true,
  createProjectPopup: "none",
  moveTaskOnTrelloHook: undefined,
  openTask: "none",
  /*
  this hooks shouldn't be used except for updating
  the state of the project while a certain exndpoint or function called 
  and the state must be changed after.
  */
  newProjectHook: undefined,
  updateProjectHook: undefined,
  deleteTasksHook: undefined,
  deleteProjectHook: undefined,
  createTeamHook: undefined,
  createCategoryHook: undefined,
  createProjectHook: undefined,
  editTaskHook: undefined,
  createPMHook: undefined,
  editPMHook: undefined,
  moveTaskHook: undefined,
  updateDepartmentHook: undefined,
  deleteDepartmentHook: undefined,
  createDepartmentHook: undefined,
  deleteCategoryHook: undefined,
  deleteTeamHook: undefined,
};

export default UiState;
