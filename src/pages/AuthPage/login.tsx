import React, { useState } from "react";
import "./auth.css";
import AuthBorder from "./authBorder";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Button, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Person from "../../assets/img/person.png";
import Ttp from "../../assets/img/ttp_logo.png";
import useStyles from "./loginStyle";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

const Login: React.FC<Props> = ({ history }) => {
  const classes = useStyles()();
  const [Email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <Grid
      container
      justifyContent={"center"}
      height={"100%"}
      marginY={"2%"}
      marginX={"14%"}
      bgcolor={"auto"}
      direction="row"
      sx={{
        boxShadow: "0px 0px 100px 2px #888888;",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        lg={6}
        md={6}
        bgcolor={"white"}
        paddingX={5}
        paddingTop={6}
      >
        <img src={Ttp} alt="ttp" width="80" color="white" height="40" />
        <Typography
          variant={"h2"}
          fontWeight={"900"}
          paddingTop={4.5}
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
        <TextField
          variant="outlined"
          placeholder="Email Address"
          sx={{
            width: "100%",
            marginTop: 2,
            height: 50,
            bgcolor: "white",
          }}
          required
          type={"email"}
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
        <TextField
          variant="outlined"
          placeholder="Password"
          sx={{
            width: "100%",
            marginTop: 2,
            height: 50,
            bgcolor: "white",
          }}
          required
          type={"email"}
        />
        <Button
          sx={{ width: "90%", height: 50, borderRadius: 2, marginTop: 4 }}
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
            width={"90%"}
            textAlign={"center"}
            variant={"h5"}
            sx={{ fontWeight: "900" }}
            paddingTop={3.5}
            marginBottom={4}
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
        paddingY={5}
      >
        <img
          src={Person}
          width={"100%"}
          height={"100%"}
          className="Image"
          alt=""
        />
      </Grid>
    </Grid>
  );
};
export default Login;
