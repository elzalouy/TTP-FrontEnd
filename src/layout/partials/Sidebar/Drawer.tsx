import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBarProps,
} from "@mui/material";
import * as React from "react";
import "./slider.css";
import { styled } from "@mui/material/styles";
import { Logo } from "../../../coreUI/usable-elements/images";
import { Menu as MenuIcon, Logout as LogoutIcon } from "@mui/icons-material";
import IMAGES from "../../../assets/img";
import DrawerItem from "./DrawerItem";
import { useDispatch } from "react-redux";
import {
  logout,
  selectImage,
  selectRole,
  selectUser,
} from "../../../redux/Auth";
import { useHistory } from "react-router";
import DepartmentIcon from "../../../assets/icons/DepartmentIcon";
import Overviewicon from "../../../assets/icons/Overview";
import ProjectsIcon from "../../../assets/icons/ProjectsIcon";
import PersonIcon from "../../../assets/icons/Person";
import ClientIcon from "../../../assets/icons/ClientIcon";
import TaskIcon from "../../../assets/icons/TaskIcon";
import CategoryIcon from "../../../assets/icons/CategoryIcon";
import NotificationIcon from "../../../assets/icons/Notification";
import { useAppSelector } from "../../../redux/hooks";
import { toggleLogOutPopup, toggleSideMenu } from "../../../redux/Ui";
import { selectSideMenuToggle } from "../../../redux/Ui/UI.selectors";
import { counterNotif } from "../../../redux/notification";

interface BarProps extends AppBarProps {}

const AppDrawer: React.FC = (props: any) => {
  const open = useAppSelector(selectSideMenuToggle);
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const userImage = useAppSelector(selectImage);
  const role = useAppSelector(selectRole);
  const counter = useAppSelector(counterNotif);
  const history = useHistory();
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
          width: open ? "16%" : `calc(2% + 1px)`,
          flexShrink: 0,
          transition: " all 0.5s ease !important",
          marginRight: open ? 0 : 5,
          "& .MuiDrawer-paper": {
            width: open ? "16%" : "5%",
            transition: "all 0.5s ease !important",
          },
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
            <IconButton onClick={() => setOpen()}>
              {props?.open ? (
                <MenuIcon htmlColor="#000000" />
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
              select={props.select}
              open={open}
              key="1"
              onClick={() => history.push("/projects")}
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
              padge={counter}
            />
          </List>
        </List>
        <List>
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
              <Avatar src={userImage === "" ? IMAGES.avatar : userImage}>
                AM
              </Avatar>
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
                    {user?.user?.name === undefined
                      ? user?.name
                      : user?.user?.name}
                  </Typography>
                  <Typography
                    fontFamily={"Cairo"}
                    textTransform={"capitalize"}
                    variant="h6"
                    color="#808191"
                  >
                    {user?.user?.role === undefined
                      ? user?.role === "OM" ? "Admin" : "Project Manager"
                      : user?.user?.role  === "OM" ? "Admin" : "Project Manager"}
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
        </List>
      </Drawer>
    </>
  );
};

export default AppDrawer;
