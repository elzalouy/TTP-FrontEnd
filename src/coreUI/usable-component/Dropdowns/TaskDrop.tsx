import React from "react";
import { useState } from "react";
import IMAGES from "../../../assets/img/Images";
import "./dropdowns-style.css";

type Props = {};

const TaskDrop: React.FC<Props> = () => {
  const [Show, setShow] = useState<string>("none");

  return (
    <div className="dropdown-cover">
      <button
        className="dropdown-moreBtn"
        onClick={() => {
          if (Show === "none") setShow("flex");
          else setShow("none");
        }}
      >
        <img src={IMAGES.more} alt="more" />
      </button>

      <div className="dropdown-container" style={{ display: Show }}>
        <button className="dropdown-btn" onClick={() => setShow("none")}>
          <img
            className="dropdown-btn-icon grey-icon"
            src={IMAGES.plus}
            alt="icon"
          />
          <span className="dropdown-btn-titleGrey">Add sub task</span>
        </button>

        <button className="dropdown-btn" onClick={() => setShow("none")}>
          <img
            className="dropdown-btn-icon grey-icon"
            src={IMAGES.edit}
            alt="icon"
          />
          <span className="dropdown-btn-titleGrey">Edit task</span>
        </button>

        <button className="dropdown-btn" onClick={() => setShow("none")}>
          <img
            className="dropdown-btn-icon"
            src={IMAGES.deleteicon2}
            alt="icon"
            width="20px"
            height="20px"
          />
          <span className="dropdown-btn-titleRed">Delete</span>
        </button>
      </div>
    </div>
  );
};
export default TaskDrop;
