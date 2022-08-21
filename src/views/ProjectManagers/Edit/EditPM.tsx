import React, { useEffect } from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { useState } from "react";
// import "../../popups-style.css";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { selectEditPMPopup } from "../../../models/Ui/UI.selectors";
import { toggleEditProjectManagerPopup } from "../../../models/Ui";
import { selectPMs, select_Id, updatePM } from "../../../models/PM";

type Props = {
  hideButton: boolean;
};

const EditPM: React.FC<Props> = (props: Props) => {
  const toggler = useAppSelector(selectEditPMPopup);
  const _id = useAppSelector(select_Id);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [emailFormat, setEmailFormat] = useState(false);
  const dispatch = useDispatch();
  const currentPM = useAppSelector(selectPMs);
  const currentData = currentPM.filter((element) => {
    return element._id === _id;
  });
  const pattern =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  useEffect(() => {
    setUsername(currentData[0]?.name);
    setEmail(currentData[0]?.email);
  }, [toggler]);

  const updateUser = () => {
    if (!username || !email) {
      setError(true);
    } else {
      let validate = pattern.test(email);
      if (!validate) {
        setEmailFormat(true);
      } else {
        dispatch(
          updatePM({
            data: {
              id: _id,
              name: username,
              email: email,
            },
            dispatch,
          })
        );
        setError(false);
        setUsername("");
        setEmail("");
        dispatch(toggleEditProjectManagerPopup("none"));
      }
    }
  };

  return (
    <>
      {!props.hideButton && (
        <button
          className="black-btn"
          onClick={() => {
            dispatch(toggleEditProjectManagerPopup("flex"));
          }}
        >
          Edit PM
        </button>
      )}

      <PopUp show={toggler} minWidthSize="30vw">
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              dispatch(toggleEditProjectManagerPopup("none"));
              setUsername("");
              setError(false);
              setEmail("");
            }}
          />
        </div>
        <p className="popup-title">Edit project manager</p>
        {error && (
          <p className="popup-error">Please fill all the empty field</p>
        )}
        {emailFormat && (
          <p className="popup-error">Please enter a valid email format</p>
        )}
        <div>
          <label className="popup-label">Project manager name</label>
          <input
            className="popup-input"
            type="text"
            placeholder="PM name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(false);
            }}
          />
          <label className="popup-label">Email</label>
          <input
            className="popup-input"
            type="text"
            value={email}
            placeholder="user@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
          />
        </div>
        <br />
        <div className="controllers">
          <button className="controllers-done" onClick={updateUser}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default EditPM;
