import { RootState } from "../store";
export const selectLoading = (state: RootState) => state?.projects?.loading;
//projects
export const selectNewProject = (state: RootState) =>
  state?.projects?.newProject;
export const selectInprogressProjects = (state: RootState) =>
  state?.projects?.projects?.filter(
    (item) => item.projectStatus === "inProgress"
  );

export const selectDoneProjects = (state: RootState) =>
  state?.projects?.projects?.filter(
    (item) =>
      item.projectStatus === "delivered on time" ||
      item.projectStatus === "delivered before deadline" ||
      item.projectStatus === "delivered after deadline"
  );

export const selectLateProjects = (state: RootState) =>
  state?.projects?.projects?.filter((item) => item.projectStatus === "late");
export const selectSelectedDepartment = (state: RootState) =>
  state?.projects?.newProject?.selectedDepartment;
export const selectAllProjects = (state: RootState) => state?.projects;
export const selectSelectedProject = (state: RootState) =>
  state?.projects.selectedProject;

// tasks
export const selectInProgressTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "inProgress"
  );
export const selectDoneTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "delivered on time"
  );
export const selectReviewTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "review"
  );
export const selectNotClearTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "not clear"
  );
export const selectCancledTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "cancled"
  );
export const selectSharedTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "shared"
  );
export const selectTasks = (state: RootState) => state.projects.allTasks;
