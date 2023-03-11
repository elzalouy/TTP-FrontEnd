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
import { projectsTableStyle } from "../../../coreUI/themes/Styles";
import ProjectPopover from "../../../views/Projects/Read/ProjectPopover";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TasksCheckIcon from "../../../assets/icons/TasksCheck";
import { useAppSelector } from "../../../models/hooks";
import { selectRole } from "../../../models/Auth";
import { getStatus } from "../../../helpers/generalUtils";
import { Project } from "../../../types/models/Projects";
import { selectTasks } from "src/models/Projects";
import { IProjectsTableProps } from "src/types/components/Table";
import "src/App/App.css";
import { selectManagers } from "src/models/Managers";
import { selectAllClients } from "src/models/Clients";

const ProjectsTable: React.FC<IProjectsTableProps> = (props) => {
  const classes = projectsTableStyle(props.status)();
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const allTasks = useAppSelector(selectTasks);
  const PMs = useAppSelector(selectManagers);
  const clients = useAppSelector(selectAllClients);
  const setBorder = (project: Project) => {
    let date = new Date(project.projectDeadline);
    if (
      date <= new Date() &&
      project.projectStatus === "In Progress" &&
      project.NoOfTasks !== project.NoOfFinishedTasks
    )
      return "#FF2E35 !important";
    if (project.projectStatus === "In Progress") {
      if (project.NoOfTasks === project.NoOfFinishedTasks)
        return "#00ACBA !important";
      else return "";
    }
  };

  if (props.condition) return null;

  return (
    <Table
      className={classes.table}
      style={
        SM
          ? { width: "140%", borderColor: "#EBEFF2" }
          : { width: "100%", borderColor: "#EBEFF2" }
      }
      aria-label="simple table"
    >
      {props.expanded === true && (
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell
              sx={{
                borderBottom: "none",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              Project title
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }} align={props.align}>
              Start date
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }} align={props.align}>
              {props.progress ? "Progress" : "Tasks"}
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }} align={props.align}>
              Deadline date
            </TableCell>
            {props.status === "Done" && (
              <TableCell sx={{ borderBottom: "none" }} align={props.align}>
                End status
              </TableCell>
            )}
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
      )}
      <TableBody>
        {props.expanded === true &&
          props.projects &&
          props?.projects?.map((project: Project) => {
            let NoOfTasks = allTasks.filter(
              (item) => item.projectId === project._id
            ).length;
            let NoOfFinished = allTasks.filter(
              (item) => item.projectId === project._id && item.status === "Done"
            ).length;

            return (
              <TableRow
                className={classes.tbody}
                key={project._id}
                data-test-id={`${props.dataTestIdQuote}-${project._id}`}
              >
                <TableCell
                  className={classes.tcellLeft}
                  sx={{
                    cursor: "pointer",
                    borderColor: setBorder(project),
                  }}
                  onClick={() =>
                    props.history.push(`/TasksBoard/${project._id}`)
                  }
                >
                  <Typography
                    data-test-id={`projects-row-name-${project._id}`}
                    fontWeight={"700"}
                    variant="h5"
                    fontSize={14}
                    fontFamily={"Cairo, Regular"}
                    style={{
                      marginBottom: 1,
                      textDecorationLine:
                        props.status === "Done" ? "line-through" : "none",
                    }}
                  >
                    {project?.name}
                  </Typography>
                  <Typography variant={"h5"} fontSize={14} color="#696974">
                    {clients.find((item) => item._id === project.clientId)
                      ?.clientName ?? project.projectManagerName}
                  </Typography>
                  {project.associateProjectManager &&
                    project.associateProjectManager?.length > 0 && (
                      <Typography variant={"h5"} fontSize={14} color="#696974">
                        {
                          PMs.find(
                            (item) =>
                              item._id === project?.associateProjectManager
                          )?.name
                        }
                      </Typography>
                    )}
                </TableCell>
                <TableCell
                  onClick={() =>
                    props.history.push(`/TasksBoard/${project._id}`)
                  }
                  sx={{
                    cursor: "pointer",
                    borderColor: setBorder(project),
                  }}
                  className={classes.tcellCenter}
                  align={props.align}
                >
                  <Typography
                    variant={props.textSize === "small" ? "h6" : "h5"}
                    fontSize={14}
                    color="#696974"
                  >
                    {project.startDate === null ? (
                      <span style={{ color: "red" }}>
                        Please add a Starting date
                      </span>
                    ) : (
                      new Date(project.startDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    )}
                  </Typography>
                </TableCell>
                <TableCell
                  onClick={() =>
                    props.history.push(`/TasksBoard/${project._id}`)
                  }
                  sx={{
                    cursor: "pointer",
                    borderColor: setBorder(project),
                  }}
                  className={classes.tcellCenterTask}
                  align={props.align}
                >
                  {props.progress ? (
                    <Typography
                      paddingLeft={0.3}
                      variant="h4"
                      color="#00ACBA"
                      fontSize={14}
                    >
                      {Math.ceil((NoOfFinished / NoOfTasks) * 100) || 0}%
                    </Typography>
                  ) : (
                    <Box sx={{ display: "inline-flex" }}>
                      <TasksCheckIcon color="#00ACBA" />
                      <Typography
                        paddingLeft={0.3}
                        variant="h4"
                        color="#00ACBA"
                        fontSize={14}
                        data-test-id={`projects-row-NoOfTasks-${project._id}`}
                      >
                        {NoOfFinished}/{NoOfTasks}
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell
                  onClick={() =>
                    props.history.push(`/TasksBoard/${project._id}`)
                  }
                  sx={{
                    cursor: "pointer",
                    borderColor: setBorder(project),
                  }}
                  className={classes.tcellCenter}
                  align={props.align}
                >
                  <Typography
                    variant={props.textSize === "small" ? "h6" : "h5"}
                    color="#696974"
                    fontSize={14}
                  >
                    {project.projectDeadline === null ? (
                      <span style={{ color: "red" }}>
                        Please add a Deadline
                      </span>
                    ) : (
                      new Date(project.projectDeadline).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    )}
                  </Typography>
                </TableCell>
                {props.status === "Done" && (
                  <TableCell
                    onClick={() =>
                      props.history.push(`/TasksBoard/${project._id}`)
                    }
                    sx={{
                      cursor: "pointer",
                      borderColor: setBorder(project),
                    }}
                    className={classes.tcellCenter}
                    align={props.align}
                  >
                    <Typography
                      variant={props.textSize === "small" ? "h6" : "h5"}
                      color="#696974"
                      fontSize={14}
                    >
                      {getStatus(project.projectStatus)}
                    </Typography>
                  </TableCell>
                )}
                <TableCell
                  sx={{
                    cursor: "pointer",
                    borderColor: setBorder(project),
                  }}
                  className={
                    "project-actions-container" + " " + classes.tcellRight
                  }
                  align={props.align}
                >
                  <ProjectPopover project={project} {...props} />
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default ProjectsTable;
