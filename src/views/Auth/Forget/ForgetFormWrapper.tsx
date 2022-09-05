import { Grid, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, selectLoading } from "src/models/Auth";
import { useAppSelector } from "src/models/hooks";
import { IFormInputs } from "src/types/components/Inputs";
import { IForgetFormWrapper } from "src/types/views/Auth";
import Ttp from "../../../assets/img/ttp_logo.png";
import ForgetForm from "./ForgetForm";

const ForgetFormWrapper: FC<IForgetFormWrapper> = ({
  history,
  visible,
  failed,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInputs>();
  const loading = useAppSelector(selectLoading);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    let pattern =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    let condition = pattern.test(data.email);
    
    let caseInsensivtiveEmail = data.email.toLowerCase();

    if (condition) {
      dispatch(
        forgotPassword({
          email: caseInsensivtiveEmail,
        })
      );
    } else {
      toast.warn("Please enter a valid email format", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "mail",
      });
    }
  };

  return (
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
          A reset link has been sent to your email successfully
        </p>
      ) : (
        <ForgetForm
          control={control}
          register={register}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          loading={loading}
          history={history}
          errors={errors}
          failed={failed}
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
  );
};

export default ForgetFormWrapper;
