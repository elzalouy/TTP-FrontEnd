import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import "./popups-style.css";

type Props = {};

const EditCategory: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");
  const [Data, setData] = useState<string>("");
  const [Names, setNames] = useState<string[]>([]);
  return (
    <>
      <button
        className="black-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Edit Category
      </button>

      <PopUp show={Show} minWidthSize="30vw" maxWidthSize="300px">
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

        <p className="popup-title">Edit category</p>

        <div>
          <label className="popup-label">Main category</label>
          <input
            className="popup-input"
            type="text"
            placeholder="Ex: Ahmed Ali"
          />
          <label className="popup-label">Sub-category</label>
          <div className="add-teams-section">
            <select
              className="popup-select"
              onChange={(e) => {
                setData(e.target.value);
              }}
            >
              <option value="Al-shaqran team">Al-shaqran team</option>
              <option value="1">option 2 </option>
              <option value="2">option 3</option>
            </select>

            <button
              className="orange-btn"
              onClick={() => {
                setNames([...Names, Data]);
              }}
            >
              Add
            </button>
          </div>
          <div className="names-container">
            {Names.map((el, index) => {
              return (
                <div className="team-name-badge">
                  <p className="name-of-badge">{el}</p>
                  <img
                    src={IMAGES.closeicon}
                    alt="close"
                    width="9px"
                    height="9px"
                    className="pointer"
                    onClick={() => {
                      Names.splice(index, 1);
                      setNames([...Names]);
                    }}
                  />
                </div>
              );
            })}
          </div>
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

export default EditCategory;
