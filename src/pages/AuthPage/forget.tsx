import { Button, Grid , Typography } from "@mui/material";
import Ttp from "../../assets/img/ttp_logo.png";
import "./auth.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Redirect, RouteComponentProps } from "react-router";
import Person from "../../assets/img/person.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword, selectAuth, selectIsAuth, selectResponse } from "../../redux/Auth";
import { useAppSelector } from "../../redux/hooks";

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
  const isAuth = useAppSelector(selectIsAuth);
  const res = useAppSelector(selectResponse);

  useEffect(() => {
    if (res.msg === "" && res.status === "") {
      setVisible(false);
    } else if (res.msg !== "" && res.status !== 200) {
      setVisible(false);
      if(res.page==="forgetPassword"){
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

  if(isAuth){
    return <Redirect to={"/Overview"}/>
  }

  return (
    <Grid
      container
      height={"90vh"}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      alignContent={"center"}
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
         boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
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
              A reset link has been sent to your email successfully
            </p>
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
                Send
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

export default Forget;
