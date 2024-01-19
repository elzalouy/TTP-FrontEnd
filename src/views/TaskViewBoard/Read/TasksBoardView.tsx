import IMAGES from "../../../assets/img/Images";
import DragField from "./DragField";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { Box } from "@mui/system";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { selectProjectsState } from "../../../models/Projects";
import "./taskViewBoard.css";
import Button from "src/coreUI/components/Buttons/Button";
import { Project } from "src/types/models/Projects";

type TasksViewBoardProps = RouteComponentProps<{ id: string }>;

export const TasksBoardView = (props: TasksViewBoardProps) => {
  const ProjectsStore = useAppSelector(selectProjectsState);
  const projectId = props.match.params.id;
  const [state, setState] = useState<{ project: Project }>();

  useEffect(() => {
    let project = ProjectsStore.projects.find((item) => item._id === projectId);
    if (project)
      setState({
        project,
      });
  }, [ProjectsStore.projects]);

  return (
    <Grid container>
      <Grid
        item
        sx={{
          paddingX: { sm: 1, xs: 1, md: 4, lg: 4 },
          marginBottom: "20px",
          overflow: "hidden",
          width: "auto",
          justifyContent: "space",
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
            onClick={() => props?.history?.push("/projects")}
          >
            Projects
            <img
              style={{ margin: "0 20px" }}
              src={IMAGES.arrowHeader}
              alt="more"
            />
            {state?.project?.name}
          </Typography>
          <Box className="task-broad-settings">
            <Button
              type="main"
              size="x-small"
              label="List View"
              onClick={() =>
                props.history.push(`/TasksList/${state?.project?._id}`)
              }
              style={{ marginTop: "0px" }}
            />
          </Box>
        </Stack>
      </Grid>
      <DragField props={props} />
    </Grid>
  );
};
