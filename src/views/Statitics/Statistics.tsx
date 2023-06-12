import { Box, Grid, Skeleton, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import { selectAllProjects, selectNotClearTasks } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import { Task } from "src/types/models/Projects";

type stateType = {
  tasks?: Task[];
  unClearTasksCount: number;
  schedulingAverage: { hours: number; mins: number };
  loading: boolean;
  turnAroundAverage: { hours: number; mins: number };
  fulFillmentAverage: { hours: number; mins: number };
};
const Statistics = (props: any) => {
  const [state, setState] = useState<stateType>({
    loading: true,
    unClearTasksCount: -1,
    schedulingAverage: { hours: -1, mins: -1 },
    turnAroundAverage: { hours: -1, mins: -1 },
    fulFillmentAverage: { hours: -1, mins: -1 },
  });
  const { allTasks } = useAppSelector(selectAllProjects);
  useEffect(() => {
    let State = { ...state };
    State.tasks = allTasks;
    State.unClearTasksCount = onSetUnClearTasksAndTimes(allTasks);
    State.schedulingAverage = onSetSchedulingTimeAverage(allTasks);
    State.loading =
      State.schedulingAverage.hours >= 0 && State.unClearTasksCount >= 0
        ? false
        : true;
    State.turnAroundAverage = onSetTurnAround(allTasks);
    State.fulFillmentAverage = onSetFulfillment(allTasks);
    setState(State);
  }, [allTasks]);

  /**
   * onSetSchedulingTimeAverage
   *
   * total average of the hours and minutes that any task take for scheduling the task.
   * This time depends on how many task existed and how much each task take to move from "Tasks Board" to "In Progress"
   * @returns number
   */
  const onSetSchedulingTimeAverage = (tasks: Task[]) => {
    let ScheduledTasksTimes = tasks?.map((item) => {
      let boardMoveIndex = item.movements.findIndex(
        (i) => i.status === "Tasks Board"
      );
      let inProgressMoveIndex = item.movements.findIndex(
        (i, index) => i.status === "In Progress" && index > boardMoveIndex
      );
      if (boardMoveIndex >= 0 && inProgressMoveIndex >= 0) {
        let { totalMins } = getDifBetweenDates(
          new Date(item.movements[boardMoveIndex]?.movedAt),
          new Date(item.movements[inProgressMoveIndex]?.movedAt)
        );
        return totalMins;
      } else return 0;
    });
    ScheduledTasksTimes = ScheduledTasksTimes.filter((i) => i !== 0);
    let average = Math.floor(
      _.sum(ScheduledTasksTimes) / ScheduledTasksTimes.length
    );
    let hours = Math.floor(average / 60);
    let mins = Math.floor(average % 60);
    return { hours, mins };
  };

  /**
   * onSetUnClearTaskAndTimes
   *
   * the time it take till the task goes from "Tasks Board" or "In Progress" to "Not Clear"
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
   * onSetTurnAround
   *
   * turnAround is the time that any task take to be moved from Not Clear to In Progress.
   * @param tasks Tasks[]
   * @returns {hours:number;mins:nunmber;}
   */
  const onSetTurnAround = (tasks: Task[]) => {
    const TurnArountTimesPerTask = tasks.map((task) => {
      let turnMoves = task.movements
        .map((i, index) => {
          if (
            i.status === "In Progress" &&
            task.movements[index - 1]?.status === "Not Clear"
          )
            return getDifBetweenDates(
              new Date(task.movements[index - 1].movedAt),
              new Date(i.movedAt)
            ).totalMins;
          else return 0;
        })
        .filter((i) => i !== 0);
      return {
        taskId: task._id,
        times: turnMoves.length,
        turnMovesMins: _.sum(turnMoves),
      };
    });
    let turnAroundMins = _.sum(
      TurnArountTimesPerTask.map((i) => i.turnMovesMins)
    );
    let turned = TurnArountTimesPerTask.filter((item) => item.times > 0).length;
    let averageMins = turnAroundMins / turned;
    let hours = Math.floor(averageMins / 60);
    let mins = Math.floor(averageMins % 60);
    return { hours, mins };
  };

  const onSetFulfillment = (tasks: Task[]) => {
    const fullFilmentMoves = tasks.map((task) => {
      let fullfilmentsMins = task.movements
        .map((i, index) => {
          if (
            i.status === "Review" &&
            task.movements[index - 1]?.status === "In Progress"
          )
            return getDifBetweenDates(
              new Date(task.movements[index - 1].movedAt),
              new Date(i.movedAt)
            ).totalMins;
          else return 0;
        })
        .filter((i) => i !== 0);
      return {
        taskId: task._id,
        times: fullfilmentsMins.length,
        fullfilmentsMins: _.sum(fullfilmentsMins),
      };
    });
    let fullFillmentsMins = _.sum(
      fullFilmentMoves.map((i) => i.fullfilmentsMins)
    );
    let fulledMoves = fullFilmentMoves.filter((i) => i.times > 0).length;
    let averageMins = (fulledMoves = fullFillmentsMins / fulledMoves);
    let hours = Math.floor(averageMins / 60);
    let mins = Math.floor(averageMins % 60);
    return { hours, mins };
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
    </Grid>
  );
};

const staticNumberItem = {
  background: "white",
  borderRadius: 1,
  padding: 1,
};
export default Statistics;
