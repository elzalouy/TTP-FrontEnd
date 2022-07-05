import { Box, Popover, Stack } from "@mui/material";
import * as React from "react";

interface ScrollOverProps {
  popover: boolean;
  setPopover: any;
  notification?: boolean;
}

const popoverStyles = {
  position: "absolute",
  zIndex: 6,
  backgroundColor: "white",
  borderRadius: "4px",
  width: "inherit",
  marginLeft: 0,
  marginRight: 5,
  boxShadow: "0px 5px 15px 5px #FAFAFB;",
};

const popoverStylesNotification = {
  backgroundColor: "white",
  borderRadius: "4px",
  width: "100%",
  boxShadow: "0px 5px 15px 5px #FAFAFB;",
};

const ScrollOver: React.FC<ScrollOverProps> = (props) => {
  return (
    <>
      {props.popover ? (
        <Stack
          sx={props.notification ? popoverStylesNotification : popoverStyles}
        >
          {props.children}
        </Stack>
      ) : (
        props.children
      )}
    </>
  );
};

export default ScrollOver;
