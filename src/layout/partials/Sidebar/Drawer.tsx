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
import { styled } from "@mui/material/styles";
import { Logo } from "../../../coreUI/usable-elements/images";
import { Menu as MenuIcon, Logout as LogoutIcon } from "@mui/icons-material";
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
interface BarProps extends AppBarProps {
  open?: boolean;
}

const AppDrawer: React.FC = (props: any) => {
  const drawerWidth = "17%";
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
          position: "inherit",
          display: { xs: "none", sm: "none", lg: "block", md: "block" },
          width: props.open ? "16%" : `calc(2% + 1px)`,
          flexShrink: 0,
          transition: " all 0.5s ease !important",
          marginRight: props.open ? 0 : 5,
          "& .MuiDrawer-paper": {
            width: props.open ? "16%" : "5%",
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
            {props.open && <Logo {...props} />}
            <IconButton onClick={() => props.setOpen(!props.open)}>
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
              open={props.open}
              key="0"
              onClick={() => props.history.push("/Overview")}
              path={"/Overview"}
              Icon={() => <Overviewicon />}
              text="Overview"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="1"
              onClick={() => props.history.push("/projects")}
              path={"/projects"}
              Icon={() => <ProjectsIcon />}
              text="Projects"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="2"
              onClick={() => props.history.push("/Departments")}
              path={"/Departments"}
              Icon={() => <DepartmentIcon />}
              text="Departments"
            />
            {role !== "PM" && (
              <DrawerItem
                {...props}
                select={props.select}
                open={props.open}
                key="7"
                onClick={() => props.history.push("/ProjectManagers")}
                path={"/ProjectManagers"}
                Icon={() => <PersonIcon />}
                text="Project Managers"
              />
            )}
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="3"
              onClick={() => props.history.push("/Clients")}
              path={"/Clients"}
              src={IMAGES.clients}
              Icon={() => <ClientIcon />}
              text="Clients"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="4"
              onClick={() => props.history.push("/TasksList")}
              path={"/TasksList"}
              src={IMAGES.tasks}
              Icon={() => <TaskIcon />}
              text="Tasks"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="5"
              onClick={() => props.history.push("/Categories")}
              path={"/Categories"}
              Icon={() => <CategoryIcon />}
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
              onClick={() => props.history.push("/notifications")}
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
              <Box display={"inline-flex"}>
                <Box paddingTop={0.5}>
                  <Typography
                    fontFamily={"Cairo"}
                    fontWeight="600"
                    variant="h5"
                    textTransform={"capitalize"}
                    color="#11142D"
                  >
                    {user.user?.name === undefined ? user.name : user.user.name}
                  </Typography>
                  <Typography
                    fontFamily={"Cairo"}
                    textTransform={"capitalize"}
                    variant="h6"
                    color="#808191"
                  >
                    {user.user?.role === undefined ? user.role : user.user.role}
                  </Typography>
                </Box>
                <Box
                  paddingLeft={7}
                  paddingTop={1.5}
                  sx={{ cursor: "pointer" }}
                >
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
