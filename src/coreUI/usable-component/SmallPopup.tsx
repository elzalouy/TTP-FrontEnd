import React from "react";
import "./popUp.css";

type Props = {
  show: string;
  widthSize?: string;
  children: object;
  zIndex?:number;
};

const SmallPopUp: React.FC<Props> = ({ show, children, widthSize,zIndex }) => {
  return (
    <div className="container-popup" style={{ display: show,zIndex:zIndex }}>
      <div className="small-pop-up" style={{ width: widthSize,zIndex:zIndex }}>
        {children}
      </div>
    </div>
  );
};

export default SmallPopUp;
