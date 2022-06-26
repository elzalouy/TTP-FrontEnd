import { Box } from "@mui/material";
import React from "react";
import "./popUp.css";

type Props = {
  show: string;
  widthSize?: string;
  minWidthSize?: string;
  maxWidthSize?: string;
  padding?: string;
  children: object;
  maxHeight?: string;
  minHeight?: string;
  overflowY?: boolean;
};

const PopUp: React.FC<Props> = ({
  show,
  children,
  widthSize,
  padding,
  minWidthSize,
  maxWidthSize,
  maxHeight,
  minHeight,
  overflowY,
}) => {
  return (
    <Box
      className="container-popup"
      padding={padding}
      style={{ display: show }}
    >
      <div
        className="pop-up customScrollBar"
        style={{
          overflowY: overflowY === true ? "scroll" : "hidden",
          width: widthSize,
          minWidth: minWidthSize,
          maxWidth: maxWidthSize,
          minHeight: minHeight,
          maxHeight: maxHeight,
          padding: padding,
        }}
      >
        {children}
      </div>
    </Box>
  );
};

export default PopUp;
