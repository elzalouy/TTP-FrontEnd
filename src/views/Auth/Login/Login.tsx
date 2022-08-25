import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import {
  Grid,
  Button,
  Link,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import Ttp from "../../../assets/img/ttp_logo.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  selectAuth,
  selectIsAuth,
  selectLoading,
  selectResponse,
  signIn,
} from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import { toast } from "react-toastify";
import "../auth.css";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import PasswordInput from "../../../coreUI/components/Inputs/Textfield/PasswordInput";
import { IFailed, Props } from "src/types/views/Auth";
import { IFormInputs } from "src/types/components/Inputs";

const Login: React.FC<Props> = ({ history }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm<IFormInputs>();
  const dispatch = useDispatch();
  const [visible, setVisiblity] = useState<boolean>(false);
  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });
  // const watch = useAppSelector(selectAuth);
  const isAuth = useAppSelector(selectIsAuth);
  const loading = useAppSelector(selectLoading);
  const res = useAppSelector(selectResponse);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

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

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(
      signIn({
        data: {
          email: data.email,
          password: data.password,
        },
        history,
      })
    );
    setFailed({
      message: "",
      status: false,
    });
  };

  if (isAuth) {
    return <Redirect to={"/Overview"} />;
  }
  

  return (
    <Grid
      container
      height={SM ? "100vh" : "90vh"}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={11}
        sm={11}
        md={6}
        lg={6}
        height={600}
        justifyContent={SM ? "flex-start" : "center"}
        container
        direction="row"
        sx={
          SM
            ? { boxShadow: "none" }
            : {
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }
        }
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          md={6}
          height={"100%"}
          bgcolor={"white"}
          paddingX={SM ? 1 : 5}
          paddingTop={6}
          paddingBottom={4}
        >
          <img src={Ttp} alt="ttp" width="80" color="white" height="40" />
          <Typography
            variant={"h2"}
            fontWeight={"bolder"}
            paddingTop={4}
            paddingBottom={4}
            className="bold"
          >
            Login to your account
          </Typography>
          {failed.status && (
            <p className="error-text top-margin">Invalid Email Address or Password</p>
          )}
          <Input
            name="email"
            label="Email Address"
            placeholder="Email Address"
            control={control}
            register={register}
            required
          />
          {errors.email?.type === "required" && (
            <p className="error-text">Please enter your email address</p>
          )}
          <PasswordInput
            control={control}
            register={register}
            visible={visible}
            setVisiblity={setVisiblity}
            name="password"
            label="Password"
          />
          {errors.password?.type === "required" && (
            <p className="error-text">Please enter your password</p>
          )}
          <Button
            sx={{
              width: "100%",
              height: 40,
              borderRadius: 1.5,
              marginTop: 4,
              textTransform: "none",
              fontWeight: "bold",
            }}
            variant="contained"
            disableElevation
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white", padding: "10px" }} />
            ) : (
              "Login"
            )}
          </Button>
          <Link
            sx={{
              textDecoration: "none",
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => history.push("/ForgetPassword")}
          >
            <Typography
              textAlign={"center"}
              variant={"h5"}
              sx={{ fontWeight: "900" }}
              paddingTop={3.5}
              fontFamily={"Cairo"}
              color="black"
              className="bold"
            >
              Forget Password?
            </Typography>
          </Link>
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
            src={IMAGES.loginDesktop}
            className="Image"
            alt=""
            style={{ width: "60%" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export { Login };
