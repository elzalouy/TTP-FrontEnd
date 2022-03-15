import { createSlice, Slice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createProject } from "./projects.actions";
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
    builder.addCase(createProject.fulfilled, (state) => {
      state.loading = false;
    });
  },
});
export const ProjectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
