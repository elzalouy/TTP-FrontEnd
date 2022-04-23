import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import "./popups-style.css";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectEditPMPopup } from "../../redux/Ui/UI.selectors";
import { toggleEditProjectManagerPopup } from "../../redux/Ui";

type Props = {
  hideButton:boolean
};

const EditPM: React.FC<Props> = (props:Props) => {
  const toggler = useAppSelector(selectEditPMPopup);
  const dispatch = useDispatch();

  return (
    <>
      {!props.hideButton && <button
        className="black-btn"
        onClick={() => {
          dispatch(toggleEditProjectManagerPopup("flex"));
        }}
      >
        Edit PM
      </button>}

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
            }}
          />
        </div>

        <p className="popup-title">Edit project manager</p>

        <div>
          <label className="popup-label">Project manager name</label>
          <input className="popup-input" type="text" placeholder="PM name" />
          <label className="popup-label">Email</label>
          <input
            className="popup-input"
            type="text"
            placeholder="user@example.com"
          />
          <label className="popup-label">Trello username</label>
          <input className="popup-input" type="text" placeholder="Username" />
        </div>
        <br />
        <div className="controllers">
          <button
            className="controllers-cancel"
            onClick={() => {
              dispatch(toggleEditProjectManagerPopup("none"));
            }}
          >
            Cancel
          </button>
          <button className="controllers-done" onClick={() => {}}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default EditPM;
