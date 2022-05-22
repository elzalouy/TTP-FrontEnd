import { createSlice, Slice } from "@reduxjs/toolkit";
import _ from "lodash";
import StatisticsState, { StatisticsInterface } from "./statistics.state";
import { Project, Task } from "../Projects";
import { getStartEndDayOfWeek } from "../../helpers/equations";
const StatisticsSlice: Slice<StatisticsInterface> = createSlice({
  name: "projects",
  initialState: StatisticsState,
  reducers: {
    setStatistics: (state, action) => {
      state.loading = true;
      let { start } = getStartEndDayOfWeek(new Date());
      let projects: Project[] = action.payload.projects;
      let tasks: Task[] = action.payload.tasks;
      //projects
      if (projects && projects?.length > 0) {
        state.NoCompletedProjects = projects?.filter(
          (item) => item.projectStatus === "done"
        ).length;
        state.PercentCompletedProjects = Math.round(
          (projects?.filter((item) => item.projectStatus === "done").length /
            projects.length) *
            100
        );
        state.NoCurruntProjects = projects?.filter(
          (item) => item.projectStatus === "inProgress"
        ).length;
        state.PercentCurrentProjects = Math.round(
          (projects?.filter((item) => item.projectStatus === "inProgress")
            .length /
            projects.length) *
            100
        );
        state.NoCompletedTasks = tasks?.filter(
          (item) => item.status === "done"
        ).length;
      } else {
        state.NoCompletedProjects = 0;
        state.NoCurruntProjects = 0;
        state.PercentCompletedProjects = 0;
        state.PercentCurrentProjects = 0;
      }
      if (tasks && tasks?.length > 0) {
        state.PercentCompletedTasks = Math.round(
          (tasks?.filter((item) => item.status === "done").length /
            tasks.length) *
            100
        );
        let newTasks = tasks?.filter((item) => {
          let { start: TaskStart } = getStartEndDayOfWeek(item.start);
          if (TaskStart.getTime() >= start.getTime()) return item;
        });
        state.NoNewTasks = newTasks.length;
        state.PercentNoNewTasks = Math.round(
          (newTasks.length / tasks.length) * 100
        );
      } else {
        state.NoCompletedTasks = 0;
        state.NoNewTasks = 0;
        state.PercentCompletedTasks = 0;
        state.PercentNoNewTasks = 0;
      }
      state.loading = false;
    },
  },
});
export const { setStatistics } = StatisticsSlice.actions;
export default StatisticsSlice.reducer;
