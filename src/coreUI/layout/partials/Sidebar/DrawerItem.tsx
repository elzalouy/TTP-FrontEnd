import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import * as React from "react";

const DrawerItem: React.FC = ({ Icon, ...props }: any) => {
  return (
    <ListItemButton
      key={props.key}
      sx={{
        minHeight: 55,
        marginX: props.open ? 1 : 0.8,
        marginY: 1,
        borderRadius: 2.5,
        justifyContent: props.open ? "initial" : "center",
        ":hover": {
          "& .MuiListItemText-root": { color: "white", boxShadow: "none" },
        },
      }}
      onClick={() => props.onClick()}
      className={props.select === props.path ? "active" : "sideItem"}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: props.open ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        {props?.padge && props.padge > 0 ? (
          <Badge badgeContent={props.padge} color="error">
            {Icon && <Icon />}
          </Badge>
        ) : (
          <>{Icon && <Icon />}</>
        )}
      </ListItemIcon>
      <ListItemText
        sx={{
          color: props.select === props.path ? "white" : "#808191",
          opacity: props.open ? 1 : 0,
          ":hover": {
            color: "#FFF !important",
          },
        }}
      >
        <Typography
          fontWeight={props.select === props.path ? "600" : "500"}
          fontSize={14}
          paddingLeft={props.text === "Project Managers" ? "5px" : "0px"}
        >
          {props.text}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export default DrawerItem;
