import { useEffect, useState } from "react";
import AppDrawer from "./Drawer";
import "./slider.css";

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
