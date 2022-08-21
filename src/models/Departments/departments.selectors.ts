import { RootState } from "../store";

export const selectAllDepartments = (state: RootState) =>
  state?.departments?.departments;

export const selectEditDepartment = (state: RootState) =>
  state?.departments.edit;
export const selectDeleteDepartment = (state: RootState) =>
  state?.departments.delete;
export const selectDepartmentLoading = (state: RootState) =>
  state?.departments?.loading;
