import { createSlice, Slice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  createProject,
  createProjectTask,
  deleteProject,
  deleteProjectTasks,
  deleteTask,
  editProject,
  filterProjects,
  filterTasks,
  getAllProjects,
  getAllTasks,
  getProject,
  getTasks,
} from "./projects.actions";
import projectsState, { ProjectsInterface, Task } from "./projects.state";
import _ from "lodash";
const projectsSlice: Slice<ProjectsInterface> = createSlice({
  name: "projects",
  initialState: projectsState,
  reducers: {
    onChangeNewProject: (state, action) => {
      state.newProject = action.payload;
    },
    onChangeNewProjectP: (state, action) => {
      state.newProject.project = action.payload;
    },
    onChangeNewProjectTask: (state, action) => {
      state.newProject.newTask = action.payload;
      state.newProject.tasks.push(action.payload);
    },
    onChangeSelectedDepartment: (state, action) => {
      state.newProject.selectedDepartment = action.payload;
    },
    onDeleteNewProjectTask: (state, action) => {
      let tasks = [...state.newProject.tasks];
      tasks = tasks.filter(
        (item) =>
          item._id === action.payload._id &&
          item.name !== action.payload.name &&
          item.description !== action.payload.description
      );
      state.newProject.tasks = tasks;
    },
    onSetDeleteProjectId: (state, action) => {
      state.deleteProject = action.payload;
    },
    onSetEditProjectId: (state, action) => {
      state.editProject = state.projects.find(
        (item) => item._id === action.payload
      );
    },
    onSortProjects: (state, action) => {
      state.sorting = action.payload;
      let projects = [...state.projects];
      _.sortBy(projects, ["projectDeadline"], [action.payload]);
      state.projects = projects;
    },
    onSortTasks: (state, action) => {
      state.sorting = action.payload;
      let tasks = [...state.allTasks];
      if (action.payload === "asc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) < new Date(b.deadline) ? -1 : 1
        );
      if (action.payload === "desc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) > new Date(b.deadline) ? -1 : 1
        );
      state.allTasks = tasks;
    },
    onSortProjectTasks: (state, action) => {
      state.sorting = action.payload;
      let tasks = [...state.selectedProject.tasks];
      if (action.payload === "asc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) < new Date(b.deadline) ? -1 : 1
        );
      if (action.payload === "desc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) > new Date(b.deadline) ? -1 : 1
        );
      state.selectedProject.tasks = tasks;
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
    });
    builder.addCase(getAllProjects.rejected, (state) => {
      state.loading = false;
      state.projects = [];
    });
    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = true;
      state.projects = [];
    });
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action?.payload;
    });
    builder.addCase(createProjectTask.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createProjectTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProjectTask.fulfilled, (state, action) => {
      state.loading = false;
      action.payload !== null && state.newProject.tasks.push(action.payload);
    });
    builder.addCase(filterProjects.rejected, (state) => {
      state.loading = false;
      state.projects = [];
    });
    builder.addCase(filterProjects.pending, (state) => {
      state.loading = true;
      state.projects = [];
    });
    builder.addCase(filterProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.selectedProject.loading = false;
      state.selectedProject.tasks = [];
    });
    builder.addCase(getTasks.pending, (state) => {
      state.selectedProject.loading = false;
      state.selectedProject.tasks = [];
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.selectedProject.tasks = action.payload;
    });

    builder.addCase(getProject.rejected, (state) => {
      state.selectedProject.loading = false;
      state.selectedProject.project = null;
    });
    builder.addCase(getProject.pending, (state) => {
      state.selectedProject.loading = true;
      state.selectedProject.project = null;
    });
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.selectedProject.loading = false;
      state.selectedProject.project = action.payload;
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
    });
    builder.addCase(filterTasks.rejected, (state) => {
      state.loading = false;
      state.allTasks = [];
    });
    builder.addCase(filterTasks.pending, (state) => {
      state.loading = true;
      state.allTasks = [];
    });
    builder.addCase(filterTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.allTasks = action.payload;
    });
    builder.addCase(deleteProjectTasks.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteProjectTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProjectTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteProjectTasks = [];
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteProject = "";
    });
    builder.addCase(deleteProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      let tasks = [...state.newProject.tasks];
      tasks = tasks.filter((item) => item._id !== action.payload._id);
      state.newProject.tasks = tasks;
      state.loading = false;
    });
    builder.addCase(editProject.fulfilled, (state, action) => {
      state.editProject = undefined;
      state.loading = false;
    });
    builder.addCase(editProject.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editProject.pending, (state, action) => {
      state.loading = true;
    });
  },
});
export const ProjectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
