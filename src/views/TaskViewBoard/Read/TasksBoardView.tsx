import IMAGES from "../../../assets/img/Images";
import DragField from "./DragField";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { Box } from "@mui/system";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import {
  ProjectsActions,
  selectAllProjects,
  selectSelectedProject,
} from "../../../models/Projects";
import "./taskViewBoard.css";
import Button from "src/coreUI/components/Buttons/Button";
import { Project, Task } from "src/types/models/Projects";

interface TasksViewBoard {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
export const TasksBoardView: React.FC<TasksViewBoard> = (props: any) => {
  const dispatch = useDispatch();
  const selectedProject = useAppSelector(selectSelectedProject);
  const ProjectsStore = useAppSelector(selectAllProjects);
  const projectId = props.match.params.id;
  const [state, setState] = useState<{
    project?: Project | null;
    tasks?: Task[];
    mounted: boolean;
  }>({ mounted: false });

  useEffect(() => {
    dispatch(ProjectsActions.onSetSelectedProject(projectId));
  }, [ProjectsStore.projects, ProjectsStore.allTasks, projectId, dispatch]);

  useEffect(() => {
    if (!state.mounted && selectedProject.loading === false) {
      dispatch(ProjectsActions.onSetSelectedProject(projectId));
      setState({
        mounted: true,
        project: selectedProject.project,
        tasks: selectedProject.tasks,
      });
    }
  }, [projectId, selectedProject.loading]);

  return (
    <>
      <Grid
        direction="row"
        width="100%"
        sx={{
          display: "grid",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            marginX: { sm: 1, xs: 1, md: 4, lg: 4 },
            marginBottom: "20px",
            overflow: "hidden",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{ cursor: "pointer" }}
              variant="h2"
              fontFamily={"Cairo"}
              fontSize={20}
              onClick={() => props?.history?.push("/Projects")}
            >
              Projects
              <img
                style={{ margin: "0 20px" }}
                src={IMAGES.arrowHeader}
                alt="more"
              />
              {selectedProject?.project?.name}
            </Typography>
            <Box className="task-broad-settings">
              <Button
                type="main"
                size="x-small"
                label="List View"
                onClick={() =>
                  props.history.push(
                    `/TasksList/${selectedProject.project?._id}`
                  )
                }
                style={{ marginTop: "0px" }}
              />
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ width: "100%", overflowX: "scroll", position: "relative" }}
        >
          <DragField tasks={state.tasks} {...props} />
        </Grid>
      </Grid>
    </>
  );
};
