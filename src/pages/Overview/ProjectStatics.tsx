import { Box, Typography, CircularProgress, Divider } from "@mui/material";
import React, { useState } from "react";
import { Projects } from "./Overview";
import style from "./overviewStyle";

interface IProps {
  projects: Projects;
}

const ProjectStatics: React.FC<IProps> = ({ projects }) => {
  const classes = style()();
  const [active, setActive] = useState(1);
  const notStartedProject = projects.allProjects / projects.notStarted;
  const inProgressProject = projects.allProjects / projects.inProgress;
  const completedProject = projects.allProjects / projects.completed;

  const toggleClass = (id: number) => {
    setActive(id);
  };
  return (
    <Box className="project-statics">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          style={{
            paddingBottom: "10px",
            fontWeight: "550",
          }}
        >
          Projects
        </Typography>
        <ul className="date-tabs">
          <li className={`${active === 1 ? "active" : " "}`}>
            <a
              onClick={() => {
                toggleClass(1);
              }}
              href="#daily"
            >
              Daily
            </a>
          </li>
          <li className={`${active === 2 ? "active" : " "}`}>
            <a
              onClick={() => {
                toggleClass(2);
              }}
              href="#monthly"
            >
              Monthly
            </a>
          </li>
          <li className={`${active === 3 ? "active" : " "}`}>
            <a
              onClick={() => {
                toggleClass(3);
              }}
              href="#yearly"
            >
              Yearly
            </a>
          </li>
        </ul>
      </Box>
      {active === 1 && (
        <Box
          sx={{
            display: "flex",
            mt: 10,
            mb: 12,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ position: "relative", display: "flex" }}>
              <CircularProgress
                variant="determinate"
                sx={{
                  color: "#F4E6FB",
                }}
                size={80}
                thickness={2}
                value={100}
              />
              <CircularProgress
                size={80}
                thickness={2}
                variant="determinate"
                className={classes.notStarted}
                value={notStartedProject}
              />
              <Box
                sx={{
                  top: 0,
                  left: 25,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{
                    width: "100px",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                  color="text.Primary"
                >
                  {`${Math.round(notStartedProject)}%`}
                </Typography>
              </Box>
            </Box>
            <Box className="project-statics-status">
              <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
                {projects.notStarted}
              </Typography>
              <Typography sx={{ color: "#555555", fontSize: "16px" }}>
                Not started
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ position: "relative", display: "flex" }}>
              <CircularProgress
                variant="determinate"
                sx={{
                  color: "#FEF6E6",
                }}
                size={80}
                thickness={2}
                value={100}
              />
              <CircularProgress
                size={80}
                thickness={2}
                variant="determinate"
                color="secondary"
                className={classes.inProgress}
                value={inProgressProject}
              />
              <Box
                sx={{
                  top: 0,
                  left: 25,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{
                    width: "100px",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                  color="text.Primary"
                >
                  {`${Math.round(inProgressProject)}%`}
                </Typography>
              </Box>
            </Box>
            <Box className="project-statics-status">
              <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
                {projects.inProgress}
              </Typography>
              <Typography sx={{ color: "#555555", fontSize: "16px" }}>
                In progress
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ position: "relative", display: "flex" }}>
              <CircularProgress
                variant="determinate"
                sx={{
                  color: "#E9FBFC",
                }}
                size={80}
                thickness={2}
                value={100}
              />
              <CircularProgress
                size={80}
                thickness={2}
                variant="determinate"
                className={classes.completed}
                value={completedProject}
              />
              <Box
                sx={{
                  top: 0,
                  left: 25,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  style={{
                    width: "100px",
                    fontWeight: "bold",
                    fontSize: "24px",
                  }}
                  color="text.Primary"
                >
                  {`${Math.round(completedProject)}%`}
                </Typography>
              </Box>
            </Box>
            <Box className="project-statics-status">
              <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
                {projects.completed}
              </Typography>
              <Typography sx={{ color: "#555555", fontSize: "16px" }}>
                Completed
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <Divider sx={{ borderBottomWidth: 2 }} />
    </Box>
  );
};
export default ProjectStatics;
