import { RootState } from "../store";
export const selectLoading = (state: RootState) => state.projects.loading;
export const selectNewProject = (state: RootState) => state.projects.newProject;
export const selectInprogressProjects = (state: RootState) =>
  state.projects.projects.filter((item) => item.projectStatus === "inProgress");

export const selectDoneProjects = (state: RootState) =>
  state.projects.projects.filter(
    (item) =>
      item.projectStatus === "delivered on time" ||
      item.projectStatus === "delivered before deadline" ||
      item.projectStatus === "delivered after deadline"
  );

export const selectLateProjects = (state: RootState) =>
  state.projects.projects.filter((item) => item.projectStatus === "late");
export const selectSelectedDepartment = (state: RootState) =>
  state.projects.newProject.selectedDepartment;
