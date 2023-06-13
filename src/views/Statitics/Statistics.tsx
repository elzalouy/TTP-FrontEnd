import { Box, Grid, Skeleton, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import { selectAllProjects } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import { Task } from "src/types/models/Projects";

type time = {
  hours: number;
  mins: number;
  totalDurationsAndTimes: {
    taskId: string;
    times: number;
    movesTimesMins: number;
  }[];
};
type stateType = {
  tasks?: Task[];
  unClearTasksCount: number;
  schedulingAverage: time;
  loading: boolean;
  turnAroundAverage: time;
  fulFillmentAverage: time;
  reviewAverage: time;
  closingTimeAverage: time;
  taskCancelationTimes: time;
};
const initialMetrics = { hours: -1, mins: -1, totalDurationsAndTimes: [] };

const Statistics = (props: any) => {
  const [state, setState] = useState<stateType>({
    loading: true,
    unClearTasksCount: -1,
    schedulingAverage: initialMetrics,
    turnAroundAverage: initialMetrics,
    fulFillmentAverage: initialMetrics,
    reviewAverage: initialMetrics,
    closingTimeAverage: initialMetrics,
    taskCancelationTimes: initialMetrics,
  });
  const { allTasks } = useAppSelector(selectAllProjects);
  useEffect(() => {
    let State = { ...state };
    State.tasks = allTasks;
    State.unClearTasksCount = onSetUnClearTasksAndTimes(allTasks);
    State.schedulingAverage = onGetAverage(
      allTasks,
      "Tasks Board",
      "In Progress"
    );
    State.loading =
      State.schedulingAverage.hours >= 0 && State.unClearTasksCount >= 0
        ? false
        : true;
    State.turnAroundAverage = onGetAverage(
      allTasks,
      "Not Clear",
      "In Progress"
    );
    State.fulFillmentAverage = onGetAverage(allTasks, "In Progress", "Review");
    State.reviewAverage = onGetAverage(allTasks, "Review", "Shared");
    State.closingTimeAverage = onGetAverage(allTasks, "Shared", "Done");
    State.taskCancelationTimes = onGetAverage(
      allTasks,
      "Tasks Board",
      "Cancled"
    );
    setState(State);
  }, [allTasks]);

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
    const movementsMetrics = tasks.map((task) => {
      let movesTimes = task.movements
        .map((i, index) => {
          if (i.status === to && task.movements[index - 1]?.status === from)
            return getDifBetweenDates(
              new Date(task.movements[index - 1].movedAt),
              new Date(i.movedAt)
            ).totalMins;
          else return 0;
        })
        .filter((i) => i !== 0);
      return {
        taskId: task._id,
        times: movesTimes.length,
        movesTimesMins: _.sum(movesTimes),
      };
    });
    let turnAroundMins = _.sum(movementsMetrics.map((i) => i.movesTimesMins));
    let turned = movementsMetrics.filter((item) => item.times > 0).length;
    let averageMins = turnAroundMins / turned;
    let hours = Math.floor(averageMins / 60);
    let mins = Math.floor(averageMins % 60);
    console.log({ hours, mins, movementsMetrics });
    return { hours, mins, totalDurationsAndTimes: movementsMetrics };
  };

  return (
    <Grid
      container
      justifyContent={"flex-start"}
      alignItems={"center"}
      direction={"row"}
      bgcolor={"#FAFAFB"}
    >
      <Grid container xs={12} direction={"row"}>
        <Grid item xs={3} sm={3} md={3} lg={12} mb={4}>
          <Typography variant="h2" fontFamily={"Cairo"}>
            Statistics
          </Typography>
        </Grid>
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Scheduling Average time
        </Typography>
        {state.schedulingAverage.hours >= 0 && !state.loading ? (
          <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
            {state.schedulingAverage?.hours} hours,{" "}
            {state.schedulingAverage?.mins} mins
          </Typography>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          UnClear Tasks
        </Typography>
        {state.unClearTasksCount >= 0 && !state.loading ? (
          <Box display={"inline-flex"} pt={2}>
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              {state.unClearTasksCount} tasks went to Not Clear of{" "}
              {state.tasks?.length}
            </Typography>
            <Typography
              sx={{
                bgcolor: "#ffc500",
                color: "black",
                padding: 0.2,
                borderRadius: "5px",
                ml: 1,
              }}
            >
              {Math.floor(
                (state.unClearTasksCount / (state.tasks?.length ?? 0)) * 100
              )}{" "}
              %
            </Typography>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Turn Around Average time
        </Typography>
        {state.turnAroundAverage.hours >= 0 && !state.loading ? (
          <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
            {state.turnAroundAverage?.hours} hours,{" "}
            {state.turnAroundAverage?.mins} mins
          </Typography>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Fulfillment Average time
        </Typography>
        {state.fulFillmentAverage.hours >= 0 && !state.loading ? (
          <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
            {state.fulFillmentAverage?.hours} hours,{" "}
            {state.fulFillmentAverage?.mins} mins
          </Typography>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Review Average time
        </Typography>
        {state.reviewAverage.hours >= 0 && !state.loading ? (
          <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
            {state.reviewAverage?.hours} hours, {state.reviewAverage?.mins} mins
          </Typography>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Task Closing Average time
        </Typography>
        {state.closingTimeAverage.hours >= 0 && !state.loading ? (
          <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
            {state.closingTimeAverage?.hours} hours,{" "}
            {state.closingTimeAverage?.mins} mins
          </Typography>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Task Cancelation times
        </Typography>
        {state.closingTimeAverage.hours >= 0 && !state.loading ? (
          <Box pt={2}>
            <Typography sx={valueStyle}>
              {state.taskCancelationTimes.hours || 0} hours,{" "}
              {state.taskCancelationTimes.mins || 0} mins{" "}
            </Typography>
            <Typography sx={valueTimesStyle}>
              {state.taskCancelationTimes.totalDurationsAndTimes.length} times
            </Typography>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
    </Grid>
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
  p: 0,
};
const staticNumberItem = {
  background: "white",
  borderRadius: 1,
  padding: 1,
};
export default Statistics;
