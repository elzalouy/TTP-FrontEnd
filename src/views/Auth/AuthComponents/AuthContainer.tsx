import { FC } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

type Props = {
  children: any;
};

const AuthContainer: FC<Props> = ({ children }) => {
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      container
      height={"90vh"}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={11}
        sm={11}
        md={8}
        lg={8}
        height={600}
        bgcolor={"white"}
        justifyContent={SM ? "flex-start" : "center"}
        container
        className="auth-container"
        direction="row"
        sx={{
          boxShadow: SM ? "none" : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthContainer;
