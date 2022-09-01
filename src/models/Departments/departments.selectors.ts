import { RootState } from "../store";

export const selectAllDepartments = (state: RootState) =>
  state?.departments?.departments;

  export const selectDepartmentOptions = (state: RootState) => {
    if (state.departments.departments) {
      let options = state.departments.departments.map((item) => {
        return {
          id: item._id,
          value: item._id,
          text: item.name,
        };
      });
      return options;
    } else return [];
  }

export const selectEditDepartment = (state: RootState) =>
  state?.departments.edit;
export const selectDeleteDepartment = (state: RootState) =>
  state?.departments.delete;
export const selectDepartmentLoading = (state: RootState) =>
  state?.departments?.loading;
