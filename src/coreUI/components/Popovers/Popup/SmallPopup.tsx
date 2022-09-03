import React from "react";
import { useAppSelector } from "../../../../models/hooks";
import { selectSideMenuToggle } from "../../../../models/Ui/UI.selectors";
import "./popUp.css";

type Props = {
  show: string;
  widthSize?: string;
  children: object;
  dataTestId?: string;
};

const SmallPopUp: React.FC<Props> = ({
  show,
  children,
  widthSize,
  dataTestId,
}) => {
  const isSideMenuOpened = useAppSelector(selectSideMenuToggle);

  return (
    <div
      data-test-id={dataTestId}
      className="container-popup small-popup-container"
      style={
        !isSideMenuOpened
          ? { display: show, left: "4%", width: "96vw" }
          : { display: show }
      }
    >
      <div className="small-pop-up" style={{ width: widthSize }}>
        {children}
      </div>
    </div>
  );
};

export default SmallPopUp;
