import {
  Grid,
} from "@mui/material";
import "../auth.css";
import { Redirect } from "react-router";
import IMAGES from "../../../assets/img/Images";
import { useEffect, useState } from "react";
import {
  selectAuth,
  selectIsAuth,
  selectResponse,
} from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import { toast } from "react-toastify";
import { IFailed } from "src/types/views/Auth";
import { Props } from "src/types/views/Auth";
import AuthContainer from "../AuthComponents/AuthContainer";
import ForgetFormWrapper from "./ForgetFormWrapper";

export const Forget: React.FC<Props> = ({ history }) => {

  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });
  const auth = useAppSelector(selectAuth);
  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectResponse);

  useEffect(() => {
    if (res.msg === "" && res.status === "") {
      setVisible(false);
    } else if (res.msg !== "" && res.status !== 200) {
      toast.clearWaitingQueue();
      setVisible(false);
      if (res.page === "forgetPassword") {
        setFailed({
          message: res.msg,
          status: res.status,
        });
      }
    } else {
      setVisible(true);
    }
  }, [auth]);

  if (isAuth) {
    return <Redirect to={"/Overview"} />;
  }

  return (
    <AuthContainer>
      <ForgetFormWrapper
        visible={visible}
        history={history}
        failed={failed}
      />
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
          src={IMAGES.forgotDesktop}
          className="Image"
          alt=""
          style={{ width: "60%" }}
        />
      </Grid>
    </AuthContainer>
  );
};
