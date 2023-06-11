import { Box, Grid, Skeleton, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import { selectAllProjects, selectNotClearTasks } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import { Task } from "src/types/models/Projects";

type stateType = {
  tasks: Task[];
};
const Statistics = (props: any) => {
  const [state, setState] = useState<stateType>({ tasks: [] });
  const { allTasks, loading } = useAppSelector(selectAllProjects);
  console.log(loading);
  useEffect(() => {
    setState({ tasks: allTasks });
  }, [allTasks]);

  /**
   * onSetSchedulingTimeAverage
   *
   * total average of the hours and minutes that any task take for scheduling the task.
   * This time depends on how many task existed and how much each task take to move from "Tasks Board" to "In Progress"
   * @returns number
   */
  const onSetSchedulingTimeAverage = () => {
    if (state.tasks) {
      let ScheduledTasksTimes = state.tasks.map((item) => {
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
    } else return null;
  };

  /**
   * onSetUnClearTaskAndTimes
   *
   * the time it take till the task goes from "Tasks Board" or "In Progress" to "Not Clear"
   */
  const onSetUnClearTasksAndTimes = () => {
    const unClearTasksCount = state?.tasks?.filter((item) => {
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
    return unClearTasksCount;
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
      <Grid ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Scheduling Average
        </Typography>
        {onSetSchedulingTimeAverage() !== null ? (
          <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
            {onSetSchedulingTimeAverage()?.hours} hours,{" "}
            {onSetSchedulingTimeAverage()?.mins} mins
          </Typography>
        ) : (
          <Skeleton variant="text" width={200} height={35} sx={{ pt: 2 }} />
        )}
      </Grid>
      <Grid ml={1} xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          UnClear Tasks
        </Typography>

        {onSetUnClearTasksAndTimes() !== null ? (
          <Box display={"inline-flex"} pt={2}>
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              {onSetUnClearTasksAndTimes()?.length} tasks went to Not Clear of{" "}
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
                (onSetUnClearTasksAndTimes().length / state.tasks?.length) * 100
              )}{" "}
              %
            </Typography>
          </Box>
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
