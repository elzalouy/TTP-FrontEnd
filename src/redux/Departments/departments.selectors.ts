import { RootState } from "../store";

export const selectAllDepartments = (state: RootState) =>
  state?.departments?.departments;

export const selectedDepart = (state: RootState) =>
  state?.departments?.selectedDepart;


export const selectDepartmentLoading = (state:RootState) => state?.departments?.loading;