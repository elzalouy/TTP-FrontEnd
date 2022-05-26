import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import { toast } from "react-toastify";
import api from "../../services/endpoints/projects";
import { Project } from "./projects.state";
import {
  fireDeleteProjectHook,
  fireDeleteTaskHook,
  fireEditTaskHook,
  fireMoveTaskHook,
  fireUpdateProjectHook,
} from "../Ui";
import { removeAuthToken } from "../../services/api";
export const getAllProjects = createAsyncThunk<any, any, any>(
  "prjects/get",
  async (args, { rejectWithValue }) => {
    try {
      let projects = await api.getHttpProjects();
      if (projects?.status === 401 || projects?.status === 403) {
        return rejectWithValue("Un Authorized");
        removeAuthToken();
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
      let result: ApiResponse<any> = await api.createTask(args.data);
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
        return result.data?.task;
      }
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
        return result.data?.task;
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
      });
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
      });
      return rejectWithValue(error);
    }
  }
);
export const getAllTasks = createAsyncThunk<any, any, any>(
  "projects/getAllTasks",
  async (args, { rejectWithValue }) => {
    try {
      let tasks = await api.getTasks("");
      if (tasks?.status === 401 || tasks?.status === 403) {
        return rejectWithValue("Un Authorized");
        removeAuthToken();
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
      });
      return rejectWithValue(error);
    }
  }
);
export const deleteProjectTasks = createAsyncThunk<any, any, any>(
  "projects/deleteProjectTasks",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteProjectTasks(args?.data);
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
      });
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk<any, any, any>(
  "projects/deleteTask",
  async (args, { rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteTask(args.data);
      if (deleteResult.ok) {
        args.dispatch(fireDeleteTaskHook(""));
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
      });
      return rejectWithValue(error);
    }
  }
);
export const moveTask = createAsyncThunk<any, any, any>(
  "tasks/moveTasks",
  async (args, { rejectWithValue }) => {
    try {
      let data: any = args?.data;
      let newlist = "";
      if (data.list.value === "inProgress")
        newlist = data.department.defaultListId;
      if (data.list.value === "Review") newlist = data.department.reviewListId;
      if (args?.list?.value === "Shared")
        newlist = data.department.sharedListID;
      if (args?.list?.value === "Done") newlist = data.department.doneListId;
      if (args?.list?.value === "Not Clear")
        newlist = data.department.notClearListId;
      if (data.list.value === "Cancled")
        newlist = data.department.canceldListId;
      if (data.list.value === "Not Started")
        newlist = data.department.notStartedListId;
      let Data: any = {
        cardId: data?.task?.cardId,
        listId: newlist,
        status: data.list.value,
      };
      let moveResult = await api.moveTask(Data);
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
      });
      return rejectWithValue(error);
    }
  }
);

export const editTask = createAsyncThunk<any, any, any>(
  "tasks/editTask",
  async (args: any, { rejectWithValue }) => {
    try {
      let response = await api.editTask(args.data);
      if (response.ok && response.data) {
        args.dispatch(fireEditTaskHook(""));
        return response.data;
      } else throw new Error("Task not updated.");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
