import { Box, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import { selectAllProjects } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import { Task } from "src/types/models/Projects";
import FilterMenu from "./FilterMenu";
import IMAGES from "src/assets/img/Images";
import TodByCategory from "./Diagrams/TimeOfDelivery(TOD)/ByCategory";
import { DialogOption } from "src/types/components/SelectDialog";
import { selectAllDepartments } from "src/models/Departments";
import BySharedMonth from "./Diagrams/TimeOfDelivery(TOD)/BySharedDate";

type time = {
  hours: number;
  mins: number;
  totalDurationsAndTimes: {
    taskId: string;
    times: number;
    movesTimesMins: number;
  }[];
  totalTimesInAllTasks: number;
};

type stateType = {
  filter: boolean;
  unClearTasksCount: number;
  schedulingAverage: time;
  loading: boolean;
  turnAroundAverage: time;
  fulFillmentAverage: time;
  reviewAverage: time;
  closingTimeAverage: time;
  taskCancelationTimes: time;
  taskDistrubingTimes: time;
  taskFlaggedTimesFromReview: time;
  taskFlaggedTimesFromShared: time;
  unClearBackToTasksBoardTimes: time;
  wrongFulfillmentTimes: time;
  commentsOrChangedTimes: time;
  revisitingTasksTimes: time;
  revivedTasksTimes: time;
};

const initialMetrics: time = {
  hours: -1,
  mins: -1,
  totalDurationsAndTimes: [],
  totalTimesInAllTasks: -1,
};

const Statistics = (props: any) => {
  const [state, setState] = useState<stateType>({
    filter: false,
    loading: true,
    unClearTasksCount: -1,
    schedulingAverage: initialMetrics,
    turnAroundAverage: initialMetrics,
    fulFillmentAverage: initialMetrics,
    reviewAverage: initialMetrics,
    closingTimeAverage: initialMetrics,
    taskCancelationTimes: initialMetrics,
    taskDistrubingTimes: initialMetrics,
    taskFlaggedTimesFromReview: initialMetrics,
    taskFlaggedTimesFromShared: initialMetrics,
    unClearBackToTasksBoardTimes: initialMetrics,
    wrongFulfillmentTimes: initialMetrics,
    commentsOrChangedTimes: initialMetrics,
    revisitingTasksTimes: initialMetrics,
    revivedTasksTimes: initialMetrics,
  });
  const { allTasks, loading } = useAppSelector(selectAllProjects);
  const departments = useAppSelector(selectAllDepartments);
  const [globalState, setGlobalState] = useState({
    tasks: allTasks,
    filterResult: allTasks,
  });

  const onSelectedBoard = () => {
    let values: DialogOption[] = departments
      .filter((item) => item.priority === 1)
      .map((item) => {
        return { id: item.boardId, label: item.name };
      });
    let tasks = [...allTasks];
    let ids = values.map((value) => value.id);
    if (ids.length > 0)
      tasks = tasks.filter((item) => ids.includes(item.boardId));
    setGlobalState({
      ...globalState,
      tasks: tasks,
      filterResult: tasks,
    });
  };

  useEffect(() => {
    onSelectedBoard();
  }, [allTasks]);

  useEffect(() => {
    let State = { ...state };
    State.unClearTasksCount = onSetUnClearTasksAndTimes(
      globalState.filterResult
    );
    State.schedulingAverage = onGetAverage(
      globalState.filterResult,
      "Tasks Board",
      "In Progress"
    );

    State.turnAroundAverage = onGetAverage(
      globalState.filterResult,
      "Not Clear",
      "In Progress"
    );
    State.fulFillmentAverage = onGetAverage(
      globalState.filterResult,
      "In Progress",
      "Review"
    );
    State.reviewAverage = onGetAverage(
      globalState.filterResult,
      "Review",
      "Shared"
    );
    State.closingTimeAverage = onGetAverage(
      globalState.filterResult,
      "Shared",
      "Done"
    );
    State.taskCancelationTimes = onGetAverage(
      globalState.filterResult,
      "Tasks Board",
      "Cancled"
    );
    State.taskDistrubingTimes = onGetAverage(
      globalState.filterResult,
      "In Progress",
      "Cancled"
    );
    State.taskFlaggedTimesFromReview = onGetAverage(
      globalState.filterResult,
      "Review",
      "Cancled"
    );
    State.taskFlaggedTimesFromShared = onGetAverage(
      globalState.filterResult,
      "Shared",
      "Cancled"
    );
    State.unClearBackToTasksBoardTimes = onGetAverage(
      globalState.filterResult,
      "Not Clear",
      "Tasks Board"
    );
    State.wrongFulfillmentTimes = onGetAverage(
      globalState.filterResult,
      "Review",
      "Tasks Board"
    );
    State.commentsOrChangedTimes = onGetAverage(
      globalState.filterResult,
      "Shared",
      "Tasks Board"
    );
    State.revisitingTasksTimes = onGetAverage(
      globalState.filterResult,
      "Done",
      "Tasks Board"
    );
    State.revivedTasksTimes = onGetAverage(
      globalState.filterResult,
      "Cancled",
      "Tasks Board"
    );
    State.loading = false;
    setState(State);
  }, [globalState.filterResult]);

  /**
   * onSetSchedulingTimeAverage
   *
   * total average of the hours and minutes that any task take for scheduling the task.
   * This time depends on how many task existed and how much each task take to move from "Tasks Board" to "In Progress"
   * @returns number
   */
  const onSetUnClearTasksAndTimes = (tasks: Task[]) => {
    const unClearTasksCount = tasks?.filter((item) => {
      let move = item.movements.find((m, index) => {
        if (
          item.movements[index - 1] &&
          ["Tasks Board", "In Progress"].includes(
            item.movements[index - 1]?.status
          ) &&
          m.status === "Not Clear"
        )
          return m;
      });
      if (move) return item;
    });
    return unClearTasksCount.length;
  };

  /**
   * onGetAverage
   *
   * getting the movements durations and times for a specific movement history with its total hours and minutes
   * @param tasks Array
   * @param from string
   * @param to string
   * @returns object
   */

  const onGetAverage = (tasks: Task[], from: string, to: string) => {
    const movementsMetrics = tasks
      .map((task) => {
        let movesTimes = task.movements
          .filter((item, index) => {
            if (
              item.status === to &&
              task.movements[index - 1]?.status === from
            )
              return item;
          })
          .map((i) => {
            let index = task.movements.findIndex(
              (toItem) => toItem._id === i._id
            );
            let from = task.movements[index - 1];
            return getDifBetweenDates(
              new Date(from.movedAt),
              new Date(i.movedAt)
            ).totalMins;
          });
        return {
          taskId: task._id,
          times: movesTimes.length,
          movesTimesMins: _.sum(movesTimes),
        };
      })
      .filter((task) => task.times > 0);
    let turnAroundMins = _.sum(movementsMetrics.map((i) => i.movesTimesMins));
    let turned = movementsMetrics.filter((item) => item.times > 0).length;
    let averageMins = turnAroundMins / turned;
    let hours = !isNaN(Math.floor(averageMins / 60))
      ? Math.floor(averageMins / 60)
      : 0;
    let mins = !isNaN(Math.floor(averageMins % 60))
      ? Math.floor(averageMins % 60)
      : 0;
    return {
      hours,
      mins,
      totalDurationsAndTimes: movementsMetrics,
      totalTimesInAllTasks: _.sum(movementsMetrics.map((i) => i.times)),
    };
  };

  return (
    <>
      <Grid
        container
        justifyContent={"flex-start"}
        alignItems={"center"}
        direction={"row"}
        bgcolor={"#FAFAFB"}
      >
        <Grid container xs={12} direction={"row"}>
          <Grid item xs={10} mb={4}>
            <Typography variant="h2" fontFamily={"Cairo"}>
              Statistics
            </Typography>
          </Grid>
          <Grid xs={2}>
            <IconButton
              disableRipple
              onClick={() => setState({ ...state, filter: !state.filter })}
              sx={filterBtnStyle}
            >
              <img
                src={state.filter ? IMAGES.filtericonwhite : IMAGES.filtericon}
                alt="FILTER"
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid xs={12} height={"auto"}>
          <TodByCategory />
        </Grid>
        <Grid xs={12} height={"auto"}>
          <BySharedMonth />
        </Grid>
      </Grid>
    </>
  );
};
const valueStyle = {
  fontSize: 12,
  fontWeight: 500,
  float: "left",
};

const valueTimesStyle = {
  ...valueStyle,
  background: "#ffc500",
  borderRadius: "3px",
  ml: 1,
  p: "5px",
};

const staticNumberItem = {
  background: "white",
  borderRadius: 1,
  padding: 1,
  minHeight: "100px",
};
export default Statistics;
const filterBtnStyle = {
  bgcolor: "white",
  borderRadius: 3,
  paddingTop: 1.2,
  float: "right",
  cursor: "pointer",
  width: "38px",
  height: "38px",
  textAlign: "center",
};
