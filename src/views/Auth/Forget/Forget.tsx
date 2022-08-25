import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Ttp from "../../../assets/img/ttp_logo.png";
import "../auth.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Redirect } from "react-router";
import IMAGES from "../../../assets/img/Images";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  forgotPassword,
  selectAuth,
  selectIsAuth,
  selectResponse,
} from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import { toast } from "react-toastify";
import { selectLoading } from "../../../models/Auth";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import { EmailMessage } from "./EmailMessage";
import { IFormInputs } from "src/types/components/Inputs";
import { IFailed } from "src/types/views/Auth";
import { Props } from "src/types/views/Auth";
import ForgetForm from "./ForgetForm";

export const Forget: React.FC<Props> = ({ history }) => {
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
          {visible ? (
            <EmailMessage history={history} />
          ) : (
            <ForgetForm
              control={control}
              register={register}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              loading={loading}
              history={history}
              errors={errors}
            />
          )}
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
    </Grid >
  );
};
