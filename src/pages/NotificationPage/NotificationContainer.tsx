import { Grid } from "@mui/material";
import React from "react";
import NotificationFilter from "./NotificationFilter";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";

type Props = {};

const NotificationContainer = (props: Props) => {
  return (
    <Grid
      container
      sx={{ height: "fit-content", mt: "6em", bgcolor: "red" }}
      spacing={2}
    >
      <Grid item xs={12}>
        <NotificationHeader />
      </Grid>
      <Grid item xs={3}>
        <NotificationFilter />
      </Grid>
      <Grid item xs={12}>
        <NotificationItem />
      </Grid>
    </Grid>
  );
};

export default NotificationContainer;
