import { RootState } from "../store";

export const selectUi = (state: RootState) => state.Ui;
export const selectEditPMPopup = (state: RootState) =>
  state.Ui.editProjectManagerPopup;
export const selectDeletePMPopup = (state: RootState) =>
  state.Ui.deleteProjectManagerPopup;
export const selectSideMenuToggle = (state: RootState) =>
  state.Ui.isSideMenuOpened;
export const selectViewTask = (state: RootState) => state.Ui.viewTaskPopup;

export const createProjectPopup = (state: RootState) =>
  state.Ui.createProjectPopup;
export const selectNewProjectHook = (state: RootState) =>
  state.Ui.newProjectHook;

export const selectAppLoading = (state: RootState) => state.Ui.appLoading;
