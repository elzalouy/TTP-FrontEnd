import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import _ from "lodash";
import StatisticsState, { StatisticsInterface } from "./statistics.state";
import { Project, Task } from "../Projects";
import {
  getStartEndDayOfWeek,
  isCloseToDeadline,
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
              isCloseToDeadline(new Date(item.projectDeadline))
          );
        }
        if (tasks && tasks.length > 0) {
          state.OM.Taskboard = tasks.filter(
            (item) => item.status === "inProgress"
          );
          state.OM.Review = tasks.filter((item) => item.status === "Review");
          state.OM.Shared = tasks.filter((item) => item.status === "Shared");
          state.OM.TasksCloseToDeadline = tasks.filter(
            (item) =>
              item.deadline && isCloseToDeadline(new Date(item.deadline))
          );
          state.OM.inProgress = tasks.filter(
            (item) => item.status === "inProgress"
          );
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
      console.log(userProjects);
      if (tasks && tasks.length > 0) {
        let ids = userProjects.flatMap((item: Project) => item._id);
        console.log(ids);
        state.PM.Review = tasks.filter(
          (item) => ids.includes(item.projectId) && item.deadline === "Review"
        );
        state.PM.Shared = tasks.filter(
          (item) => ids.includes(item.projectId) && item.deadline === "Shared"
        );
        state.PM.inProgress = tasks.filter(
          (item) => ids.includes(item.projectId) && item.status === "inProgress"
        );
        state.PM.TasksCloseToDeadline = tasks.filter(
          (item) =>
            ids.includes(item.projectId) &&
            item.deadline &&
            isCloseToDeadline(new Date(item.deadline))
        );
        state.PM.projectsCloseToDeadlines = userProjects?.filter(
          (item) =>
            item?.projectDeadline &&
            isCloseToDeadline(new Date(item?.projectDeadline))
        );
      }
      state.loading = false;
    },
  },
});
export const { setStatisticsForOm, setStatisticsForPm } =
  StatisticsSlice.actions;
export default StatisticsSlice.reducer;
