import { Box } from "@mui/material";
import * as React from "react";
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
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
  projects: Project[] | null;
}
const UserProjects: React.FC<Props> = (props) => {
  const PMs = useAppSelector(selectPMs);

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
          projectManagers={PMs}
          {...props}
        />
      </Box>
    </TableBox>
  );
};
export default UserProjects;
