import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import TaskCounterContainer from "../Read/Card/Containers/TaskCounterContainer";
import ProjectCounterContainer from "../Read/Card/Containers/ProjectCounterContainer";
import Header from "./Card/Header";
import { IClientCard } from "src/types/views/Client";

const ClientCard: React.FC<IClientCard> = ({ client }) => {
  const { _id, doneProject, inProgressProject, image } = client;
  const [preview, setPreview] = useState("");

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
        done={doneProject ? doneProject : []}
        client={client}
        inProgressProject={inProgressProject}
      />
      <TaskCounterContainer id={_id} />
    </Grid>
  );
};
export default ClientCard;
