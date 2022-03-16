import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./DeleteTask.css";

type Props = {};

const DeleteTask: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");

  return (
    <Box style={{ height: "30px" }}>
      <Box style={{ width: "35px", padding: "0 10px" }} className="filter-icon">
        <IconButton
          onClick={() => {
            setShow("flex");
          }}
        >
          <img src={IMAGES.deleteicon} alt="sortout" />
        </IconButton>
      </Box>

      <PopUp show={Show} widthSize="23vw">
        <p className="delete-title">
          Are you sure you want to delete this task?
        </p>
        <hr className="hr-dt" />
        <div className="controllers-dt">
          <button
            className="cancelBtn-dt"
            onClick={() => {
              setShow("none");
            }}
          >
            Cancel
          </button>
          <button className="redBtn" onClick={() => {}}>
            Delete
          </button>
        </div>
      </PopUp>
    </Box>
  );
};

export default DeleteTask;
