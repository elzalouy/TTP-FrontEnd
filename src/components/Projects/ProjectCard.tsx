import React, { useState } from "react";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import { CheckBoxOutlined as CheckIcon } from "@mui/icons-material";
import style from "./projectCardStyle";
import { Project } from "../../redux/Projects";
import { useAppSelector } from "../../redux/hooks";
import { selectPMs } from "../../redux/PM";
import { RouteComponentProps } from "react-router-dom";
import { Typography } from "@mui/material";
interface ProjectCardProps {
  status: string;
  Projects: Project[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  status,
  Projects,
  ...props
}) => {
  const PMs = useAppSelector(selectPMs);
  const [expanded, setExpanded] = useState<boolean>(false);
  const classes = style(status)();
  const backgroundColor = ["#FFC5001A", "#00ACBA1A", "#b5b5be"];
  return (
    <Box
      id="project-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: "12px",
        backgroundColor:
          status === "In progress"
            ? backgroundColor[0]
            : status === "Done"
            ? backgroundColor[1]
            : backgroundColor[2],
        p: 3,
        mb: 5,
        font: "normal normal 600 16px/30px Cairo",
        color: "#505050",
      }}
    >
      <Box
        id="project-header"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 2,
        }}
      >
        {status}
        {expanded ? (
          <ArrowDropUpIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setExpanded(false);
            }}
          ></ArrowDropUpIcon>
        ) : (
          <ArrowDropDownIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setExpanded(true);
            }}
          ></ArrowDropDownIcon>
        )}
      </Box>
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
              <TableCell sx={{ borderBottom: "none" }} align="center">
                Start Date
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }} align="center">
                Tasks
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }} align="center">
                Deadline Date
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: "none",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expanded &&
              Projects?.map((project) => (
                <TableRow
                  onClick={() =>
                    (window.location.href = `/tasksBoard/${project._id}`)
                  }
                  className={classes.tbody}
                  key={project._id}
                >
                  <TableCell className={classes.tcellLeft}>
                    <h3>{project?.name}</h3>
                    <p>
                      {
                        PMs.find(
                          (item) => item._id === project?.projectManager?._id
                        )?.name
                      }
                    </p>
                  </TableCell>
                  <TableCell className={classes.tcellCenter} align="center">
                    {new Date(project.startDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className={classes.tcellCenterTask} align="center">
                    <Box sx={{ display: "inline-flex" }}>
                      <CheckIcon
                        sx={{
                          color: "#00ACBA",
                        }}
                      />
                      <Typography variant="h4" color="#00ACBA" paddingTop={0.2}>
                        {project.numberOfFinshedTasks}/{project.numberOfTasks}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell className={classes.tcellCenter} align="center">
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
                  <TableCell className={classes.tcellRight} align="center">
                    ...
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
export default ProjectCard;
