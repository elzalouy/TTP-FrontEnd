import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import * as React from "react";
import { Link } from "react-router-dom";

const DrawerItem: React.FC = ({ Icon, ...props }: any) => {
  return (
    <Link style={{ textDecoration: "none" }} to={props.path}>
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
        className={props.select.includes(props.path) ? "active" : "sideItem"}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: props.open ? 3 : 0,
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
        {props.open && (
          <ListItemText
            sx={{
              color: props.select.includes(props.path) ? "white" : "#808191",
              ":hover": {
                color: "#FFF",
              },
            }}
          >
            <Typography
              fontWeight={props.select.includes(props.path) ? "600" : "500"}
              fontSize={14}
              paddingLeft={"0px"}
            >
              {props.text}
            </Typography>
          </ListItemText>
        )}
      </ListItemButton>
    </Link>
  );
};

export default DrawerItem;
