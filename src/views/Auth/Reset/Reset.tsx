import {
  Grid, useMediaQuery, useTheme,
} from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import Ttp from "../../../assets/img/ttp_logo.png";
import { Redirect } from "react-router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../models/hooks";
import { selectPayload } from "../../../models/PM";
import { selectIsAuth } from "../../../models/Auth";
import { IFailed, Props } from "src/types/views/Auth";
import ResetForm from "./ResetForm";
import AuthContainer from "../AuthComponents/AuthContainer";


export const ResetPassword: React.FC<Props> = ({ history }) => {

  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });
  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectPayload);
  const theme = useTheme()
  const SM = useMediaQuery(theme.breakpoints.down("sm"))
  const isTokenValid = localStorage.getItem("token");

  useEffect(() => {
    if (res.msg === "" && res.status === "") {
      setVisible(false);
    } else if (res.msg !== "" && res.status !== 200) {
      setVisible(false);
      setFailed({
        message: res.msg,
        status: res.status,
      });
    } else {
      setVisible(true);
    }
  }, [res, isAuth]);

  if (isAuth && isTokenValid) {
    return <Redirect to={"/Overview"} />;
  }

  console.log(visible);


  return (
    <AuthContainer>
      <Grid
        item
        xs={11}
        sm={11}
        lg={6}
        md={6}
        height={"100%"}
        bgcolor={"white"}
        paddingX={SM ? 1 : 5}
        paddingTop={6}
        paddingBottom={4}
      >
        <img src={Ttp} alt="ttp" width="80" color="white" height="40" />
        {visible ? (
          <p className="success-text">
            Your password has been changed successfully
          </p>
        ) : (
          <ResetForm
            history={history}
            failed={failed}
          />
        )}
      </Grid>
      <Grid
        item
        display={{ xs: "none", sm: "none", lg: "block", md: "block" }}
        xs={0}
        sm={0}
        md={6}
        lg={6}
        bgcolor={"#FFC500"}
        textAlign={"center"}
        paddingTop={20}
      >
        <img
          src={IMAGES.resetDesktop}
          className="Image"
          alt=""
          style={{ width: "80%" }}
        />
      </Grid>
    </AuthContainer>
  );
};
