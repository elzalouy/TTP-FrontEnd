import { FC } from "react";
import "../../clients.css";
import { Client as IClient } from "../../Clients";
import { Grid } from "@mui/material";
import { useAppSelector } from "src/models/hooks";
import { selectNotStartedProjects } from "src/models/Projects";
import ProjectNumber from "../Data/ProjectNumber";

type Props = {
  done: string[];
  client: IClient;
  inProgressProject: number | string[];
};

const ProjectCounterContainer: FC<Props> = ({
  done,
  client,
  inProgressProject,
}) => {
  const notStartedProject = useAppSelector(selectNotStartedProjects);

  const getAllActiveProjects = () => {
    let notStartedArray = notStartedProject?.filter(
      (project) => project.clientId === client._id
    );
    if (
      typeof notStartedArray !== "undefined" &&
      typeof inProgressProject === "number"
    ) {
      return notStartedArray.length + inProgressProject;
    }
    return 0;
  };

  const projectNumber = getAllActiveProjects();

  return (
    <Grid
      container
      className="counter-container"
      justifyContent={"space-between"}
      alignItems="center"
    >
      <ProjectNumber
        title="Active Projects"
        dataTestId="active-projects-clients"
        number={projectNumber}
      />
      <hr
        color="#88888885"
        style={{ width: "1px !important" }}
        className="hrVertical"
      />
      <ProjectNumber title="Done Projects" number={done} />
    </Grid>
  );
};

export default ProjectCounterContainer;
