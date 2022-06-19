import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "./AuthRedirection.css";
import IMAGES from "../../../assets/img/Images";
import { Redirect, useHistory } from "react-router";
import { selectIsLogout } from "../../../redux/Auth";
import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";

const AuthRedirection: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogout = useAppSelector(selectIsLogout);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(3);
  }, []);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  if (isLogout) {
    setTimeout(() => {
      history.replace("/login");
    }, 3000);
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
          textTransform={"capitalize"}
        >
          Your authorization token has expired , You will be redirected to login
          again in
        </Typography>
        <Typography sx={{ color: "black", fontSize: "30px", margin: "5px" }}>
          {timeLeft}
        </Typography>
      </Grid>
    </div>
  );
};

export default AuthRedirection;
