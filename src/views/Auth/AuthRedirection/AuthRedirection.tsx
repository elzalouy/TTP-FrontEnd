import { Button, Grid, Typography } from "@mui/material";
import IMAGES from "../../../assets/img/Images";
import { useHistory } from "react-router";
import "./AuthRedirection.css";

const AuthRedirection = (props: any) => {
  const history = useHistory();
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
