import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import { useAppSelector } from "../../models/hooks";
import {
  getNotifications,
  selectNotificationPagination,
  selectNotifications,
  selectNotificationsLoading,
  updateNotified,
} from "../../models/Notifications";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";

type Props = {};

export const Notifications = (props: Props) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  // const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectNotificationsLoading);
  const notifications = useAppSelector(selectNotifications);
  const pagination = useAppSelector(selectNotificationPagination);
  // const Unotified = useAppSelector(selectUnNotifiedNum);
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
        <Grid
          container
          xs={12}
          md={6}
          justifyContent={"center"}
          textAlign="center"
          marginBottom={4}
        >
          <Button
            type="main"
            size="small"
            label="load more"
            onClick={handleLoadMore}
            loading={loading}
          />
        </Grid>
      )}
    </Grid>
  );
};
