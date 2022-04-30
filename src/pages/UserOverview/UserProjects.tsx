import { Box } from "@mui/material";
import * as React from "react";
import style from "./userProjectsStyle";
import {
  Project,
  selectAllProjects,
  selectInprogressProjects,
} from "../../redux/Projects";
import { useAppSelector } from "../../redux/hooks";
import { selectPMs } from "../../redux/PM";
import TableBox from "../../coreUI/usable-component/Boxes/TableBox";
import ProjectsTable from "../../coreUI/usable-component/Tables/ProjectsTable";
import { RouteComponentProps } from "react-router";
import projects from "../../services/endpoints/projects";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
const UserProjects: React.FC<Props> = (props) => {
  const PMs = useAppSelector(selectPMs);
  const all = useAppSelector(selectAllProjects);
  const [closeProjects, setCloseProjects] = React.useState<Project[]>([]);
  React.useEffect(() => {
    let projects = [...all.projects];
    let filtered = projects
      .filter(
        (item) =>
          new Date(item.projectDeadline).getTime() >= new Date().getTime()
      )
      .sort(
        (item1, item2) =>
          new Date(item1.projectDeadline).getTime() -
          new Date(item2.projectDeadline).getTime()
      );
    setCloseProjects(filtered);
  }, [all]);
  
  return (
    <TableBox
      title={"Projects Close To Deadline"}
      outTitled={true}
      expanded={true}
      bgColor={"#FFC5001A"}
    >
      <Box id="project-title">
        <ProjectsTable
          progress={true}
          align={"left"}
          textSize="small"
          status={"In progress"}
          expanded={true}
          projects={closeProjects}
          projectManagers={PMs}
          {...props}
        />
      </Box>
    </TableBox>
  );
};
export default UserProjects;
