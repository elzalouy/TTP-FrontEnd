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
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import style from "./projectCardStyle";
import { Project } from "../../redux/Projects";

type Props = {
  status: string;
  Projects: Project[];
};

const ProjectCard: React.FC<Props> = ({ status, Projects }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const classes = style(status)();
  const backgroundColor = ["#FFC5001A", "#00ACBA1A"];

  const projects = [
    {
      id: 1,
      projectTitle: "Road work",
      startDate: "Dec 14,2018",
      tasks: "4/5",
      teamName: "Designers",
      deadlineDate: "Dec 14,2018",
    },
    {
      id: 2,
      projectTitle: "Airplane",
      startDate: "Dec 14,2018",
      tasks: "4/5",
      teamName: "Designers",
      deadlineDate: "Dec 14,2018",
    },
  ];
  return (
    <Box
      id="project-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: "12px",
        backgroundColor:
          status === "In progress" ? backgroundColor[0] : backgroundColor[1],
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
              <TableCell sx={{ borderBottom: "none" }} align="right">
                Start Date
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }} align="right">
                Tasks
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }} align="right">
                Team Name
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }} align="right">
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
              Projects.map((project) => (
                <TableRow className={classes.tbody} key="{project}">
                  <TableCell className={classes.tcellLeft}>
                    <h3>{project?.name}</h3>
                    <p>PM Name</p>
                  </TableCell>
                  <TableCell className={classes.tcellCenter} align="right">
                    {project.startDate}
                  </TableCell>
                  <TableCell className={classes.tcellCenterTask} align="right">
                    <h3>
                      <CheckCircleOutlinedIcon
                        sx={{ color: "#707683" }}
                      ></CheckCircleOutlinedIcon>
                      {project.numberOfTasks}
                    </h3>
                  </TableCell>
                  <TableCell className={classes.tcellCenter} align="right">
                    missed
                  </TableCell>
                  <TableCell className={classes.tcellCenter} align="right">
                    {project.projectDeadline}
                  </TableCell>
                  <TableCell className={classes.tcellRight} align="right">
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
