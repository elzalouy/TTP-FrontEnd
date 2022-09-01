import { Box } from "@mui/material";
import React from "react";
import "./popUp.css";
type overFlow = "visible" | "hidden" | "clip" | "scroll" | "auto";
type Props = {
  show: string;
  children: object;
  color?: string;
  minWidthSize?: string;
  maxWidthSize?: string;
  maxHeight?: string;
  overFlowY?: overFlow;
};

const PopUp: React.FC<Props> = ({
  show,
  children,
  minWidthSize,
  color,
  maxWidthSize,
  maxHeight,
  overFlowY,
}) => {
  return (
    <div
      className="container-popup"
      style={{ display: show, backgroundColor: color }}
    >
      <div
        className={maxHeight ? "pop-up desktopCustomScrollBar" : "pop-up"}
        style={{
          minWidth: minWidthSize,
          maxWidth: maxWidthSize,
          maxHeight: maxHeight,
          overflowY: overFlowY ? overFlowY : "unset",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
