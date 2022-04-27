import { RouteComponentProps } from "react-router-dom";
import { Grid, Typography, Input, Button } from "@mui/material";
import Person from "../../assets/img/person.png";
import Ttp from "../../assets/img/ttp_logo.png";
import { useHistory } from "react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

interface IFormInputs {
  newPassword: string;
  oldPassword: string;
}

const ResetPassword: React.FC<Props> = () => {
  const { handleSubmit, control, register , formState : {errors} } = useForm<IFormInputs>();
  const [visible, setVisible] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    setVisible(true);
  };

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
          {visible ? (<p className="success-text">Your password has been changed successfully</p>) :
            <>
              <Typography
                variant={"h2"}
                fontWeight={"900"}
                paddingTop={4}
                fontFamily={"Cairo"}
              >
                Set your new password
              </Typography>
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
                  <input {...field} {...register("oldPassword",{required:true})} type="password" className="f-inputs" placeholder="Enter your old password"/>
                )}
              />
                {errors.oldPassword?.type === 'required' && (<p className="error-text">Please enter your old password</p>)}
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
                  <input {...field} {...register("newPassword",{required:true})} type="password" className="f-inputs" placeholder="Enter your new password"/>
                )}
              />
                {errors.newPassword?.type === 'required' && (<p className="error-text">Please enter your new password</p>)}
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
          }
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
