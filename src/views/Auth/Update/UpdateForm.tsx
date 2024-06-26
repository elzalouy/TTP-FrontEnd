import { Grid, Typography } from "@mui/material";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Button from "src/coreUI/components/Buttons/Button";
import PasswordInput from "src/coreUI/components/Inputs/Textfield/PasswordInput";
import { newPassword, selectLoading } from "src/models/Auth";
import { useAppSelector } from "src/models/hooks";
import { IFormInputs } from "src/types/components/Inputs";
import { IParam, IUpdateForm } from "src/types/views/Auth";

const UpdateForm: FC<IUpdateForm> = ({ history, failed }) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IFormInputs>();
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [hideConfirmPassword, setHideConfirmPassword] =
    useState<boolean>(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const { token } = useParams<IParam>();
  const loading = useAppSelector(selectLoading);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (data.confirmNewPassword && data.password) {
      let pattern = new RegExp(data.password);
      if (pattern.test(data.confirmNewPassword)) {
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
    }
  };

  return (
    <>
      <form id="update" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant={"h2"}
          fontWeight={"900"}
          paddingTop={4}
          paddingBottom={4}
          fontFamily={"Cairo"}
        >
          Enter your new password
        </Typography>
        {failed.status && (
          <p className="error-text">
            Setting new password was unsuccessful : {failed.message}
          </p>
        )}
        <PasswordInput
          name="password"
          label="New Password"
          control={control}
          register={register}
          setVisiblity={setHidePassword}
          visible={hidePassword}
          minLength
          error={!!errors.password}
        />
        {errors.password?.type === "required" && (
          <p className="error-text">Please enter your new password</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="error-text">Your password has less than 8 characters</p>
        )}
        <PasswordInput
          name="confirmNewPassword"
          label="Confirm New Password"
          control={control}
          register={register}
          setVisiblity={setHideConfirmPassword}
          visible={hideConfirmPassword}
          minLength
          error={!!errors.confirmNewPassword}
          wrapper
        />
        {errors.confirmNewPassword?.type === "required" && (
          <p className="error-text">Please enter your new password</p>
        )}
        {errors.confirmNewPassword?.type === "minLength" && (
          <p className="error-text">Your password has less than 8 characters</p>
        )}
        {passwordError && (
          <p className="error-text">
            Your passwords do not match , Please Re-enter your new password
          </p>
        )}
        <Grid container alignItems={"center"} justifyContent="center">
          <Button
            type="main"
            size="large"
            label="Confirm"
            loading={loading}
            form={{ name: "update", type: "submit" }}
          />
        </Grid>
      </form>
    </>
  );
};

export default UpdateForm;
