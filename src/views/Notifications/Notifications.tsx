import { CircularProgress, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import { useAppSelector } from "../../models/hooks";
import {
  getNotifications,
  selectNotificationPagination,
  selectNotifications,
  selectNotificationsButtonLoading,
  selectNotificationsLoading,
  toggleLoadingOff,
  updateNotified,
} from "../../models/Notifications";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";
import NotificationItemSkeleton from "./Loading/NotificationSkeleton";
import Empty from "./Empty";

export const Notifications = (props: any) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const loading = useAppSelector(selectNotificationsLoading);
  const buttonLoading = useAppSelector(selectNotificationsButtonLoading);
  const notifications = useAppSelector(selectNotifications);
  const pagination = useAppSelector(selectNotificationPagination);
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!mounted) {
      dispatch(getNotifications(`/${pagination.current}/${pagination.limit}`));
      dispatch(updateNotified(null));
      setMounted(true);
    }
  }, [mounted, dispatch, pagination]);

  const handleLoadMore = async () => {
    dispatch(getNotifications(`/${++pagination.current}/${pagination.limit}`));
    dispatch(toggleLoadingOff(null));
  };

  return (
    <Grid container paddingY={MD ? 10 : 0} spacing={4} bgcolor="#FAFAFB">
      <Grid item xs={12} mb={0}>
        <NotificationHeader />
      </Grid>
      {loading ? (
        <Grid item xs={12} marginBottom={1}>
          {[...Array(4)].map((item, key) => (
            <NotificationItemSkeleton key={key} />
          ))}
        </Grid>
      ) : (
        <>
          {notifications?.length > 0 ? (
            <Grid item xs={12} marginBottom={1}>
              <NotificationItem notifiData={notifications} />
            </Grid>
          ) : (
            <Empty />
          )}
        </>
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
              loading={buttonLoading}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};
