import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { generateID } from "../../../helpers/IdGenerator";
import "./DeleteTask.css";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import Button from "src/coreUI/components/Buttons/Button";

type Props = {
  onDelete?: () => void;
  Show: string;
  task: string[];
  setShow: (val: string) => void;
};

const DeleteTask: React.FC<Props> = (props) => {
  return (
    <Box style={{ height: "40px" }}>
      <Box
        style={{ height: "100%", width: "35px", padding: "0 10px" }}
        className="filter-icon"
      >
        <IconButton
          disableRipple
          onClick={() => {
            if (props.task.length !== 0) {
              props.setShow("flex");
            } else {
              toast.warn("Please select a task you wish to delete", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: generateID(),
              });
            }
          }}
        >
          <img src={IMAGES.deleteicon} alt="sortout" />
        </IconButton>
      </Box>

      <PopUp show={props.Show} widthSize="30vw">
        <div className="task-delete-container">
          <div className="imageAlert">
            <img src={deleteIcon} />
          </div>
          <p className="delete-title">
            Are you sure you want to delete the selected tasks?
          </p>
          <div className="controllers-dt">
            <Button
              type="cancel"
              size="large"
              label="cancel"
              onClick={() => props.setShow("none")}
            />
            <Button
              type="delete"
              size="large"
              label="delete"
              onClick={props.onDelete}
            />
          </div>
        </div>
      </PopUp>
    </Box>
  );
};

export default DeleteTask;
