import { PayloadAction, createSlice, Slice } from "@reduxjs/toolkit";
import { start } from "repl";
import UiState, { UiInterface } from "./UI.state";

const UISlice: Slice<UiInterface> = createSlice({
  name: "ui",
  initialState: UiState,
  reducers: {
    openDeleteTaskPopup: (state = UiState, action: PayloadAction<any>) => {
      state.deleteTaskPopup = action.payload;
    },
    openDeleteProjectPopup: (state = UiState, action: PayloadAction<any>) => {
      state.deleteProjectPopup = action.payload;
    },
    openEditProjectPopup: (state = UiState, action: PayloadAction<any>) => {
      state.editProjectPopup = action.payload;
    },
    openEditClientPopup: (state = UiState, action: PayloadAction<any>) => {
      state.editClientPopup = action.payload;
    },
    openDeleteClientPopup: (state = UiState, action: PayloadAction<any>) => {
      state.deleteClientPopup = action.payload;
    },
    openCreateTaskPopup: (state = UiState, action: PayloadAction<any>) => {
      state.createTaskPopup = action.payload;
    },
    toggleEditProjectManagerPopup: (
      state = UiState,
      action: PayloadAction<any>
    ) => {
      state.editProjectManagerPopup = action.payload;
    },
    toggleDeleteProjectManagerPopup: (
      state = UiState,
      action: PayloadAction<any>
    ) => {
      state.deleteProjectManagerPopup = action.payload;
    },
    toggleSideMenu: (state = UiState, action: PayloadAction<any>) => {
      state.isSideMenuOpened = action.payload;
    },
    toggleLogOutPopup: (state = UiState, action: PayloadAction<any>) => {
      state.logoutPopup = action.payload;
    },
    toggleEditTaskPopup: (state = UiState, action: PayloadAction<any>) => {
      state.editTaskPopup = action.payload;
    },
    // hooks
    fireNewProjectHook: (state = UiState, action: PayloadAction<any>) => {
      state.newProjectHook = state.newProjectHook === true ? false : true;
    },
    fireUpdateProjectHook: (state = UiState, action: PayloadAction<any>) => {
      state.updateProjectHook = state.updateProjectHook === true ? false : true;
    },
    fireDeleteTaskHook: (state = UiState, action: PayloadAction<any>) => {
      state.deleteTasksHook = state.deleteTasksHook === true ? false : true;
    },
    fireDeleteProjectHook: (state = UiState) => {
      state.deleteProjectHook = state.deleteProjectHook === true ? false : true;
    },
    fireNewTeamHook: (state = UiState) => {
      state.createTeamHook = state.createTeamHook === true ? false : true;
    },
    fireUpdateDepartmentHook: (state = UiState) => {
      state.updateDepartmentHook =
        state.updateDepartmentHook === true ? false : true;
    },
    fireCreateDepartmentHook: (state = UiState) => {
      state.createDepartmentHook =
        state.createDepartmentHook === true ? false : true;
    },
    fireEditTaskHook: (state = UiState) => {
      state.editTaskHook = state.editTaskHook === true ? false : true;
    },
    fireCreatePMHook: (state = UiState) => {
      state.createPMHook = state.createPMHook === true ? false : true;
    },
    fireEditPMHook: (state = UiState) => {
      state.editPMHook === true ? false : true;
    },
  },
});
export default UISlice.reducer;
export const {
  openDeleteProjectPopup,
  openDeleteTaskPopup,
  openEditProjectPopup,
  openEditClientPopup,
  openDeleteClientPopup,
  openCreateTaskPopup,
  toggleEditProjectManagerPopup,
  toggleDeleteProjectManagerPopup,
  toggleSideMenu,
  toggleLogOutPopup,
  toggleEditTaskPopup,
  fireNewProjectHook,
  fireUpdateProjectHook,
  fireDeleteTaskHook,
  fireDeleteProjectHook,
  fireNewTeamHook,
  fireUpdateDepartmentHook,
  fireCreateDepartmentHook,
  fireEditTaskHook,
  fireCreatePMHook,
  fireEditPMHook,
} = UISlice.actions;
export const UiActions = UISlice.actions;
