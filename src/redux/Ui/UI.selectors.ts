import { RootState } from "../store";

export const selectUi = (state: RootState) => state.Ui;
export const selectEditPMPopup = (state: RootState) => state.Ui.editProjectManagerPopup;
export const selectDeletePMPopup = (state: RootState) => state.Ui.deleteProjectManagerPopup;
