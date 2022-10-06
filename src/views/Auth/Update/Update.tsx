import { RouteComponentProps } from "react-router-dom";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import Ttp from "../../../assets/img/ttp_logo.png";
import { useState } from "react";
import { selectUserState } from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import AuthContainer from "../AuthComponents/AuthContainer";
import UpdateForm from "./UpdateForm";
import { IFailed, Props } from "src/types/views/Auth";

export const UpdatePassword: React.FC<Props> = ({ history }) => {
  const [visible] = useState(false);
  const [failed] = useState<IFailed>({
    status: false,
    message: "",
  });
  const auth = useAppSelector(selectUserState);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const isTokenValid = localStorage.getItem("token");

  return (
    <AuthContainer>
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
            Your password has been set successfully
          </p>
        ) : (
          <UpdateForm failed={failed} history={history} />
        )}
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
          src={IMAGES.resetDesktop}
          className="Image"
          alt=""
          style={{ width: "80%" }}
        />
      </Grid>
    </AuthContainer>
  );
};
