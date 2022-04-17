import { Grid } from "@mui/material";
import React from "react";
import NotificationFilter from "./NotificationFilter";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";

type Props = {};

const NotificationContainer = (props: Props) => {
  return (
    <Grid container paddingX={4} spacing={2} bgcolor="#FAFAFB">
      <Grid item xs={12}>
        <NotificationHeader />
      </Grid>
      <Grid item xs={12}>
        <NotificationFilter />
      </Grid>
      <Grid item xs={12}>
        <NotificationItem />
      </Grid>
    </Grid>
  );
};

export default NotificationContainer;
