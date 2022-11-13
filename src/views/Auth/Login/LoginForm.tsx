import { Grid, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import PasswordInput from "src/coreUI/components/Inputs/Textfield/PasswordInput";
import { selectLoading, signIn } from "src/models/Auth";
import { useAppSelector } from "src/models/hooks";
import { IFormInputs } from "src/types/components/Inputs";
import Ttp from "../../../assets/img/ttp_logo.png";
import { useHistory } from "react-router";

const LoginForm = ({}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm<IFormInputs>();
  const history = useHistory();
  const loading = useAppSelector(selectLoading);
  const dispatch = useDispatch();
  const [visible, setVisiblity] = useState<boolean>(false);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

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
      <form id="login" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant={"h2"}
          fontWeight={"bolder"}
          paddingTop={4}
          paddingBottom={4}
          className="bold"
        >
          Login to your account
        </Typography>
        <ControlledInput
          name="email"
          label="email address"
          placeholder="email address"
          required={true}
          type="text"
          control={control}
          error={errors.email && "true"}
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
          minLength={false}
          error={!!errors.password}
          wrapper
        />
        {errors.password?.type === "required" && (
          <p className="error-text">Please enter your password</p>
        )}
        <Grid container alignItems={"center"} justifyContent="center">
          <Button
            type="main"
            size="large"
            label="login"
            loading={loading}
            form={{ name: "login", type: "submit" }}
          />
        </Grid>
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
      </form>
    </Grid>
  );
};

export default LoginForm;
