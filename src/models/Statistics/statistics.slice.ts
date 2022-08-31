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
    // set statistics
    setStatisticsForOm: (
      state = StatisticsState,
      action: PayloadAction<any>
    ) => {
      state.loading = true;
      // get projects, tasks and the user
      let projects: Project[] = action.payload.projects;
      let tasks: Task[] = action.payload.tasks;
      let user: User = action.payload.user;

      // check the user
      if (user && user?.role?.length > 0) {
        if (projects && projects.length > 0) {
          state.OM.projectsCloseToDeadlines = projects.filter(
            (item) =>
              item.projectDeadline &&
              isCloseToDeadline(item.projectDeadline, item.startDate, 35)
          );
        } else state.OM.projectsCloseToDeadlines = [];

        if (tasks) {
          let inprogress = tasks.filter((item) => item.status === "inProgress");
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
        }
      }
      state.loading = false;
    },
    setStatisticsForPm: (
      state = StatisticsState,
      action: PayloadAction<any>
    ) => {
      state.loading = true;

      // get projects, tasks, and users
      let projects: Project[] = action.payload.projects;
      let tasks: Task[] = action.payload.tasks;
      let user: User = action.payload.user;
      if (user && user?.role?.length > 0) {
        let userProjects =
          projects &&
          projects?.filter((item) => item.projectManager?._id === user._id);
        state.PM.projects = userProjects;

        if (tasks) {
          let ids = userProjects.flatMap((item: Project) => item._id);
          let review = tasks.filter(
            (item) => ids.includes(item.projectId) && item.status === "Review"
          );
          let shared = tasks.filter(
            (item) => ids.includes(item.projectId) && item.status === "Shared"
          );
          let inprogress = tasks.filter(
            (item) =>
              ids.includes(item.projectId) && item.status === "inProgress"
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
      }
      state.loading = false;
    },
    setStatisticsEmpty: (state = StatisticsState) => {
      state.loading = false;
      state.OM = {
        taskboard: null,
        taskBoardLength: 0,
        inProgress: null,
        review: null,
        reviewLength: 0,
        shared: null,
        sharedLength: 0,
        projectsCloseToDeadlines: null,
        tasksCloseToDeadline: null,
        inProgressLength: 0,
      };
      state.PM = {
        projects: null,
        inProgress: null,
        sharedLength: 0,
        shared: null,
        review: null,
        reviewLength: 0,
        tasksCloseToDeadline: null,
        projectsCloseToDeadlines: null,
      };
    },
  },
});
export const { setStatisticsForOm, setStatisticsForPm, setStatisticsEmpty } =
  StatisticsSlice.actions;
export default StatisticsSlice.reducer;
