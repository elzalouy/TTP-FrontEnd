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
  },
});
export default UISlice.reducer;
export const {
  openDeleteProjectPopup,
  openDeleteTaskPopup,
  openEditProjectPopup,
} = UISlice.actions;
