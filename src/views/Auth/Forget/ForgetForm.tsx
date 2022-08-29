import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import Button from "src/coreUI/components/Buttons/Button";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import { IForgetForm } from "src/types/views/Auth";

const ForgetForm: FC<IForgetForm> = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  loading,
  failed,
}) => {
  return (
    <>
      <form id="forget" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant={"h2"}
          fontWeight={"900"}
          paddingTop={12}
          paddingBottom={4}
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
          <p className="error-text">Please enter your email</p>
        )}
        <Grid container alignItems={"center"} justifyContent="center">
          <Button
            type="main"
            size="large"
            label="send"
            loading={loading}
            form={{ name: "forget", type: "submit" }}
          />
        </Grid>
      </form>
    </>
  );
};

export default ForgetForm;
