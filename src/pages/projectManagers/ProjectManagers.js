import React, { useState } from "react";
import CreatePmPopUp from "./CreatePmPopUp";
import Pmcard from "./Pmcard";
import "./Pmcard.css";

export default function ProjectManagers() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {isOpen ? (
        <div>
          <CreatePmPopUp handleClose={togglePopUp} />
        </div>
      ) : (
        <div>
          <div className="Pmheader">
            <h1>Project Managers</h1>
            <input
              type="button"
              value="Create new PM"
              className="btn-pm"
              onClick={togglePopUp}
            />
          </div>
          <div className="cards">
            <Pmcard />
            <Pmcard />
            <Pmcard />
            <Pmcard />
            <Pmcard />
            <Pmcard />
            <Pmcard />
            <Pmcard />
            <Pmcard />
            <Pmcard />
          </div>
        </div>
      )}
    </div>
  );
}
