import { CircularProgress, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import { useAppSelector } from "../../models/hooks";
import {
  getNotifications,
  selectNotificationPagination,
  selectNotifications,
  selectNotificationsLoading,
  selectUnNotifiedNum,
  toggleLoadingOff,
  updateNotified,
} from "../../models/Notifications";
import NotificationHeader from "./NotificationHeader";
import List from "./List";
import NotificationItemSkeleton from "./Loading/NotificationSkeleton";
import Empty from "./Empty";

export const Notifications = (props: any) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const loading = useAppSelector(selectNotificationsLoading);
  const notifications = useAppSelector(selectNotifications);
  const pagination = useAppSelector(selectNotificationPagination);
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!mounted) {
      dispatch(updateNotified(null));
      setMounted(true);
    }
  }, [mounted, dispatch, pagination]);

  const handleLoadMore = async () => {
    dispatch(getNotifications(`/${++pagination.current}/${pagination.limit}`));
    dispatch(toggleLoadingOff(null));
  };

  return (
    <Grid container bgcolor="#FAFAFB">
      <Grid item xs={12} mb={0}>
        <NotificationHeader />
      </Grid>
      {loading === true && (
        <Grid item xs={12} marginBottom={1}>
          {[...Array(1)].map((item, key) => (
            <NotificationItemSkeleton key={key} />
          ))}
        </Grid>
      )}
      {loading === false && notifications && notifications.length === 0 && (
        <Empty />
      )}
      {notifications && notifications.length > 0 && (
        <Grid item xs={12} marginBottom={1}>
          <List notifiData={notifications} />
        </Grid>
      )}
      {pagination.pages !== pagination.current && (
        <Grid
          container
          xs={12}
          md={6}
          justifyContent={"center"}
          textAlign="center"
          marginBottom={4}
        >
          {notifications?.length !== 0 && !loading && (
            <Button
              type="main"
              size="small"
              label="load more"
              onClick={handleLoadMore}
              loading={loading}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};
