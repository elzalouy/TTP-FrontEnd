import React, { useState } from "react";
import "./auth.css";
import AuthBorder from "./authBorder";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Button, Link, TextField, Typography } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

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
  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#E4E4E4",
        borderWidth: 1,
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#E4E4E4",
          borderWidth: 1,
        },
        "&:hover fieldset": {
          borderColor: "#E4E4E4",
          borderWidth: 1,
        },
        "&.Mui-focused fieldset": {
          borderColor: "#E4E4E4",
          borderWidth: 1,
        },
      },
    },
  })(TextField);
  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={11}
        sm={11}
        md={7}
        lg={7}
        container
        height="80%"
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
          bgcolor={"white"}
          paddingLeft={5}
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
            paddingTop={2}
            fontFamily={"Cairo"}
            color="#000000"
          >
            Email Address
          </Typography>
          <CssTextField
            variant="outlined"
            placeholder="Email Address"
            sx={{
              width: "90%",
              marginTop: 1,
              height: 50,
              bgcolor: "white",
            }}
            required
            type={"email"}
          />
          <Typography
            variant={"h5"}
            fontWeight={"700"}
            paddingTop={2}
            fontFamily={"Cairo"}
            color="#000000"
          >
            Password
          </Typography>
          <CssTextField
            variant="outlined"
            placeholder="Password"
            sx={{
              width: "90%",
              marginTop: 1,
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
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={Person}
            width={"80%"}
            height={"80%"}
            className="Image"
            alt=""
            style={{ marginLeft: 50, marginTop: 20 }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Login;
