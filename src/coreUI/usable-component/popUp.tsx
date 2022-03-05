import React from "react";
import "./popUp.css";

type Props = {
  show: string;
  widthSize?: string;
  minWidthSize?: string;
  maxWidthSize?: string;
  children: object;
};

const popUp: React.FC<Props> = ({
  show,
  children,
  widthSize,
  minWidthSize,
  maxWidthSize,
}) => {
  return (
    <div className="container-popup" style={{ display: show }}>
      <div
        className="pop-up"
        style={{
          width: widthSize,
          minWidth: minWidthSize,
          maxWidth: maxWidthSize,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default popUp;
