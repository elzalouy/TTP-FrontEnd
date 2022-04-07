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
} from "@mui/icons-material";
import IMAGES from "../../../assets/img";
import DrawerItem from "./DrawerItem";
interface BarProps extends AppBarProps {
  open?: boolean;
}

const AppDrawer: React.FC = (props: any) => {
  const drawerWidth = 240;

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });
  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
  const Bar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<BarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const MyDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <>
      <MyDrawer
        sx={{ display: { xs: "none", sm: "none", lg: "block", md: "block" } }}
        open={props.open}
        variant="permanent"
      >
        <DrawerHeader
          sx={{ justifyContent: props.open ? "space-between" : "center" }}
        >
          {props.open && <Logo />}
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
            text="OverView"
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
            text="Categories"
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
          <ListItemButton
            sx={{
              ":hover": { bgcolor: "white" },
              justifyContent: props.open ? "space-between" : "center",
              position: "absolute",
              bottom: -70,
              bgcolor: "white",
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
                  paddingLeft={9}
                  paddingTop={1.5}
                  sx={{ cursor: "pointer" }}
                >
                  <LogoutIcon fontSize={"small"} />
                </Box>
              </Box>
            </ListItemText>
          </ListItemButton>
        </List>
      </MyDrawer>
    </>
  );
};

export default AppDrawer;
