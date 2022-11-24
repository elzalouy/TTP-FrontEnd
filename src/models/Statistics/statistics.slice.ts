import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import _ from "lodash";
import StatisticsState, {
  initialStatisticsState,
  StatisticsInterface,
} from "./statistics.state";
import {
  isCloseToDeadline,
  setTasksBoardToArrays,
  setTasksToArrays,
} from "../../helpers/equations";
import { Project, Task } from "../../types/models/Projects";
import { User } from "../../types/models/user";
const StatisticsSlice: Slice<StatisticsInterface> = createSlice({
  name: "projects",
  initialState: StatisticsState,
  reducers: {
    setProjectsStatistics: (
      state: StatisticsInterface,
      action: PayloadAction<any>
    ) => {
      let userProjects: Project[] = action.payload.projects;
      let user: User = action.payload.user;
      if (user.role !== "PM") {
        state.OM.projectsCloseToDeadlines = userProjects.filter(
          (item) =>
            item.projectStatus &&
            ![
              "deliver on time",
              "deliver before deadline",
              "delivered after deadline",
            ].includes(item?.projectStatus) &&
            item.projectDeadline &&
            isCloseToDeadline(item.projectDeadline, item.startDate, 35)
        );
      } else {
        state.PM.projects = userProjects;
        state.PM.projectsCloseToDeadlines = userProjects?.filter(
          (item) =>
            item?.projectDeadline &&
            isCloseToDeadline(item.projectDeadline, item.startDate, 35)
        );
      }
    },

    setTasksStatistics: (
      state: StatisticsInterface,
      action: PayloadAction<any>
    ) => {
      let userProjects: Project[] = action.payload.projects;
      let user: User = action.payload.user;
      let tasks: Task[] = action.payload.tasks;
      if (user.role !== "PM") {
        let inprogress = tasks.filter((item) => item.status === "In Progress");
        let taskBoard = tasks.filter((item) => item.status === "Tasks Board");
        let review = tasks.filter((item) => item.status === "Review");
        let shared = tasks.filter((item) => item.status === "Shared");
        state.OM.taskBoardLength = taskBoard.length;
        state.OM.reviewLength = review.length;
        state.OM.sharedLength = shared.length;
        state.OM.inProgressLength = inprogress.length;
        state.OM.taskboard = setTasksBoardToArrays(taskBoard);
        state.OM.review = setTasksToArrays(review);
        state.OM.shared = setTasksToArrays(shared);
        state.OM.tasksCloseToDeadline = tasks.filter(
          (item) =>
            item.deadline && isCloseToDeadline(item.deadline, item.start, 25)
        );
        state.OM.inProgress = inprogress;
      } else {
        let ids = userProjects.flatMap((item: Project) => item._id);
        let review = tasks.filter(
          (item) => ids.includes(item.projectId) && item.status === "Review"
        );
        let shared = tasks.filter(
          (item) => ids.includes(item.projectId) && item.status === "Shared"
        );
        let inprogress = tasks.filter(
          (item) =>
            ids.includes(item.projectId) && item.status === "In Progress"
        );
        state.PM.shared = shared;
        state.PM.reviewLength = review.length;
        state.PM.sharedLength = shared.length;
        state.PM.inProgress = setTasksToArrays(inprogress);
        state.PM.review = setTasksToArrays(review);
        state.PM.tasksCloseToDeadline = tasks.filter(
          (item) =>
            ids.includes(item.projectId) &&
            item.deadline &&
            isCloseToDeadline(item.deadline, item.start, 25)
        );
        state.PM.projectsCloseToDeadlines = userProjects?.filter(
          (item) =>
            item?.projectDeadline &&
            isCloseToDeadline(item.projectDeadline, item.startDate, 35)
        );
      }
      state.loading = false;
    },

    setStatisticsEmpty: (
      state: StatisticsInterface,
      action: PayloadAction<any>
    ) => {
      state.loading = false;
      state.OM = {
        taskboard: [],
        taskBoardLength: 0,
        inProgress: [],
        review: [],
        reviewLength: 0,
        shared: [],
        sharedLength: 0,
        projectsCloseToDeadlines: [],
        tasksCloseToDeadline: [],
        inProgressLength: 0,
      };
      state.PM = {
        projects: [],
        inProgress: [],
        sharedLength: 0,
        shared: [],
        review: [],
        reviewLength: 0,
        tasksCloseToDeadline: [],
        projectsCloseToDeadlines: [],
      };
    },
    setStatisticsLoading: (
      state: StatisticsInterface,
      action: PayloadAction<any>
    ) => {
      state.loading = action.payload;
    },
  },
});
export const {
  setProjectsStatistics,
  setTasksStatistics,
  setStatisticsEmpty,
  setStatisticsLoading,
} = StatisticsSlice.actions;
export default StatisticsSlice.reducer;
