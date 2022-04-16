import { createSlice, Slice } from "@reduxjs/toolkit";
import { getAllDepartments, createDepartment } from "./departments.actions";
import initialState, { DepartmentsIterface } from "./departments.state";

const DepartmentsSlice: Slice<DepartmentsIterface> = createSlice({
  name: "departments",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDepartments.rejected, (state) => {
      state.loading = false;
      state.departments = [];
    });
    builder.addCase(getAllDepartments.pending, (state) => {
      state.loading = true;
      state.departments = [];
    });
    builder.addCase(getAllDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.departments = action.payload;
    });
    builder.addCase(createDepartment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.departments = [...state.departments, action.payload];
    });
  },
});
export const departmentsActions = DepartmentsSlice.actions;
export default DepartmentsSlice.reducer;
