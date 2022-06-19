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
          Your authorization token has expired , Please login again
        </Typography>
      </Grid>
    </div>
  );
};

export default AuthRedirection;
