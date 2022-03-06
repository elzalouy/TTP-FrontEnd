import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import IMAGES from "../../assets/img";
import DragField from "./DragField";
import "./taskViewBoard.css";

type Props = {};
const taskViewBoard: React.FC<Props> = () => {
  return (
    <Box className="task-page" sx={{ width: "100%" }}>
      <Box sx={{ paddingTop: "50px", marginBottom: "20px" }}>
        <Stack
          direction="row"
          marginLeft="12px"
          marginTop="12px"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant="h2">
            Projects
            <img
              style={{ margin: "0 20px" }}
              src={IMAGES.arrowHeader}
              alt="more"
            />
            Project name
          </Typography>
        </Stack>
        <Box className="task-broad-settings">
          <Box className="filter-icon">
            <img src={IMAGES.filtericon} alt="sortout" />
          </Box>
          <Box className="task-option">
            <label>Sort By:</label>
            <select className="select-filter" name="color">
              <option value="A to Z">Due Date</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
          </Box>
          <Box className="task-option">
            <span style={{ fontWeight: "bold", padding: "0 10px" }}>
              Task view List
            </span>
          </Box>
        </Box>
      </Box>

      {/* <DragField></DragField> */}

      <DragField></DragField>
    </Box>
  );
};

export default taskViewBoard;
