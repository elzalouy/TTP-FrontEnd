import React, { FC, useEffect, useState } from "react";
import { Toolbar, AppBar, Drawer, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./AppBar.css";
import { Logo, Notification } from "../../../coreUI/usable-elements/images";
import { RouteComponentProps, useHistory, useLocation } from "react-router";
import ResponsiveDrawer from "../Sidebar/ResponsiveDrawer";

const Bar: FC = (props: any) => {
  const [open, setOpen] = useState(false);
  const [select, setSelected] = useState("");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setSelected(location?.pathname);
  }, []);

  return (
    <AppBar
      sx={{
        display: { lg: "none", md: "none", sm: "block", xs: "block" },
        bgcolor: "white",
        margin:"0px",
        boxShadow:"none"
      }}
    >
      <Toolbar
        sx={{
          display: { lg: "none", md: "none", sm: "block", xs: "block" },
        }}
        className="AppBar"
      >
        <MenuIcon
          sx={{ cursor: "pointer" }}
          htmlColor="#000000"
          onClick={() => setOpen((state) => !state)}
        />
        <ResponsiveDrawer
          {...props}
          select={select}
          open={open}
          setOpen={setOpen}
        />
        <IconButton style={{padding:"0px"}} onClick={()=>{
          history.push("/Overview")
        }}>
          <Logo />
        </IconButton>
        <IconButton  style={{padding:"0px"}} onClick={()=>{
          history.push("/notifications")
        }}>
          <Notification />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Bar;
