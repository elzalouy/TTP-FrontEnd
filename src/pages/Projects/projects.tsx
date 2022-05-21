import React, { useEffect, useState } from "react";
import CreateNewProject from "./newProject";
import IMAGES from "../../assets/img/index";
import SearchBar from "../../coreUI/usable-component/Inputs/SearchBox";
import Box from "@mui/material/Box";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useAppSelector } from "../../redux/hooks";
import {
  selectDoneProjects,
  selectInprogressProjects,
  selectLoading,
  filterProjects,
  getAllProjects,
  selectDeleteProjectId,
  ProjectsActions,
} from "../../redux/Projects";
import { getPMs, selectPMs } from "../../redux/PM";
import { clientsDataSelector } from "../../redux/Clients";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Grid, Typography } from "@mui/material";
import TableBox from "../../coreUI/usable-component/Boxes/TableBox";
import ProjectsTable from "../../coreUI/usable-component/Tables/ProjectsTable";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";
import { selectRole } from "../../redux/Auth";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ProjectsProps {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

const Projects: React.FC<ProjectsProps> = (props) => {
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

  useEffect(() => {
    if (MD) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }, [MD]);

  /* 
  useEffect(() => {
    setValue("name", "");
  }, []); */

  return (
    <Grid
      overflow={"hidden"}
      justifyContent={"center"}
      alignItems={"center"}
      container
      marginX={{ sm: 1, xs: 1, md: 4, lg: 4 }}
      marginTop={{ xs: 10, sm: 10, md: 0, lg: 0 }}
    >
      <Grid container xs={12} justifyContent="flex-start" direction={"row"}>
        <Grid item xs={4} sm={4} md={12} lg={12} marginBottom={4}>
          <Typography variant="h3" paddingTop={1.1} fontFamily={"Cairo"}>
            Projects
          </Typography>
        </Grid>
        <Grid item margin={1} marginLeft={0}>
          <Box
            onClick={() => setFilter(!filter)}
            textAlign={"center"}
            sx={{ bgcolor: "white", borderRadius: 3, paddingTop: 1.2 }}
            width={38}
            height={38}
          >
            <img src={IMAGES.filtericon} alt="FILTER" />
          </Box>
        </Grid>
        <Grid
          margin={1}
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
              display={{
                xs: filter ? "block" : "none",
                sm: filter ? "block" : "none",
                md: "block",
                lg: "block",
              }}
              margin={1}
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
                  <SelectInput
                    {...props}
                    label="Due Date: "
                    options={[
                      { id: "asc", text: "Ascending", value: "asc" },
                      { id: "desc", text: "Descending", value: "desc" },
                    ]}
                    handleChange={(e) => {
                      e.preventDefault();
                      props.field.onChange(e);
                      onHandleSort(e);
                    }}
                    selectValue={props.field.value}
                    selectText={props.field.value}
                  />
                )}
              />
            </Grid>
            <Grid
              display={{
                xs: filter ? "block" : "none",
                sm: filter ? "block" : "none",
                md: "block",
                lg: "block",
              }}
              margin={1}
              item
              xs={5}
              sm={4.5}
              md={2}
              lg={2}
            >
              <Controller
                name="projectManager"
                control={control}
                render={(props) => (
                  <SelectInput
                    label="Project Manager: "
                    {...props}
                    options={[
                      { id: "all", value: "", text: "All" },
                      ...PMs.map((item) => {
                        return {
                          id: item._id,
                          value: item._id,
                          text: item.name,
                        };
                      }),
                    ]}
                    handleChange={(e) => {
                      e.preventDefault();
                      props.field.onChange(e);
                      onHandleChange(e);
                    }}
                    selectValue={props.field.value}
                    selectText={
                      PMs?.find((val) => val._id === props.field.value)?.name
                    }
                  />
                )}
              />
            </Grid>
            <Grid
              display={{
                xs: filter ? "block" : "none",
                sm: filter ? "block" : "none",
                md: "block",
                lg: "block",
              }}
              margin={1}
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
                  <SelectInput
                    label={"Client: "}
                    {...props}
                    options={[
                      { id: "all", value: "", text: "All" },
                      ...clients?.map((item) => {
                        return {
                          id: item._id,
                          value: item._id,
                          text: item.clientName,
                        };
                      }),
                    ]}
                    handleChange={(e) => {
                      e.preventDefault();
                      props.field.onChange(e);
                      onHandleChange(e);
                    }}
                    selectValue={props.field.value}
                    selectText={
                      clients.find((val) => val._id === props.field.value)
                        ?.clientName
                    }
                  />
                )}
              />
            </Grid>
            <Grid
              display={{
                xs: filter ? "block" : "none",
                sm: filter ? "block" : "none",
                md: "block",
                lg: "block",
              }}
              margin={1}
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
                    <SelectInput
                      label="Status"
                      options={[
                        { id: "all", value: "", text: "All" },
                        {
                          id: "delivered",
                          value: "delivered on time",
                          text: "delivered on time",
                        },
                        {
                          id: "delivered before time",
                          value: "delivered before time",
                          text: "delivered before time",
                        },
                        { id: "late", value: "late", text: "late" },
                        {
                          id: "inProgress",
                          value: "inProgress",
                          text: "inProgress",
                        },
                      ]}
                      handleChange={(e) => {
                        e.preventDefault();
                        props.field.onChange(e);
                        onHandleChange(e);
                      }}
                      selectValue={props.field.value}
                      selectText={props.field.value}
                    />
                  </>
                )}
              />
            </Grid>
          </>
        )}
        <Grid
          margin={1}
          item
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
        {role !== "PM" && <CreateNewProject />}
        {loading === false ? (
          <>
            <TableBox
              title={"In progress"}
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
            <RotateRightIcon></RotateRightIcon> Loading More
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default Projects;
