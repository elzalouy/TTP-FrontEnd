import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import IMAGES from "../../assets/img";
import "./taskViewBoard.css";
type Props = {};
const CreateNewTask = () => {
  const [Show, setShow] = useState("none");
  return (
    <Box
      className="add-new-task"
      onClick={() => {
        setShow("flex");
      }}
    >
      <img src={IMAGES.plus} alt="add" />
      <Typography style={{ paddingLeft: "10px" }}>Create new task</Typography>
    </Box>
  );
};

export default CreateNewTask;
