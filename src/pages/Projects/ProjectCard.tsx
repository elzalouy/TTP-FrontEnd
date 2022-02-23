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

type Props = {
  status: String;
};

const ProjectCard: React.FC<Props> = ({ status }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const backgroundColor = ["#FFC5001A", "#00ACBA1A"];
  const borderColor = ["#FCEFC0", "#00ACBA33"];
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

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto",
    },
    table: {
      borderCollapse: "separate",
      borderSpacing: "0px 10px",
    },
    thead: {
      color: "black",
      backgroundColor:
        status === "In progress" ? borderColor[0] : borderColor[1],
      font: "normal normal normal 14px/35px Cairo",
    },
    tbody: {
      backgroundColor: status === "In progress" ? "#FBF5E2" : "#E1F3F5",
    },
    tcellLeft: {
      borderBottom:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderLeft:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderTop:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",

      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    },
    tcellRight: {
      borderBottom:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderRight:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      borderTop:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",

      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      fontWeight: 600,
      fontSize: "26px",
      color: "#707683",
    },
    tcellCenter: {
      borderBottom:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",

      borderTop:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      color: "#707683",
    },
    tcellCenterTask: {
      borderBottom:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",

      borderTop:
        status === "In progress" ? "3px solid #FFC500" : "2px solid #00ACBA",
      color: "#00ACBA",
      fontWeight: "bold",
    },
  }));
  const classes = useStyles();
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
              projects.map((project) => (
                <TableRow className={classes.tbody} key="{project}">
                  <TableCell className={classes.tcellLeft}>
                    <h3>{project.projectTitle}</h3>
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
                      {project.tasks}
                    </h3>
                  </TableCell>
                  <TableCell className={classes.tcellCenter} align="right">
                    {project.teamName}
                  </TableCell>
                  <TableCell className={classes.tcellCenter} align="right">
                    {project.deadlineDate}
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
