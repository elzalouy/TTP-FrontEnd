import { RootState } from "../store";
import {
  createProject,
  createProjectTask,
  createTaskFromBoard,
  deleteProject,
  deleteProjectTasks,
  deleteTask,
  deleteTasks,
  editProject,
  editTaskFromBoard,
  filterProjects,
  filterTasks,
  getAllProjects,
  getAllTasks,
  getProject,
  getTasks,
  moveTask,
} from "./projects.actions";
import projectsState from "./projects.state";
import _ from "lodash";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { ProjectsInterface, Task } from "../../types/models/Projects";
const projectsSlice: Slice<ProjectsInterface> = createSlice({
  name: "projects",
  initialState: projectsState,
  reducers: {
    onChangeNewProject: (state = projectsState, action: PayloadAction<any>) => {
      state.newProject = action.payload;
    },
    onChangeNewProjectP: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      state.newProject.project = action.payload;
    },
    onChangeNewProjectTask: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      state.newProject.newTask = action.payload;
      state.newProject.tasks.push(action.payload);
    },
    onChangeSelectedDepartment: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      state.newProject.selectedDepartment = action.payload;
    },
    onDeleteNewProjectTask: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      let tasks = [...state.newProject.tasks];
      tasks = tasks.filter(
        (item) => item._id !== action.payload._id
        /*     item.name !== action.payload.name &&
            item.description !== action.payload.description */
      );
      state.newProject.tasks = tasks;
    },
    onSetDeleteProjectId: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      state.deleteProject = action.payload;
    },
    onSetEditProjectId: (state = projectsState, action: PayloadAction<any>) => {
      state.editProject = state.projects.find(
        (item) => item._id === action.payload
      );
    },
    onSortProjects: (state = projectsState, action: PayloadAction<any>) => {
      state.sorting = action.payload;
      let projects = [...state.projects];
      _.sortBy(projects, ["projectDeadline"], [action.payload]);
      state.projects = projects;
    },
    onSortTasks: (state = projectsState, action: PayloadAction<any>) => {
      state.sorting = action.payload;
      let tasks = [...state.filteredTasks];
      if (action.payload === "asc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) < new Date(b.deadline) ? -1 : 1
        );
      if (action.payload === "desc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) > new Date(b.deadline) ? -1 : 1
        );
      state.allTasks = tasks;
      state.filteredTasks = tasks; //The sorted data must be change
    },
    onSortProjectTasks: (state = projectsState, action: PayloadAction<any>) => {
      state.sorting = action.payload;
      let tasks = [...state.selectedProject.tasks];
      if (action.payload === "asc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) < new Date(b.deadline) ? -1 : 1
        );
      if (action.payload === "desc")
        tasks = tasks.sort((a, b) =>
          new Date(a.deadline) > new Date(b.deadline) ? -1 : 1
        );
      state.selectedProject.tasks = tasks;
    },
    onSetSelectedProject: (
      state = projectsState,
      action: PayloadAction<any>
    ) => {
      state.selectedProject.loading = true;
      let id = action.payload;
      let tasks = [...state?.allTasks].filter((item) => item.projectId === id);
      let project = state.projects.find((item) => item._id === id);
      state.selectedProject.project = project;
      state.selectedProject.tasks = tasks;
      state.selectedProject.loading = false;
    },
    onEditTask: (state = projectsState, action: PayloadAction<any>) => {
      state.editTask = action.payload;
    },
    /*   onViewTask: (state = projectsState, action: PayloadAction<any>) => {
      state.viewTask = action.payload;
    }, */
    onDeleteTask: (state = projectsState, action: PayloadAction<any>) => {
      state.deleteTask = action.payload;
    },
    fireNewProjectHook: (state = projectsState) => {
      state.newProject.newProjectHook =
        state.newProject.newProjectHook === true ? false : true;
    },
    createProjectHook: (state = projectsState, action: PayloadAction<any>) => {
      let newproject = { ...state.newProject.project };
      if (state.projects.findIndex((item) => item._id === newproject._id) < 0) {
        newproject.NoOfTasks = state?.newProject?.tasks?.length;
        newproject.NoOfFinishedTasks = state.newProject?.tasks?.filter(
          (item) => item.status === "done"
        );
        state.projects.push(newproject);
        state.filteredProjects?.push(newproject);
        let allTasks = [...state?.allTasks];
        allTasks = [...allTasks, ...state.newProject.tasks];
        state.allTasks = allTasks;
      }
    },
    updateTaskData: (state = projectsState, action: PayloadAction<any>) => {
      if (action.payload?._id) {
        let allTasks = [...state.allTasks];
        let projectTasks = [...state.selectedProject.tasks];
        // update all tasks
        let taskIndexInTasks = allTasks.findIndex(
          (item) => item._id === action.payload._id
        );
        let taskIndexInSelectedPro = projectTasks.findIndex(
          (item) => item._id === action.payload._id
        );
        if (taskIndexInTasks >= 0) allTasks[taskIndexInTasks] = action.payload;
        else allTasks.push(action.payload);

        if (taskIndexInSelectedPro >= 0)
          projectTasks[taskIndexInSelectedPro] = action.payload;
        else projectTasks.push(action.payload);

        state.allTasks = _.uniqBy([...allTasks], "_id");
        let selectedProject = { ...state.selectedProject };
        selectedProject.tasks = [..._.uniqBy([...projectTasks], "_id")];
        state.selectedProject = selectedProject;
      }
    },
    deleteTask: (state = projectsState, action: PayloadAction<any>) => {
      if (action.payload._id) {
        let allTasks = [...state.allTasks];
        let selectProjectTasks = [...state.selectedProject.tasks];
        state.allTasks = allTasks.filter(
          (item) => item._id !== action.payload._id
        );
        state.selectedProject.tasks = selectProjectTasks.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    onOpenTask: (state = projectsState, action: PayloadAction<any>) => {
      state.openTaskDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProject.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createProject.pending, (state) => {
      // state.loading = true;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.loading = false;
      state.newProject.project = action.payload;
      state.newProject.tasks = [];
    });
    builder.addCase(getAllProjects.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllProjects.pending, (state) => {
      // state.loading = true;
    });
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action?.payload;
      state.filteredProjects = action?.payload;
    });
    builder.addCase(createProjectTask.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createProjectTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProjectTask.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.newProject.tasks.push(action.payload);
      }
    });
    builder.addCase(createTaskFromBoard.rejected, (state) => {
      state.selectedProject.loading = false;
    });
    builder.addCase(createTaskFromBoard.pending, (state) => {
      state.selectedProject.loading = true;
    });
    builder.addCase(createTaskFromBoard.fulfilled, (state, action) => {
      state.selectedProject.loading = false;
      if (action.payload?._id) {
        let selectedProject = { ...state.selectedProject };
        let tasks = [...selectedProject.tasks];
        if (tasks.findIndex((item) => item._id === action.payload._id) < 0)
          tasks.push(action.payload);
        selectedProject.tasks = [...tasks];
        state.selectedProject = selectedProject;
      }
    });
    builder.addCase(filterProjects.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(filterProjects.pending, (state) => {
      // state.loading = true;
    });
    builder.addCase(filterProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredProjects = action.payload;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.selectedProject.loading = false;
      state.selectedProject.tasks = [];
    });
    builder.addCase(getTasks.pending, (state) => {
      // state.selectedProject.loading = false;
      // state.selectedProject.tasks = [];
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.selectedProject.tasks = action.payload;
    });

    builder.addCase(getProject.rejected, (state) => {
      state.selectedProject.loading = false;
      state.selectedProject.project = null;
    });
    builder.addCase(getProject.pending, (state) => {
      // state.selectedProject.loading = true;
      state.selectedProject.project = null;
    });
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.selectedProject.loading = false;
      state.selectedProject.project = action.payload;
    });
    builder.addCase(getAllTasks.rejected, (state) => {
      state.loading = false;
      state.allTasks = [];
    });
    builder.addCase(getAllTasks.pending, (state) => {
      state.loading = true;
      state.allTasks = [];
    });
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.allTasks = action.payload;
      if (state.filteredTasks.length === 0) {
        state.filteredTasks = action.payload;
      } else {
        state.filteredTasks = action.payload.filter((task: Task) =>
          state.filteredTasks.find(({ _id }) => task._id === _id)
        );
      }
      state.selectedProject.tasks = [...action.payload].filter(
        (item) => item.projectId === state.selectedProject.project?._id
      );
    });
    builder.addCase(filterTasks.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(filterTasks.pending, (state) => {
      // state.loading = true;
    });
    builder.addCase(filterTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredTasks = action.payload;
    });
    builder.addCase(deleteProjectTasks.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteProjectTasks.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(deleteProjectTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteProjectTasks = [];
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      if (action.payload.isDeleted) {
        console.log({ deleteProjectPayload: action.payload });
        state.loading = false;
        state.projects = [...state.projects].filter(
          (item) => item._id !== action.payload.id
        );
        state.deleteProject = "";
        let tasks = [
          ...state.allTasks.filter((i) => i.projectId !== action.payload.id),
        ];
        state.allTasks = tasks;
        state.selectedProject.tasks = tasks.filter(
          (item) => item.projectId !== action.payload.id
        );
      }
    });
    builder.addCase(deleteProject.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      let tasks = [...state.newProject.tasks];
      tasks = tasks.filter((item) => item._id !== action.payload?._id);
      state.newProject.tasks = tasks;
      let selectedProjectTasks = [...state.selectedProject.tasks];
      selectedProjectTasks = selectedProjectTasks.filter(
        (item) => item._id !== action.payload?._id
      );
      state.selectedProject.tasks = selectedProjectTasks;
      state.allTasks = [...state.allTasks].filter(
        (item) => item._id !== action.payload?._id
      );
      state.filteredTasks = [...state.filteredTasks].filter(
        (task) => task._id !== action.payload._id
      );
      state.loading = false;
    });
    builder.addCase(editProject.fulfilled, (state, action) => {
      state.editProject = undefined;
      state.loading = false;
    });
    builder.addCase(editProject.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editProject.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(deleteTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredTasks = [...state.filteredTasks].filter(
        (task) => task._id !== action.payload?._id
      );
      // selectedProject
      let selectedProjectTasks = [...state.selectedProject.tasks];
      selectedProjectTasks = selectedProjectTasks.filter(
        (item) => item._id !== action.payload?._id
      );
      state.selectedProject.tasks = selectedProjectTasks;
      state.allTasks = [...state.allTasks].filter(
        (item) => item._id !== action.payload?._id
      );
      let all = [...state.allTasks];
      all = _(all).keyBy("id").at(action.payload).filter().value();
    });
    builder.addCase(deleteTasks.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTasks.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(editTaskFromBoard.fulfilled, (state, action) => {
      state.editTask = undefined;
      state.editTaskLoading = false;
      let tasks = [...state.allTasks];
      let index = tasks.findIndex((item) => item._id === action.payload?._id);
      if (index >= 0) {
        tasks[index] = action.payload;
        state.allTasks = [...tasks];
      }
      let selectedProject = { ...state.selectedProject };
      let i = selectedProject.tasks.findIndex(
        (item) => item._id === action.payload?._id
      );
      if (i >= 0) {
        selectedProject.tasks[i] = action.payload;
        state.selectedProject = selectedProject;
      }
    });
    builder.addCase(editTaskFromBoard.rejected, (state, action) => {
      state.editTaskLoading = false;
    });
    builder.addCase(editTaskFromBoard.pending, (state, action) => {
      state.editTaskLoading = true;
    });
    builder.addCase(moveTask.rejected, (state, action) => {});
    builder.addCase(moveTask.fulfilled, (state, action) => {
      let index = state.selectedProject.tasks.findIndex(
        (item) => item._id === action.payload._id
      );
      state.selectedProject.tasks[index] = action.payload;
      index = state.allTasks.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allTasks[index] = action.payload;
    });
  },
});
export const ProjectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
