import React, { useEffect, useState } from "react";
import CreateNewProject from "../Create/Create/newProject";
import IMAGES from "../../../assets/img/Images";
import SearchBar from "../../../coreUI/components/Inputs/SearchBox";
import Box from "@mui/material/Box";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useAppSelector } from "../../../models/hooks";
import {
  selectDoneProjects,
  selectInprogressProjects,
  selectLoading,
  filterProjects,
  getAllProjects,
  selectDeleteProjectId,
  ProjectsActions,
  selectNotStartedProjects,
} from "../../../models/Projects";
import Loading from "../../../coreUI/usable-elements/Loading";
import { getPMs, selectPMs } from "../../../models/PM";
import { clientsDataSelector } from "../../../models/Clients";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Grid, Typography } from "@mui/material";
import TableBox from "../../../coreUI/components/Containers/TableContainer";
import ProjectsTable from "../../../coreUI/components/Tables/ProjectsTable";
import { selectRole } from "../../../models/Auth";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Filter from "src/coreUI/components/Inputs/SelectFields/Select";

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
  const [expanded, setExpanded] = useState<boolean>(true);
  const [doneExpanded, setDoneExpanded] = useState<boolean>(true);
  const [filter, setFilter] = useState(true);
  const backgroundColor = ["#FFC5001A", "#00ACBA1A", "#b5b5be"];
  const role = useAppSelector(selectRole);
  const { watch, control } = useForm();
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

  const onChange = (e: any, props: any) => {
    e.preventDefault();
    console.log(e);
    props.field.onChange(e.target.id);
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
        <Grid item xs={4} sm={4} md={12} lg={12} marginBottom={4}>
          <Typography variant="h3" paddingTop={1.1} fontFamily={"Cairo"}>
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
              <SearchBar
                value={props.field.value}
                placeholder="Search"
                onChange={(e: any) => {
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
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
              md={2}
              lg={2}
            >
              <Controller
                name="deadline"
                control={control}
                render={(props) => (
                  <Filter
                    name={"projects-" + props.field.name}
                    selected={props.field.value}
                    label="Due Date: "
                    onSelect={(e: any) => onChange(e, props)}
                    textTruncate={4}
                    options={[
                      { id: "asc", text: "Ascending", value: "asc" },
                      { id: "desc", text: "Descending", value: "desc" },
                    ]}
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
              md={2.2}
              lg={2.2}
            >
              <Controller
                name="projectManager"
                control={control}
                render={(props) => (
                  <Filter
                    name={"projects-" + props.field.name}
                    selected={props.field.value}
                    label="Project Manager: "
                    options={[
                      ...PMs.map((item) => {
                        return {
                          id: item._id,
                          value: item._id,
                          text: item.name,
                        };
                      }),
                    ]}
                    onSelect={(e: any) => onChange(e, props)}
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
              md={2}
              lg={2}
            >
              <Controller
                name="clientId"
                control={control}
                render={(props) => (
                  <Filter
                    name={"projects-" + props.field.name}
                    selected={props.field.value}
                    label="Client: "
                    options={[
                      ...clients?.map((item) => {
                        return {
                          id: item._id,
                          value: item._id,
                          text: item.clientName,
                        };
                      }),
                    ]}
                    onSelect={(e: any) => onChange(e, props)}
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
              md={2}
              lg={2}
            >
              <Controller
                name="projectStatus"
                control={control}
                render={(props) => (
                  <>
                    <Filter
                      name={"projects-" + props.field.name}
                      selected={props.field.value}
                      label="Status: "
                      options={[
                        {
                          id: "Not Started",
                          value: "Not Started",
                          text: "Not Started",
                        },
                        {
                          id: "deliver on time",
                          value: "deliver on time",
                          text: "Delivered on time",
                        },
                        {
                          id: "deliver before time",
                          value: "deliver before deadline",
                          text: "Delivered earlier",
                        },
                        {
                          id: "late",
                          value: "late",
                          text: "Delivered late",
                        },
                        {
                          id: "inProgress",
                          value: "inProgress",
                          text: "In Progress",
                        },
                      ]}
                      onSelect={(e: any) => onChange(e, props)}
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
              <SearchBar
                value={props.field.value}
                onChange={(e: any) => {
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
                placeholder="Search"
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
