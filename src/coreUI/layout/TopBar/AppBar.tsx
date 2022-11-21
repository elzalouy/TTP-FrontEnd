import { FC, useEffect, useState } from "react";
import {
  Toolbar,
  AppBar,
  IconButton,
  Badge,
  buttonClasses,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./AppBar.css";
import { Logo } from "src/coreUI/components/Images/Images";
import { RouteComponentProps, useHistory, useLocation } from "react-router";
import ResponsiveDrawer from "../Sidebar/ResponsiveDrawer";
import NotificationIcon from "src/assets/icons/Notification";
import { useAppSelector } from "src/models/hooks";
import { selectUnNotifiedNum } from "src/models/Notifications";
type Props = {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
};
const Bar = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [select, setSelected] = useState("");
  const location = useLocation();
  const history = useHistory();
  const noOfNotifications = useAppSelector(selectUnNotifiedNum);
  useEffect(() => {
    setSelected(location?.pathname);
  }, [location.pathname]);

  return (
    <AppBar
      sx={{
        display: { lg: "none", md: "none", sm: "block", xs: "block" },
        bgcolor: "white",
        margin: "0px",
        boxShadow: "none",
        zIndex: 2,
      }}
    >
      <Toolbar
        sx={{
          display: { lg: "none", md: "none", sm: "block", xs: "block" },
        }}
        className="AppBar"
      >
        <IconButton
          style={{ padding: "0px", backgroundColor: "transparent" }}
          sx={{ ":focus": { backgroundColor: "transparent !important" } }}
          onClick={() => {
            history.push("/notifications");
          }}
        >
          <Badge badgeContent={noOfNotifications} color="error">
            <NotificationIcon stroke={"#000000"} height={"25px"} />
          </Badge>
        </IconButton>
        <ResponsiveDrawer select={select} open={open} setOpen={setOpen} />
        <IconButton
          style={{ padding: "0px" }}
          onClick={() => {
            history.push("/Overview");
          }}
        >
          <Logo />
        </IconButton>
        <MenuIcon
          sx={{ cursor: "pointer" }}
          htmlColor="#000000"
          onClick={() => setOpen((state) => !state)}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Bar;
