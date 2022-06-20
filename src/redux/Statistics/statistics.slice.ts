import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import _ from "lodash";
import StatisticsState, { StatisticsInterface } from "./statistics.state";
import { Project, Task } from "../Projects";
import {
  isCloseToDeadline,
  setTasksBoardToArrays,
  setTasksToArrays,
} from "../../helpers/equations";
import { User } from "../Auth";
const StatisticsSlice: Slice<StatisticsInterface> = createSlice({
  name: "projects",
  initialState: StatisticsState,
  reducers: {
    // set statistics
    setStatisticsForOm: (
      state = StatisticsState,
      action: PayloadAction<any>
    ) => {
      let projects: Project[] = action.payload.projects;
      let tasks: Task[] = action.payload.tasks;
      let user: User = action.payload.user;
      if (user && user?.role?.length > 0) {
        if (projects && projects.length > 0) {
          state.OM.projectsCloseToDeadlines = projects.filter(
            (item) =>
              item.projectDeadline &&
              isCloseToDeadline(item.projectDeadline, item.startDate, 35)
          );
        }
        if (tasks && tasks.length > 0) {
          let inprogress = tasks.filter((item) => item.status === "inProgress");
          let taskBoard = tasks.filter((item) => item.status === "Tasks Board");
          let review = tasks.filter((item) => item.status === "Review");
          let shared = tasks.filter((item) => item.status === "Shared");
          state.OM.taskBoardLength = taskBoard.length;
          state.OM.reviewLength = review.length;
          state.OM.sharedLength = shared.length;
          state.OM.taskboard = setTasksBoardToArrays(taskBoard);
          state.OM.review = setTasksToArrays(review);
          console.log(review, setTasksToArrays(review));
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
      let projects: Project[] = action.payload.projects;
      let tasks: Task[] = action.payload.tasks;
      let user: User = action.payload.user;
      let userProjects =
        projects &&
        projects?.filter((item) => item.projectManager?._id === user._id);
      state.PM.projects = userProjects;
      if (tasks && tasks.length > 0) {
        let ids = userProjects.flatMap((item: Project) => item._id);
        let review = tasks.filter(
          (item) => ids.includes(item.projectId) && item.deadline === "Review"
        );
        let shared = tasks.filter(
          (item) => ids.includes(item.projectId) && item.deadline === "Shared"
        );
        let inprogress = tasks.filter(
          (item) => ids.includes(item.projectId) && item.status === "inProgress"
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
  },
});
export const { setStatisticsForOm, setStatisticsForPm } =
  StatisticsSlice.actions;
export default StatisticsSlice.reducer;
