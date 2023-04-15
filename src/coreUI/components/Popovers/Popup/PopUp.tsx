import React from "react";
import { useAppSelector } from "src/models/hooks";
import { selectSideMenuToggle } from "src/models/Ui";
import { IPopup } from "src/types/components/Containers";
import "./popUp.css";
import { Box } from "@mui/material";

const PopUp: React.FC<IPopup> = ({
  show,
  children,
  minWidthSize,
  color,
  maxWidthSize,
  maxHeight,
  overFlowY,
  margin,
  containerClassName,
  width,
  height,
  styles,
  sx,
  containerSx,
}) => {
  const open = useAppSelector(selectSideMenuToggle);
  return (
    <Box
      className={
        open
          ? "container-popup" + " " + containerClassName
          : "container-popup" + " " + containerClassName + " " + "open-popup"
      }
      style={{ display: show }}
      sx={containerSx}
    >
      <Box
        className={maxHeight ? "pop-up desktopCustomScrollBar" : "pop-up"}
        style={{
          backgroundColor: color,
          minWidth: minWidthSize,
          maxWidth: maxWidthSize,
          maxHeight: maxHeight,
          overflowY: overFlowY ? overFlowY : "unset",
          margin: margin,
          width: width,
          height: height,
          ...styles,
        }}
        sx={sx}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PopUp;
