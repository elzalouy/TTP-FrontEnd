import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import "./popups-style.css";
import { useDispatch } from "react-redux";

type Props = {
  hideButton:boolean,
  toggle:string,
};

const EditPM: React.FC<Props> = (props:Props) => {
  const [Show, setShow] = useState("none");

  return (
    <>
      {!props.hideButton && <button
        className="black-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Edit PM
      </button>}

      <PopUp show={Show} minWidthSize="30vw">
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              setShow("none");
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
              setShow("none");
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
