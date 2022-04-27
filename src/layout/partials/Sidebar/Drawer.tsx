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
import { Logo } from "../../../coreUI/usable-elements/images";
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  PersonOffOutlined as PersonIcon,
} from "@mui/icons-material";
import IMAGES from "../../../assets/img";
import DrawerItem from "./DrawerItem";
import "./slider.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/Auth";
import { useHistory } from "react-router";
interface BarProps extends AppBarProps {
  open?: boolean;
}

const AppDrawer: React.FC = (props: any) => {
  const drawerWidth = "17%";
  const dispatch = useDispatch();
  const history = useHistory();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const handleLogout = () => {
    dispatch(logout(null));
    setTimeout(()=>history.replace("/"),1000)
  }

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
              src={IMAGES.Overviewicon}
              text="Overview"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="1"
              onClick={() => props.history.push("/projects")}
              path={"/projects"}
              src={IMAGES.projectsicon}
              text="Projects"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="2"
              onClick={() => props.history.push("/Departments")}
              path={"/Departments"}
              src={IMAGES.departments}
              text="Departments"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="7"
              onClick={() => props.history.push("/ProjectManagers")}
              path={"/ProjectManagers"}
              src={IMAGES.person}
              text="Project Managers"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="3"
              onClick={() => props.history.push("/Clients")}
              path={"/Clients"}
              src={IMAGES.clients}
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
              text="Tasks"
            />
            <DrawerItem
              {...props}
              select={props.select}
              open={props.open}
              key="5"
              onClick={() => props.history.push("/Categories")}
              path={"/Categories"}
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
              onClick={() => props.history.push("/notifications")}
              path={"/notifications"}
              src={IMAGES.notification}
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
              <Avatar src={IMAGES.avatar}>AM</Avatar>
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
                    color="#11142D"
                  >
                    Ahmed Ali
                  </Typography>
                  <Typography fontFamily={"Cairo"} variant="h6" color="#808191">
                    Admin
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
