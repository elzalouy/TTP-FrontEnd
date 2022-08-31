import IMAGES from "../../../assets/img/Images";
import DragField from "./DragField";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { Box } from "@mui/system";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import {
  ProjectsActions,
  selectAllProjects,
  selectSelectedProject,
} from "../../../models/Projects";
import "./taskViewBoard.css";
import { ToastSuccess } from "src/coreUI/components/Typos/Alert";

interface TasksViewBoard {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
export const TasksBoardView: React.FC<TasksViewBoard> = (props: any) => {
  const dispatch = useDispatch();
  const selectedProject = useAppSelector(selectSelectedProject);
  const all = useAppSelector(selectAllProjects);
  useEffect(() => {
    dispatch(ProjectsActions.onSetSelectedProject(props?.match?.params.id));
  }, [props.match.params.id, all.projects]);
  // React.useEffect(() => {
  //   document.addEventListener("visibilitychange", () => {
  //     if (document.visibilityState === "visible")
  //   });
  // }, []);
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
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
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
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() =>
                props.history.push("/TasksList", {
                  projectId: selectedProject.project?._id,
                })
              }
              className="task-option"
              justifyContent={"center"}
              alignItems="center"
            >
              <Typography
                fontWeight={"600"}
                fontSize={16}
                variant="h6"
                paddingTop={0.5}
              >
                Task view list
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Grid>
      <Grid xs={12} item sx={{ overflowX: "scroll" }}>
        <DragField {...props} />
      </Grid>
    </Grid>
  );
};
