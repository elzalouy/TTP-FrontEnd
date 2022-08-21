import { Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import "./AuthRedirection.css";
import IMAGES from "../../../assets/img/Images";
import { Redirect, useHistory } from "react-router";
// import { checkAuthToken } from "../../../services/api";
import { selectIsLogout } from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";

const AuthRedirection: FC = () => {
  const history = useHistory();
  const isLogout = useAppSelector(selectIsLogout);

  if (!isLogout) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="notfound">
      <Grid
        container
        justifyContent={"center"}
        paddingTop={5}
        alignItems="center"
        direction={"column"}
      >
        <img src={IMAGES.notFound} width={"400px"} height={"280px"} />
        <Typography
          color="#302C48"
          sx={{ width: "400px", textAlign: "center" }}
          fontFamily="Cairo, Regular"
          textTransform={"capitalize"}
        >
          Your authorization token has expired , Please login again
        </Typography>
        <Button
          sx={{
            bgcolor: "#000000",
            color: "white",
            width: "239px",
            borderRadius: "6px",
            fontFamily: "Cairo, Regular",
            fontWeight: "700",
            marginTop: 3,
            "&:hover": { backgroundColor: "#000000" },
          }}
          onClick={() => history.push("/login")}
        >
          Go to Login
        </Button>
      </Grid>
    </div>
  );
};

export default AuthRedirection;
