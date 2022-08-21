import { Box } from "@mui/material";
import * as React from "react";
import {
  selectAllProjects,
  selectInprogressProjects,
} from "../../models/Projects";
import { useAppSelector } from "../../models/hooks";
import { selectPMs } from "../../models/PM";
import TableBox from "../../coreUI/components/Containers/TableContainer";
import ProjectsTable from "../../coreUI/components/Tables/ProjectsTable";
import { RouteComponentProps } from "react-router";
import { Project } from "../../types/models/Projects";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
  projects?: Project[] | null;
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
        {props.projects?.length === 0 ? (
          <p
            style={{
              textTransform: "capitalize",
              margin: "10px",
              color: "rgb(154,154,152)",
            }}
          >
            There are currently no projects close to deadline
          </p>
        ) : (
          <ProjectsTable
            progress={true}
            align={"left"}
            textSize="small"
            status={"In progress"}
            expanded={true}
            projectManagers={PMs}
            {...props}
          />
        )}
      </Box>
    </TableBox>
  );
};
export default UserProjects;
