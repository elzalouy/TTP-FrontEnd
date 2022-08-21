import "./slider.css";
import React, { useEffect, useState } from "react";
import AppDrawer from "./Drawer";
import { useAppSelector } from "../../../../models/hooks";
import { toggleSideMenu } from "../../../../models/Ui";
import { selectSideMenuToggle } from "../../../../models/Ui/UI.selectors";
const Sidebar = (props: any) => {
  const [select, setSelected] = useState("");
  useEffect(() => {
    setSelected(props.location?.pathname);
  }, []);

  return (
    <>
      <AppDrawer {...props} select={select} />
    </>
  );
};
export default Sidebar;
