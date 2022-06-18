import React, { useEffect } from "react";
import IMAGES from "../../../assets/img";
import PopUp from "../Popup/PopUp";
import { useState } from "react";
import "./popups-style.css";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { selectEditPMPopup } from "../../../redux/Ui/UI.selectors";
import { toggleEditProjectManagerPopup } from "../../../redux/Ui";
import { selectPMs, select_Id, updatePM } from "../../../redux/PM";

type Props = {
  hideButton: boolean;
};

const EditPM: React.FC<Props> = (props: Props) => {
  const toggler = useAppSelector(selectEditPMPopup);
  const _id = useAppSelector(select_Id);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentPM = useAppSelector(selectPMs);
  const currentData = currentPM.filter((element) => {
    return element._id === _id;
  });

  useEffect(() => {
    setUsername(currentData[0]?.name);
    setEmail(currentData[0]?.email);
  }, [toggler]);

  const updateUser = () => {
    if (!username || !email) {
      setError(true);
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
