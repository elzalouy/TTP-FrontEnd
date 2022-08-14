import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  IDepartmentsSlice,
  IDepartmentState,
} from "../../interfaces/models/Departments";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "./departments.actions";
import initialState from "./departments.state";

const DepartmentsSlice: Slice<IDepartmentsSlice> = createSlice({
  name: "departments",
  initialState: initialState,
  reducers: {
    changeState: (state = initialState, action: PayloadAction<any>) => {
      state.delete = action.payload?.delete
        ? action.payload?.delete
        : undefined;
      state.edit = action.payload?.edit ? action.payload?.edit : undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDepartments.rejected, (state) => {
      state.loading = false;
      // state.departments = [];
    });
    builder.addCase(getAllDepartments.pending, (state) => {
      // state.loading = true;
      // state.departments = [];
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
      let dep = state.departments.findIndex(
        (item) => item._id === action.payload?._id
      );
      state.departments[dep] = action.payload;
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
      oldData = oldData.filter((dep: IDepartmentState) => dep?._id !== payload);
      console.log({ afterDelete: oldData, payload });
      state.departments = oldData;
    });
  },
});
export const { changeState } = DepartmentsSlice.actions;
export const departmentsActions = DepartmentsSlice.actions;
export default DepartmentsSlice.reducer;
