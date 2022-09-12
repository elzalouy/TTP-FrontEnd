import {
  Close,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  AppBarProps,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import CategoryIcon from "../../../../assets/icons/CategoryIcon";
import ClientIcon from "../../../../assets/icons/ClientIcon";
import DepartmentIcon from "../../../../assets/icons/DepartmentIcon";
import NotificationIcon from "../../../../assets/icons/Notification";
import Overviewicon from "../../../../assets/icons/Overview";
import PersonIcon from "../../../../assets/icons/Person";
import ProjectsIcon from "../../../../assets/icons/ProjectsIcon";
import TaskIcon from "../../../../assets/icons/TaskIcon";
import IMAGES from "../../../../assets/img/Images";
import { selectRole, selectUser } from "../../../../models/Auth";
import { useAppSelector } from "../../../../models/hooks";
import { selectUnNotifiedNum } from "../../../../models/Notifications";
import { toggleLogOutPopup, toggleSideMenu } from "../../../../models/Ui";
import { selectSideMenuToggle } from "../../../../models/Ui/UI.selectors";
import { Logo } from "../../../components/Images/Images";
import DrawerItem from "./DrawerItem";
import "./slider.css";

interface BarProps extends AppBarProps {}

const AppDrawer: React.FC = (props: any) => {
  const open = useAppSelector(selectSideMenuToggle);
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const role = useAppSelector(selectRole);
  const userNotificationsNo = useAppSelector(selectUnNotifiedNum);
  const history = useHistory();
  const theme = useTheme();
  const LG = useMediaQuery(theme.breakpoints.down("lg"));
  const [userName, setUserName] = React.useState("");
  React.useEffect(() => {
    if (user && user.name) {
      let username =
        user?.user?.name === undefined
          ? user?.name.split(" ")[0]
          : user?.user?.name.split(" ")[0];
      setUserName(username);
    }
  }, [user?.name]);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const handleLogout = () => {
    dispatch(toggleLogOutPopup("flex"));
  };
  const setOpen = () => {
    dispatch(toggleSideMenu(!open));
  };

  return (
    <>
      <Drawer
        sx={{
          overflow: "hidden",
          position: "inherit",
          display: { xs: "none", sm: "none", lg: "block", md: "block" },
          width: open ? (LG ? "20%" : "16%") : `calc(2% + 1px)`,
          flexShrink: 0,
          transition: " all 0.5s ease !important",
          marginRight: open ? 0 : 5,
          "& .MuiDrawer-paper": {
            width: open ? (LG ? "20%" : "16%") : "4%",
            transition: "all 0.5s ease !important",
          },
          zIndex: 3,
        }}
        open={open}
        variant="permanent"
      >
        <List sx={{ height: "90%", overflowX: "scroll" }}>
          <DrawerHeader
            sx={{
              justifyContent: open ? "space-between" : "center",
              cursor: "pointer",
              marginBottom: 3,
            }}
          >
            {open && <Logo {...props} />}
            <IconButton sx={{ height: "40px" }} onClick={() => setOpen()}>
              {open ? (
                <Close htmlColor="#000000" />
              ) : (
                <MenuIcon htmlColor="#000000" />
              )}
            </IconButton>
          </DrawerHeader>
          <List>
            <DrawerItem
              {...props}
              select={props.select}
              open={open}
              key="0"
              onClick={() => history.push("/Overview")}
              path={"/Overview"}
              Icon={() => <Overviewicon />}
              text="Overview"
            />
            <DrawerItem
              {...props}
              PM
              select={props.select}
              open={open}
              key="1"
              onClick={() => {
                history.push("/projects");
              }}
              path={"/projects"}
              Icon={() => <ProjectsIcon />}
              text="Projects"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={open}
              key="2"
              onClick={() => history.push("/Departments")}
              path={"/Departments"}
              Icon={() => <DepartmentIcon />}
              text="Departments"
            />
            {role !== "PM" && (
              <DrawerItem
                {...props}
                select={props.select}
                open={open}
                key="7"
                onClick={() => history.push("/ProjectManagers")}
                path={"/ProjectManagers"}
                Icon={() => <PersonIcon />}
                text="Project Managers"
              />
            )}
            <DrawerItem
              {...props}
              select={props.select}
              open={open}
              key="3"
              onClick={() => history.push("/Clients")}
              path={"/Clients"}
              src={IMAGES.clients}
              Icon={() => <ClientIcon />}
              text="Clients"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={open}
              key="4"
              onClick={() => history.push("/TasksList")}
              path={"/TasksList"}
              src={IMAGES.tasks}
              Icon={() => <TaskIcon />}
              text="Tasks"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={open}
              key="5"
              onClick={() => history.push("/Categories")}
              path={"/Categories"}
              Icon={() => <CategoryIcon />}
              text="Category"
            />
          </List>
          <Divider sx={{ marginX: 2.5 }} />
          <List>
            {open && (
              <Typography
                marginLeft={3.5}
                variant="h6"
                fontSize={12}
                color="#B2B3BD"
                fontWeight={"700"}
              >
                Insights
              </Typography>
            )}
            <DrawerItem
              {...props}
              select={props.select}
              open={open}
              key="6"
              onClick={() => history.push("/notifications")}
              path={"/notifications"}
              src={IMAGES.notification}
              Icon={() => <NotificationIcon />}
              text="Notifications"
              padge={userNotificationsNo}
            />
          </List>
        </List>
        <List>
          {open ? (
            <ListItemButton
              sx={{
                ":hover": { bgcolor: "white" },
                justifyContent: open ? "space-between" : "center",
                position: "inherit",
                bgcolor: "white",
                bottom: 0,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: open ? "space-between" : "center",
                }}
              >
                <Avatar
                  name={
                    user?.user?.name === undefined
                      ? user?.name
                      : user?.user?.name
                  }
                  size="40"
                  round
                  color="#FFC500"
                  fgColor="black"
                  style={{
                    marginRight: "10px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: "#808191",
                  ":hover": { color: "white" },
                  opacity: open ? 1 : 0,
                  pl: 1,
                }}
              >
                <Box
                  display={"inline-flex"}
                  width={"100%"}
                  justifyContent={"space-around"}
                >
                  <Box paddingTop={0.5}>
                    <Typography
                      fontFamily={"Cairo"}
                      fontWeight="600"
                      variant="h5"
                      textTransform={"capitalize"}
                      color="#11142D"
                    >
                      {userName}
                    </Typography>
                    <Typography
                      fontFamily={"Cairo"}
                      textTransform={"capitalize"}
                      variant="h6"
                      color="#808191"
                    >
                      {user?.user?.role === undefined
                        ? user?.role === "OM"
                          ? "Admin"
                          : user?.role === "PM"
                          ? "Project Manager"
                          : ""
                        : user?.user?.role === "OM"
                        ? "Admin"
                        : user?.user?.role === "PM"
                        ? "Project Manager"
                        : ""}
                    </Typography>
                  </Box>
                  <Box sx={{ cursor: "pointer" }}>
                    <IconButton onClick={handleLogout}>
                      <LogoutIcon fontSize={"small"} />
                    </IconButton>
                  </Box>
                </Box>
              </ListItemText>
            </ListItemButton>
          ) : (
            <Box sx={{ cursor: "pointer", marginLeft: open ? "15px" : 1 }}>
              <IconButton onClick={handleLogout}>
                <LogoutIcon fontSize={"small"} />
              </IconButton>
            </Box>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default AppDrawer;
