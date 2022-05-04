import { Grid } from "@mui/material";
import React, { useEffect } from "react";
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

type Props = {};
// if
const NotificationContainer = (props: Props) => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const role = useAppSelector(selectRole);
  useEffect(() => {
    if(user && user._id){
      dispatch(getAllNotifi(user._id));
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

  const notifiData = useAppSelector(notifiDataSelector);
  console.log({ notifiData });
  return (
    <Grid container paddingX={4} spacing={2} bgcolor="#FAFAFB">
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
    </Grid>
  );
};

export default NotificationContainer;
