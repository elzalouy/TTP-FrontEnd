import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import IMAGES from "../../../assets/img/Images";
import { openCreateTaskPopup } from "../../../models/Ui";

import "./taskViewBoard.css";
const CreateNewTask: React.FC = () => {
  const disptach = useDispatch();
  const handleOpenCreateTaskPopup = () => {
    disptach(openCreateTaskPopup("flex"));
  };
  return (
    <Box className="add-new-task" onClick={handleOpenCreateTaskPopup}>
      <img src={IMAGES.plus} alt="add" width={"24px"} />
      <Typography style={{ paddingLeft: "10px", fontSize: "14px" }}>
        Create new task
      </Typography>
    </Box>
  );
};

export default CreateNewTask;
