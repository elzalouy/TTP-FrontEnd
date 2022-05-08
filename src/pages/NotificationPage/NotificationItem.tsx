import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import Badge from "@mui/material/Badge";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Avatar from "@mui/material/Avatar";
import profileImg from "./test.jpg";
import Button from "@mui/material/Button";
import moment from 'moment'

type Props = {
  notifiData:object[]
};

const NotificationItem = ({notifiData}: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          fontFamily={"Poppins"}
        >
          Recent Notification
        </Typography>
      </Grid>
      {notifiData.map((item:any) => (
        <Grid item container xs={12} key={item._id}>
          <Grid
            paddingX={1}
            paddingY={3}
            item
            container
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              background: "#f4f4f4",
              borderRadius: "1em",
            }}
          >
            {/* <Grid marginX={1} item xs={1}>
              <Badge
                overlap="circular"
                badgeContent={
                  <CircleNotificationsIcon
                    fontSize={"inherit"}
                    sx={{
                      fontSize: "17px",
                      color: "#00acba",
                    }}
                  />
                }
                invisible={false}
              >
                <Avatar alt="Remy Sharp" src={profileImg} />
              </Badge>
            </Grid> */}
            <Grid item container xs={10}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {item?.title}
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
                    {item?.adminUserID?.name}
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
                    {moment(item?.createdAt).fromNow(true)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ color: "#403f3f",wordBreak: 'break-all' }}>
                {item?.description}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}

    </Grid>
  );
};

export default NotificationItem;
