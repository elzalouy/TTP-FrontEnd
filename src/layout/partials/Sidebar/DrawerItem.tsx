import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import * as React from "react";

const DrawerItem: React.FC = (props: any) => {
  return (
    <ListItemButton
      key={props.key}
      sx={{
        minHeight: 55,
        marginX: props.open ? 1 : 0.8,
        marginY: 0.5,
        borderRadius: 2,
        justifyContent: props.open ? "initial" : "center",
        ":hover": { "& .MuiListItemText-root": { color: "white" } },
      }}
      onClick={() => props.onClick()}
      className={props.select === props.path ? "active" : ""}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: props.open ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        <img src={props.src} />
      </ListItemIcon>
      <ListItemText
        sx={{
          color: props.select === props.path ? "white" : "#808191",
          opacity: props.open ? 1 : 0,
        }}
      >
        <Typography fontWeight="700">{props.text}</Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export default DrawerItem;
