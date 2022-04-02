import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import Badge from "@mui/material/Badge";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Avatar from "@mui/material/Avatar";
import profileImg from "./test.jpg";
import Button from "@mui/material/Button";

type Props = {};

const NotificationItem = (props: Props) => {
  return (
    <Grid container spacing={3} sx={{ pl: "1.5em" }}>
      <Grid item xs={12} sx={{ pl: "0 !important" }}>
        <Typography variant="h4" gutterBottom component="div">
          Recent Notification
        </Typography>
      </Grid>
      {[1, 2, 3].map((item) => (
        <Grid item container xs={12}>
          <Grid
            item
            container
            key={item}
            xs={6}
            sx={{
              background: "#f4f4f4",
              padding: "2em",
              borderRadius: "1em",
            }}
          >
            <Grid item xs={1}>
              <Badge
                overlap="circular"
                badgeContent={
                  <CircleNotificationsIcon
                    width=".7em"
                    height=".7em"
                    sx={{
                      color: "#00acba",
                    }}
                  />
                }
                invisible={false}
              >
                <Avatar alt="Remy Sharp" src={profileImg} />
              </Badge>
            </Grid>
            <Grid item container xs={10}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Product manager name
                </Typography>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={2}>
                  <Typography
                    variant="caption"
                    gutterBottom
                    component="div"
                    sx={{
                      color: "#acabab",
                    }}
                  >
                    Project name
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    variant="caption"
                    gutterBottom
                    component="div"
                    sx={{
                      color: "#acabab",
                    }}
                  >
                    12h
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ color: "#403f3f" }}>
                This is a test notification This is a test notification This is
                a test notification This is a test notification This is a test
                notification This is a test notification
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={6} textAlign="center">
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", pr: "2em", pl: "2em" }}
        >
          Load More
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotificationItem;
