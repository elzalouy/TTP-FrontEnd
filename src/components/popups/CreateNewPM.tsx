import React, { useState } from "react";
import PopUp from "../../coreUI/usable-component/popUp";
import IMAGES from "../../assets/img/index";
import "./popups-style.css";

type Props = {};

const AddNewPM: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");
  return (
    <>
      <button
        className="black-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Create new PM
      </button>
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

        <div>
          <p className="popup-title">Add new team</p>

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

export default AddNewPM;
