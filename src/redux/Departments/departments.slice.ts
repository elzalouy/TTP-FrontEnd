import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
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
    selecteDepartment: (
      state = initialState,
      { payload }: PayloadAction<any>
    ) => {
      state.selectedDepart = payload;
    },
    updateDepartmentTeams: (
      state = initialState,
      { payload }: PayloadAction<any>
    ) => {
      if (state.selectedDepart !== null) {
        state.selectedDepart = {
          ...state.selectedDepart,
          teamsId: state.selectedDepart.teamsId.map((team) =>
            team._id === payload ? { ...team, isDeleted: true } : team
          ),
        };
      }
    },
    /**
     * replace Department
     * In case of there are a response came from backend socket service ,
     * it will recieve the new data and either add a new department or replace the existed one
     * @param data
     */
    replaceDepartment: (
      state = initialState,
      { payload }: PayloadAction<any>
    ) => {
      if (payload._id) {
        let dep = state.departments.findIndex(
          (item) => item._id === payload._id
        );
        if (dep >= 0) state.departments[dep] = payload;
        else state.departments.push(payload);
      }
    },
    deleteDepartment: (
      state = initialState,
      { payload }: PayloadAction<any>
    ) => {
      if (payload.id) {
        state.departments = state.departments.filter(
          (item) => item._id !== payload.id
        );
      }
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
      // state.loading = true;
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
