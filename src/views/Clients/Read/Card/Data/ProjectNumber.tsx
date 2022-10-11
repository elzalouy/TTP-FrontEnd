import { FC } from "react";
import "../../clients.css";
import { Grid, Typography } from "@mui/material";
import { IProjectNumber } from "src/types/views/Client";

const ProjectNumber: FC<IProjectNumber> = ({ title, dataTestId, number }) => {
  return (
    <Grid
      item
      xs={5}
      style={{ textAlign: "center" }}
      className="project-counter-wrapper"
    >
      <Typography
        sx={{ fontSize: 13 }}
        variant="caption"
        style={{ color: "#808191" }}
        className="counter-title"
      >
        {title}
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", fontSize: "18px" }}
        data-test-id={dataTestId}
      >
        {number}
      </Typography>
    </Grid>
  );
};

export default ProjectNumber;
