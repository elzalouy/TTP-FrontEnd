import React from "react";
import { Grid } from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import "../auth.css";
import { Props } from "src/types/views/Auth";
import AuthContainer from "../AuthComponents/AuthContainer";
import LoginForm from "./LoginForm";

const Login: React.FC<Props> = () => {
  return (
    <AuthContainer>
      <LoginForm />
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
          src={IMAGES.loginDesktop}
          className="Image"
          alt=""
          style={{ width: "60%" }}
        />
      </Grid>
    </AuthContainer>
  );
};
export { Login };
