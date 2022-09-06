import IMAGES from "../../../assets/img/Images";
import DragField from "./DragField";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { Box } from "@mui/system";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import {
  getAllTasks,
  ProjectsActions,
  selectAllProjects,
  selectSelectedProject,
} from "../../../models/Projects";
import "./taskViewBoard.css";
import { ToastSuccess } from "src/coreUI/components/Typos/Alert";
import Button from "src/coreUI/components/Buttons/Button";

interface TasksViewBoard {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
export const TasksBoardView: React.FC<TasksViewBoard> = (props: any) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedProject = useAppSelector(selectSelectedProject);
  const all = useAppSelector(selectAllProjects);
  useEffect(() => {
    dispatch(ProjectsActions.onSetSelectedProject(props?.match?.params.id));
  }, [props.match.params.id, all.projects]);
  React.useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      console.log("visible", location.pathname);
      if (
        document.visibilityState === "visible" &&
        location.pathname.includes("/TasksBoard/")
      ) {
        dispatch(getAllTasks(null));
      }
    });
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
        item
        xs={12}
        sx={{ marginBottom: "20px", overflow: "hidden" }}
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
                props.history.push("/TasksList", {
                  projectId: selectedProject.project?._id,
                })
              }
              style={{ marginTop: "0px" }}
            />
          </Box>
        </Stack>
      </Grid>
      <Grid xs={12} item sx={{ overflowX: "scroll" }}>
        <DragField {...props} />
      </Grid>
    </Grid>
  );
};
