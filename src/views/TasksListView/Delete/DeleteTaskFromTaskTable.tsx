import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { generateID } from "../../../helpers/IdGenerator";
import "./DeleteTask.css";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import Button from "src/coreUI/components/Buttons/Button";
import SmallPopUp from "src/coreUI/components/Popovers/Popup/SmallPopup";
import { ToastWarning } from "src/coreUI/components/Typos/Alert";
import DeketeWarning from "src/coreUI/components/Containers/Warning/DeleteWarning";

type Props = {
  onDelete?: () => void;
  Show: string;
  task: string[];
  setShow: (val: string) => void;
  setAllSelected?: any;
};

const DeleteTask: React.FC<Props> = (props) => {
  return (
    <>
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
                ToastWarning("Please select a task you wish to delete");
              }
            }}
          >
            <img src={IMAGES.deleteicon} alt="sortout" />
          </IconButton>
        </Box>

        <DeketeWarning
          message="Are you sure you want to delete the selected tasks?"
          show={props.Show}
          setShow={props.setShow}
          onClick={props.onDelete}
        />
      </Box>
    </>
  );
};

export default DeleteTask;
