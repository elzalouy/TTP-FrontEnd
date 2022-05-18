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
import { Project, selectAllProjects } from "../../../redux/Projects";
import { projectsTableStyle } from "../styles";
import { CheckBoxOutlined as CheckIcon } from "@mui/icons-material";
import { RouteComponentProps } from "react-router";
import ProjectPopover from "../Popovers/ProjectPopover";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TasksCheckIcon from "../../../assets/icons/TasksCheck";
import { useAppSelector } from "../../../redux/hooks";
import { selectRole } from "../../../redux/Auth";

interface ProjectsTableProps {
  progress?: boolean;
  status: string;
  expanded: boolean;
  projects: Project[] | any;
  projectManagers: ProjectManager[];
  textSize: string;
  align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

const ProjectsTable: React.FC<ProjectsTableProps> = (props) => {
  const classes = projectsTableStyle(props.status)();
  const role = useAppSelector(selectRole);
  const projects = useAppSelector(selectAllProjects);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

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
            {props.progress ? "Progress" : "Tasks"}
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
        {props.expanded === true &&
          props.projects &&
          props?.projects?.map((project: Project) => {
            let NoOfFinished = projects.allTasks.filter(
              (item) => item.projectId === project._id && item.status === "done"
            ).length;
            let NoOfTasks = projects.allTasks.filter(
              (item) => item.projectId === project._id
            ).length;
            return (
              <TableRow className={classes.tbody} key={project._id}>
                <TableCell
                  className={classes.tcellLeft}
                  sx={{
                    cursor: "pointer",
                    borderColor:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "#00ACBA !important"
                        : "",
                    borderWidth:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "2px !important"
                        : "",
                  }}
                  onClick={() =>
                    props.history.push(`/TasksBoard/${project._id}`)
                  }
                >
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
                    {project.projectManager?.name}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    borderColor:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "#00ACBA !important"
                        : "",
                    borderWidth:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "2px !important"
                        : "",
                  }}
                  className={classes.tcellCenter}
                  align={props.align}
                >
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
                  sx={{
                    borderColor:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "#00ACBA !important"
                        : "",
                    borderWidth:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "2px !important"
                        : "",
                  }}
                  className={classes.tcellCenterTask}
                  align={props.align}
                >
                  {props.progress ? (
                    <Typography
                      paddingLeft={0.3}
                      variant="h4"
                      color="#00ACBA"
                      fontSize={props.textSize === "small" ? 12 : 14}
                    >
                      {Math.round(NoOfFinished / NoOfTasks) * 100 || 0}%
                    </Typography>
                  ) : (
                    <Box sx={{ display: "inline-flex" }}>
                      <TasksCheckIcon color="#00ACBA" />
                      <Typography
                        paddingLeft={0.3}
                        variant="h4"
                        color="#00ACBA"
                        fontSize={props.textSize === "small" ? 12 : 14}
                      >
                        {NoOfFinished}/{NoOfTasks}
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    borderColor:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "#00ACBA !important"
                        : "",
                    borderWidth:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "2px !important"
                        : "",
                  }}
                  className={classes.tcellCenter}
                  align={props.align}
                >
                  <Typography
                    variant={props.textSize === "small" ? "h6" : "h5"}
                    color="#696974"
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
                <TableCell
                  sx={{
                    borderColor:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "#00ACBA !important"
                        : "",
                    borderWidth:
                      project.projectStatus === "inProgress" &&
                      NoOfFinished === NoOfTasks
                        ? "2px !important"
                        : "",
                  }}
                  className={classes.tcellRight}
                  align={props.align}
                >
                  {role !== "PM" && (
                    <ProjectPopover id={project?._id} {...props} />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default ProjectsTable;
