import { Grid } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "src/models/hooks";
import { selectManagers } from "src/models/Managers";
import TableBox from "src/coreUI/components/Containers/Table/TableContainer";
import ProjectsTable from "src/coreUI/components/Tables/ProjectsTable";
import { RouteComponentProps } from "react-router";
import { Project } from "src/types/models/Projects";
import Empty from "./Empty";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
  projects?: Project[] | null;
}
const UserProjects: React.FC<Props> = (props) => {
  const PMs = useAppSelector(selectManagers);
  return (
    <Grid
      justifyContent="flex-start"
      alignItems="flex-start"
      paddingTop={2.5}
      overflow="scroll"
      xs={12}
    >
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
    </Grid>
  );
};
export default UserProjects;
