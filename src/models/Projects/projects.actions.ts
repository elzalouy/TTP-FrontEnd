import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import api from "../../services/endpoints/projects";
import {
  fireCreateProjectHook,
  fireDeleteProjectHook,
  fireDeleteTaskHook,
  fireEditTaskHook,
  fireMoveTaskHook,
} from "../Ui";
import { logout } from "../Auth";
import { Project, Task } from "../../types/models/Projects";
import { ToastError, ToastSuccess } from "../../coreUI/components/Typos/Alert";
import { IDepartmentState, IList } from "../../types/models/Departments";

export const getAllProjects = createAsyncThunk<any, any, any>(
  "prjects/get",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let projects = await api.getHttpProjects();
      if (projects?.status === 401 || projects?.status === 403) {
        rejectWithValue("Un Authorized");
        return dispatch(logout(true));
      }
      if (projects.ok) {
        return projects.data;
      }
      throw projects.problem;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createProject = createAsyncThunk<any, any, any>(
  "projects/create",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      let project: Project = { ...args.data };
      let result = await api.createProject(project);
      if (result?.status === 401 || result?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
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
  async (args, { dispatch, rejectWithValue }) => {
    try {
      let result: ApiResponse<any> = await api.createTask(args.data);
      if (result?.status === 401 || result?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (result.ok) {
        ToastSuccess("Task have been saved to the Database");
        args.onInit();
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
  async (args, { dispatch, rejectWithValue }) => {
    try {
      let form: FormData = args.data;
      let result: ApiResponse<any> = await api.createTask(form);
      if (result?.status === 401 || result?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (result.ok) {
        args.setShow("none");
        args.resetState();
        args.reset();
        return {
          result: result.data,
          attachedFiles: form.getAll("attachedFiles").length,
        };
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
  async (args, { dispatch, rejectWithValue }) => {
    try {
      let projects: ApiResponse<any> = await api.filterProjects(args);
      if (projects?.status === 401 || projects?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
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
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let tasks = await api.getTasks(args.url);
      if (tasks?.status === 401 || tasks?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (tasks?.ok) {
        return tasks?.data;
      }
      throw tasks.problem;
    } catch (error: any) {
      ToastError("There was an error from the server while fetching the tasks");
      return rejectWithValue(error);
    }
  }
);

export const getProject = createAsyncThunk<any, any, any>(
  "prjects/getProject",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      let projects: ApiResponse<any, any> = await api.httpGetProjectById(args);
      if (projects?.status === 401 || projects?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
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
      let tasks: ApiResponse<any, any> = await api.getTasks("");
      if (tasks?.status === 401 || tasks?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (tasks?.status === 401 || tasks?.status === 403) {
        rejectWithValue("Un Authorized");
        dispatch(logout(true));
      }
      if (tasks.ok) {
        return tasks.data;
      }
      throw tasks.problem;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const filterTasks = createAsyncThunk<any, any, any>(
  "projects/filterTasks",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      let tasks: ApiResponse<any, any> = await api.filterTasks(args);
      if (tasks?.status === 401 || tasks?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
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
  async (args, { dispatch, rejectWithValue }) => {
    try {
      let deleteResult = await api.deleteProjectTasks(args.data);
      if (deleteResult?.status === 401 || deleteResult?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
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

export const downloadTasks = createAsyncThunk<any, any, any>(
  "projects/downloadTasks",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let downloadResult: ApiResponse<any> = await api.downloadTasks(args);
      if (downloadResult?.status === 401 || downloadResult?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (downloadResult.ok) {
        window.open(
          `data:text/csv;charset=utf-8,${escape(downloadResult.data)}`,
          "_self"
        );
        ToastSuccess("Tasks downloaded to your pc right now.");
      }
      rejectWithValue(downloadResult.problem);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTasks = createAsyncThunk<any, any, any>(
  "projects/deleteTasks",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let deleteResult = await api.deleteTasks(args.data);
      if (deleteResult?.status === 401 || deleteResult?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      } else if (deleteResult.ok) {
        dispatch(fireDeleteTaskHook(""));
        ToastSuccess("Tasks deleted.");
      } else return rejectWithValue("Error");
    } catch (error: any) {
      ToastError("There was an error while deleting the tasks from server");
      return rejectWithValue(error);
    }
  }
);

export const deleteProject = createAsyncThunk<any, any, any>(
  "projects/deleteProject",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let deleteResult = await api.deleteProject(args.data);
      if (deleteResult?.status === 401 || deleteResult?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (deleteResult?.ok) {
        args.dispatch(fireDeleteProjectHook(""));
        ToastSuccess("Project Deleted Sucessfully");
        return { isDeleted: true, id: args.data.id };
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
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let deleteResult = await api.deleteTask(args?.data);
      if (deleteResult?.status === 401 || deleteResult?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
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
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let editResult = await api.editProject(args.data);
      if (editResult?.status === 401 || editResult?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (editResult.ok) {
        args.setShow("none");
        ToastSuccess("Project updated successfully");
        return editResult.data;
      } else throw editResult.problem;
    } catch (error: any) {
      ToastError(error);
      return rejectWithValue(error);
    }
  }
);

export const moveTask = createAsyncThunk<any, any, any>(
  "tasks/moveTasks",
  async (
    args: {
      dep: IDepartmentState;
      newList: IList;
      task: Task;
      deadline?: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      let { dep, newList, task, deadline } = args;
      if (task && dep && newList && task) {
        let Data: any = {
          cardId: task.cardId,
          listId: newList.listId,
          status: newList.name,
          department: dep,
        };
        if (deadline) Data.deadline = deadline;
        let moveResult: ApiResponse<any> = await api.moveTask(Data);
        if (moveResult?.status === 401 || moveResult?.status === 403) {
          dispatch(logout(true));
          return rejectWithValue("Un Authorized");
        }
        if (moveResult.ok) {
          dispatch(fireMoveTaskHook(""));
          let returnValue: Task = { ...task };
          returnValue.status = newList.name;
          returnValue.listId = newList.listId;
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
  async (args: any, { dispatch, rejectWithValue }) => {
    try {
      let response: ApiResponse<any> = await api.editTask(args.data);
      if (response?.status === 401 || response?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (response.ok && response.data) {
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
    { rejectWithValue, dispatch }
  ) => {
    try {
      let response: any = await api.downloadAttachment(
        `?cardId=${args.cardId}&attachmentId=${args.attachmentId}`
      );
      if (response?.status === 401 || response?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
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

export const editTasksProjectId = createAsyncThunk<any, any, any>(
  "tasks/editProjectId",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let ids: string[] = args.ids;
      let projectId: string = args.projectId;
      let response: ApiResponse<any> = await api.editTasksProjectId({
        ids,
        projectId,
      });
      if (response?.status === 401 || response?.status === 403) {
        dispatch(logout(true));
        return rejectWithValue("Un Authorized");
      }
      if (response.ok) {
        args.closeModal();
        args.setAllSelected([]);
        ToastSuccess("Tasks have been moved to the project successfully.");
        return { ids, projectId };
      } else {
        ToastError(response.data.message);
        rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
