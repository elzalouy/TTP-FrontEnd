import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import style from "./userProjectsStyle";
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from "@mui/icons-material";
import { selectAllProjects } from "../../redux/Projects";
import { useAppSelector } from "../../redux/hooks";
import { selectPMs } from "../../redux/PM";
const UserProjects: React.FC = (props) => {
  const PMs = useAppSelector(selectPMs);
  const classes = style("In progress")();
  const projects = useAppSelector(selectAllProjects);
  return (
    <>
      <Typography
        id="project-header"
        variant="h5"
        fontWeight={"800"}
        color="#505050"
        paddingTop={5}
        paddingBottom={2}
      >
        In Progress
      </Typography>
      <Box
        id="project-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: "#FFC5001A",
          p: 3,
          mb: 5,
          font: "normal normal 600 16px/30px Cairo",
          color: "#505050",
        }}
      >
        <Box id="project-title">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.thead}>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                >
                  Project Title
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }} align="left">
                  Start Date
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }} align="left">
                  Tasks
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }} align="left">
                  Deadline Date
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                  align="left"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.projects?.map((project) => (
                <TableRow
                  onClick={() =>
                    window.location.replace(`/tasksBoard/${project._id}`)
                  }
                  className={classes.tbody}
                  key={project._id}
                >
                  <TableCell
                    sx={{ fontSize: 12 }}
                    className={classes.tcellLeft}
                  >
                    <h3>{project?.name}</h3>
                    <p>
                      {
                        PMs.find(
                          (item) => item._id === project?.projectManager?._id
                        )?.name
                      }
                    </p>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 12 }}
                    className={classes.tcellCenter}
                    align="left"
                  >
                    {new Date(project.startDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className={classes.tcellCenterTask} align="left">
                    <h3>
                      <CheckCircleOutlinedIcon
                        sx={{ color: "#707683" }}
                      ></CheckCircleOutlinedIcon>
                      {project.numberOfTasks}
                    </h3>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 12 }}
                    className={classes.tcellCenter}
                    align="left"
                  >
                    {new Date(project.projectDeadline).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 12 }}
                    className={classes.tcellRight}
                    align="left"
                  >
                    ...
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};
export default UserProjects;
