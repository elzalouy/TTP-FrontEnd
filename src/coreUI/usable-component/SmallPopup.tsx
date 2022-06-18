import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectSideMenuToggle } from "../../redux/Ui/UI.selectors";
import "./popUp.css";

type Props = {
  show: string;
  widthSize?: string;
  children: object;
  zIndex?:number;
};

const SmallPopUp: React.FC<Props> = ({ show, children, widthSize,zIndex }) => {

  const isSideMenuOpened = useAppSelector(selectSideMenuToggle)

  return (
    <div className="container-popup" style={!isSideMenuOpened ? { display: show,zIndex:zIndex , left:"4%",width:"96vw"} : { display: show,zIndex:zIndex }}>
      <div className="small-pop-up" style={{ width: widthSize,zIndex:zIndex }}>
        {children}
      </div>
    </div>
  );
};

export default SmallPopUp;
