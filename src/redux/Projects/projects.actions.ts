import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";
import api from "../../services/endpoints/projects";
import { Project, Task } from "./projects.state";
import _, { reject, result } from "lodash";
export const getAllProjects = createAsyncThunk<any, any, any>(
  "prjects/get",
  async (args, { rejectWithValue }) => {
    try {
      let projects = await api.getHttpProjects();
      if (projects.ok) return projects.data;
      throw projects.problem;
    } catch (error: any) {
      toast(error);
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
      }
      throw result.problem;
    } catch (error: any) {
      toast(error);
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
        toast("Task have been saved to the Database");
        return result.data?.task;
      }
      throw result.problem;
    } catch (error: any) {
      rejectWithValue(error);
      toast(error);
    }
  }
);
export const createTaskFromBoard = createAsyncThunk<any, any, any>(
  "projects/createTaskFromBoard",
  async (args, { rejectWithValue }) => {
    try {
      let result: ApiResponse<any> = await api.createTask(args);
      if (result.ok) {
        toast("Task have been save to the Database");
        return result.data?.task;
      }
      throw result.problem;
    } catch (error: any) {
      toast(error);
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
      throw projects.problem;
    } catch (error: any) {
      toast(error);
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
      throw tasks.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);

export const getProject = createAsyncThunk<any, any, any>(
  "prjects/getProject",
  async (args, { rejectWithValue }) => {
    try {
      let projects: ApiResponse<any, any> = await api.httpGetProjectById(args);
      if (projects.ok) return projects?.data[0];
      throw projects.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);
export const getAllTasks = createAsyncThunk<any, any, any>(
  "projects/getAllTasks",
  async (args, { rejectWithValue }) => {
    try {
      let tasks = await api.getTasks("");
      if (tasks.ok) return tasks.data;
      throw tasks.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);

export const filterTasks = createAsyncThunk<any, any, any>(
  "projects/filterTasks",
  async (args, { rejectWithValue }) => {
    try {
      let tasks = await api.filterTasks(args);
      if (tasks.ok) return tasks.data;
      throw tasks.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);
export const deleteProjectTasks = createAsyncThunk<any, any, any>(
  "projects/deleteProjectTasks",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteProjectTasks(args);
      if (deleteResult.ok) {
        toast("Project Tasks deleted first.");
        return true;
      }
      throw deleteResult.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);
export const deleteTasks = createAsyncThunk<any, any, any>(
  "projects/deleteTasks",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteTasks(args.data);
      if (deleteResult.ok) {
        args.dispatch(getAllTasks(null));
        toast("Tasks deleted.");
        return args.ids;
      }
      throw deleteResult.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);
export const deleteProject = createAsyncThunk<any, any, any>(
  "projects/deleteProject",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteProject(args);
      if (deleteResult?.ok) {
        toast("Project Deleted Sucessfully");
        window.location.reload();
        return true;
      }
      throw deleteResult.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk<any, any, any>(
  "projects/deleteTask",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteTask(args);
      if (deleteResult.ok) {
        toast("Tasks deleted from DB and Trello");
        return deleteResult.data;
      } else throw deleteResult.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);
export const editProject = createAsyncThunk<any, any, any>(
  "projects/editProject",
  async (args, { rejectWithValue }) => {
    try {
      let editResult = await api.editProject(args);
      if (editResult.ok) {
        toast("Project updated successfully");
        return true;
      } else throw editResult.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);
export const moveTask = createAsyncThunk<any, any, any>(
  "tasks/moveTasks",
  async (args, { rejectWithValue }) => {
    try {
      let newlist = "";
      if (args.list.value === "inProgress")
        newlist = args.department.defaultListId;
      if (args.list.value === "review") newlist = args.department.reviewListId;
      if (args?.list?.value === "shared")
        newlist = args.department.sharedListID;
      if (args?.list?.value === "done") newlist = args.department.doneListId;
      if (args?.list?.value === "not clear")
        newlist = args.department.notClearListId;
      if (args.list.value === "cancled")
        newlist = args.department.canceldListId;
      let data: any = {
        cardId: args?.task?.cardId,
        listId: newlist,
        status: args.list.value,
      };
      let moveResult = await api.moveTask(data);
      if (moveResult.ok) return moveResult.data;
      else throw moveResult.problem;
    } catch (error: any) {
      toast(error);
      rejectWithValue(error);
    }
  }
);

export const editTask = createAsyncThunk<any, any, any>(
  "tasks/editTask",
  async (args: any, { rejectWithValue }) => {
    try {
      let response = await api.editTask(args);
      if (response.ok && response.data) return response.data;
      else throw "Task not updated.";
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
