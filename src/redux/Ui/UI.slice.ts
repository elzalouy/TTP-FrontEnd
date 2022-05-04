import { createSlice, Slice } from "@reduxjs/toolkit";
import { start } from "repl";
import UiState, { UiInterface } from "./UI.state";

const UISlice: Slice<UiInterface> = createSlice({
  name: "ui",
  initialState: UiState,
  reducers: {
    openDeleteTaskPopup: (state, action) => {
      state.deleteTaskPopup = action.payload;
    },
    openDeleteProjectPopup: (state, action) => {
      state.deleteProjectPopup = action.payload;
    },
    openEditProjectPopup: (state, action) => {
      state.editProjectPopup = action.payload;
    },
    openEditClientPopup: (state, action) => {
      state.editClientPopup = action.payload;
    },
    openDeleteClientPopup: (state, action) => {
      state.deleteClientPopup = action.payload;
    },
    openCreateTaskPopup: (state, action) => {
      state.createTaskPopup = action.payload;
    },
    toggleEditProjectManagerPopup: (state, action) => {
      state.editProjectManagerPopup = action.payload;
    },
    toggleDeleteProjectManagerPopup: (state, action) => {
      state.deleteProjectManagerPopup = action.payload;
    },
    toggleSideMenu: (state, action) => {
      state.isSideMenuOpened = action.payload;
    },
    toggleLogOutPopup: (state, action) => {
      state.logoutPopup = action.payload;
    },
    toggleEditTaskPopup: (state, action) => {
      state.editTaskPopup = action.payload;
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
} = UISlice.actions;
