import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import "./notfound.css";
import { Redirect, RouteComponentProps, useLocation } from "react-router";
import IMAGES from "../../assets/img/Images";
import { checkAuthToken } from "../../services/api";
import { useAppSelector } from "../../models/hooks";
import { selectIsAuth } from "../../models/Auth";
interface NotFoundProps {
  history: RouteComponentProps["history"];
}

export const NotFound: FC<NotFoundProps> = (props) => {
  const location = useLocation();
  const isAuth = useAppSelector(selectIsAuth);

  if (location.pathname === "/" && checkAuthToken()) {
    return (
      <div className="notfound">
        <Grid
          container
          justifyContent={"center"}
          height={"100vh"}
          alignItems="center"
          direction={"column"}
        >
          <CircularProgress sx={{ color: "black" }} />
        </Grid>
      </div>
    );
  } else if (location.pathname === "/" && (!checkAuthToken() || !isAuth)) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className="notfound">
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
    </div>
  );
};
