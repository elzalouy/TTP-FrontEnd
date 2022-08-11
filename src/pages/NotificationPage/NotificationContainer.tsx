import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectRole, selectUser } from "../../redux/Auth";
import {
  getNotifications,
  selectNotificationPagination,
  selectNotifications,
  selectNotificationsLoading,
  selectUnNotifiedNum,
  updateNotified,
} from "../../redux/Notification";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";

type Props = {};

const NotificationContainer = (props: Props) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectNotificationsLoading);
  const notifications = useAppSelector(selectNotifications);
  const pagination = useAppSelector(selectNotificationPagination);
  const Unotified = useAppSelector(selectUnNotifiedNum);
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    if (!mounted) {
      dispatch(getNotifications(`/${pagination.current}/${pagination.limit}`));
      dispatch(updateNotified(null));
      setMounted(true);
    }
  }, [mounted]);
  const handleLoadMore = async () => {
    dispatch(getNotifications(`/${++pagination.current}/${pagination.limit}`));
  };

  return (
    <Grid
      container
      paddingX={4}
      paddingY={MD ? 10 : 0}
      spacing={4}
      bgcolor="#FAFAFB"
    >
      <Grid item xs={12} mb={0}>
        <NotificationHeader />
      </Grid>
      {notifications?.length > 0 ? (
        <Grid item xs={12} marginBottom={1}>
          <NotificationItem notifiData={notifications} />
        </Grid>
      ) : null}
      {pagination.pages !== pagination.current && (
        <Grid item xs={12} lg={6} textAlign="center" mb="1em">
          <button
            style={{
              textTransform: "capitalize",
              maxHeight: "40px",
              background: "black",
              height: "35px",
              width: "80px",
              color: "white",
              borderRadius: "10px",
              border:"none",
              outline:"none"
            }}
            onClick={handleLoadMore}
          >
            {loading ? (
              <CircularProgress
                disableShrink
                sx={{
                  color: "white",
                  padding:"0px",
                  height: "20px !important",
                  width: "20px !important",
                  marginTop: "5px",
                }}
              />
            ) : (
              "Load More"
            )}
          </button>
        </Grid>
      )}
    </Grid>
  );
};

export default NotificationContainer;
