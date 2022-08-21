import * as React from "react";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import { logout } from "../../../models/Auth";
import { toggleLogOutPopup } from "../../../models/Ui";

interface LogoutPopupProps {
  show: string;
  setShow: (val: string) => void;
  alert: string;
  setAlert: (param: string) => void;
  setTrigger: (param: boolean) => void;
}

const DoneProjectConfirm: React.FC<LogoutPopupProps> = ({
  show,
  setShow,
  setTrigger,
  alert,
  setAlert,
}) => {
  return (
    <SmallPopUp show={show} zIndex={9999}>
      <p className="warning-text">
        {alert.length === 0
          ? "Are you sure you want to end this project?"
          : `Please add a ${alert} to update this project status`}
      </p>
      <hr className="separator" />
      <div className="margin-cover">
        <div
          className={`controllers-small-popup ${
            alert.length !== 0 && "controllers-center"
          }`}
        >
          {!alert && (
            <button
              className="controllers-cancel"
              onClick={() => setShow("none")}
            >
              Cancel
            </button>
          )}
          <button
            className="controllers-delete"
            onClick={() => {
              if (alert) {
                setTrigger(false);
              } else {
                setTrigger(true);
              }
              setShow("none");
              setAlert("");
            }}
          >
            {alert ? `Try again` : "End"}
          </button>
        </div>
      </div>
    </SmallPopUp>
  );
};

export default DoneProjectConfirm;
