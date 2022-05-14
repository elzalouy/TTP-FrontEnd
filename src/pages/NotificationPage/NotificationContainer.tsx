import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationFilter from "./NotificationFilter";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";
import { useDispatch } from "react-redux";
import { getAllNotifi, updateNotifi } from "../../redux/notification";
import { notifiDataSelector } from "../../redux/notification/notifi.selectors";
import { useAppSelector } from "../../redux/hooks";
import { notifiAction } from "../../redux/notification";
import { socket } from "../../config/socket/actions";
import { selectRole, selectUser } from "../../redux/Auth";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {};
// if
const NotificationContainer = (props: Props) => {

  const dispatch = useDispatch();
  const notifiData = useAppSelector(notifiDataSelector);
  const user = useAppSelector(selectUser);
  const role = useAppSelector(selectRole);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllNotifi({ id: user._id, skip }));
      dispatch(
        updateNotifi({
          id: user._id,
          role: role,
        })
      );
    }
  }, [user]);

  // watch notification update
  useEffect(() => {
    socket.on("notification update", (data: any) => {
      dispatch(notifiAction.updateCounter(data));
    });
    return () => {
      socket.off("notification update");
    };
  });

  const handleLoadMore = async () => {
    setLoading(true);
    await dispatch(getAllNotifi({ id: user?._id, skip: notifiData.length }));
    setSkip(notifiData?.length ?? 0);
    setLoading(false);
  };

  return (
    <Grid container paddingX={4} paddingY={SM ? 10 : 0} spacing={4} bgcolor="#FAFAFB">
      <Grid item xs={12}>
        <NotificationHeader />
      </Grid>
      {/* <Grid item xs={12}>
        <NotificationFilter />
      </Grid> */}
      {notifiData?.length > 0 ? (
        <Grid item xs={12}>
          <NotificationItem notifiData={notifiData} />
        </Grid>
      ) : null}
      <Grid item xs={6} textAlign="center" mb="1em">
        <LoadingButton
          loading={loading}
          variant="contained"
          sx={{ textTransform: "capitalize", pr: "2em", pl: "2em" }}
          onClick={handleLoadMore}
        >
         {!loading && 'Load More'}
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default NotificationContainer;
