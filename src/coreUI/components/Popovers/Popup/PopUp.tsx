import React from "react";
import { useAppSelector } from "src/models/hooks";
import { selectSideMenuToggle } from "src/models/Ui";
import { IPopup } from "src/types/components/Containers";
import "./popUp.css";

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
}) => {

  const open = useAppSelector(selectSideMenuToggle);

  return (
    <div
      className={open ? "container-popup" + " " + containerClassName : "container-popup" + " " + containerClassName + " " + "open-popup"}
      style={{ display: show, backgroundColor: color }}
    >
      <div
        className={maxHeight ? "pop-up desktopCustomScrollBar" : "pop-up"}
        style={{
          minWidth: minWidthSize,
          maxWidth: maxWidthSize,
          maxHeight: maxHeight,
          overflowY: overFlowY ? overFlowY : "unset",
          margin: margin,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
