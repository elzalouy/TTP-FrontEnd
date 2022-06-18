import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import "./authRedirect.css";
import { Redirect, RouteComponentProps, useHistory } from "react-router";
import IMAGES from "../../../assets/img/Images";
import { checkAuthToken } from "../../../services/api";

const AuthRedirection: FC = () => {
  const history = useHistory();

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
          Your token has expired , Please try logging in again
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
          onClick={() => history.replace("/login")}
        >
          Go to login
        </Button>
      </Grid>
    </div>
  );
};

export default AuthRedirection;
