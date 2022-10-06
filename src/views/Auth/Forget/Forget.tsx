import { Grid } from "@mui/material";
import "../auth.css";
import IMAGES from "../../../assets/img/Images";
import { useState } from "react";
import { selectUserState } from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import { IFailed } from "src/types/views/Auth";
import { Props } from "src/types/views/Auth";
import AuthContainer from "../AuthComponents/AuthContainer";
import ForgetFormWrapper from "./ForgetFormWrapper";

export const Forget: React.FC<Props> = ({ history }) => {
  const [visible] = useState(false);
  const [failed] = useState<IFailed>({
    status: false,
    message: "",
  });

  return (
    <AuthContainer>
      <ForgetFormWrapper visible={visible} history={history} failed={failed} />
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
          src={IMAGES.forgotDesktop}
          className="Image"
          alt=""
          style={{ width: "60%" }}
        />
      </Grid>
    </AuthContainer>
  );
};
