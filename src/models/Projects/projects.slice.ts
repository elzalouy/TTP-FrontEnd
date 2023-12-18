import { RootState } from "../store";
import {
  createProject,
  createProjectTask,
  createTaskFromBoard,
  deleteProject,
  deleteProjectTasks,
  deleteTask,
  deleteTasks,
  editProject,
  editTaskFromBoard,
  filterProjects,
  filterTasks,
  getAllProjects,
  getAllTasks,
  getProject,
  getTasks,
  moveTask,
  editTasksProjectId,
} from "./projects.actions";
import projectsState from "./projects.state";
import _ from "lodash";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Project, ProjectsInterface, Task } from "../../types/models/Projects";
const projectsSlice: Slice<ProjectsInterface> = createSlice({
  name: "projects",
  initialState: projectsState,
  reducers: {
    onChangeNewProject: (state = projectsState, action: PayloadAction<any>) => {
      state.newProject = action.payload;
    },
    onChangeNewProjectP: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      state.newProject.project = action.payload;
    },
    onChangeNewProjectTask: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      state.newProject.newTask = action.payload;
      state.newProject.tasks.push(action.payload);
    },

    onUpdateNewProject: (state = projectsState, action: PayloadAction<any>) => {
      state.newProject.project = action.payload;
    },

    onChangeSelectedDepartment: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      state.newProject.selectedDepartment = action.payload;
    },

    onDeleteNewProjectTask: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      let tasks = [...state.newProject.tasks];
      tasks = tasks.filter(
        (item) => item._id !== action.payload._id
        /*     item.name !== action.payload.name &&
            item.description !== action.payload.description */
      );
      state.newProject.tasks = tasks;
    },

    onSetDeleteProjectId: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      state.deleteProject = action.payload;
    },

    onSetEditProjectId: (state = projectsState, action: PayloadAction<any>) => {
      state.editProject = state.projects.find(
        (item) => item._id === action.payload
      );
    },

    onSortProjects: (state = projectsState, action: PayloadAction<any>) => {
      state.sorting = action.payload;
      let projects = state.filteredProjects
        ? [...state?.filteredProjects]
        : [...state.projects];
      _.sortBy(projects, ["projectDeadline"], [action.payload]);
      state.projects = projects;
    },

    onSortTasks: (state = projectsState, action: PayloadAction<any>) => {
      state.sorting = action.payload;
      let tasks = [...state.filteredTasks];
      if (action.payload === "") {
        tasks = tasks;
      }
      if (action.payload === "asc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) < new Date(b.deadline) ? -1 : 1
        );
      if (action.payload === "desc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) > new Date(b.deadline) ? -1 : 1
        );
      state.allTasks = tasks;
      state.filteredTasks = tasks; //The sorted data must be change
    },

    onEditTask: (state = projectsState, action: PayloadAction<any>) => {
      state.editTask = action.payload;
    },

    onDeleteTask: (state = projectsState, action: PayloadAction<any>) => {
      state.deleteTask = action.payload;
    },

    fireNewProjectHook: (state = projectsState) => {
      state.newProject.newProjectHook =
        state.newProject.newProjectHook === true ? false : true;
    },

    updateProjectByIO: (
      state: ProjectsInterface,
      action: PayloadAction<Project>
    ) => {
      let data = action.payload;
      if (state.projects && state.filteredProjects) {
        let index = state.projects.findIndex((item) => item._id === data._id);
        let filteredIndex = state.filteredProjects.findIndex(
          (item) => item._id === data._id
        );
        let project: Project = {
          ...state.projects[index],
          ...action.payload,
        };
        state.projects[index] = project;
        state.filteredProjects[filteredIndex] = project;
      }
    },
    deleteProjectByIO: (
      state: ProjectsInterface,
      action: PayloadAction<Project>
    ) => {
      state.projects = [
        ...state.projects.filter((item) => item._id !== action.payload._id),
      ];
      if (state.filteredProjects)
        state.filteredProjects = [
          ...state.filteredProjects?.filter(
            (item) => item._id !== action.payload._id
          ),
        ];
    },

    updateTaskData: (state = projectsState, action: PayloadAction<any>) => {
      if (action.payload?.attachedFiles?.length > 0) {
        state.uploadLoading.loading = false;
      }
      if (action.payload?._id) {
        let allTasks = [...state.allTasks];
        let projectTasks = [...state.selectedProject.tasks];
        let filteredTasks = [...state.filteredTasks];

        // update all tasks
        let taskIndexInTasks = allTasks.findIndex(
          (item) => item._id === action.payload._id
        );
        let taskIndexInSelectedPro = projectTasks.findIndex(
          (item) => item._id === action.payload._id
        );
        let filteredTasksIndex = filteredTasks.findIndex(
          (item) => item._id === action.payload._id
        );

        if (taskIndexInTasks >= 0) allTasks[taskIndexInTasks] = action.payload;
        else allTasks.push(action.payload);

        if (action.payload.projectId) {
          if (taskIndexInSelectedPro >= 0)
            projectTasks[taskIndexInSelectedPro] = action.payload;
          else projectTasks.push(action.payload);
        }
        if (filteredTasksIndex >= 0)
          filteredTasks[filteredTasksIndex] = action.payload;
        else filteredTasks.push(action.payload);

        state.allTasks = [...allTasks];
        state.filteredTasks = filteredTasks;
        state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
        if (action.payload.projectId) {
          let projectIndex = state.projects.findIndex(
            (i) => i._id === action.payload.projectId
          );
          if (projectIndex) {
            state.projects[projectIndex].NoOfTasks = state.allTasks.filter(
              (i) => i.projectId === action.payload.projectId
            ).length;
            state.projects[projectIndex].NoOfFinishedTasks =
              state.allTasks.filter(
                (i) =>
                  i.projectId === action.payload.projectId &&
                  i.status === "Done"
              ).length;
          }
        }
      }
    },

    onCreateTaskData: (
      state: ProjectsInterface,
      action: PayloadAction<any>
    ) => {
      state.allTasks.push(action.payload);
      state.filteredTasks.push(action.payload);
      if (state.selectedProject.project?._id === action.payload.projectId) {
        state.selectedProject.tasks.push(action.payload);
        state.selectedProject.loading = false;
      }
      if (state.newProject.project._id === action.payload.projectId) {
        state.newProject.tasks.push(action.payload);
        state.loading = false;
      }
      state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
    },

    deleteTask: (state = projectsState, action: PayloadAction<any>) => {
      if (action.payload._id) {
        let allTasks = [...state.allTasks],
          filteredTasks = [...state.filteredTasks];
        let selectProjectTasks = [...state.selectedProject.tasks];
        state.allTasks = allTasks.filter(
          (item) => item._id !== action.payload._id
        );
        state.filteredTasks = filteredTasks.filter(
          (item) => item._id !== action.payload._id
        );

        state.selectedProject.tasks = selectProjectTasks.filter(
          (item) => item._id !== action.payload._id
        );
        state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
      }
    },

    onOpenTask: (state = projectsState, action: PayloadAction<any>) => {
      state.openTaskDetails = action.payload;
    },

    onChangeStaticFilters: (
      state: ProjectsInterface,
      action: PayloadAction<{ clientId: string }>
    ) => {
      if (action.payload.clientId.length > 0) {
        let clientProjectsIds = state.projects
          .filter((item) => item.clientId === action.payload.clientId)
          .map((item) => item._id);
        state.filteredTasks = [
          ...state.allTasks.filter((item) =>
            clientProjectsIds.includes(item.projectId)
          ),
        ];
      }
    },

    onRemoveFilters: (state: ProjectsInterface) => {
      state.filteredTasks = [...state.allTasks];
    },

    fireSetStatisticsHook: (state: ProjectsInterface) => {
      state.setProjectsStatisticsHook =
        state.setProjectsStatisticsHook === true ? false : true;
      state.setTasksStatisticsHook =
        state.setTasksStatisticsHook === true ? false : true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createProject.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.loading = false;
      state.newProject.project = action.payload;
      state.newProject.tasks = [];
      state.setProjectsStatisticsHook = !state.setProjectsStatisticsHook;
    });
    builder.addCase(getAllProjects.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.projects = action?.payload;
      state.filteredProjects = action?.payload;
      state.setProjectsStatisticsHook = !state.setProjectsStatisticsHook;
    });
    builder.addCase(createProjectTask.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createProjectTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProjectTask.fulfilled, (state, action) => {
      if (action.payload) {
        state.newProject.tasks.push(action.payload);
        state.loading = false;
        state.setProjectsStatisticsHook = !state.setProjectsStatisticsHook;
      }
    });
    builder.addCase(createTaskFromBoard.rejected, (state) => {});
    builder.addCase(createTaskFromBoard.pending, (state) => {});
    builder.addCase(
      createTaskFromBoard.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.allTasks.push(action.payload.result);
        state.filteredTasks.push(action.payload.result);

        state.selectedProject.tasks.push(action.payload.result);
        if (action.payload?.attachedFiles > 0) {
          state.uploadLoading.id = action.payload.result._id;
          state.uploadLoading.loading = true;
        }
        state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
      }
    );

    builder.addCase(filterProjects.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(filterProjects.pending, (state) => {
      // state.loading = true;
    });

    builder.addCase(filterProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredProjects = action.payload;
    });

    builder.addCase(getTasks.rejected, (state) => {});
    builder.addCase(getTasks.pending, (state) => {});
    builder.addCase(getTasks.fulfilled, (state, action) => {});

    builder.addCase(getProject.rejected, (state) => {});
    builder.addCase(getProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getAllTasks.rejected, (state) => {
      state.loading = false;
      state.allTasks = [];
    });
    builder.addCase(getAllTasks.pending, (state) => {
      state.loading = true;
      state.allTasks = [];
    });
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.allTasks = action.payload;
      state.filteredTasks = action.payload;
      state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
    });
    builder.addCase(filterTasks.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(filterTasks.pending, (state) => {
      // state.loading = true;
    });
    builder.addCase(filterTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredTasks = action.payload;
    });
    builder.addCase(deleteProjectTasks.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteProjectTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteProjectTasks = [];
      state.projects = [
        ...state.projects.filter((item) => item._id === action.payload.id),
      ];
      state.filteredProjects = [
        ...state.projects.filter((item) => item._id === action.payload.id),
      ];
      state.filteredTasks = [
        ...state.filteredTasks.filter((item) => item._id !== action.payload.id),
      ];
      state.allTasks = [
        ...state.allTasks.filter(
          (item) => item.projectId !== action.payload.id
        ),
      ];
    });
    builder.addCase(editTasksProjectId.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(editTasksProjectId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editTasksProjectId.fulfilled, (state, action) => {
      let projectId: string = action.payload.projectId;
      let ids: string[] = action.payload.ids;
      let filteredTasks = [...state.filteredTasks],
        tasks = [...state.allTasks];
      tasks = tasks.map((item) => {
        if (ids.includes(item._id))
          return {
            ...item,
            projectId: projectId,
          };
        return item;
      });
      filteredTasks = filteredTasks.map((item) => {
        if (ids.includes(item._id)) return { ...item, projectId: projectId };
        return item;
      });
      state.filteredTasks = [...filteredTasks];
      state.allTasks = [...tasks];
      state.loading = false;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      if (action.payload.isDeleted) {
        state.deleteProjectLoading = false;
        state.projects = [...state.projects].filter(
          (item) => item._id !== action.payload.id
        );
        if (state.filteredProjects)
          state.filteredProjects = [...state.filteredProjects].filter(
            (item) => item._id !== action.payload.id
          );
        state.deleteProject = "";
        state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
        state.setProjectsStatisticsHook = !state.setProjectsStatisticsHook;
      }
    });
    builder.addCase(deleteProject.pending, (state, action) => {
      state.deleteProjectLoading = true;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.deleteProjectLoading = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.deleteTaskLoading = false;
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      state.deleteTaskLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      let tasks = [...state.newProject.tasks];
      tasks = tasks.filter((item) => item._id !== action.payload?._id);
      state.newProject.tasks = tasks;
      state.allTasks = [...state.allTasks].filter(
        (item) => item._id !== action.payload?._id
      );
      state.filteredTasks = [...state.filteredTasks].filter(
        (task) => task._id !== action.payload._id
      );
      state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
      state.deleteTaskLoading = false;
    });
    builder.addCase(editProject.fulfilled, (state, action) => {
      state.editProject = undefined;
      state.loading = false;
      let projectIndex = state.projects.findIndex(
        (item) => item._id === action.payload._id
      );
      state.projects[projectIndex] = action.payload;
      let projectIndex2 = state?.filteredProjects?.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.filteredProjects && projectIndex2) {
        state.filteredProjects[projectIndex2] = action.payload;
      } else state.filteredProjects = state.projects;
      state.setProjectsStatisticsHook = !state.setProjectsStatisticsHook;
    });
    builder.addCase(editProject.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredTasks = [...state.filteredTasks].filter(
        (task) => task._id !== action.payload?._id
      );
      state.allTasks = [...state.allTasks].filter(
        (item) => item._id !== action.payload?._id
      );
      state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
    });
    builder.addCase(deleteTasks.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTasks.pending, (state) => {
      // state.loading = true;
    });
    builder.addCase(editTaskFromBoard.fulfilled, (state) => {
      state.editTask = undefined;
      state.editTaskLoading = false;
      state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
    });
    builder.addCase(editTaskFromBoard.rejected, (state) => {
      state.editTaskLoading = false;
    });
    builder.addCase(editTaskFromBoard.pending, (state) => {
      state.editTaskLoading = true;
    });
    builder.addCase(moveTask.rejected, (state) => {
      state.allTasks = [...state.allTasks];
    });
    builder.addCase(moveTask.fulfilled, (state, action) => {
      let index = state.allTasks.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allTasks[index] = action.payload;
      state.setTasksStatisticsHook = !state.setTasksStatisticsHook;
      if (action.payload.projectId) {
        let projectIndex = state.projects.findIndex(
          (i) => i._id === action.payload.projectId
        );
        if (projectIndex) {
          state.projects[projectIndex].NoOfTasks = state.allTasks.filter(
            (i) => i.projectId === action.payload.projectId
          ).length;
          state.projects[projectIndex].NoOfFinishedTasks =
            state.allTasks.filter(
              (i) =>
                i.projectId === action.payload.projectId && i.status === "Done"
            ).length;
        }
      }
    });
  },
});
export const ProjectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
