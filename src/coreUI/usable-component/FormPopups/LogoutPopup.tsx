import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import SmallPopUp from "../Popup/SmallPopup";
import { logout } from "../../../redux/Auth";
import { toggleLogOutPopup } from "../../../redux/Ui";

interface LogoutPopupProps {
  show: string;
  setShow: (val: string) => void;
}

const LogoutPopup: React.FC<LogoutPopupProps> = ({ show, setShow }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(null));
    setShow("none");
  };

  return (
    <SmallPopUp show={show} zIndex={7}>
      <p className="warning-text">Are you sure you want to Logout?</p>
      <hr className="separator" />
      <div className="margin-cover">
        <div className="controllers-small-popup">
          <button
            className="controllers-cancel"
            onClick={() => setShow("none")}
          >
            Cancel
          </button>
          <button className="controllers-delete" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
    </SmallPopUp>
  );
};

export default LogoutPopup;
