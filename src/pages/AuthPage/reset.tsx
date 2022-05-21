import { RouteComponentProps } from "react-router-dom";
import { Grid, Typography, Input, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import Person from "../../assets/img/person.png";
import Ttp from "../../assets/img/ttp_logo.png";
import { Redirect, useHistory, useParams } from "react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { resetPMpassword, selectPayload, selectPMs } from "../../redux/PM";
import { selectAuth, selectIsAuth } from "../../redux/Auth";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

interface IFormInputs {
  newPassword: string;
  confirmNewPassword: string;
}

interface IParam {
  token: string;
}

interface IFailed {
  status: number | string | boolean;
  message: string;
}

const ResetPassword: React.FC<Props> = ({ history }) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IFormInputs>();
  const [visible, setVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [hideConfirmPassword, setHideConfirmPassword] =
    useState<boolean>(false);
  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });
  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectPayload);
  const { token } = useParams<IParam>();
  const dispatch = useDispatch();
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    let pattern = new RegExp(data.newPassword);
    if (pattern.test(data.confirmNewPassword)) {
      setPasswordError(false);
      dispatch(
        resetPMpassword({
          id: `Bearer ${token}`,
          password: data.newPassword,
        })
      );
      history.replace("/");
    } else {
      setPasswordError(true);
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
  }, [res]);

    if (isAuth) {
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
        height={550}
        bgcolor={"white"}
        justifyContent={SM? "flex-start" : "center"}
        container
        direction="row"
        sx={SM ? {boxShadow:"none"} :{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
          {visible ? (
            <p className="success-text">
              Your password has been changed successfully
            </p>
          ) : (
            <>
              <Typography
                variant={"h2"}
                fontWeight={"900"}
                paddingTop={4}
                fontFamily={"Cairo"}
              >
                Reset Password
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
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <div className="password-container">
                    <input
                      {...field}
                      {...register("newPassword", {
                        required: true,
                        minLength: {
                          value: 8,
                          message: "Your password is less than 8 characters",
                        },
                      })}
                      type={hidePassword ? "text" : "password"}
                      className="password-input"
                      placeholder="Enter your new password"
                      onChange={() => setFailed({ message: "", status: false })}
                    />
                    <IconButton
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
              {errors.newPassword?.type === "required" && (
                <p className="error-text">Please enter your new password</p>
              )}
              {errors.newPassword?.message && (
                <p className="error-text">{errors.newPassword?.message}</p>
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
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <div className="password-container">
                    <input
                      {...field}
                      {...register("confirmNewPassword", { required: true })}
                      type={hideConfirmPassword ? "text" : "password"}
                      className="password-input"
                      placeholder="Enter your new password"
                      onChange={() => setFailed({ message: "", status: false })}
                    />
                    <IconButton
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
              {errors.confirmNewPassword?.type === "required" && (
                <p className="error-text">
                  Please enter your new password again
                </p>
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
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                variant="contained"
                disableElevation
                onClick={handleSubmit(onSubmit)}
              >
                Confirm
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
export default ResetPassword;
