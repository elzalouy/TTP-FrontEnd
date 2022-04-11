import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import IMAGES from "../../assets/img";
import { useAppSelector } from "../../redux/hooks";
import DragField from "./DragField";
import {
  getAllProjects,
  getTasks,
  selectSelectedProject,
} from "../../redux/Projects";
import "./taskViewBoard.css";
import { RouteComponentProps } from "react-router-dom";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";

interface TasksViewBoard {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
const TaskViewBoard: React.FC<TasksViewBoard> = (props: any) => {
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
          <SelectInput
            name="sortby"
            options={[{ id: "due date", text: "Due Date", value: "due date" }]}
            handleChange={() => null}
            placeholder=""
            selectValue="Sort By: "
            selectLabel="Sort By: "
            labelValue="Sort By : "
          />
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => props.history.push("/TasksList")}
            className="task-option"
          >
            <span style={{ fontWeight: "bold", padding: "0 10px" }}>
              Task view List
            </span>
          </Box>
        </Box>
      </Box>
      <DragField {...props} />
    </Box>
  );
};

export default TaskViewBoard;
