import { Box, Grid, Skeleton, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import { selectAllProjects } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import { Task } from "src/types/models/Projects";

type stateType = {
  tasks: Task[];
};
const Statistics = (props: any) => {
  const [state, setState] = useState<stateType>({ tasks: [] });
  const { allTasks } = useAppSelector(selectAllProjects);
  useEffect(() => {
    setState({ tasks: allTasks });
  }, [allTasks]);
  const onSetSchedulingTimeAverage = () => {
    let ScheduledTasksTimes = allTasks.map((item) => {
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
    console.log({ average, hours, mins });
    return { hours, mins };
  };
  onSetSchedulingTimeAverage();
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"normal"}
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
      <Grid xs={5} sx={staticNumberItem}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          Scheduling Average
        </Typography>
        {onSetSchedulingTimeAverage().hours > 0 ? (
          <Typography sx={{ pt: 2, fontSize: 12, fontWeight: 500 }}>
            {onSetSchedulingTimeAverage().hours} hours,{" "}
            {onSetSchedulingTimeAverage().mins} mins
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
