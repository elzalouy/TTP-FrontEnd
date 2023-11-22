import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProjectsFilter from "./Filter";
import {
  DoneStatusList,
  IProjectsPage,
  Project,
} from "src/types/models/Projects";
import TableBox from "../../../coreUI/components/Containers/Table/TableContainer";
import ProjectsTable from "../../../coreUI/components/Tables/ProjectsTable";
import { useAppSelector } from "../../../models/hooks";
import { selectManagers } from "../../../models/Managers";
import { selectAllProjects } from "../../../models/Projects";
import CreateNewProject from "./NotStartedProjects";
import EditProject from "../Edit/EditProject";
import DeleteProject from "../Delete/DeleteProject";
import { selectUser } from "src/models/Auth";
import ProjectDetails from "./Details/ProjectDetails";
import { ProjectsPageState } from "src/types/views/Projects";

/**
 * Projects Page components including many other child components like projects Table, filter controller component, etc.
 * @param props history
 * @returns
 */

export const Projects: React.FC<IProjectsPage> = (props) => {
  /**1
   * Projects Page State
   *  1. All projects
   *  2. Done Projects
   *  3. InPrgoress Projects
   *  4. Not Started Projects
   */
  const [state, setState] = useState<ProjectsPageState>({
    inProgressProjects: [],
    filteredProjects: [],
    doneProjects: [],
    projects: [],
    notStarted: [],
    inProgressShow: true,
    doneShow: false,
    notStartedShow: false,
  });

  // show/hide projects of in progress status
  const showInProgress = () =>
    setState({ ...state, inProgressShow: !state.inProgressShow });

  // show/hide projects of done status
  const showDone = () => setState({ ...state, doneShow: !state.doneShow });

  // (Global State) / projects, PMs, user
  const projects = useAppSelector(selectAllProjects);
  const PMs = useAppSelector(selectManagers);
  const user = useAppSelector(selectUser);

  const { watch, control, setValue } = useForm({
    defaultValues: {
      name: "",
      clientId: "",
      projectManager: "",
      projectStatus: "",
      deadline: "",
    },
  });

  // show and hide project details, edit proejct popup, and delete project popup
  const [forms, openForm] = React.useState<{
    edit: string;
    delete: string;
    project?: Project;
    details: string;
  }>({ edit: "none", delete: "none", details: "none" });

  //
  useEffect(() => {
    console.log({ projects: projects.projects });
    if (
      projects.projects.length > 0 &&
      projects.loading === false &&
      projects.allTasks
    ) {
      let projectsData = [...projects.projects];
      console.log({ projectsData });
      setState({
        ...state,
        projects: projects.projects,
        filteredProjects: projects.projects,
        notStarted: projectsData.filter(
          (i) => i.projectStatus === "Not Started"
        ),
        inProgressProjects: projectsData.filter(
          (i) => i.projectStatus === "In Progress"
        ),
        doneProjects: projectsData.filter((i) =>
          DoneStatusList.includes(i.projectStatus)
        ),
      });
    }
  }, [projects.loading, projects.projects, projects.allTasks]);

  // Filter function
  const onSetFilter = () => {
    let filter = watch();
    console.log({ filter });
    let allProjects = [...projects.projects];
    if (filter.name !== "" && filter.name.length > 0) {
      allProjects = allProjects.filter((item) =>
        item.name.toLowerCase().includes(filter.name?.toString().toLowerCase())
      );
    } else allProjects = [...projects.projects];

    if (filter.clientId !== "") {
      allProjects = allProjects.filter(
        (item) => item.clientId === filter.clientId
      );
    }

    if (filter.projectManager !== "")
      allProjects = allProjects.filter(
        (item) => item.projectManager === filter.projectManager
        // item.associateProjectManager === filter.projectManager
      );
    if (filter.projectStatus !== "")
      allProjects = allProjects.filter(
        (item) => item.projectStatus === filter.projectStatus
      );
    console.log({ allProjects });
    setState({
      ...state,
      projects: allProjects,
      doneProjects: allProjects.filter((i) =>
        DoneStatusList.includes(i.projectStatus)
      ),
      inProgressProjects: allProjects.filter(
        (i) => i.projectStatus === "In Progress"
      ),
      notStarted: allProjects.filter((i) => i.projectStatus === "Not Started"),
    });
  };

  const onChange = (
    e: any,
    name: "name" | "clientId" | "projectManager" | "projectStatus" | "deadline"
  ) => {
    e.preventDefault();
    setValue(name, e.target.id);
    onSetFilter();
  };

  const onEditProject = (value: string, project?: Project) =>
    openForm({
      delete: "none",
      edit: value,
      project: project,
      details: "none",
    });

  const onDeleteProject = (value: string, project?: Project) =>
    openForm({
      delete: value,
      edit: "none",
      project: project,
      details: "none",
    });

  const onOpenProjectDetails = (value: string, project?: Project) =>
    openForm({
      details: value,
      edit: "none",
      project: project,
      delete: "none",
    });

  return (
    <>
      <Grid
        container
        overflow={"hidden"}
        justifyContent={"center"}
        alignItems={"center"}
        alignContent="center"
      >
        <ProjectsFilter
          control={control}
          onSetFilter={onSetFilter}
          onChange={onChange}
          setValue={setValue}
        />
        <Box
          sx={{
            mt: 2,
            display: "inherit",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <CreateNewProject
            projects={state.notStarted}
            editProject={onEditProject}
            deleteProject={onDeleteProject}
            openDetails={onOpenProjectDetails}
          />
          <TableBox
            title={"In Progress"}
            outTitled={false}
            expanded={state.inProgressShow}
            setExpanded={showInProgress}
            bgColor={backgroundColor[0]}
          >
            <Box id="project-title">
              <ProjectsTable
                align="center"
                textSize="medium"
                status={"In progress"}
                expanded={state.inProgressShow}
                projects={state.inProgressProjects}
                projectManagers={PMs}
                editProject={onEditProject}
                deleteProject={onDeleteProject}
                openDetails={onOpenProjectDetails}
                {...props}
              />
            </Box>
          </TableBox>
          <TableBox
            title={"Done"}
            outTitled={false}
            expanded={state.doneShow}
            setExpanded={showDone}
            bgColor={backgroundColor[1]}
          >
            <Box id="project-title">
              <ProjectsTable
                align="center"
                textSize="medium"
                status={"Done"}
                expanded={state.doneShow}
                projects={state.doneProjects}
                projectManagers={PMs}
                editProject={onEditProject}
                deleteProject={onDeleteProject}
                openDetails={onOpenProjectDetails}
                {...props}
              />
            </Box>
          </TableBox>
        </Box>
      </Grid>
      <ProjectDetails
        show={forms.details}
        project={forms.project}
        setShow={onOpenProjectDetails}
      />
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

const backgroundColor = ["#FFC5001A", "#00ACBA1A", "#b5b5be"];
