import { createSlice, Slice } from "@reduxjs/toolkit";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "./departments.actions";
import initialState, { DepartmentsIterface } from "./departments.state";

const DepartmentsSlice: Slice<DepartmentsIterface> = createSlice({
  name: "departments",
  initialState: initialState,
  reducers: {
    selecteDepartment: (state, { payload }) => {
      state.selectedDepart = payload;
    },
  },
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
    builder.addCase(updateDepartment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.departments = [...state.departments, action.payload];
    });
    builder.addCase(deleteDepartment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteDepartment.fulfilled, (state, { payload }) => {
      state.loading = false;
      let oldData = state.departments;
      oldData = oldData.filter((dep: any) => dep._id !== payload);
      state.departments = oldData;
    });
  },
});
export const departmentsActions = DepartmentsSlice.actions;
export default DepartmentsSlice.reducer;
