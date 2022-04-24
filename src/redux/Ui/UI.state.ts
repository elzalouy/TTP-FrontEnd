export interface UiInterface {
  deleteProjectPopup: string;
  deleteTaskPopup: string;
  editProjectPopup: string;
  editTaskPopup: string;
  editClientPopup: string;
  deleteClientPopup: string;
  createTaskPopup: string;
}
const UiState: UiInterface = {
  deleteProjectPopup: "none",
  deleteTaskPopup: "none",
  editProjectPopup: "none",
  editTaskPopup: "none",
  editClientPopup: "none",
  deleteClientPopup: "none",
  createTaskPopup: "none",
};

export default UiState;
