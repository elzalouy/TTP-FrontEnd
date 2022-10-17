import { Grid, Typography } from "@mui/material";
import * as React from "react";
import IMAGES from "src/assets/img/Images";
type EmptyProps = {};

const Empty = (props: EmptyProps) => {
  return (
    <>
      <Grid
        container
        width={"100%"}
        height="100%"
        justifyContent={"center"}
        alignItems="center"
        textAlign={"center"}
      >
        <Grid item xs={12} marginTop={4}>
          <img
            src={IMAGES.OverviewNotificationsEmpty}
            height={"300px"}
            alt=""
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"#505050"} fontSize="16px" fontWeight={"bold"}>
            Nothing have been moved yet !!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Empty;
