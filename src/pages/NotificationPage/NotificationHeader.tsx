import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

type Props = {};

const NotificationHeader = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom component="div">
          Notificaiton
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotificationHeader;
