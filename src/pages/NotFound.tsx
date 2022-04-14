import { Button, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router";
import IMAGES from "../assets/img";
interface NotFoundProps {
  history: RouteComponentProps["history"];
}

const NotFound: FC<NotFoundProps> = (props) => {
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        paddingTop={5}
        alignItems="center"
        direction={"column"}
      >
        <img src={IMAGES.notFound} width={"400px"} height={"280px"} />
        <Typography
          color="#302C48"
          sx={{ width: "400px", textAlign: "center" }}
          fontFamily="Cairo, Regular"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Button
          sx={{
            bgcolor: "#000000",
            color: "white",
            width: "239px",
            borderRadius: "6px",
            fontFamily: "Cairo, Regular",
            fontWeight: "700",
            marginTop: 3,
            "&:hover": { backgroundColor: "#000000" },
          }}
          onClick={() => props.history.goBack()}
        >
          Go Back
        </Button>
      </Grid>
    </>
  );
};

export default NotFound;
