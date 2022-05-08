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
      if (projects && tasks) {
        state.NoCompletedProjects = projects.filter(
          (item) => item.projectStatus === "done"
        ).length;
        state.NoCompletedTasks = tasks.filter(
          (item) => item.status === "done"
        ).length;
        state.PercentCompletedProjects =
          (projects.filter((item) => item.projectStatus === "done").length /
            projects.length) *
          100;
        state.PercentCompletedTasks =
          (tasks.filter((item) => item.status === "done").length /
            tasks.length) *
          100;
        let newTasks = tasks.filter((item) => {
          let { start: TaskStart } = getStartEndDayOfWeek(item.start);
          if (TaskStart.getTime() >= start.getTime()) return item;
        });
        state.NoNewTasks = newTasks.length;
        state.PercentNoNewTasks = (newTasks.length / tasks.length) * 100;
        state.NoCurruntProjects = projects.filter(
          (item) => item.projectStatus === "inProgress"
        ).length;
        state.PercentCurrentProjects =
          (projects.filter((item) => item.projectStatus === "inProgress")
            .length /
            projects.length) *
          100;
        state.loading = false;
      }
    },
  },
});
export const { setStatistics } = StatisticsSlice.actions;
export default StatisticsSlice.reducer;
