import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./DeleteTask.css";

type Props = {
  onDelete: () => void;
  Show: string;
  setShow: (val: string) => void;
};

const DeleteTask: React.FC<Props> = (props) => {
  return (
    <Box style={{ height: "30px" }}>
      <Box style={{ width: "35px", padding: "0 10px" }} className="filter-icon">
        <IconButton
          onClick={() => {
            props.setShow("flex");
          }}
        >
          <img src={IMAGES.deleteicon} alt="sortout" />
        </IconButton>
      </Box>

      <PopUp show={props.Show} widthSize="23vw">
        <p className="delete-title">
          Are you sure you want to delete this task?
        </p>
        <hr className="hr-dt" />
        <div className="controllers-dt">
          <button
            className="cancelBtn-dt"
            onClick={() => {
              props.setShow("none");
            }}
          >
            Cancel
          </button>
          <button className="redBtn" onClick={props.onDelete}>
            Delete
          </button>
        </div>
      </PopUp>
    </Box>
  );
};

export default DeleteTask;
