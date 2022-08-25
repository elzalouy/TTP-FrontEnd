import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import {
  Grid,
} from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import {
  selectIsAuth,
  selectResponse,
} from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import { toast } from "react-toastify";
import "../auth.css";
import { IFailed, Props } from "src/types/views/Auth";
import AuthContainer from "../../../coreUI/components/Containers/AuthContainer";
import LoginForm from "./LoginForm";

const Login: React.FC<Props> = ({ history }) => {

  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });
  // const watch = useAppSelector(selectAuth);
  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectResponse);


  useEffect(() => {
    if (res.msg && res.status !== 200) {
      if (res.page === "login") {
        toast.clearWaitingQueue();
        setFailed({
          message: res.msg,
          status: res.status,
        });
      }
    }
    if (isAuth === true) {
      history.replace("/Overview");
    }
  }, [res]);

  if (isAuth) {
    return <Redirect to={"/Overview"} />;
  }


  return (
    <AuthContainer>
      <LoginForm
        failed={failed}
        setFailed={setFailed}
        history={history} />
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
          src={IMAGES.loginDesktop}
          className="Image"
          alt=""
          style={{ width: "60%" }}
        />
      </Grid>
    </AuthContainer>
  );
};
export { Login };
