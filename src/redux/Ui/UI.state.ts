export interface UiInterface {
  deleteProjectPopup: string;
  deleteTaskPopup: string;
  editProjectPopup: string;
  editTaskPopup: string;
}
const UiState: UiInterface = {
  deleteProjectPopup: "none",
  deleteTaskPopup: "none",
  editProjectPopup: "none",
  editTaskPopup: "none",
};

export default UiState;
