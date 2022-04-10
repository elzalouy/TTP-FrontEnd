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
import { ProjectManager } from "../../../redux/PM";
import { Project } from "../../../redux/Projects";
import { projectsTableStyle } from "../styles";
import { CheckBoxOutlined as CheckIcon } from "@mui/icons-material";
import { RouteComponentProps } from "react-router";
import ProjectPopover from "../Popovers/ProjectPopover";
import IMAGES from "../../../assets/img";

interface ProjectsTableProps {
  status: string;
  expanded: boolean;
  projects: Project[];
  projectManagers: ProjectManager[];
  textSize: string;
  align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

const ProjectsTable: React.FC<ProjectsTableProps> = (props) => {
  const classes = projectsTableStyle(props.status)();
  return (
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
          <TableCell sx={{ borderBottom: "none" }} align={props.align}>
            Start Date
          </TableCell>
          <TableCell sx={{ borderBottom: "none" }} align={props.align}>
            Tasks
          </TableCell>
          <TableCell sx={{ borderBottom: "none" }} align={props.align}>
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
        {props.expanded &&
          props?.projects?.map((project: any) => (
            <TableRow className={classes.tbody} key={project._id}>
              <TableCell className={classes.tcellLeft}>
                <Typography
                  fontWeight={"700"}
                  fontSize={14}
                  fontFamily={"Cairo"}
                  style={{
                    textDecorationLine:
                      props.status === "Done" ? "line-through" : "none",
                  }}
                >
                  {project?.name}
                </Typography>
                <Typography
                  variant={props.textSize === "small" ? "h6" : "h5"}
                  fontSize={props.textSize ? 12 : 14}
                  color="#696974"
                >
                  {
                    props.projectManagers?.find(
                      (item) => item._id === project?.projectManager?._id
                    )?.name
                  }
                </Typography>
              </TableCell>
              <TableCell className={classes.tcellCenter} align={props.align}>
                <Typography
                  variant={props.textSize === "small" ? "h6" : "h5"}
                  fontSize={props.textSize ? 12 : 14}
                  color="#696974"
                >
                  {new Date(project.startDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </TableCell>
              <TableCell
                className={classes.tcellCenterTask}
                align={props.align}
              >
                <Box sx={{ display: "inline-flex" }}>
                  <img src={IMAGES.tasksCheck} color="#00ACBA" />
                  <Typography
                    paddingLeft={0.3}
                    variant="h4"
                    color="#00ACBA"
                    fontSize={props.textSize === "small" ? 12 : 14}
                  >
                    {project.numberOfFinshedTasks}/{project.numberOfTasks}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell className={classes.tcellCenter} align={props.align}>
                <Typography
                  variant="h4"
                  color="#00ACBA"
                  fontSize={props.textSize === "small" ? 12 : 14}
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
                </Typography>
              </TableCell>
              <TableCell className={classes.tcellRight} align={props.align}>
                <ProjectPopover id={project?._id} {...props} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ProjectsTable;
