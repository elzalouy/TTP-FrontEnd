import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectSideMenuToggle } from "../../../redux/Ui/UI.selectors";
import "./popUp.css";

type Props = {
  show: string;
  widthSize?: string;
  children: object;
  zIndex?: number;
  dataTestId?: string;
};

const SmallPopUp: React.FC<Props> = ({
  show,
  children,
  widthSize,
  zIndex,
  dataTestId,
}) => {
  const isSideMenuOpened = useAppSelector(selectSideMenuToggle);

  return (
    <div
      data-test-id={dataTestId}
      className="container-popup"
      style={
        !isSideMenuOpened
          ? { display: show, zIndex: zIndex, left: "4%", width: "96vw" }
          : { display: show, zIndex: zIndex }
      }
    >
      <div
        className="small-pop-up"
        style={{ width: widthSize, zIndex: zIndex }}
      >
        {children}
      </div>
    </div>
  );
};

export default SmallPopUp;
