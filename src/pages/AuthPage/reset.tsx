import { RouteComponentProps } from "react-router-dom";
import { Grid, Typography, Input, Button } from "@mui/material";
import Person from "../../assets/img/person.png";
import Ttp from "../../assets/img/ttp_logo.png";
import { Redirect, useHistory, useParams } from "react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectPayload, selectPMs, updatePMpassword } from "../../redux/PM";
import { selectAuth, selectIsAuth } from "../../redux/Auth";

interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

interface IFormInputs {
  newPassword: string;
  oldPassword: string;
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
  const [failed, setFailed] = useState<IFailed>({
    status: false,
    message: "",
  });

  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectPayload);
  const { token } = useParams<IParam>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(
      updatePMpassword({
        id: `Bearer ${token}`,
        password: data.newPassword,
        oldPassword: data.oldPassword,
      })
    );
    history.replace("/");
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
        height={550}
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
                Set your new password
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
                Old Password
              </Typography>
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    {...register("oldPassword", { required: true })}
                    type="password"
                    className="f-inputs"
                    placeholder="Enter your old password"
                    onChange={() => setFailed({ message: "", status: false })}
                  />
                )}
              />
              {errors.oldPassword?.type === "required" && (
                <p className="error-text">Please enter your old password</p>
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
                  <input
                    {...field}
                    {...register("newPassword", { required: true })}
                    type="password"
                    className="f-inputs"
                    placeholder="Enter your new password"
                    onChange={() => setFailed({ message: "", status: false })}
                  />
                )}
              />
              {errors.newPassword?.type === "required" && (
                <p className="error-text">Please enter your new password</p>
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
                Set New Password
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
