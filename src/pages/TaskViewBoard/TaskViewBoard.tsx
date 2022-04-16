import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import IMAGES from "../../assets/img";
import { useAppSelector } from "../../redux/hooks";
import DragField from "./DragField";
import {
  getAllProjects,
  getProject,
  getTasks,
  selectSelectedProject,
} from "../../redux/Projects";
import "./taskViewBoard.css";
import { RouteComponentProps } from "react-router-dom";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";
import TasksIcon from "../../assets/icons/TasksIcon";
import { AssignmentOutlined as AddignmentIcon } from "@mui/icons-material";

interface TasksViewBoard {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
const TaskViewBoard: React.FC<TasksViewBoard> = (props: any) => {
  const dispatch = useDispatch();
  const selectedProject = useAppSelector(selectSelectedProject);

  useEffect(() => {
    dispatch(getProject(`?projectId:${props.match.params.id}`));
    dispatch(
      getTasks({
        url: `?projectId=${props?.match?.params.id}`,
        projectId: props?.match?.params.id,
      })
    );
  }, []);
  return (
    <Grid
      container
      direction="row"
      sx={{
        overflowX: "hidden",
        overflowY: "hidden",
      }}
      padding={0}
      margin={0}
      marginTop={{ xs: 8, sm: 8, md: 0, lg: 0 }}
    >
      <Grid
        paddingX={4}
        paddingY={2}
        item
        xs={12}
        sx={{ marginBottom: "20px", overflow: "hidden" }}
      >
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <Typography variant="h2" fontFamily={"Cairo"} fontSize={20}>
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
          <Box marginLeft={2}>
            <SelectInput
              options={[
                { id: "due date", text: "Due Date", value: "due date" },
              ]}
              selectText={""}
              handleChange={() => null}
              selectValue="Sort By: "
              label="Sort By: "
            />
          </Box>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => props.history.push("/TasksList")}
            className="task-option"
          >
            <span style={{ fontWeight: "bold", padding: "0 10px" }}>
              <AddignmentIcon
                htmlColor="#000000"
                fontSize="inherit"
                sx={{ marginRight: 1 }}
              />
              Task view List
            </span>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} item sx={{ overflowX: "scroll" }}>
        <DragField {...props} />
      </Grid>
    </Grid>
  );
};

export default TaskViewBoard;
