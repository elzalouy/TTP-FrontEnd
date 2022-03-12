import { createSlice, Slice } from "@reduxjs/toolkit";
import { RootState } from "../store";
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
    onChangeNewProjectT: (state, action) => {
      state.newProject.newTask = action.payload;
      state.newProject.tasks.push(action.payload);
    },
    onDeleteNewProjectT: (state, action) => {
      let tasks = [...state.newProject.tasks];
      tasks = tasks.filter(
        (item) =>
          item.name !== action.payload.name &&
          item.description !== action.payload.description
      );
      state.newProject.tasks = tasks;
    },
  },
});
export const selectNewProject = (state: RootState) => state.projects.newProject;
export const ProjectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
