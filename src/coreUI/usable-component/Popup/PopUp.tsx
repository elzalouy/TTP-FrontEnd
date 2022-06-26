import React from "react";
import "./popUp.css";

type Props = {
  show: string;
  widthSize?: string;
  minWidthSize?: string;
  maxWidthSize?: string;
  padding?: string;
  minHeightSize?: string;
  children: object;
  color?: string;
};

const PopUp: React.FC<Props> = ({
  show,
  children,
  widthSize,
  padding,
  minWidthSize,
  color,
  minHeightSize,
  maxWidthSize,
}) => {
  return (
    <div
      className="container-popup"
      style={{ display: show, backgroundColor: color }}
    >
      <div
        className="pop-up customScrollBar"
        style={
          padding
            ? {
                width: widthSize,
                minWidth: minWidthSize,
                maxWidth: maxWidthSize,
                padding: padding,
              }
            : {
                width: widthSize,
                minWidth: minWidthSize,
                maxWidth: maxWidthSize,
                minHeight: minHeightSize,
              }
        }
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
