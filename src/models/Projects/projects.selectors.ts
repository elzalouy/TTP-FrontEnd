import { checkValueAndShowOptions } from "src/helpers/generalUtils";
import { RootState } from "../store";
export const selectLoading = (state: RootState) => state?.projects?.loading;

//projects
export const selectNewProject = (state: RootState) =>
  state?.projects?.newProject;

export const selectInprogressProjects = (state: RootState) =>
  state?.projects?.filteredProjects
    ?.filter((item) => item.projectStatus === "In Progress")
    .sort((a, b) =>
      state.projects.sorting === "asc"
        ? new Date(a.projectDeadline) < new Date(b.projectDeadline)
          ? -1
          : 1
        : new Date(a.projectDeadline) < new Date(b.projectDeadline)
        ? 1
        : -1
    );

export const selectProjectStatusOptions = (state: RootState) => {
  if (state.projects.editProject?.projectStatus) {
    let data = checkValueAndShowOptions(
      state.projects.editProject?.projectStatus
    );
    let options = data.map((item) => {
      return {
        id: item.value,
        value: item.value,
        text: item.text,
      };
    });

    return options;
  } else return [];
};

export const selectProjectOptions = (state: RootState) => {
  if (state.projects.projects) {
    let options = state.projects.projects.map((item) => {
      return {
        id: item._id,
        value: item._id,
        text: item.name,
      };
    });
    return options;
  } else return [];
};

export const selectDoneProjects = (state: RootState) =>
  state?.projects?.filteredProjects
    ?.filter(
      (item) =>
        item.projectStatus === "delivered on time" ||
        item.projectStatus === "delivered before deadline" ||
        item.projectStatus === "delivered after deadline" ||
        item.projectStatus === "late"
    )
    .sort((a, b) =>
      state.projects.sorting === "asc"
        ? new Date(a.projectDeadline) < new Date(b.projectDeadline)
          ? -1
          : 1
        : new Date(a.projectDeadline) < new Date(b.projectDeadline)
        ? 1
        : -1
    );

export const selectNotStartedProjects = (state: RootState) =>
  state?.projects?.filteredProjects
    ?.filter((item) => item.projectStatus === "Not Started")
    .sort((a, b) =>
      state.projects.sorting === "asc"
        ? new Date(a.projectDeadline) < new Date(b.projectDeadline)
          ? -1
          : 1
        : new Date(a.projectDeadline) < new Date(b.projectDeadline)
        ? 1
        : -1
    );

export const selectLateProjects = (state: RootState) =>
  state?.projects?.filteredProjects?.filter(
    (item) => item.projectStatus === "late"
  );

export const selectSelectedDepartment = (state: RootState) =>
  state?.projects?.newProject?.selectedDepartment;
export const selectAllProjects = (state: RootState) => state?.projects;
export const selectEditTask = (state: RootState) =>
  state.projects.allTasks.find((item) => item._id === state.projects.editTask);
export const selectActiveProjects = (state: RootState) =>
  state.projects.projects
    .filter(
      (item) =>
        item.projectStatus &&
        ![
          "Done",
          "late",
          "deliver on time",
          "deliver before deadline",
        ].includes(item?.projectStatus)
    )
    .map((item) => {
      return { id: item._id, label: item.name };
    });
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
    (item) => item.status === "In Progress"
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
    (item) => item.status === "Tasks Board"
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
export const editTaskLoading = (state: RootState) =>
  state.projects.editTaskLoading;
export const selectTaskDetails = (state: RootState) =>
  state.projects.openTaskDetails;
export const selectUploadLoading = (state: RootState) =>
  state.projects.uploadLoading;
