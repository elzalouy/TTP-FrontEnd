import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import Filter from "src/coreUI/components/Inputs/SelectFields/Select";
import { filterOptions } from "src/helpers/generalUtils";
import IMAGES from "../../../assets/img/Images";
import TableBox from "../../../coreUI/components/Containers/Table/TableContainer";
import SearchBox from "../../../coreUI/components/Inputs/Search/SearchBox";
import Loading from "../../../coreUI/components/Loading/Loading";
import ProjectsTable from "../../../coreUI/components/Tables/ProjectsTable";
import { selectRole } from "../../../models/Auth";
import { clientsDataSelector, selectClientOptions } from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import { selectPMOptions, selectPMs } from "../../../models/PM";
import {
  filterProjects,
  getAllProjects,
  ProjectsActions, selectDoneProjects,
  selectInprogressProjects,
  selectLoading
} from "../../../models/Projects";
import CreateNewProject from "./NotStartedProjects";

interface ProjectsProps {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

export const Projects: React.FC<ProjectsProps> = (props) => {
  const dispatch = useDispatch();
  const loading = useAppSelector(selectLoading);
  const inProgressProjects = useAppSelector(selectInprogressProjects);
  const doneProjects = useAppSelector(selectDoneProjects);
  const PMs = useAppSelector(selectPMs);
  const clients = useAppSelector(clientsDataSelector);
  const pmOptions = useAppSelector(selectPMOptions);
  const clientOptions = useAppSelector(selectClientOptions);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [doneExpanded, setDoneExpanded] = useState<boolean>(true);
  const [filter, setFilter] = useState(true);
  const backgroundColor = ["#FFC5001A", "#00ACBA1A", "#b5b5be"];
  const role = useAppSelector(selectRole);
  const { watch, control, setValue } = useForm();
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const LG = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    dispatch(getAllProjects(null));
  }, []);
  useEffect(() => {
    if (MD) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }, [MD]);

  const onHandleChange = (e: any) => {
    let data = watch();
    let filter = {
      name: data.name,
      clientId: data.clientId,
      projectManager: data.projectManager,
      projectStatus: data.projectStatus,
    };
    dispatch(filterProjects(filter));
  };

  const onHandleSort = (e: any) => {
    let data = watch();
    dispatch(ProjectsActions.onSortProjects(data.deadline));
  };

  const onChange = (e: any, name: string) => {
    e.preventDefault();
    setValue(name, e.target.id);
    onHandleChange(e);
  };

  const isOpen = () => {
    return {
      xs: filter ? "block" : "none",
      sm: filter ? "block" : "none",
      md: "block",
      lg: "block",
    };
  };
  return (
    <Grid
      overflow={"hidden"}
      justifyContent={"center"}
      alignItems={"center"}
      container
      marginX={{ sm: 1, xs: 1, md: 4, lg: 4 }}
      marginTop={{ xs: 10, sm: 10, md: 0, lg: 0 }}
    >
      <Grid container xs={12} direction={"row"}>
        <Grid item xs={12} sm={12} md={12} lg={12} my={4}>
          <Typography variant="h2" paddingTop={1.1} fontFamily={"Cairo"}>
            Projects
          </Typography>
        </Grid>
        <Grid item margin={1} marginLeft={0}>
          {!LG && (
            <>
              <Box
                onClick={() => setFilter(!filter)}
                textAlign={"center"}
                sx={
                  !filter
                    ? { bgcolor: "black", borderRadius: 3, paddingTop: 1.2 }
                    : { bgcolor: "white", borderRadius: 3, paddingTop: 1.2 }
                }
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
          data-test-id="filter-projects"
          marginX={0.5}
          item
          xs={5}
          sm={5}
          display={{ md: "none", lg: "none", sm: "block", xs: "block" }}
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
                  onHandleChange(e);
                }}
                size={"medium"}
              />
            )}
          />
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
                    options={pmOptions}
                    onSelect={(e: any) => onChange(e, "projectManager")}
                    textTruncate={2}
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
                    options={clientOptions}
                    onSelect={(e: any) => onChange(e, "clientId")}
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
          md={2.1}
          lg={2.1}
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
                  onHandleChange(e);
                }}
                size={"medium"}
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
        <CreateNewProject {...props} />
        {loading === false ? (
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
                  projects={inProgressProjects}
                  projectManagers={PMs}
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
                  projects={doneProjects}
                  projectManagers={PMs}
                  {...props}
                />
              </Box>
            </TableBox>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              borderRadius: "12px",
              backgroundColor: "#F1F1F4",
              p: 1,
              cursor: "pointer",
              font: "normal normal 600 16px/30px Cairo",
              color: "#909090",
            }}
          >
            <Loading color="grey" type="spinningBubbles" /> Loading More
          </Box>
        )}
      </Box>
    </Grid>
  );
};
