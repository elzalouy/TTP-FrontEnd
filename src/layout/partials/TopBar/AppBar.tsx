import React, { FC, useEffect, useState } from "react";
import { Toolbar, AppBar, Drawer } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./AppBar.css";
import { Logo, Notification } from "../../../coreUI/usable-elements/images";
import { RouteComponentProps, useHistory, useLocation } from "react-router";
import ResponsiveDrawer from "../Sidebar/ResponsiveDrawer";


const Bar: FC = (props: any) => {
  const [open, setOpen] = useState(false);
  const [select, setSelected] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSelected(location?.pathname);
  }, []);

  return (
    <AppBar sx={{display:{lg: "none", md: "none", sm: "block", xs: "block"} ,bgcolor: "white" }}>
      <Toolbar
        sx={{
          display: { lg: "none", md: "none", sm: "block", xs: "block" },
        }}
        className="AppBar"
      >
        <MenuIcon
          sx={{ cursor: "pointer" }}
          htmlColor="#000000"
          onClick={() => setOpen(state=>!state)}
        />
        <ResponsiveDrawer {...props} select={select} open={open} setOpen={setOpen} />
        <Logo />
        <Notification />
      </Toolbar>
    </AppBar>
  );
};

export default Bar;
