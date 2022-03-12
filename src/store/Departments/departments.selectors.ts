import { RootState } from "../store";

export const selectAllDepartments = (state: RootState) =>
  state.departments.departments;
