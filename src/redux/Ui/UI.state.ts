export interface UiInterface {
  deleteProjectPopup: string;
  deleteTaskPopup: string;
  editProjectPopup: string;
  editTaskPopup: string;
  editClientPopup: string;
  deleteClientPopup: string;
  createTaskPopup: string;
  editProjectManagerPopup: string;
  deleteProjectManagerPopup: string;
  isSideMenuOpened: boolean;
  logoutPopup: string;
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
}
const UiState: UiInterface = {
  deleteProjectPopup: "none",
  deleteTaskPopup: "none",
  editProjectPopup: "none",
  editTaskPopup: "none",
  editClientPopup: "none",
  deleteClientPopup: "none",
  createTaskPopup: "none",
  editProjectManagerPopup: "none",
  deleteProjectManagerPopup: "none",
  logoutPopup: "none",
  isSideMenuOpened: true,
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
  updateDepartmentHook: undefined,
  createDepartmentHook: undefined,
  editTaskHook: undefined,
};

export default UiState;
