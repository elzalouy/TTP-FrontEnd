import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "src/models/hooks";
import { selectPMs } from "src/models/PM";
import TableBox from "src/coreUI/components/Containers/Table/TableContainer";
import ProjectsTable from "src/coreUI/components/Tables/ProjectsTable";
import { RouteComponentProps } from "react-router";
import { Project } from "src/types/models/Projects";
import IMAGES from "src/assets/img/Images";
import Empty from "./Empty";
import { selectLoading } from "src/models/Projects";
import { selectStatisticsLoading } from "src/models/Statistics";
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
      bgColor={""}
    >
      {props.projects === null || props.projects?.length === 0 ? (
        <>
          <Empty />
        </>
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
    </TableBox>
  );
};
export default UserProjects;
