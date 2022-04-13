import React, { FC, useEffect, useState } from "react";
import { Toolbar, AppBar, Drawer } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const Bar: FC = (props: any) => {
  const [open, setOpen] = useState(true);
  const [select, setSelected] = useState("");
  useEffect(() => {
    setSelected(props.location?.pathname);
  }, []);

  return (
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
  );
};

export default Bar;
