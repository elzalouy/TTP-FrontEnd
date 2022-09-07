import React from "react";
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
          margin:margin,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
