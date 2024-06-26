import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import _ from "lodash";
import StatisticsState, { StatisticsInterface } from "./statistics.state";
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
    setStatisticsFilterDefaults: (
      state: StatisticsInterface,
      action: PayloadAction<{ boards: string[]; date: Date }>
    ) => {
      state.statisticsFilter.date =
        action.payload.date ?? state.statisticsFilter.date;
      state.statisticsFilter.boards = action.payload.boards;
    },
    setProjectsStatistics: (
      state: StatisticsInterface,
      action: PayloadAction<any>
    ) => {
      let userProjects: Project[] = action.payload.projects;
      let user: User = action.payload.user;
      if (user.role !== "PM") {
        state.OM.projectsCloseToDeadlines = userProjects.filter((item) => {
          if (
            item.projectStatus &&
            ![
              "delivered on time",
              "delivered before deadline",
              "delivered after deadline",
            ].includes(item?.projectStatus) &&
            item.projectDeadline &&
            isCloseToDeadline(item.projectDeadline, item.startDate, 0.65)
          )
            return item;
        });
      } else {
        state.PM.projects = userProjects.length;
        state.PM.projectsCloseToDeadlines = userProjects.filter((item) => {
          if (
            item.projectStatus &&
            ![
              "delivered on time",
              "delivered before deadline",
              "delivered after deadline",
            ].includes(item?.projectStatus) &&
            item.projectDeadline &&
            isCloseToDeadline(item.projectDeadline, item.startDate, 0.65)
          )
            return item;
        });
      }
    },

    setTasksStatistics: (
      state: StatisticsInterface,
      action: PayloadAction<any>
    ) => {
      let userProjects: Project[] = action.payload.projects;
      let user: User = action.payload.user;
      let tasks: Task[] = [...action.payload.tasks];
      if (state.statisticsFilter.boards)
        tasks = tasks.filter((i) =>
          state.statisticsFilter.boards.includes(i.boardId)
        );
      if (state.statisticsFilter.date)
        tasks = tasks.filter(
          (i) =>
            new Date(i.createdAt).getTime() >=
            new Date(state.statisticsFilter.date).getTime()
        );
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
        state.OM.tasksCloseToDeadline = tasks.filter((item) => {
          let isClose =
            item.deadline && item.cardCreatedAt
              ? isCloseToDeadline(
                  item?.deadline,
                  item.cardCreatedAt.toString(),
                  0.75
                )
              : false;

          if (
            item.deadline &&
            isClose &&
            !["Done", "Cancled"].includes(item.status)
          )
            return item;
        });
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
        state.PM.projects = userProjects.length;
        state.PM.shared = shared;
        state.PM.reviewLength = review.length;
        state.PM.sharedLength = shared.length;
        state.PM.inProgress = setTasksToArrays(inprogress);
        state.PM.review = setTasksToArrays(review);
        state.PM.tasksCloseToDeadline = tasks.filter((item) => {
          let isClose = isCloseToDeadline(
            item.deadline,
            item.cardCreatedAt.toString(),
            0.75
          );
          if (
            item.deadline &&
            isClose &&
            !["Done", "Cancled"].includes(item.status)
          )
            return item;
        });
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
        projects: 0,
      };
      state.PM = {
        projects: 0,
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
  setStatisticsFilterDefaults,
} = StatisticsSlice.actions;
export default StatisticsSlice.reducer;
