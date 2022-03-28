import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";
import api from "../../services/endpoints/projects";
import { Project, Task } from "./projects.state";

export const getAllProjects = createAsyncThunk<any, any, any>(
  "prjects/get",
  async (args, { rejectWithValue }) => {
    try {
      let projects = await api.getHttpProjects();
      return projects.data;
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
      if (result.ok && result.data) {
        toast("Project created successfully");
        return result.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const createProjectTask = createAsyncThunk<any, any, any>(
  "projects/createTask",
  async (args, { rejectWithValue }) => {
    try {
      let result: ApiResponse<any> = await api.createTask(args);
      if (result.ok) {
        toast("Task have been save to the Database");
        return result.data?.task;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const filterProjects = createAsyncThunk<any, any, any>(
  "projects/filterProjects",
  async (args, { rejectWithValue }) => {
    try {
      let projects: ApiResponse<any> = await api.filterProjects(args);
      if (projects.ok && projects.data) return projects?.data?.result;
      else {
        console.log("response error", projects);
        return [];
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getTasks = createAsyncThunk<any, any, any>(
  "projects/getProjectTasks",
  async (args, { rejectWithValue }) => {
    try {
      let tasks = await api.getTasks(args.url);
      if (tasks?.ok) return tasks?.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getProject = createAsyncThunk<any, any, any>(
  "prjects/getProject",
  async (args, { rejectWithValue }) => {
    try {
      let projects: ApiResponse<any, any> = await api.httpGetProjectById(args);
      return projects?.data[0];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getAllTasks = createAsyncThunk<any, any, any>(
  "projects/getAllTasks",
  async (args, { rejectWithValue }) => {
    try {
      let tasks = await api.getTasks("");
      return tasks.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const filterTasks = createAsyncThunk<any, any, any>(
  "projects/filterTasks",
  async (args, { rejectWithValue }) => {
    try {
      let tasks = await api.filterTasks(args);
      return tasks.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
