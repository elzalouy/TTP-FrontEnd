import { Grid, Typography } from "@mui/material";
import React from "react";
import StatisticsItem from "./StatisticsItem";

const Statistics = (props: any) => {
  return (
    <Grid
      container
      overflow={"hidden"}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent="center"
    >
      <Grid container xs={12} direction={"row"}>
        <Grid item xs={3} sm={3} md={3} lg={12} mb={4}>
          <Typography variant="h2" fontFamily={"Cairo"}>
            Statistics
          </Typography>
        </Grid>
        <iframe
          title="Mongo Charts"
          style={{
            background: "transparent",
            border: "none",
            borderRadius: "2px",
            width: "100%",
            minHeight: "100vh",
            height: "fit-content",
          }}
          src="https://charts.mongodb.com/charts-project-0-tfstk/embed/dashboards?id=63da3210-4370-40d0-88fc-bdb19c6a8dcf&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
        ></iframe>
      </Grid>
    </Grid>
  );
};

export default Statistics;
