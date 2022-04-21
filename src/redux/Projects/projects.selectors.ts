import { RootState } from "../store";
export const selectLoading = (state: RootState) => state?.projects?.loading;
//projects
export const selectNewProject = (state: RootState) =>
  state?.projects?.newProject;
export const selectInprogressProjects = (state: RootState) =>
  state?.projects?.projects
    ?.filter((item) => item.projectStatus === "inProgress")
    .sort((a, b) =>
      state.projects.sorting === "asc"
        ? new Date(a.projectDeadline) < new Date(b.projectDeadline)
          ? -1
          : 1
        : new Date(a.projectDeadline) < new Date(b.projectDeadline)
        ? 1
        : -1
    );
export const selectSortingValue = (state: RootState) => state.projects.sorting;
export const selectDoneProjects = (state: RootState) =>
  state?.projects?.projects?.filter(
    (item) =>
      item.projectStatus === "delivered on time" ||
      item.projectStatus === "delivered before deadline" ||
      item.projectStatus === "delivered after deadline" ||
      item.projectStatus === "late"
  );

export const selectLateProjects = (state: RootState) =>
  state?.projects?.projects?.filter((item) => item.projectStatus === "late");

export const selectSelectedDepartment = (state: RootState) =>
  state?.projects?.newProject?.selectedDepartment;
export const selectAllProjects = (state: RootState) => state?.projects;
export const selectSelectedProject = (state: RootState) =>
  state?.projects.selectedProject;
export const selectDeleteProjectId = (state: RootState) =>
  state?.projects.deleteProject;
export const selectEditProject = (state: RootState) =>
  state.projects.editProject;

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
