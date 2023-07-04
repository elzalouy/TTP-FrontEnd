import { Box, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import { selectAllProjects } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import { Task } from "src/types/models/Projects";
import FilterMenu from "./FilterMenu";
import IMAGES from "src/assets/img/Images";

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
  const [globalState, setGlobalState] = useState({
    tasks: allTasks,
    filterResult: allTasks,
  });

  useEffect(() => {
    setGlobalState({
      ...globalState,
      tasks: allTasks,
      filterResult: allTasks,
    });
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
  useEffect(() => {}, []);
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
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Scheduling Average time
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The average time any task take to go from the tasks board list to
            the in progress list.
          </Typography>
          {!state.loading && !loading ? (
            <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
              {state.schedulingAverage?.hours ?? 0} hours,{" "}
              {state.schedulingAverage?.mins ?? 0} mins
            </Typography>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            UnClear Tasks
          </Typography>

          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The number of tasks became not clear.
          </Typography>
          {!state.loading && !loading ? (
            <Box display={"inline-flex"} pt={2}>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                {state.unClearTasksCount ?? 0} tasks went to Not Clear of{" "}
                {globalState.filterResult?.length ?? 0}
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
                {!isNaN(
                  Math.floor(
                    (state.unClearTasksCount /
                      globalState.filterResult?.length) *
                      100
                  )
                )
                  ? Math.floor(
                      (state.unClearTasksCount /
                        globalState.filterResult?.length) *
                        100
                    )
                  : 0}{" "}
                %
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Turn Around Average time
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The average time any task take to go back to in progress after
            becaming not clear.
          </Typography>
          {!state.loading && !loading ? (
            <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
              {state.turnAroundAverage?.hours ?? 0} hours,{" "}
              {state.turnAroundAverage?.mins ?? 0} mins
            </Typography>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Fulfillment Average time
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The average time of processing the task and move it from In Progress
            to be under the Review list.
          </Typography>
          {!state.loading && !loading ? (
            <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
              {state.fulFillmentAverage?.hours ?? 0} hours,{" "}
              {state.fulFillmentAverage?.mins ?? 0} mins
            </Typography>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Review Average time
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The average time any task takes to go back to in progress after
            becoming not clear.
          </Typography>
          {!state.loading && !loading ? (
            <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
              {state.reviewAverage?.hours ?? 0} hours,{" "}
              {state.reviewAverage?.mins ?? 0} mins
            </Typography>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Task Closing Average time
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The average time of Closing the task and moving it from Shared to
            the Done list.
          </Typography>
          {!state.loading && !loading ? (
            <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
              {state.closingTimeAverage?.hours ?? 0} hours,{" "}
              {state.closingTimeAverage?.mins ?? 0} mins
            </Typography>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Task Cancelation times
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The total times of canceling the task and moving it from the Tasks
            Board to be under the Cancel list.
          </Typography>
          {!state.loading && !loading ? (
            <Box pt={2} display={"flex"} alignItems={"center"}>
              <Typography sx={valueStyle}>
                {state.taskCancelationTimes.hours ?? 0} hours,{" "}
                {state.taskCancelationTimes.mins ?? 0} mins{" "}
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.taskCancelationTimes.totalDurationsAndTimes.length}{" "}
                Cancelled tasks
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.taskCancelationTimes.totalTimesInAllTasks} times
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Task Disturbing times
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The total times of Disturbing the task and move it from In Progress
            to be under the Cancelled list.
          </Typography>
          {!state.loading && !loading ? (
            <Box pt={2} display={"flex"} alignItems={"center"}>
              <Typography sx={valueStyle}>
                {state.taskDistrubingTimes.hours ?? 0} hours,{" "}
                {state.taskDistrubingTimes.mins ?? 0} mins{" "}
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.taskDistrubingTimes.totalDurationsAndTimes.length}{" "}
                Disturbed tasks
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.taskDistrubingTimes.totalTimesInAllTasks} times
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Flagged from the Review
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The total times and the average duration of canceling the task and
            move it from the Review list to the Cancled list.
          </Typography>
          {!state.loading && !loading ? (
            <Box pt={2} display={"flex"} alignItems={"center"}>
              <Typography sx={valueStyle}>
                {state.taskFlaggedTimesFromReview.hours ?? 0} hours,{" "}
                {state.taskFlaggedTimesFromReview.mins ?? 0} mins{" "}
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.taskFlaggedTimesFromReview.totalDurationsAndTimes.length}{" "}
                Flagged Tasks
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.taskFlaggedTimesFromReview.totalTimesInAllTasks} times
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Flagged From Shared
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The total times and the average duration of canceling the task and
            move it from the Shared list to the Cancled list.
          </Typography>
          {!state.loading && !loading ? (
            <Box pt={2} display={"flex"} alignItems={"center"}>
              <Typography sx={valueStyle}>
                {state.taskFlaggedTimesFromShared.hours || 0} hours,{" "}
                {state.taskFlaggedTimesFromShared.mins || 0} mins{" "}
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.taskFlaggedTimesFromShared.totalDurationsAndTimes.length}{" "}
                Flagged Tasks
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.taskFlaggedTimesFromShared.totalTimesInAllTasks} times
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Unclear Back
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The total times and the average duration of moving the tasks to
            Tasks Board from Not Clear.
          </Typography>
          {!state.loading && !loading ? (
            <Box pt={2} display={"flex"} alignItems={"center"}>
              <Typography sx={valueStyle}>
                {state.unClearBackToTasksBoardTimes.hours ?? 0} hours,{" "}
                {state.unClearBackToTasksBoardTimes.mins ?? 0} mins{" "}
              </Typography>
              <Typography sx={valueTimesStyle}>
                {
                  state.unClearBackToTasksBoardTimes.totalDurationsAndTimes
                    .length
                }
                Tasks
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.unClearBackToTasksBoardTimes.totalTimesInAllTasks} times
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Wrong or missing Fulfillment
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The average duration and number of moves that happened for the tasks
            from Review to Tasks Board.
          </Typography>
          {!state.loading && !loading ? (
            <Box pt={2} display={"flex"} alignItems={"center"}>
              <Typography sx={valueStyle}>
                {state.wrongFulfillmentTimes.hours ?? 0} hours,{" "}
                {state.wrongFulfillmentTimes.mins ?? 0} mins{" "}
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.wrongFulfillmentTimes.totalDurationsAndTimes.length}{" "}
                Tasks
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.wrongFulfillmentTimes.totalTimesInAllTasks} times
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Comments or Changes
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The average duration and number of moves that happened for the tasks
            from Shared to Tasks Board.
          </Typography>
          {!state.loading && !loading ? (
            <Box pt={2} display={"flex"} alignItems={"center"}>
              <Typography sx={valueStyle}>
                {state.commentsOrChangedTimes.hours ?? 0} hours,{" "}
                {state.commentsOrChangedTimes.mins ?? 0} mins{" "}
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.commentsOrChangedTimes.totalDurationsAndTimes.length}{" "}
                Tasks
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.commentsOrChangedTimes.totalTimesInAllTasks} times
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Revisiting times and average
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The average duration and the number of moves that happened for the
            tasks from Done to Tasks Board.
          </Typography>
          {!state.loading && !loading ? (
            <Box pt={2} display={"flex"} alignItems={"center"}>
              <Typography sx={valueStyle}>
                {state.revisitingTasksTimes.hours ?? 0} hours,{" "}
                {state.revisitingTasksTimes.mins ?? 0} mins{" "}
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.revisitingTasksTimes.totalDurationsAndTimes.length} Tasks
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.revisitingTasksTimes.totalTimesInAllTasks} times
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
        <Grid mb={1} ml={1} xs={5.9} sx={staticNumberItem}>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Revived times and average
          </Typography>
          <Typography sx={{ color: "gray", fontSize: 12 }}>
            The average duration and the number of moves that happened for the
            tasks from Canceled to Tasks Board.
          </Typography>
          {!state.loading && !loading ? (
            <Box pt={2} display={"flex"} alignItems={"center"}>
              <Typography sx={valueStyle}>
                {state.revivedTasksTimes.hours ?? 0} hours,{" "}
                {state.revivedTasksTimes.mins ?? 0} mins{" "}
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.revivedTasksTimes.totalDurationsAndTimes.length} Tasks
              </Typography>
              <Typography sx={valueTimesStyle}>
                {state.revivedTasksTimes.totalTimesInAllTasks} times
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
          )}
        </Grid>
      </Grid>
      <FilterMenu
        filter={state.filter}
        onSetFilterResult={(filterResult: Task[]) =>
          setGlobalState({ ...globalState, filterResult: filterResult })
        }
        onCloseFilter={() => setState({ ...state, filter: false })}
      />
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
