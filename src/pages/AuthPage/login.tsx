import React, { useEffect, useState } from "react";
import "./auth.css";
import { Redirect } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Button, Link, Typography } from "@mui/material";
import Person from "../../assets/img/person.png";
import Ttp from "../../assets/img/ttp_logo.png";
import Input from "../../coreUI/usable-component/Inputs/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  selectAuth,
  selectIsAuth,
  selectResponse,
  signIn,
} from "../../redux/Auth";
import { useAppSelector } from "../../redux/hooks";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

interface IFailed {
  status: number | string | boolean;
  message: string;
}

interface IFormInputs {
  email: string;
  password: string;
}

const Login: React.FC<Props> = ({ history }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm<IFormInputs>();
  const dispatch = useDispatch();
  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });
  const watch = useAppSelector(selectAuth);
  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectResponse);

  useEffect(() => {
    if (res.msg && res.status !== 200) {
      setFailed({
        message: res.msg,
        status: res.status,
      });
    }
    if (isAuth) {
      history.replace("/Overview");
    }
  }, [watch]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(
      signIn({
        email: data.email,
        password: data.password,
      })
    );
  };

  if (isAuth) {
    return <Redirect to={"/Overview"} />;
  }

  return (
    <Grid
      container
      height={"100%"}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      marginTop={5}
    >
      <Grid
        item
        xs={11}
        sm={11}
        md={8}
        lg={8}
        height={600}
        container
        direction="row"
        sx={{
          boxShadow: "0px 60px 350px 20px #888888;",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          md={6}
          height={"100%"}
          bgcolor={"white"}
          paddingX={5}
          paddingTop={6}
          paddingBottom={4}
        >
          <img src={Ttp} alt="ttp" width="80" color="white" height="40" />
          <Typography
            variant={"h2"}
            fontWeight={"900"}
            paddingTop={4}
            fontFamily={"Cairo"}
          >
            Login to your account
          </Typography>
          {failed.status && (
            <p className="error-text">
              Login was unsuccessful : {failed.message}
            </p>
          )}
          <Typography
            variant={"h5"}
            fontWeight={"700"}
            paddingTop={3.5}
            fontFamily={"Cairo"}
            color="#000000"
          >
            Email Address
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                {...register("email", { required: true })}
                type="email"
                autoComplete="false"
                className="f-inputs"
                placeholder="Example@somemail.com"
                onChange={() =>
                  setFailed({
                    message: "",
                    status: false,
                  })
                }
              />
            )}
          />
          {errors.email?.type === "required" && (
            <p className="error-text">Please enter your email address</p>
          )}
          <Typography
            variant={"h5"}
            fontWeight={"700"}
            paddingTop={3.5}
            fontFamily={"Cairo"}
            color="#000000"
          >
            Password
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                {...register("password", { required: true })}
                type="password"
                className="f-inputs"
                onChange={() =>
                  setFailed({
                    message: "",
                    status: false,
                  })
                }
                placeholder="Enter your password"
              />
            )}
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
            Login
          </Button>
          <Link
            sx={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => history.push("/ForgetPassword")}
          >
            <Typography
              textAlign={"center"}
              variant={"h5"}
              sx={{ fontWeight: "900" }}
              paddingTop={3.5}
              fontFamily={"Cairo"}
              color="black"
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
          bgcolor={"black"}
          textAlign={"center"}
          paddingTop={20}
        >
          <img src={Person} className="Image" alt="" style={{ width: "60%" }} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Login;
