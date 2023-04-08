import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Filter from "src/coreUI/components/Inputs/SelectFields/Select";
import { filterOptions } from "src/helpers/generalUtils";
import { IProjectsPage, Project } from "src/types/models/Projects";
import IMAGES from "../../../assets/img/Images";
import TableBox from "../../../coreUI/components/Containers/Table/TableContainer";
import SearchBox from "../../../coreUI/components/Inputs/Search/SearchBox";
import ProjectsTable from "../../../coreUI/components/Tables/ProjectsTable";
import { selectClientOptions } from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import { selectPMOptions, selectManagers } from "../../../models/Managers";
import { ProjectsActions, selectAllProjects } from "../../../models/Projects";
import CreateNewProject from "./NotStartedProjects";
import EditProject from "../Edit/EditProject";
import DeleteProject from "../Delete/DeleteProject";
import { selectUser } from "src/models/Auth";
import ProjectDetails from "./Details/ProjectDetails";

export const Projects: React.FC<IProjectsPage> = (props) => {
  const dispatch = useDispatch();

  const [state, setState] = useState<{
    inProgressProjects: Project[];
    doneProjects: Project[];
    projects: Project[];
    notStarted: Project[];
  }>({
    inProgressProjects: [],
    doneProjects: [],
    projects: [],
    notStarted: [],
  });

  const projects = useAppSelector(selectAllProjects);
  const PMs = useAppSelector(selectManagers);
  const pmOptions = useAppSelector(selectPMOptions);
  const clientOptions = useAppSelector(selectClientOptions);
  const user = useAppSelector(selectUser);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [doneExpanded, setDoneExpanded] = useState<boolean>(true);
  const [filter, setFilter] = useState(true);
  const backgroundColor = ["#FFC5001A", "#00ACBA1A", "#b5b5be"];
  const { watch, control, setValue, getValues } = useForm({
    defaultValues: {
      name: "",
      clientId: "",
      projectManager: "",
      projectStatus: "",
      deadline: "",
    },
  });

  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const LG = useMediaQuery(theme.breakpoints.up("md"));
  const [forms, openForm] = React.useState<{
    edit: string;
    delete: string;
    project?: Project;
    details: string;
  }>({ edit: "none", delete: "none", details: "none" });

  useEffect(() => {
    if (MD) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }, [MD]);

  useEffect(() => {
    let isPm = user?.role === "PM";
    if (isPm) setValue("projectManager", user?._id ?? "");
    onHandleChange();
  }, [user, projects.projects]);

  const onHandleChange = () => {
    let filter = watch();
    let allProjects = projects.projects;
    if (filter.name !== "") {
      allProjects = allProjects.filter((item) =>
        item.name.toLowerCase().includes(filter.name?.toString().toLowerCase())
      );
    }

    if (filter.clientId !== "") {
      allProjects = allProjects.filter(
        (item) => item.clientId === filter.clientId
      );
    }

    if (filter.projectManager !== "")
      allProjects = allProjects.filter(
        (item) =>
          item.projectManager === filter.projectManager ||
          item.associateProjectManager === filter.projectManager
      );
    if (filter.projectStatus !== "")
      allProjects = allProjects.filter(
        (item) => item.projectStatus === filter.projectStatus
      );

    let done = allProjects.filter((item) =>
      [
        "delivered on time",
        "delivered before deadline",
        "delivered after deadline",
        "late",
      ].includes(item.projectStatus)
    );
    let inProgress = allProjects.filter(
      (item) => item.projectStatus === "In Progress"
    );
    let notStarted = allProjects.filter(
      (item) => item.projectStatus === "Not Started"
    );
    setState({
      projects: allProjects,
      inProgressProjects: [...inProgress],
      doneProjects: [...done],
      notStarted: [...notStarted],
    });
  };

  const onHandleSort = (e: any) => {
    dispatch(ProjectsActions.onSortProjects(getValues().deadline));
  };

  const onChange = (
    e: any,
    name: "name" | "clientId" | "projectManager" | "projectStatus" | "deadline"
  ) => {
    e.preventDefault();
    setValue(name, e.target.id);
    onHandleChange();
  };

  const isOpen = () => {
    return {
      xs: filter ? "block" : "none",
      sm: filter ? "block" : "none",
      md: "block",
      lg: "block",
    };
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
        <Grid container xs={12} direction={"row"}>
          <Grid item xs={3} sm={3} md={3} lg={12} mb={4}>
            <Typography variant="h2" fontFamily={"Cairo"}>
              Projects
            </Typography>
          </Grid>
          <Grid
            container
            xs={9}
            sm={9}
            md={9}
            lg={12}
            justifyContent="flex-end"
            alignItems={"center"}
            alignContent="center"
          >
            <Grid item xs={2} sm={2} md={2} lg={7} margin={1} marginLeft={0}>
              {!LG && (
                <>
                  <Box
                    onClick={() => setFilter(!filter)}
                    textAlign={"center"}
                    sx={{
                      bgcolor: !filter ? "black" : "right",
                      borderRadius: 3,
                      paddingTop: 1.2,
                      float: "right",
                    }}
                    width={38}
                    height={38}
                  >
                    <img
                      src={!filter ? IMAGES.filtericonwhite : IMAGES.filtericon}
                      alt="FILTER"
                    />
                  </Box>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={8}
              sm={8}
              md={8}
              lg={8}
              alignItems="center"
              justifyContent={{
                xs: "",
                sm: "flex-end",
                md: "flex-end",
                lg: "flex-end",
              }}
              display={{ md: "none", lg: "none", sm: "flex", xs: "flex" }}
            >
              <Controller
                name="name"
                control={control}
                render={(props) => (
                  <SearchBox
                    value={props.field.value}
                    placeholder="Search"
                    onChange={(e: any) => {
                      props.field.onChange(e);
                      onHandleChange();
                    }}
                    size={"custom"}
                  />
                )}
              />
            </Grid>
          </Grid>
          {filter && (
            <>
              <Grid
                data-test-id="filter-projects"
                display={() => isOpen()}
                marginX={0.5}
                item
                xs={5}
                sm={4}
                md={4}
                lg={2}
              >
                <Controller
                  name="deadline"
                  control={control}
                  render={(props) => (
                    <Filter
                      elementType="filter"
                      name={"projects-" + props.field.name}
                      selected={props.field.value}
                      label="Due Date: "
                      optionsType="list"
                      onSelect={(e: any) => {
                        onChange(e, "deadline");
                        onHandleSort(props.field.value);
                      }}
                      textTruncate={4}
                      options={filterOptions[0]}
                    />
                  )}
                />
              </Grid>
              <Grid
                data-test-id="filter-projects"
                display={() => isOpen()}
                marginX={0.5}
                item
                xs={5}
                sm={4.5}
                md={4.5}
                lg={2.2}
              >
                <Controller
                  name="projectManager"
                  control={control}
                  render={(props) => (
                    <Filter
                      elementType="filter"
                      name={"projects-" + props.field.name}
                      selected={props.field.value}
                      label="Project Manager: "
                      optionsType="dialog"
                      options={[
                        { id: "", value: "", text: "All" },
                        ...pmOptions,
                      ]}
                      onSelect={(e: any) => {
                        setValue("projectManager", e.id);
                        onHandleChange();
                      }}
                      textTruncate={6}
                    />
                  )}
                />
              </Grid>
              <Grid
                data-test-id="filter-projects"
                display={() => isOpen()}
                marginX={0.5}
                item
                xs={5}
                sm={4}
                md={4}
                lg={2}
              >
                <Controller
                  name="clientId"
                  control={control}
                  render={(props) => (
                    <Filter
                      elementType="filter"
                      name={"projects-" + props.field.name}
                      selected={props.field.value}
                      label="Client: "
                      optionsType="dialog"
                      options={[
                        { id: "", value: "", text: "All", image: "avatar" },
                        ...clientOptions,
                      ]}
                      onSelect={(e: any) => {
                        setValue("clientId", e.id);
                        onHandleChange();
                      }}
                      textTruncate={10}
                    />
                  )}
                />
              </Grid>
              <Grid
                data-test-id="filter-projects"
                display={() => isOpen()}
                marginX={0.5}
                item
                xs={5}
                sm={4}
                md={4}
                lg={2}
              >
                <Controller
                  name="projectStatus"
                  control={control}
                  render={(props) => (
                    <>
                      <Filter
                        elementType="filter"
                        name={"projects-" + props.field.name}
                        selected={props.field.value}
                        label="Status: "
                        options={filterOptions[1]}
                        onSelect={(e: any) => onChange(e, "projectStatus")}
                        optionsType="list"
                        textTruncate={5}
                      />
                    </>
                  )}
                />
              </Grid>
            </>
          )}
          <Grid
            data-test-id="filter-projects"
            item
            marginX={0.5}
            display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
            md={3}
            lg={3}
          >
            <Controller
              name="name"
              control={control}
              render={(props) => (
                <SearchBox
                  value={props.field.value}
                  placeholder="Search"
                  onChange={(e: any) => {
                    props.field.onChange(e);
                    onHandleChange();
                  }}
                  size={"custom"}
                />
              )}
            />
          </Grid>
        </Grid>
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
          <>
            <TableBox
              title={"In Progress"}
              outTitled={false}
              expanded={expanded}
              setExpanded={setExpanded}
              bgColor={backgroundColor[0]}
            >
              <Box id="project-title">
                <ProjectsTable
                  align="center"
                  textSize="medium"
                  status={"In progress"}
                  expanded={expanded}
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
              expanded={doneExpanded}
              setExpanded={setDoneExpanded}
              bgColor={backgroundColor[1]}
            >
              <Box id="project-title">
                <ProjectsTable
                  align="center"
                  textSize="medium"
                  status={"Done"}
                  expanded={doneExpanded}
                  projects={state.doneProjects}
                  projectManagers={PMs}
                  editProject={onEditProject}
                  deleteProject={onDeleteProject}
                  openDetails={onOpenProjectDetails}
                  {...props}
                />
              </Box>
            </TableBox>
          </>
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
