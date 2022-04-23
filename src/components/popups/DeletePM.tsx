import React from "react";
import IMAGES from "../../assets/img";
import SmallPopUp from "../../coreUI/usable-component/SmallPopup";
import { useState } from "react";
import "./popups-style.css";
import { useAppSelector } from "../../redux/hooks";
import { selectDeletePMPopup } from "../../redux/Ui/UI.selectors";
import { useDispatch } from "react-redux";
import { toggleDeleteProjectManagerPopup } from "../../redux/Ui";

type Props = {
  hideButton:boolean
};

const DeletePM: React.FC<Props> = (props:Props) => {
  const toggler = useAppSelector(selectDeletePMPopup);
  const dispatch = useDispatch();

  return (
    <>
     {!props.hideButton && <button
        className="black-btn"
        onClick={() => {
          dispatch(toggleDeleteProjectManagerPopup("flex"));
        }}
      >
        Delete PM
      </button>}
      <SmallPopUp show={toggler}>
        <p className="warning-text">
          Are you sure you want to delete this project manager?
        </p>
        <hr className="separator" />
        <div className="margin-cover">
          <div className="controllers">
            <button
              className="controllers-cancel"
              onClick={() => {
                dispatch(toggleDeleteProjectManagerPopup("none"));
              }}
            >
              Cancel
            </button>
            <button className="controllers-delete" onClick={() => {}}>
              Delete
            </button>
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};
export default DeletePM;
