import { RootState } from "../store";

export const selectNewProject = (state: RootState) => state.projects.newProject;
export const selectInprogressProjects = (state: RootState) => {
  let inProgress = state.projects.projects.filter(
    (item) => item.projectStatus === "inProgress"
  );
  return inProgress;
};
export const selectDoneProjects = (state: RootState) => {
  let delivered = state.projects.projects.filter(
    (item) =>
      item.projectStatus === "deliver on time" ||
      "deliver before deadline" ||
      "delivered after deadline"
  );
  return delivered;
};
