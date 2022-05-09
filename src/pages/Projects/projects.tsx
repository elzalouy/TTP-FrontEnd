import React, { useEffect, useState } from "react";
import CreateNewProject from "./newProject";
import IMAGES from "../../assets/img/index";
import SearchBar from "../Category/SearchBar";
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
  const isDelete = useAppSelector(selectDeleteProjectId);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [doneExpanded, setDoneExpanded] = useState<boolean>(false);
  const [filter, setFilter] = useState(false);
  const backgroundColor = ["#FFC5001A", "#00ACBA1A", "#b5b5be"];
  const role = useAppSelector(selectRole);
  const { register, watch, control, setValue } = useForm();
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.up("md"));

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
   if(MD){
     setFilter(true);
   }else{
     setFilter(false);
   }
  }, [MD])
  

  useEffect(() => {
    setValue("name", "");
  }, []);
  
  useEffect(() => {
    dispatch(getAllProjects(null));
  }, [isDelete]);

  return (
    <Grid
      width={"100%"}
      minHeight={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      container
      paddingX={SM ? 2 : 4}
      paddingTop={SM ? 10 : 6}
    >
      <Grid container xs={12} justifyContent="flex-start" direction={"row"}>
        <Grid item xs={6} lg={2} marginBottom={4}>
          <Typography variant="h3" paddingTop={1.1} fontFamily={"Cairo"}>
            Projects
          </Typography>
        </Grid>
        <Grid marginX={1} item marginY={1}>
          <Box
            textAlign={"center"}
            sx={{ bgcolor: "white", borderRadius: 4 }}
            width={38}
            height={38}
            paddingTop={SM ? 1.1 : 1.2}
          >
            <img
              src={IMAGES.filtericon}
              alt="FILTER"
              onClick={() => setFilter((state) => !state)}
            />
          </Box>
        </Grid>
        {filter && (
          <>
            <Grid marginX={1} marginY={1} item>
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
            <Grid marginX={1} marginY={1} item>
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
            <Grid marginX={1} marginY={1} item>
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
            <Grid marginX={1} marginY={1} item>
              <Controller
                name="projectStatus"
                control={control}
                render={(props) => (
                  <>
                    <SelectInput
                      label={"Status"}
                      {...props}
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
        <Grid xs={12} lg={4} marginX={1} marginY={1} item>
          <Controller
            name="name"
            control={control}
            render={(props) => (
              <SearchBar
                {...props}
                value={props.field.value}
                onChange={(e: any) => {
                  props.field.onChange(e);
                }}
                onHandleChange={onHandleChange}
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
            <RotateRightIcon></RotateRightIcon> Loading More
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default Projects;
