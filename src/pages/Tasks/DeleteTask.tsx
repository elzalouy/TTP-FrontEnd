import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import IMAGES from "../../assets/img";
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
    </Box>
  );
};

export default DeleteTask;
