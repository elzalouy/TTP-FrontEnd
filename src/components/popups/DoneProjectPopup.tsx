import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import SmallPopUp from "../../coreUI/usable-component/SmallPopup";
import { logout } from "../../redux/Auth";
import { toggleLogOutPopup } from "../../redux/Ui";

interface LogoutPopupProps {
  show: string;
  setShow: (val: string) => void;
  setTrigger: (param: boolean) => void;
}

const DoneProjectConfirm: React.FC<LogoutPopupProps> = ({ show, setShow,setTrigger}) => {

  const history = useHistory();

  return (
    <SmallPopUp show={show} zIndex={9999}>
      <p className="warning-text">Are you sure you want to end this project?</p>
      <hr className="separator" />
      <div className="margin-cover">
        <div className="controllers">
          <button
            className="controllers-cancel"
            onClick={() => setShow("none")}
          >
            Cancel
          </button>
          <button className="controllers-delete" onClick={()=>{
            setTrigger(true);
            setShow("none")
          }}>
            End
          </button>
        </div>
      </div>
    </SmallPopUp>
  );
};

export default DoneProjectConfirm;
