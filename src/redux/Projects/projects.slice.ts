import { createSlice, Slice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  createProject,
  createProjectTask,
  filterProjects,
  getAllProjects,
  getTasks,
} from "./projects.actions";
import projectsState, { ProjectsInterface } from "./projects.state";
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
          item.name !== action.payload.name &&
          item.description !== action.payload.description
      );
      state.newProject.tasks = tasks;
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
      state.selectedProject.project = null;
      state.selectedProject.tasks = [];
    });
    builder.addCase(getTasks.pending, (state) => {
      state.selectedProject.loading = false;
      state.selectedProject.project = null;
      state.selectedProject.tasks = [];
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.selectedProject.loading = true;
      let project = state.projects.find(
        (item) => item._id === action.payload.projectId
      );
      state.selectedProject.project = project ? project : null;
      state.selectedProject.tasks = action.payload.tasks;
    });
  },
});
export const ProjectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
