import "./slider.css";
import React, { useEffect, useState } from "react";
import AppDrawer from "./Drawer";
import { useAppSelector } from "../../../redux/hooks";
import { toggleSideMenu } from "../../../redux/Ui";
import { selectSideMenuToggle } from "../../../redux/Ui/UI.selectors";

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
