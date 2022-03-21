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
      if (result.ok && result.data) {
        console.log("project saved");
        toast("Project created successfully");
        console.log("proejct", result.data);
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
      console.log("result is", result);
      if (result.ok) {
        toast("Task have been save to the Database");
        return result.data?.task;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
