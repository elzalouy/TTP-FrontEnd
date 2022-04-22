import React from "react";
import IMAGES from "../../assets/img";
import SmallPopUp from "../../coreUI/usable-component/SmallPopup";
import { useState } from "react";
import "./popups-style.css";

type Props = {
  hideButton:boolean,
  toggle:string,
};

const DeletePM: React.FC<Props> = (props:Props) => {
  const [Show, setShow] = useState<string>("none");

  return (
    <>
     {!props.hideButton && <button
        className="black-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Delete PM
      </button>}
      <SmallPopUp show={Show}>
        <p className="warning-text">
          Are you sure you want to delete this project manager?
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
export default DeletePM;
