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
};

export default UiState;
