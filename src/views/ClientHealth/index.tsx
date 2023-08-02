import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import TrackClientHealthTable from "./TrackTable";
import { RouteComponentProps } from "react-router";

interface CLientHealthProps extends RouteComponentProps {}

const CLientHealth: FC<CLientHealthProps> = (props) => {
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
              Client Health
            </Typography>
          </Grid>
        </Grid>
        <Grid xs={12} height={"auto"}>
          <TrackClientHealthTable />
        </Grid>
      </Grid>
    </>
  );
};

export default CLientHealth;
