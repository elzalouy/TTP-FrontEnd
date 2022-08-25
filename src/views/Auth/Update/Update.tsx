import { RouteComponentProps } from "react-router-dom";
import {
  Grid,
  Typography,
  Input,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import Ttp from "../../../assets/img/ttp_logo.png";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  logout,
  newPassword,
  selectAuth,
  selectIsAuth,
  selectLoading,
  selectResponse,
  selectUser,
} from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

interface IFormInputs {
  password: string;
  confirmPassword: string;
}

interface IParam {
  token: string;
}

interface IFailed {
  status: number | string | boolean;
  message: string;
}

export const UpdatePassword: React.FC<Props> = ({
  history,
  location,
  match,
}) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IFormInputs>();
  const [visible, setVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [hideConfirmPassword, setHideConfirmPassword] =
    useState<boolean>(false);
  const [passwordError, setPasswordError] = useState(false);
  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });

  const dispatch = useDispatch();
  const loading = useAppSelector(selectLoading);
  const auth = useAppSelector(selectAuth);
  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectResponse);
  const { token } = useParams<IParam>();
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const isTokenValid = localStorage.getItem("token");

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    let pattern = new RegExp(data.password);
    if (pattern.test(data.confirmPassword)) {
      setPasswordError(false);
      dispatch(
        newPassword({
          token: `Bearer ${token}`,
          password: data.password,
          id: token,
        })
      );
      setTimeout(() => history.replace("/login"), 1200);
    } else {
      setPasswordError(true);
    }
  };

  useEffect(() => {
    if (res.msg === "" && res.status === "") {
      setVisible(false);
    } else if (res.msg !== "" && res.status !== 200) {
      setVisible(false);
      if (res.page === "newPassword") {
        setFailed({
          message: res.msg,
          status: res.status,
        });
      }
    } else {
      setVisible(true);
    }
  }, [auth, res]);

  if (isAuth && isTokenValid) {
    return <Redirect to={"/Overview"} />;
  }

  return (
    <Grid
      container
      height={"90vh"}
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
        maxWidth={"50% !important"}
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
          {visible ? (
            <p className="success-text">
              Your password has been set successfully
            </p>
          ) : (
            <>
              <Typography
                variant={"h2"}
                fontWeight={"900"}
                paddingTop={4}
                fontFamily={"Cairo"}
              >
                Enter your new password
              </Typography>
              {failed.status && (
                <p className="error-text">
                  Setting new password was unsuccessful : {failed.message}
                </p>
              )}
              <Typography
                variant={"h5"}
                fontWeight={"700"}
                paddingTop={3.5}
                fontFamily={"Cairo"}
                color="#000000"
              >
                New Password
              </Typography>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="password-container">
                    <input
                      {...field}
                      {...register("password", {
                        required: true,
                        minLength: {
                          value: 8,
                          message: "Your password is less than 8 characters",
                        },
                      })}
                      type={hidePassword ? "text" : "password"}
                      className="password-input"
                      placeholder="Enter your new password"
                      onClick={() =>
                        setFailed({
                          message: "",
                          status: false,
                        })
                      }
                    />
                    <IconButton
                      className="password-icon"
                      onClick={() => setHidePassword((state) => !state)}
                    >
                      {!hidePassword ? (
                        <VisibilityOff style={{ color: "#b4b6c4" }} />
                      ) : (
                        <Visibility style={{ color: "#b4b6c4" }} />
                      )}
                    </IconButton>
                  </div>
                )}
              />
              {errors.password?.type === "required" && (
                <p className="error-text">Please enter your new password</p>
              )}
              {errors.password?.message && (
                <p className="error-text">{errors.password?.message}</p>
              )}
              <Typography
                variant={"h5"}
                fontWeight={"700"}
                paddingTop={3.5}
                fontFamily={"Cairo"}
                color="#000000"
              >
                Confirm New Password
              </Typography>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <div className="password-container">
                    <input
                      {...field}
                      {...register("confirmPassword", {
                        required: true,
                        minLength: {
                          value: 8,
                          message: "Your password is less than 8 characters",
                        },
                      })}
                      type={hideConfirmPassword ? "text" : "password"}
                      className="password-input"
                      placeholder="Enter your new password"
                      onClick={() =>
                        setFailed({
                          message: "",
                          status: false,
                        })
                      }
                    />
                    <IconButton
                      className="password-icon"
                      onClick={() => setHideConfirmPassword((state) => !state)}
                    >
                      {!hideConfirmPassword ? (
                        <VisibilityOff style={{ color: "#b4b6c4" }} />
                      ) : (
                        <Visibility style={{ color: "#b4b6c4" }} />
                      )}
                    </IconButton>
                  </div>
                )}
              />
              {errors.confirmPassword?.type === "required" && (
                <p className="error-text">Please enter your new password</p>
              )}
              {errors.confirmPassword?.message && (
                <p className="error-text">{errors.confirmPassword?.message}</p>
              )}
              {passwordError && (
                <p className="error-text">
                  Your passwords do not match , Please Re-enter your new
                  password
                </p>
              )}
              <Button
                sx={{
                  width: "100%",
                  height: 40,
                  borderRadius: 1.5,
                  marginTop: 4,
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
                variant="contained"
                disableElevation
                onClick={handleSubmit(onSubmit)}
              >
                {loading ? (
                  <CircularProgress sx={{ color: "white", padding: "10px" }} />
                ) : (
                  "Confirm"
                )}
              </Button>
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
            src={IMAGES.resetDesktop}
            className="Image"
            alt=""
            style={{ width: "80%" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};