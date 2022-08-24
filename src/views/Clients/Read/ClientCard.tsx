import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Client as IClient } from "./Clients";
import TaskCounterContainer from "../Read/Card/Containers/TaskCounterContainer";
import ProjectCounterContainer from "../Read/Card/Containers/ProjectCounterContainer";
import Header from "./Card/Header";

interface IProps {
  client: IClient;
}

const ClientCard: React.FC<IProps> = ({ client }) => {
  const { _id, doneProject, inProgressProject, image } = client;
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (image?.size && image?.name) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
    } else setPreview(image);
  }, [image]);

  return (
    <Box>
      <Grid
        container
        direction="column"
        className="client-card"
        data-test-id="client-card"
      >
        <Header client={client} preview={preview} />
        <ProjectCounterContainer
          done={doneProject}
          client={client}
          inProgressProject={inProgressProject}
        />
        <TaskCounterContainer id={_id} />
      </Grid>
    </Box>
  );
};
export default ClientCard;
