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
import { IProjectsPage } from "src/types/models/Projects";
import IMAGES from "../../../assets/img/Images";
import TableBox from "../../../coreUI/components/Containers/Table/TableContainer";
import SearchBox from "../../../coreUI/components/Inputs/Search/SearchBox";
import Loading from "../../../coreUI/components/Loading/Loading";
import ProjectsTable from "../../../coreUI/components/Tables/ProjectsTable";
import { selectClientOptions } from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import { selectPMOptions, selectPMs } from "../../../models/PM";
import {
  filterProjects,
  ProjectsActions,
  selectDoneProjects,
  selectInprogressProjects,
  selectLoading,
} from "../../../models/Projects";
import CreateNewProject from "./NotStartedProjects";

export const Projects: React.FC<IProjectsPage> = (props) => {
  const dispatch = useDispatch();
  const loading = useAppSelector(selectLoading);
  const inProgressProjects = useAppSelector(selectInprogressProjects);
  const doneProjects = useAppSelector(selectDoneProjects);
  const PMs = useAppSelector(selectPMs);
  const pmOptions = useAppSelector(selectPMOptions);
  const clientOptions = useAppSelector(selectClientOptions);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [doneExpanded, setDoneExpanded] = useState<boolean>(true);
  const [filter, setFilter] = useState(true);
  const backgroundColor = ["#FFC5001A", "#00ACBA1A", "#b5b5be"];
  const { watch, control, setValue, getValues } = useForm();
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const LG = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (MD) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }, [MD]);

  const onHandleChange = (e: any) => {
    let filter = {
      name: getValues().name,
      clientId: getValues().clientId,
      projectManager: getValues().projectManager,
      projectStatus: getValues().projectStatus,
    };
    console.log(filter);
    dispatch(filterProjects(filter));
  };

  const onHandleSort = (e: any) => {
    dispatch(ProjectsActions.onSortProjects(getValues().deadline));
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
                    onHandleChange(e);
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
                  onHandleChange(e);
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
