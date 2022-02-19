import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./CreateNewDepartment.css";
import { useState } from "react";

type Props = {};

const CreateNewDepartment: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");
  const [Data, setData] = useState<string>("");
  const [Names, setNames] = useState<string[]>([]);
  return (
    <>
      <div
        className="add-new-dep"
        onClick={() => {
          setShow("flex");
        }}
      >
        <img src={IMAGES.plus} alt="add" />
        <p>Create new department</p>
      </div>
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

        <p className="new-department-title">Create new department</p>

        <label className="label-department">Department name</label>
        <input
          className="input-department"
          type="text"
          placeholder="Department name"
        />

        <label className="label-department">Color</label>
        <select className="select-department">
          <option value="#FFFFFF">#FFFFFF</option>
          <option value="1">option 2 </option>
          <option value="2">option 3</option>
        </select>

        <label className="label-department">Teams</label>
        <div className="add-teams-section">
          <select
            className="select-department"
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
                  className="close-badge"
                  onClick={() => {
                    Names.splice(index, 1);
                    setNames([...Names]);
                  }}
                />
              </div>
            );
          })}
        </div>
        <br />

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

export default CreateNewDepartment;
