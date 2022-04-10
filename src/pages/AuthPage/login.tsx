import React, { useState } from "react";
import "./auth.css";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Button, Link, Typography } from "@mui/material";
import Person from "../../assets/img/person.png";
import Ttp from "../../assets/img/ttp_logo.png";
import Input from "../../coreUI/usable-component/Inputs/Input";
import { Controller, useForm } from "react-hook-form";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

const Login: React.FC<Props> = ({ history }) => {
  const { register, watch, control } = useForm();
  const [visible, setVisible] = useState(false);
  return (
    <Grid
      container
      height={"100%"}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      alignContent={"center"}
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
          <Typography
            variant={"h2"}
            fontWeight={"900"}
            paddingTop={4}
            fontFamily={"Cairo"}
          >
            Login to your account
          </Typography>
          <Typography
            variant={"h5"}
            fontWeight={"700"}
            paddingTop={3.5}
            fontFamily={"Cairo"}
            color="#000000"
          >
            Email Address
          </Typography>
          <Controller
            name="email"
            control={control}
            render={(props) => (
              <Input
                {...props}
                visible
                setVisible
                value={props.field.value}
                onChangeValue={(e: React.ChangeEvent) => {
                  e.preventDefault();
                  props.field.onChange(e);
                }}
                type="email"
                placeholder="Email Address"
              />
            )}
          />
          <Typography
            variant={"h5"}
            fontWeight={"700"}
            paddingTop={3.5}
            fontFamily={"Cairo"}
            color="#000000"
          >
            Password
          </Typography>
          <Controller
            name="password"
            control={control}
            render={(props) => (
              <Input
                {...props}
                visible={visible}
                setVisible={setVisible}
                value={props.field.value}
                onChangeValue={(e: React.ChangeEvent) => {
                  e.preventDefault();
                  props.field.onChange(e);
                }}
                type="password"
                placeholder="Password"
              />
            )}
          />
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
            onClick={() => {
              history.push("/Overview");
            }}
          >
            Login
          </Button>
          <Link
            sx={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => history.push("/ForgetPassword")}
          >
            <Typography
              textAlign={"center"}
              variant={"h5"}
              sx={{ fontWeight: "900" }}
              paddingTop={3.5}
              fontFamily={"Cairo"}
              color="black"
            >
              Forget Password?
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
export default Login;
