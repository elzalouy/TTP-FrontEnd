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
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Close as Close,
} from "@mui/icons-material";
import IMAGES from "../../../assets/img";
import DrawerItem from "./DrawerItem";
import "./slider.css";
import { useDispatch } from "react-redux";
import {
  logout,
  selectImage,
  selectRole,
  selectUser,
} from "../../../redux/Auth";
import { RouteComponentProps, useHistory } from "react-router";
import { useAppSelector } from "../../../redux/hooks";
import Overviewicon from "../../../assets/icons/Overview";
import PersonIcon from "../../../assets/icons/Person";
import CategoryIcon from "../../../assets/icons/CategoryIcon";
import ClientIcon from "../../../assets/icons/ClientIcon";
import NotificationIcon from "../../../assets/icons/Notification";
import ProjectsIcon from "../../../assets/icons/ProjectsIcon";
import TaskIcon from "../../../assets/icons/TaskIcon";

const ResponsiveDrawer: React.FC = (props: any) => {
  // const drawerWidth = "17%";
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const history = useHistory();
  const userImage = useAppSelector(selectImage);
  const role = useAppSelector(selectRole);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const handleLogout = () => {
    dispatch(logout(null));
    setTimeout(() => history.replace("/"), 1000);
  };

  return (
    <>
      <Drawer
        sx={{
          overflow: "hidden",
          position: "absolute",
          display: { xs: "block", sm: "block", lg: "none", md: "none" },
          width: props.open ? "16%" : "0%",
          flexShrink: 0,
          transition: " all 0.5s ease !important",
          marginRight: props.open ? 0 : 5,
          "& .MuiDrawer-paper": {
            width: props.open ? "52%" : "0%",
            transition: "all 0.5s ease !important",
          },
        }}
        open={props.open}
        variant="permanent"
      >
        <List sx={{ height: "90%", overflowX: "scroll" }}>
          <DrawerHeader
            sx={{
              justifyContent: props.open ? "space-between" : "center",
              cursor: "pointer",
            }}
          >
            <IconButton onClick={() => props.setOpen(!props.open)}>
              <Close htmlColor="#000000" />
            </IconButton>
          </DrawerHeader>
          <List>
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="0"
              onClick={() => history.push("/Overview")}
              Icon={() => <Overviewicon />}
              path={"/Overview"}
              src={IMAGES.Overviewicon}
              text="Overview"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="1"
              onClick={() => history.push("/projects")}
              Icon={() => <ProjectsIcon />}
              path={"/projects"}
              src={IMAGES.projectsicon}
              text="Projects"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="2"
              onClick={() => history.push("/Departments")}
              path={"/Departments"}
              src={IMAGES.departments}
              Icon={() => <ProjectsIcon />}
              text="Departments"
            />
            {role !== "PM" && (
              <DrawerItem
                {...props}
                select={props.select}
                open={props.open}
                key="7"
                onClick={() => history.push("/ProjectManagers")}
                path={"/ProjectManagers"}
                Icon={() => <PersonIcon />}
                src={IMAGES.person}
                text="Project Managers"
              />
            )}
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="3"
              onClick={() => history.push("/Clients")}
              path={"/Clients"}
              Icon={() => <ClientIcon />}
              src={IMAGES.clients}
              text="Clients"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="4"
              onClick={() => history.push("/TasksList")}
              path={"/TasksList"}
              Icon={() => <TaskIcon />}
              src={IMAGES.tasks}
              text="Tasks"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="5"
              onClick={() => history.push("/Categories")}
              path={"/Categories"}
              Icon={() => <CategoryIcon />}
              src={IMAGES.categories}
              text="Category"
            />
          </List>
          <Divider sx={{ marginX: 2.5 }} />
          <List>
            {props.open && (
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
              open={props.open}
              key="6"
              onClick={() => history.push("/notifications")}
              path={"/notifications"}
              src={IMAGES.notification}
              Icon={() => <NotificationIcon />}
              text="Notifications"
            />
          </List>
        </List>
        <List>
          <ListItemButton
            sx={{
              ":hover": { bgcolor: "white" },
              justifyContent: props.open ? "space-between" : "center",
              position: "inherit",
              bgcolor: "white",
              bottom: 0,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: props.open ? "space-between" : "center",
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
                opacity: props.open ? 1 : 0,
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

export default ResponsiveDrawer;
