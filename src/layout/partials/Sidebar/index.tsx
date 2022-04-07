import "./slider.css";
import React, { useEffect, useState } from "react";
import { Toolbar, AppBar, Drawer } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import AppDrawer from "./Drawer";
const Sidebar = (props: any) => {
  const [open, setOpen] = useState(false);
  const [select, setSelected] = useState("");
  useEffect(() => {
    setSelected(props.location?.pathname);
    console.log(props);
  }, []);

  return (
    <>
      <AppBar sx={{ bgcolor: "white" }}>
        <Toolbar
          sx={{
            display: { lg: "none", md: "none", sm: "block", xs: "block" },
          }}
        >
          <MenuIcon
            sx={{ cursor: "pointer" }}
            htmlColor="#000000"
            onClick={() => setOpen(true)}
          />
        </Toolbar>
      </AppBar>
      <AppDrawer {...props} select={select} open={open} setOpen={setOpen} />
    </>
  );
};
export default Sidebar;
