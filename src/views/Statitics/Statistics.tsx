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
  taskDistrubingTimes: time;
  taskFlaggedTimesFromReview: time;
  taskFlaggedTimesFromShared: time;
  unClearBackToTasksBoardTimes: time;
  wrongFulfillmentTimes: time;
  commentsOrChangedTimes: time;
  revisitingTasksTimes: time;
  revivedTasksTimes: time;
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
    taskDistrubingTimes: initialMetrics,
    taskFlaggedTimesFromReview: initialMetrics,
    taskFlaggedTimesFromShared: initialMetrics,
    unClearBackToTasksBoardTimes: initialMetrics,
    wrongFulfillmentTimes: initialMetrics,
    commentsOrChangedTimes: initialMetrics,
    revisitingTasksTimes: initialMetrics,
    revivedTasksTimes: initialMetrics,
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
    State.taskDistrubingTimes = onGetAverage(
      allTasks,
      "In Progress",
      "Cancled"
    );
    State.taskFlaggedTimesFromReview = onGetAverage(
      allTasks,
      "Review",
      "Cancled"
    );
    State.taskFlaggedTimesFromShared = onGetAverage(
      allTasks,
      "Shared",
      "Cancled"
    );
    State.unClearBackToTasksBoardTimes = onGetAverage(
      allTasks,
      "Not Clear",
      "Tasks Board"
    );
    State.wrongFulfillmentTimes = onGetAverage(
      allTasks,
      "Review",
      "Tasks Board"
    );
    State.commentsOrChangedTimes = onGetAverage(
      allTasks,
      "Shared",
      "Tasks Board"
    );
    State.revisitingTasksTimes = onGetAverage(allTasks, "Done", "Tasks Board");
    State.revivedTasksTimes = onGetAverage(allTasks, "Cancled", "Tasks Board");
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
    let hours = Math.floor(averageMins / 60);
    let mins = Math.floor(averageMins % 60);
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
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average time any task take to go from the tasks board list to the
          in progress list.
        </Typography>
        {!state.loading ? (
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

        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The number of tasks became not clear.
        </Typography>
        {!state.loading ? (
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
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average time any task take to go back to in progress after
          becaming not clear.
        </Typography>
        {!state.loading ? (
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
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average time of processing the task and move it from In Progress
          to be under the Review list.
        </Typography>
        {!state.loading ? (
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
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average time of Reviewing the task and move it from Review to be
          under the Shared list with the client.
        </Typography>
        {!state.loading ? (
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
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average time of Closing the task and move it from Shared to be
          under the Done list.
        </Typography>
        {!state.loading ? (
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
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The total times of canceling the task and move it from Tasks Board to
          be under the Cancel list.
        </Typography>
        {!state.loading ? (
          <Box pt={2} display={"flex"} alignItems={"center"}>
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
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Task Disturbing times
        </Typography>
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The total times of Disturbing the task and move it from In Progress to
          be under the Cancelled list.
        </Typography>
        {!state.loading ? (
          <Box pt={2} display={"flex"} alignItems={"center"}>
            <Typography sx={valueStyle}>
              {state.taskDistrubingTimes.hours || 0} hours,{" "}
              {state.taskDistrubingTimes.mins || 0} mins{" "}
            </Typography>
            <Typography sx={valueTimesStyle}>
              {state.taskDistrubingTimes.totalDurationsAndTimes.length} times
            </Typography>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Task Flagged From Review times
        </Typography>
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The total times of canceling the task and move it from the Review list
          to the Cancled list.
        </Typography>
        {!state.loading ? (
          <Box pt={2} display={"flex"} alignItems={"center"}>
            <Typography sx={valueStyle}>
              {state.taskFlaggedTimesFromReview.hours || 0} hours,{" "}
              {state.taskFlaggedTimesFromReview.mins || 0} mins{" "}
            </Typography>
            <Typography sx={valueTimesStyle}>
              {state.taskFlaggedTimesFromReview.totalDurationsAndTimes.length}{" "}
              times
            </Typography>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Task Flagged From Shared times
        </Typography>
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The total times of canceling the task and move it from the Shared list
          to the Cancled list.
        </Typography>
        {!state.loading ? (
          <Box pt={2} display={"flex"} alignItems={"center"}>
            <Typography sx={valueStyle}>
              {state.taskFlaggedTimesFromShared.hours || 0} hours,{" "}
              {state.taskFlaggedTimesFromShared.mins || 0} mins{" "}
            </Typography>
            <Typography sx={valueTimesStyle}>
              {state.taskFlaggedTimesFromShared.totalDurationsAndTimes.length}{" "}
              times
            </Typography>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Task unclear back times
        </Typography>
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average number of moving the tasks to Tasks Board from Not Clear.
        </Typography>
        {!state.loading ? (
          <Box pt={2} display={"flex"} alignItems={"center"}>
            <Typography sx={valueStyle}>
              {state.unClearBackToTasksBoardTimes.hours || 0} hours,{" "}
              {state.unClearBackToTasksBoardTimes.mins || 0} mins{" "}
            </Typography>
            <Typography sx={valueTimesStyle}>
              {state.unClearBackToTasksBoardTimes.totalDurationsAndTimes.length}{" "}
              times
            </Typography>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Tasks Wrong or missing Fulfillment times
        </Typography>
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average duration and number of moves happened for the tasks from
          Review to Tasks Board
        </Typography>
        {!state.loading ? (
          <Box pt={2} display={"flex"} alignItems={"center"}>
            <Typography sx={valueStyle}>
              {state.wrongFulfillmentTimes.hours || 0} hours,{" "}
              {state.wrongFulfillmentTimes.mins || 0} mins{" "}
            </Typography>
            <Typography sx={valueTimesStyle}>
              {state.wrongFulfillmentTimes.totalDurationsAndTimes.length} times
            </Typography>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Tasks with comments or changes times
        </Typography>
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average duration and number of moves happened for the tasks from
          Shared to Tasks Board
        </Typography>
        {!state.loading ? (
          <Box pt={2} display={"flex"} alignItems={"center"}>
            <Typography sx={valueStyle}>
              {state.commentsOrChangedTimes.hours || 0} hours,{" "}
              {state.commentsOrChangedTimes.mins || 0} mins{" "}
            </Typography>
            <Typography sx={valueTimesStyle}>
              {state.commentsOrChangedTimes.totalDurationsAndTimes.length} times
            </Typography>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Tasks with Revisiting times
        </Typography>
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average duration and number of moves happened for the tasks from
          Done to Tasks Board
        </Typography>
        {!state.loading ? (
          <Box pt={2} display={"flex"} alignItems={"center"}>
            <Typography sx={valueStyle}>
              {state.revisitingTasksTimes.hours || 0} hours,{" "}
              {state.revisitingTasksTimes.mins || 0} mins{" "}
            </Typography>
            <Typography sx={valueTimesStyle}>
              {state.revisitingTasksTimes.totalDurationsAndTimes.length} times
            </Typography>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid mb={1} ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Tasks with Revived times
        </Typography>
        <Typography sx={{ color: "gray", fontSize: 12 }}>
          The average duration and number of moves happened for the tasks from
          Canceled to Tasks Board
        </Typography>
        {!state.loading ? (
          <Box pt={2} display={"flex"} alignItems={"center"}>
            <Typography sx={valueStyle}>
              {state.revivedTasksTimes.hours || 0} hours,{" "}
              {state.revivedTasksTimes.mins || 0} mins{" "}
            </Typography>
            <Typography sx={valueTimesStyle}>
              {state.revivedTasksTimes.totalDurationsAndTimes.length} times
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
  p: "5px",
};

const staticNumberItem = {
  background: "white",
  borderRadius: 1,
  padding: 1,
};
export default Statistics;
