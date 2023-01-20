import { Grid } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "src/models/hooks";
import { selectManagers } from "src/models/Managers";
import TableBox from "src/coreUI/components/Containers/Table/TableContainer";
import ProjectsTable from "src/coreUI/components/Tables/ProjectsTable";
import { RouteComponentProps } from "react-router";
import { Project } from "src/types/models/Projects";
import Empty from "./Empty";
import EditProject from "src/views/Projects/Edit/EditProject";
import DeleteProject from "src/views/Projects/Delete/DeleteProject";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
  projects?: Project[] | null;
}
const UserProjects: React.FC<Props> = (props) => {
  const PMs = useAppSelector(selectManagers);
  const [forms, openForm] = React.useState<{
    edit: string;
    delete: string;
    project?: Project;
  }>({ edit: "none", delete: "none" });

  const onEditProject = (value: string, project: Project) =>
    openForm({ delete: "none", edit: value, project });
  const onDeleteProject = (value: string, project: Project) =>
    openForm({ delete: value, edit: "none", project });

  return (
    <>
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
              editProject={onEditProject}
              deleteProject={onDeleteProject}
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
      <EditProject
        project={forms.project}
        show={forms.edit}
        setShow={onEditProject}
      />
      <DeleteProject
        id={forms.project?._id}
        show={forms.delete}
        setShow={onDeleteProject}
      />
    </>
  );
};
export default UserProjects;
