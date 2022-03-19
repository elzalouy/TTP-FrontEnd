import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import api from "../../services/endpoints/projects";
import { Project, Task } from "./projects.state";

export const getAllProjects = createAsyncThunk<any, any, any>(
  "prjects/get",
  async (args, { rejectWithValue }) => {
    try {
      let projects = await api.getHttpProjects();
      if (projects.ok && projects.data) return projects.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const createProject = createAsyncThunk<any, any, any>(
  "projects/create",
  async (args, { rejectWithValue }) => {
    try {
      let project: Project = { ...args };
      let result = await api.createProject(project);
      if (result.ok && result.data) return result.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const createProjectTasks = createAsyncThunk<any, any, any>(
  "prjects/createTasks",
  async (args, { rejectWithValue }) => {
    try {
      let tasks: Task[] = [...args];
      let result = await api.createTask(tasks);
      if (result.data && result.ok) return result.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
