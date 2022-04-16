import React from "react";
import IMAGES from "../../assets/img";
import SmallPopUp from "../../coreUI/usable-component/SmallPopup";
import { useState } from "react";
import "./popups-style.css";

type Props = {
  show: string;
  setShow: any;
};

const DeleteProject: React.FC<Props> = ({ show, setShow }) => {
  return (
    <>
      <SmallPopUp show={show}>
        <p className="warning-text">
          Are you sure you want to delete this project?
        </p>
        <hr className="separator" />
        <div className="margin-cover">
          <div className="controllers">
            <button
              className="controllers-cancel"
              onClick={() => {
                setShow("none");
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
export default DeleteProject;
