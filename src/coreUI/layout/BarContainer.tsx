import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Bar from "./TopBar/AppBar";
import { RouteComponentProps } from "react-router-dom";
import "./Layout.css";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { useAppSelector } from "src/models/hooks";
import { selectSideMenuToggle } from "src/models/Ui";
type Props = {
  children?: any;
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
  paddingX?: boolean;
};

const MenuContainer = (props: Props) => {
  const isOpen = useAppSelector(selectSideMenuToggle);
  const width = isOpen ? "16%" : "4%";
  const containerWidth = {
    xs: "100%",
    sm: "100%",
    md: isOpen ? "84%" : "96%",
    lg: isOpen ? "84%" : "96%",
    xl: isOpen ? "84%" : "96%",
  };
  return (
    <>
      <Grid
        container
        sx={{ width: "100%", overflow: "hidden", display: "flex" }}
        direction={"row"}
      >
        <Grid
          item
          sx={{
            width: { xs: "100%", sm: "100%", md: width, lg: width, xl: width },
            transition: " all 0.5s ease !important",
          }}
        >
          <Sidebar {...props} />
          <Bar {...props} />
        </Grid>
        <Grid
          sx={{
            transition: " all 0.5s ease !important",
          }}
          item
          width={containerWidth}
        >
          <Box
            paddingX={
              props.paddingX === true ? { sm: 1, xs: 1, md: 4, lg: 4 } : 0
            }
            paddingTop={{ xs: 13, sm: 13, md: 4, lg: 4 }}
            width={"100%"}
            bgcolor="#FAFAFB !important"
          >
            {props.children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default MenuContainer;
