import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";
import api from "../../services/endpoints/projects";
import { Project } from "./projects.state";
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
import { Department } from "../Departments";
import { logout } from "../Auth";

export const getAllProjects = createAsyncThunk<any, any, any>(
  "prjects/get",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let projects = await api.getHttpProjects();
      if (projects?.status === 401 || projects?.status === 403) {
        rejectWithValue("Un Authorized");
        removeAuthToken();
        dispatch(logout(null));
      }

      if (projects.ok) return projects.data;
      throw projects.problem;
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
        toast.success("Project created successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
        toast.success("Task have been saved to the Database", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return result.data;
      }
      return rejectWithValue(result.data);
    } catch (error: any) {
      console.log(new Error(error).message);
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
        args.dispatch(fireEditTaskHook(""));
        args.setShow("none");
        toast.success("Task have been save to the Database", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        args.reset();
        return result.data;
      } else {
        toast.error(result?.data[0]?.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        args.reset();
        return rejectWithValue(result.data);
      }
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
        removeAuthToken();
        dispatch(logout(null));
      }

      if (tasks.ok) return tasks.data;
      throw tasks.problem;
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
        toast.success("Project Tasks deleted first.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (args.deleteProject) {
          let data = args.data;
          let dispatch = args.disptach;
          dispatch(deleteProject({ data: data, dispatch }));
        }
        return true;
      }
      throw deleteResult.problem;
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
        toast.success("Tasks deleted.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return args.ids;
      }
      throw deleteResult.problem;
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
        toast.success("Project Deleted Sucessfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return true;
      }
      throw deleteResult.problem;
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
        toast.success("Tasks deleted from DB and Trello", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return deleteResult.data;
      } else throw deleteResult.problem;
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
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
        toast.success("Project updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return true;
      } else throw editResult.problem;
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
      return rejectWithValue(error);
    }
  }
);
export const moveTask = createAsyncThunk<any, any, any>(
  "tasks/moveTasks",
  async (args, { rejectWithValue }) => {
    try {
      let newlist = "";
      let liststr = "";
      let department: Department = args?.department;
      let value = args?.value;
      let task = args?.task;
      switch (value) {
        case "Not Clear":
          newlist = department.notClearListId;
          liststr = "notClearListId";
          break;
        case "Tasks Board":
          newlist = department.defaultListId;
          liststr = "defaultListId";
          break;
        case "inProgress":
          newlist = department.inProgressListId;
          liststr = "inProgressListId";
          break;
        case "Review":
          newlist = department.reviewListId;
          liststr = "reviewListId";
          break;
        case "Shared":
          newlist = department.sharedListID;
          liststr = "sharedListID";
          break;
        case "Cancled":
          newlist = department.canceldListId;
          liststr = "canceldListId";
          break;
        case "Done":
          newlist = department.doneListId;
          liststr = "doneListId";
          break;

        default:
          break;
      }
      let Data: any = {
        cardId: task.cardId,
        listId: newlist,
        status: value,
        list: liststr,
      };
      let moveResult: ApiResponse<any> = await api.moveTask(Data);
      if (moveResult.ok) {
        args.dispatch(fireMoveTaskHook(""));
        return moveResult.data;
      } else throw moveResult.problem;
    } catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
      return rejectWithValue(error);
    }
  }
);

export const editTaskFromBoard = createAsyncThunk<any, any, any>(
  "tasks/editTask",
  async (args: any, { rejectWithValue }) => {
    try {
      let response = await api.editTask(args.data);
      if (response.ok && response.data) {
        args.setShow("none");
        args.dispatch(fireEditTaskHook(""));
        return response.data;
      } else
        toast.error("Task not updated", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const downloadAttachment = createAsyncThunk<any, any, any>(
  "tasks/downloadAttachment",
  async (
    args: { cardId: string; attachmentId: string },
    { rejectWithValue }
  ) => {
    try {
      let response: any = await api.downloadAttachment(
        `?cardId=${args.cardId}&attachmentId=${args.attachmentId}`
      );
      console.log(response);
      if (response.ok) {
        window.open(response.data?.url);
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
