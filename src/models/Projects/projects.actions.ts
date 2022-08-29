import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";
import api from "../../services/endpoints/projects";
import {
  fireCreateProjectHook,
  fireDeleteProjectHook,
  fireDeleteTaskHook,
  fireEditTaskHook,
  fireMoveTaskHook,
  fireUpdateProjectHook,
} from "../Ui";
import { removeAuthToken } from "../../services/api";
import { generateID } from "../../helpers/IdGenerator";
import { logout } from "../Auth";
import moment from "moment";
import { Project, Task } from "../../types/models/Projects";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "../../coreUI/components/Typos/Alert";
import { IDepartmentState, IList } from "../../types/models/Departments";

export const getAllProjects = createAsyncThunk<any, any, any>(
  "prjects/get",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let projects = await api.getHttpProjects();
      if (projects?.status === 401 || projects?.status === 403) {
        rejectWithValue("Un Authorized");
        dispatch(logout(true));
      }
      if (projects.ok) return projects.data;
      throw projects.problem;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const createProject = createAsyncThunk<any, any, any>(
  "projects/create",
  async (args, { rejectWithValue }) => {
    try {
      let project: Project = { ...args.data };
      let result = await api.createProject(project);
      if (result.ok) {
        args.dispatch(fireCreateProjectHook(""));
        args.setcurrentStep(1);
        ToastSuccess("Project created successfully");
        return result.data;
      }
      return rejectWithValue(result.data);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const createProjectTask = createAsyncThunk<any, any, any>(
  "projects/createTask",
  async (args, { rejectWithValue }) => {
    try {
      let result: ApiResponse<any> = await api.createTask(args);
      if (result.ok) {
        ToastSuccess("Task have been saved to the Database");
        return result.data;
      }
      ToastError(result?.data[0]?.message);
      return rejectWithValue(result.data);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const createTaskFromBoard = createAsyncThunk<any, any, any>(
  "projects/createTaskFromBoard",
  async (args, { rejectWithValue }) => {
    try {
      let result: ApiResponse<any> = await api.createTask(args.data);
      if (result.ok) {
        args.resetState();
        args.dispatch(fireEditTaskHook(""));
        args.setShow("none");
        ToastSuccess("Task have been save to the Database");
        return result.data;
      } else {
        ToastError(result?.data[0]?.message);
        return rejectWithValue(result.data);
      }
    } catch (error: any) {
      args.reset();
      return rejectWithValue(error);
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
      ToastError("There was an error from the server while filtering the task");
      return rejectWithValue(error);
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
      ToastError("There was an error from the server while fetching the tasks");
      return rejectWithValue(error);
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
      ToastError(
        "There was an error from the server while fetching the projects"
      );
      return rejectWithValue(error);
    }
  }
);
export const getAllTasks = createAsyncThunk<any, any, any>(
  "projects/getAllTasks",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let tasks = await api.getTasks("");
      if (tasks?.status === 401 || tasks?.status === 403) {
        rejectWithValue("Un Authorized");
        dispatch(logout(true));
      }
      if (tasks.ok) return tasks.data;
      throw tasks.problem;
    } catch (error: any) {
      return rejectWithValue(error);
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
      ToastError("There was an error filtering the tasks from the server");
      return rejectWithValue(error);
    }
  }
);
export const deleteProjectTasks = createAsyncThunk<any, any, any>(
  "projects/deleteProjectTasks",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteProjectTasks(args.data);
      if (deleteResult.ok) {
        args.dispatch(fireDeleteTaskHook(""));
        ToastSuccess("Project Tasks deleted first.");
        if (args.deleteProject) {
          let data = args.data;
          let dispatch = args.disptach;
          dispatch(deleteProject({ data: data, dispatch }));
        }
        return true;
      }
      throw deleteResult.problem;
    } catch (error: any) {
      ToastError("There was an error deleting the tasks from the server");
      return rejectWithValue(error);
    }
  }
);
export const deleteTasks = createAsyncThunk<any, any, any>(
  "projects/deleteTasks",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteTasks(args.data);
      if (deleteResult.ok) {
        args.dispatch(fireDeleteTaskHook(""));
        ToastSuccess("Tasks deleted.");
        return args.ids;
      }
      throw deleteResult.problem;
    } catch (error: any) {
      ToastError("There was an error while deleting the tasks from server");
      return rejectWithValue(error);
    }
  }
);
export const deleteProject = createAsyncThunk<any, any, any>(
  "projects/deleteProject",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteProject(args.data);
      if (deleteResult?.ok) {
        args.dispatch(fireDeleteProjectHook(""));
        ToastSuccess("Project Deleted Sucessfully");
        return true;
      }
      throw deleteResult.problem;
    } catch (error: any) {
      ToastError(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk<any, any, any>(
  "projects/deleteTask",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteTask(args?.data);
      if (deleteResult.ok) {
        args.disptach(fireDeleteTaskHook(""));
        ToastSuccess("Tasks deleted from DB and Trello");
        return deleteResult.data;
      } else throw deleteResult.problem;
    } catch (error: any) {
      ToastError(error);
      return rejectWithValue(error);
    }
  }
);
export const editProject = createAsyncThunk<any, any, any>(
  "projects/editProject",
  async (args, { rejectWithValue }) => {
    try {
      let editResult = await api.editProject(args.data);
      if (editResult.ok) {
        args.dispatch(fireUpdateProjectHook(""));
        ToastSuccess("Project updated successfully");
        return true;
      } else throw editResult.problem;
    } catch (error: any) {
      ToastError(error);
      return rejectWithValue(error);
    }
  }
);
export const moveTask = createAsyncThunk<any, any, any>(
  "tasks/moveTasks",
  async (args, { rejectWithValue }) => {
    try {
      let liststr = "";
      let department: IDepartmentState = args?.department;
      let value = args?.value;
      let task = args?.task;
      let newlist: IList | undefined = department?.lists?.find(
        (item) => item.name === value
      );
      if (newlist?.name && newlist.listId) {
        let Data: any = {
          cardId: task.cardId,
          listId: newlist.listId,
          status: newlist.name,
          list: liststr,
        };
        let moveResult: ApiResponse<any> = await api.moveTask(Data);
        if (moveResult.ok) {
          args.dispatch(fireMoveTaskHook(""));
          let returnValue: Task = { ...task };
          returnValue.status = newlist.name;
          returnValue.listId = newlist.listId;
          return returnValue;
        } else throw moveResult.problem;
      }
    } catch (error: any) {
      ToastError(error);
      return rejectWithValue(error);
    }
  }
);

/**
 * editTaskFromBoard
 * This action dispatches the new edited task to the reducers, so it can change it with the new data.
 * @param EditTaskInfo
 * @returns newTask or Error (message, path)
 */
export const editTaskFromBoard = createAsyncThunk<any, any, any>(
  "tasks/editTask",
  async (args: any, { rejectWithValue }) => {
    try {
      let response: ApiResponse<any> = await api.editTask(args.data);
      if (response.ok && response.data) {
        args.resetState();
        args.setShow("none");
        args.dispatch(fireEditTaskHook(""));
        return response.data;
      } else {
        ToastError(response.data?.message);
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const downloadAttachment = createAsyncThunk<any, any, any>(
  "tasks/downloadAttachment",
  async (
    args: { cardId: string; attachmentId: string; openUrl: boolean },
    { rejectWithValue }
  ) => {
    try {
      let response: any = await api.downloadAttachment(
        `?cardId=${args.cardId}&attachmentId=${args.attachmentId}`
      );
      if (response.ok) {
        if (args.openUrl !== false) {
          window.open(response.data?.url);
        }
        return response.data;
      }
      ToastError("The attachment was deleted from the board.");
      return rejectWithValue(response.data);
    } catch (error) {
      ToastError("The attachment was deleted from the board.");
      return rejectWithValue(error);
    }
  }
);
