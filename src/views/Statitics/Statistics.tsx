import { Grid, IconButton, Typography } from "@mui/material";
import _ from "lodash";
import React, { useState } from "react";
import TodByCategory from "./Diagrams/TimeOfDelivery(TOD)/ByCategory";
import BySharedMonth from "./Diagrams/TimeOfDelivery(TOD)/BySharedDate/BySharedDate";
import TrackClientHealthTable from "./Diagrams/ClientHealthTracker/TrackTable";
import MeetDeadline from "./Diagrams/MeetDeadline/MeetDeadline";
import NoOfRevision from "./Diagrams/NoOfRevision/NoOfRevision";

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
  loading: boolean;
};

const Statistics = (props: any) => {
  const [state, setState] = useState<stateType>({
    filter: false,
    loading: true,
  });

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
        </Grid>
        <Grid xs={12} height={"auto"}>
          <TodByCategory />
        </Grid>
        <Grid xs={12} height={"auto"}>
          <BySharedMonth />
        </Grid>
        <Grid xs={12} height={"auto"}>
          <TrackClientHealthTable />
        </Grid>
        <Grid xs={12} height={"auto"}>
          <MeetDeadline />
        </Grid>
        <Grid xs={12} height={"auto"}>
          <NoOfRevision />
        </Grid>
      </Grid>
    </>
  );
};

export default Statistics;
