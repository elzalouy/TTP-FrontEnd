import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import "./popups-style.css";

type Props = {};

const EditClient: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");

  return (
    <>
      <button
        className="black-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Edit Client
      </button>

      <PopUp show={Show} widthSize="30vw">
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

        <p className="popup-title">Edit client</p>

        <div>
          <label className="popup-label">Client name</label>
          <input
            className="popup-input"
            type="text"
            placeholder="Ex: Ahmed Ali"
          />
         
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

export default EditClient;
