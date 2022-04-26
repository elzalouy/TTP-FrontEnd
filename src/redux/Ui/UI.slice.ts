import { createSlice, Slice } from "@reduxjs/toolkit";
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
} = UISlice.actions;
