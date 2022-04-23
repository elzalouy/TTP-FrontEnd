export interface UiInterface {
  deleteProjectPopup: string;
  deleteTaskPopup: string;
  editProjectPopup: string;
  editTaskPopup: string;
  editProjectManagerPopup:string;
  deleteProjectManagerPopup:string;
}
const UiState: UiInterface = {
  deleteProjectPopup: "none",
  deleteTaskPopup: "none",
  editProjectPopup: "none",
  editTaskPopup: "none",
  editProjectManagerPopup:"none",
  deleteProjectManagerPopup:"none",
};

export default UiState;
