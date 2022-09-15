import { Stack } from "@mui/material";
import * as React from "react";
import "./popUp.css";
interface ScrollOverProps {
  popover: boolean;
  setPopover: any;
}

const ScrollOver: React.FC<ScrollOverProps> = (props) => {
  return (
    <>
      {props.popover ? (
        <Stack
          className="scrollOver"
          maxWidth={"100%"}
          sx={{
            position: {
              lg: "absolute",
              md: "relative",
              sm: "relative",
              xs: "relative",
            },
            zIndex: 2,
            backgroundColor: "white",
            borderRadius: "10px",
            marginLeft: 0,
            marginRight: { lg: 5 },
            boxShadow: "0px 5px 10px #0000001A",
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
