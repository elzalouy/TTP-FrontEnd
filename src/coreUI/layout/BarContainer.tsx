import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Bar from "./TopBar/AppBar";
import { RouteComponentProps } from "react-router-dom";
import "./Layout.css";
import { Box } from "@mui/system";
type Props = {
  children?: any;
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
};
const MenuContainer = (props: Props) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar {...props} />
        <Bar {...props} />
        <Box
          paddingX={{ sm: 1, xs: 1, md: 4, lg: 4 }}
          paddingTop={{ xs: 10, sm: 10, md: 4, lg: 4 }}
        >
          {props.children}
        </Box>
      </div>
    </>
  );
};

export default MenuContainer;
