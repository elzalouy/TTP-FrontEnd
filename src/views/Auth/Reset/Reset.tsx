import {
  Grid, useMediaQuery, useTheme,
} from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import Ttp from "../../../assets/img/ttp_logo.png";
import { Redirect, useParams } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { resetPMpassword, selectPayload } from "../../../models/PM";
import { selectIsAuth, selectLoading } from "../../../models/Auth";
import { IFormInputs } from "src/types/components/Inputs";
import { IFailed, IParam, Props } from "src/types/views/Auth";
import ResetForm from "./ResetForm";
import AuthContainer from "../AuthComponents/AuthContainer";



export const ResetPassword: React.FC<Props> = ({ history }) => {

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IFormInputs>();
  const [visible, setVisible] = useState(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [hideConfirmPassword, setHideConfirmPassword] =
    useState<boolean>(false);
  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });
  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectPayload);
  const loading = useAppSelector(selectLoading);
  const { token } = useParams<IParam>();
  const dispatch = useDispatch();
  const theme = useTheme()
  const SM = useMediaQuery(theme.breakpoints.down("sm"))
  const isTokenValid = localStorage.getItem("token");

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (data.newPassword && data.confirmNewPassword) {
      let pattern = new RegExp(data.newPassword);
      if (pattern.test(data.confirmNewPassword)) {
        setPasswordError(false);
        dispatch(
          resetPMpassword({
            data: {
              id: `Bearer ${token}`,
              password: data.newPassword,
            },
            token: token,
          })
        );
        setTimeout(() => history.replace("/login"), 1200);
      } else {
        setPasswordError(true);
      }
    }

  };

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
            control={control}
            register={register}
            errors={errors}
            failed={failed}
            visible={{
              newPassword: hidePassword, confirmNewPassword: hideConfirmPassword
            }}
            setVisible={{
              newPassword: setHidePassword, confirmNewPassword: setHideConfirmPassword
            }}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            passwordError={passwordError}
            loading={loading}
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
