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
    toggleViewTaskPopup: (state = UiState, action: PayloadAction<any>) => {
      state.viewTaskPopup = action.payload;
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
    toggleCreateProjectPopup: (state = UiState, action: PayloadAction<any>) => {
      state.createProjectPopup = action.payload;
    },
    // hooks
    fireNewProjectHook: (state = UiState, action: PayloadAction<any>) => {
      state.newProjectHook = !state.newProjectHook
    },
    fireUpdateProjectHook: (state = UiState, action: PayloadAction<any>) => {
      state.updateProjectHook = !state.updateProjectHook
    },
    fireDeleteTaskHook: (state = UiState, action: PayloadAction<any>) => {
      state.deleteTasksHook = !state.deleteTasksHook
    },
    fireDeleteProjectHook: (state = UiState) => {
      state.deleteProjectHook = !state.deleteProjectHook
    },
    fireNewTeamHook: (state = UiState) => {
      state.createTeamHook = !state.createTeamHook
    },
    fireUpdateDepartmentHook: (state = UiState) => {
      state.updateDepartmentHook =
        !state.updateDepartmentHook
    },
    fireCreateProjectHook: (state = UiState) => {
      state.createProjectHook =
        !state.createProjectHook
    },
    fireCreateDepartmentHook: (state = UiState) => {
      state.createDepartmentHook =
        !state.createDepartmentHook
    },
    fireCreateCategoryHook: (state = UiState) => {
      state.createCategoryHook =
        !state.createCategoryHook
    },
    fireEditTaskHook: (state = UiState) => {
      state.editTaskHook = !state.editTaskHook
    },
    fireCreatePMHook: (state = UiState) => {
      state.createPMHook = !state.createPMHook
    },
    fireEditPMHook: (state = UiState) => {
      state.editPMHook = !state.createPMHook
    },
    fireMoveTaskHook: (state = UiState) => {
      state.moveTaskHook = !state.moveTaskHook
    },
    fireDeleteDepartmentHook: (state = UiState) => {
      state.deleteDepartmentHook =
        !state.deleteDepartmentHook
    },
    fireMoveTaskOnTrello: (state = UiState, action: PayloadAction<any>) => {
      state.moveTaskOnTrelloHook = action.payload;
    },
    fireDeleteCategoryHook: (state = UiState) => {
      state.deleteCategoryHook = !state.deleteCategoryHook
    },
    fireDeleteTeamHook: (state = UiState) => {
      state.deleteTeamHook = !state.deleteTeamHook;
    }
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
  toggleCreateProjectPopup,
  toggleViewTaskPopup,
  fireNewProjectHook,
  fireUpdateProjectHook,
  fireDeleteTaskHook,
  fireDeleteProjectHook,
  fireNewTeamHook,
  fireUpdateDepartmentHook,
  fireCreateDepartmentHook,
  fireCreateCategoryHook,
  fireEditTaskHook,
  fireCreatePMHook,
  fireEditPMHook,
  fireMoveTaskHook,
  fireDeleteDepartmentHook,
  fireDeleteCategoryHook,
  fireCreateProjectHook,
  fireDeleteTeamHook,
  fireMoveTaskOnTrello,
} = UISlice.actions;
export const UiActions = UISlice.actions;
