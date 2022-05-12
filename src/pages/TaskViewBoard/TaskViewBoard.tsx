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
  ProjectsActions,
  selectAllProjects,
  selectSelectedProject,
} from "../../redux/Projects";
import "./taskViewBoard.css";
import { RouteComponentProps } from "react-router-dom";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";
import TasksIcon from "../../assets/icons/TasksIcon";
import { AssignmentOutlined as AddignmentIcon } from "@mui/icons-material";
import { getPMs } from "../../redux/PM";
import { Controller, useForm } from "react-hook-form";
import TaskIcon from "../../assets/icons/TaskIcon";

interface TasksViewBoard {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
const TaskViewBoard: React.FC<TasksViewBoard> = (props: any) => {
  const dispatch = useDispatch();
  const selectedProject = useAppSelector(selectSelectedProject);
  const all = useAppSelector(selectAllProjects);
  const { control, register, reset, watch } = useForm();
  console.log(selectedProject);
  useEffect(() => {
    dispatch(ProjectsActions.onSetSelectedProject(props?.match?.params.id));
  }, [props.match.params.id, all.projects]);
  const onHandleSort = (e: any) => {
    let data = watch();
    dispatch(ProjectsActions.onSortProjectTasks(data.deadline));
  };
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
            <Controller
              name="deadline"
              control={control}
              render={(props) => (
                <SelectInput
                  {...props}
                  options={[
                    { id: "asc", text: "Ascending", value: "asc" },
                    { id: "desc", text: "Descending", value: "desc" },
                  ]}
                  selectText={props.field.value}
                  handleChange={(e) => {
                    props.field.onChange(e);
                    onHandleSort(e);
                  }}
                  selectValue="Due date:"
                  label="Due date:"
                />
              )}
            />
          </Box>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => props.history.push("/TasksList")}
            className="task-option"
            justifyContent={"center"}
            alignItems="center"
          >
            <TaskIcon stroke="black" />
            <Typography
              fontWeight={"600"}
              fontSize={14}
              variant="h6"
              paddingTop={0.5}
              paddingLeft={1}
            >
              Task view List
            </Typography>
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
