import React from "react";
import "./popUp.css";

type Props = {
  show: string;
  widthSize?: string;
  minWidthSize?: string;
  maxWidthSize?: string;
  padding?:string;
  children: object;
};

const popUp: React.FC<Props> = ({
  show,
  children,
  widthSize,
  padding,
  minWidthSize,
  maxWidthSize,
}) => {
  return (
    <div className="container-popup" style={{ display: show }}>
      <div
        className="pop-up"
        style={padding ?{ width: widthSize,
          minWidth: minWidthSize,
          maxWidth: maxWidthSize,padding:padding} : {
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
