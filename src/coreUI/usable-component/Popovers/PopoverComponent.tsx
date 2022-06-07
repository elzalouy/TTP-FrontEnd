import { Box, Popover, Stack } from "@mui/material";
import * as React from "react";

interface PopoverComponentProps {
  popover: boolean;
  setPopover: any;
}

const PopoverComponent: React.FC<PopoverComponentProps> = (props) => {
  return (
    <>
      {props.popover ? (
        <Stack
          sx={{
            position: "absolute",
            width: "inherit",
            backgroundColor: "white",
            borderRadius: "4px",
            boxShadow: "0px 5px 15px 5px #FAFAFB;",
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

export default PopoverComponent;
