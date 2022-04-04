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
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
          sx={{
            color: "#797979 !important",
          }}
        >
          The page contains project notifications. "Ex: Move the project to
          shared box."
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotificationHeader;
