import { Box, Popover, Stack } from "@mui/material";
import * as React from "react";

interface ScrollOverProps {
  popover: boolean;
  setPopover: any;
  notification?: boolean;
}

const popoverStyles = {};

const popoverStylesNotification = {
  backgroundColor: "white",
  borderRadius: "4px",
  width: "100%",
};

const ScrollOver: React.FC<ScrollOverProps> = (props) => {
  return (
    <>
      {props.popover ? (
        <Stack
          sx={{
            position: "absolute",
            zIndex: 2,
            backgroundColor: "white",
            borderRadius: "10px",
            width: "inherit",
            marginLeft: 0,
            marginRight: 5,
            boxShadow: "0px 10px 20px #0000001A",
          }}
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
