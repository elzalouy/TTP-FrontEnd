import { Box } from "@mui/material";
import * as React from "react";
import style from "./userProjectsStyle";
import {
  selectAllProjects,
  selectInprogressProjects,
} from "../../redux/Projects";
import { useAppSelector } from "../../redux/hooks";
import { selectPMs } from "../../redux/PM";
import TableBox from "../../coreUI/usable-component/Boxes/TableBox";
import ProjectsTable from "../../coreUI/usable-component/Tables/ProjectsTable";
import { RouteComponentProps } from "react-router";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
const UserProjects: React.FC<Props> = (props) => {
  const PMs = useAppSelector(selectPMs);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const inProgressProjects = useAppSelector(selectInprogressProjects);

  return (
    <TableBox
      title={"In Progress"}
      outTitled={false}
      expanded={expanded}
      setExpanded={setExpanded}
      bgColor={"#FFC5001A"}
    >
      <Box id="project-title">
        <ProjectsTable
          align={"left"}
          textSize="small"
          status={"In progress"}
          expanded={expanded}
          projects={inProgressProjects}
          projectManagers={PMs}
          {...props}
        />
      </Box>
    </TableBox>
  );
};
export default UserProjects;
