import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import IMAGES from "../../assets/img";
import { useAppSelector } from "../../redux/hooks";
import {
  getAllProjects,
  getTasks,
  selectSelectedProject,
} from "../../redux/Projects";
import DragField from "./DragField";
import "./taskViewBoard.css";

const TaskViewBoard: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const selectedProject = useAppSelector(selectSelectedProject);
  useEffect(() => {
    dispatch(getAllProjects(null));
    dispatch(
      getTasks({
        url: `?projectId=${props?.match?.params.id}`,
        projectId: props?.match?.params.id,
      })
    );
  }, []);
  console.log(selectedProject.tasks);
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
            {selectedProject?.project?.name}
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
      <DragField />
    </Box>
  );
};

export default TaskViewBoard;
