import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import NotificationFilter from "./NotificationFilter";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";
import { useDispatch } from "react-redux";
import { getAllNotifi, updateNotifi } from "../../redux/notification";
import { notifiDataSelector } from "../../redux/notification/notifi.selectors";
import { useAppSelector } from "../../redux/hooks";

type Props = {};
// if
const NotificationContainer = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNotifi("62662912a86a7d5f90a1ff99"));
    dispatch(updateNotifi({id:"62662912a86a7d5f90a1ff99",role:"Operation manager"}))
  }, []);

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
