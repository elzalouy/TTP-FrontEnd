import { RootState } from "../store";
export const selectLoading = (state: RootState) => state?.projects?.loading;
//projects
export const selectNewProject = (state: RootState) =>
  state?.projects?.newProject;


export const selectInprogressProjects = (state: RootState) =>
  state?.projects?.filteredProjects
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

export const selectDoneProjects = (state: RootState) =>
  state?.projects?.filteredProjects?.filter(
    (item) =>
      item.projectStatus === "deliver on time" ||
      item.projectStatus === "deliver before deadline" ||
      item.projectStatus === "delivered after deadline" ||
      item.projectStatus === "late"
  );
export const selectNotStartedProjects = (state: RootState) =>
  state?.projects?.filteredProjects?.filter(
    (item) => item.projectStatus === "Not Started"
  );

export const selectLateProjects = (state: RootState) =>
  state?.projects?.filteredProjects?.filter(
    (item) => item.projectStatus === "late"
  );

export const selectSelectedDepartment = (state: RootState) =>
  state?.projects?.newProject?.selectedDepartment;
export const selectAllProjects = (state: RootState) => state?.projects;
export const selectSelectedProject = (state: RootState) =>
  state?.projects.selectedProject;
export const selectDeleteProjectId = (state: RootState) =>
  state?.projects.deleteProject;
export const selectEditProject = (state: RootState) =>
  state.projects.editProject;
export const selectSortingValue = (state: RootState) => state.projects.sorting;

// tasks
export const selectInProgressTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "inProgress"
  );
export const selectDoneTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "Done"
  );
export const selectReviewTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "Review"
  );
export const selectNotClearTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "Not Clear"
  );
export const selectNotStartedTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "Not Started"
  );
export const selectCancledTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "Cancled"
  );
export const selectSharedTasks = (state: RootState) =>
  state.projects.selectedProject.tasks?.filter(
    (item) => item.status === "Shared"
  );
export const selectTasks = (state: RootState) => state.projects.allTasks;
export const selectEditTaskValues = (state: RootState) =>
  state.projects.editTask;
export const selectedDeleteTaskId = (state: RootState) =>
  state.projects.deleteTask;
