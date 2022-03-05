import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import "./popups-style.css";

type Props = {};

const EditProject: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");

  return (
    <>
      <button
        className="black-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Edit Project
      </button>

      <PopUp show={Show} minWidthSize="50vw">
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

        <p className="popup-title">Edit project</p>

        <div>
          <div className="inputs-grid">
            <div>
              <label className="popup-label">Project title</label>

              <input
                className="popup-input"
                type="text"
                placeholder="Project name"
              />
            </div>

            <div>
              <label className="popup-label">Client name</label>

              <select className="popup-select">
                <option value="0">Ahmed</option>
                <option value="1">option 2 </option>
                <option value="2">option 3</option>
              </select>
            </div>

            <div>
              <label className="popup-label">Deadline date</label>

              <input className="popup-input" type="date" />
            </div>

            <div>
              <label className="popup-label">Project manager</label>

              <select className="popup-select">
                <option value="0">Abdullah</option>
                <option value="1">option 2 </option>
                <option value="2">option 3 </option>
              </select>
            </div>

            <div>
              <label className="popup-label">Description</label>

              <textarea
                maxLength={75}
                className="popup-textarea"
                rows={3}
                placeholder="Write about your project"
              />
            </div>
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
        </div>
      </PopUp>
    </>
  );
};

export default EditProject;
