import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskCounterContainer from "../Read/Card/Containers/TaskCounterContainer";
import ProjectCounterContainer from "../Read/Card/Containers/ProjectCounterContainer";
import Header from "./Card/Header";
import { IClientCard } from "src/types/views/Client";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { DoneStatusList } from "src/types/models/Projects";

const ClientCard: React.FC<IClientCard> = ({ client }) => {
  const { _id, image } = client;
  const [preview, setPreview] = useState("");
  const projectState = useAppSelector(selectAllProjects);
  const projectsIds = projectState.projects
    .filter((item) => item.clientId === _id)
    .map((item) => item._id);
  console.log({ projectsIds });
  const shared = projectState.allTasks.filter(
    (item) => projectsIds.includes(item.projectId) && item.status === "Shared"
  ).length;
  const inProgress = projectState.allTasks.filter(
    (item) =>
      projectsIds.includes(item.projectId) && item.status === "In Progress"
  ).length;
  const done = projectState.allTasks.filter(
    (item) => projectsIds.includes(item.projectId) && item.status === "Done"
  ).length;
  useEffect(() => {
    if (image?.size && image?.name) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
    } else setPreview(image);
  }, [image]);

  return (
    <Grid
      item
      mt={2}
      xl={3.9}
      lg={3.9}
      md={5.9}
      sm={5.9}
      xs={12}
      className="client-card"
      data-test-id="client-card"
    >
      <Header client={client} preview={preview} />
      <ProjectCounterContainer
        done={
          projectState.projects.filter(
            (item) =>
              item.clientId === _id &&
              DoneStatusList.includes(item.projectStatus)
          ).length
        }
        inProgressProject={
          projectState.projects.filter(
            (item) =>
              item.clientId === _id && item.projectStatus === "In Progress"
          ).length
        }
      />
      <TaskCounterContainer
        id={_id}
        shared={shared}
        done={done}
        inProgress={inProgress}
      />
    </Grid>
  );
};
export default ClientCard;
