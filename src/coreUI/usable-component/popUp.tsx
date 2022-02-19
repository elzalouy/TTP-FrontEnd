import React from "react";
import "./popUp.css";

type Props = {
  show: string;
  widthSize?: string;
  children: object;
};

const popUp: React.FC<Props> = ({ show, children, widthSize }) => {
  return (
    <div className="container-popup" style={{ display: show }}>
      <div className="pop-up" style={{ width: widthSize }}>
        {children}
      </div>
    </div>
  );
};

export default popUp;
