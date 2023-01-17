import * as React from "react";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import { logout } from "../../../models/Auth";
import { toggleLogOutPopup } from "../../../models/Ui";

interface LogoutPopupProps {
  alert: string;
  show: string;
  setShow: (e: any) => any;
  cancel: boolean;
  ok?: boolean;
  onOk: (e: any) => any;
  okText: string;
  cancelText: string;
}

const DoneProjectConfirm: React.FC<LogoutPopupProps> = ({
  show,
  alert,
  setShow,
  onOk,
  ok,
  cancel,
  cancelText,
  okText,
}) => {
  return (
    <SmallPopUp show={show}>
      <p className="warning-text">{alert}</p>
      <hr className="separator" />
      <div className="margin-cover">
        <div
          className={`${alert.length !== 0 && "controllers-center"}`}
          style={{
            marginBottom: "0px !important;",
            display: "flex",
          }}
        >
          {cancel && (
            <button
              className="controllers-cancel"
              onClick={() => setShow("none")}
            >
              {cancelText}
            </button>
          )}
          {ok && (
            <button className="controllers-delete" onClick={onOk}>
              {okText}
            </button>
          )}
        </div>
      </div>
    </SmallPopUp>
  );
};

export default DoneProjectConfirm;
