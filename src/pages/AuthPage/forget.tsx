import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Ttp from "../../assets/img/ttp_logo.png";
import "./auth.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Redirect, RouteComponentProps } from "react-router";
import IMAGES from "../../assets/img/Images";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  forgotPassword,
  selectAuth,
  selectIsAuth,
  selectResponse,
} from "../../redux/Auth";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { selectLoading } from "../../redux/Auth";

interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

interface IFormInputs {
  email: string;
}

interface IFailed {
  status: number | string | boolean;
  message: string;
}

const Forget: React.FC<Props> = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInputs>();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });
  const auth = useAppSelector(selectAuth);
  const loading = useAppSelector(selectLoading);
  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectResponse);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

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

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(
      forgotPassword({
        email: data.email,
      })
    );
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
      alignContent={"center"}
    >
      <Grid
        item
        xs={11}
        sm={11}
        md={6}
        lg={6}
        height={550}
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
          paddingX={5}
          paddingTop={6}
          paddingBottom={4}
        >
          <img src={Ttp} alt="ttp" width="80" color="white" height="40" />
          {visible ? (
            <>
              <p className="success-text">
                A reset link has been sent to your email successfully
              </p>
              <Link
                sx={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => history.push("/login")}
              >
                <Typography
                  textAlign={"center"}
                  variant={"h5"}
                  sx={{
                    fontWeight: "900",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  paddingTop={3.5}
                  fontFamily={"Cairo"}
                  color="black"
                  className="bold"
                >
                  Go Back To Login
                </Typography>
              </Link>
            </>
          ) : (
            <>
              <Typography
                variant={"h2"}
                fontWeight={"900"}
                paddingTop={12}
                fontFamily={"Cairo"}
                className="bold"
              >
                Forget Password
              </Typography>
              {failed.status && (
                <p className="error-text">
                  Sending email was unsuccessful : {failed.message}
                </p>
              )}
              <Typography
                variant={"h5"}
                fontWeight={"700"}
                paddingTop={3.5}
                fontFamily={"Cairo"}
                color="#000000"
                className="bold"
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
                    autoComplete="off"
                    className="f-inputs"
                    placeholder="Email Address"
                    onChange={() => setFailed({ message: "", status: false })}
                  />
                )}
              />
              {errors.email?.type === "required" && (
                <p className="error-text">Please enter your email</p>
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
                  "Send"
                )}
              </Button>
              <Link
                sx={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => history.push("/login")}
              >
                <Typography
                  textAlign={"center"}
                  variant={"h5"}
                  sx={{
                    fontWeight: "900",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  paddingTop={3.5}
                  fontFamily={"Cairo"}
                  color="black"
                  className="bold"
                >
                  Go Back To Login
                </Typography>
              </Link>
            </>
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
            src={IMAGES.forgotDesktop}
            className="Image"
            alt=""
            style={{ width: "60%" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Forget;
