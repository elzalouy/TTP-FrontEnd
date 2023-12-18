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
import ProjectDetails from "src/views/Projects/Read/Details/ProjectDetails";
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
    details: string;
  }>({ edit: "none", delete: "none", details: "none" });

  const onEditProject = (value: string, project: Project) =>
    openForm({ delete: "none", edit: value, project, details: "none" });
  const onDeleteProject = (value: string, project: Project) =>
    openForm({ delete: value, edit: "none", project, details: "none" });
  const onOpenProjectDetails = (value: string, project: Project) =>
    openForm({ delete: "none", edit: "none", project, details: value });

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
              openDetails={onOpenProjectDetails}
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
      <ProjectDetails
        show={forms.details}
        project={forms.project}
        setShow={onOpenProjectDetails}
      />
    </>
  );
};
export default UserProjects;
