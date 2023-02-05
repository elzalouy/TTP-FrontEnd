import { FC } from "react";
import "../../clients.css";
import { Grid } from "@mui/material";
import ProjectNumber from "../Data/ProjectNumber";
import { IProjectCounterContainer } from "src/types/views/Client";

const ProjectCounterContainer: FC<IProjectCounterContainer> = ({
  done,
  inProgressProject,
}) => {
  return (
    <Grid
      className="counter-container"
      justifyContent={"space-between"}
      alignItems="center"
    >
      <ProjectNumber
        title="Active Projects"
        dataTestId="active-projects-clients"
        number={inProgressProject}
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
