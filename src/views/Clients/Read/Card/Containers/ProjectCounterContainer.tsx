import { FC } from "react";
import "../../clients.css";
import { Grid } from "@mui/material";
import { useAppSelector } from "src/models/hooks";
import { selectNotStartedProjects } from "src/models/Projects";
import ProjectNumber from "../Data/ProjectNumber";
import { IProjectCounterContainer } from "src/types/views/Client";

const ProjectCounterContainer: FC<IProjectCounterContainer> = ({
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
      <ProjectNumber title="Done Projects" number={done} />
    </Grid>
  );
};

export default ProjectCounterContainer;
