import React, { useState } from "react";
import PopUp from "../../coreUI/usable-component/popUp";
import IMAGES from "../../assets/img/index";
import "./addNewPM.css";

type Props = {};
const AddNewPM: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");
  return (
    <>
      <button
        className="add-new-team-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Create new PM
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

        <div>
          <p className="add-new-PM-title">Add new team</p>

          <label className="label-PM">Project manager name</label>
          <input
            className="input-PM"
            type="text"
            placeholder="PM name"
          />
          <label className="label-PM">Email</label>
          <input
            className="input-PM"
            type="text"
            placeholder="user@example.com"
          />
          <label className="label-PM">Trello username</label>
          <input
            className="input-PM"
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="controllers">
          <button
            className="cancelBtn"
            onClick={() => {
              setShow("none");
            }}
          >
            Cancel
          </button>
          <button className="blackBtn" onClick={() => {}}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};

export default AddNewPM;
