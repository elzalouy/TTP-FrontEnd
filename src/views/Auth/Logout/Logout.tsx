import * as React from "react";
import { useDispatch } from "react-redux";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import { logout } from "../../../models/Auth";
import logoutIcon from "../../../assets/img/logoutAlert.png";
import Button from "src/coreUI/components/Buttons/Button";
import { useHistory } from "react-router";

interface LogoutProps {
  show: string;
  setShow: (val: string) => void;
}

export const Logout: React.FC<LogoutProps> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = async () => {
    await dispatch(logout(null));
    setShow("none");
    history.push("/login");
  };

  return (
    <SmallPopUp show={show}>
      <div className="imageAlert">
        <img src={logoutIcon} />
      </div>
      <p className="warning-text">Are you sure you want to Logout?</p>
      <div className="margin-cover">
        <div className="controllers-small-popup">
          <Button
            size="small"
            type="cancel"
            label="cancel"
            onClick={() => setShow("none")}
          />
          <Button
            size="small"
            type="delete"
            label="logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </SmallPopUp>
  );
};
