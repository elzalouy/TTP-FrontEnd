import React, { useState } from "react";
import CreateNewProject from "./newProject";
import IMAGES from "../../assets/img/index";
import "../Departments/departments.css";
import SearchBar from "../Category/SearchBar";
import Box from "@mui/material/Box";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useAppSelector } from "../../redux/hooks";
import {
  selectDoneProjects,
  selectInprogressProjects,
  selectLoading,
  filterProjects,
} from "../../redux/Projects";
import { selectPMs } from "../../redux/PM";
import { clientsDataSelector } from "../../redux/Clients";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Grid, Typography } from "@mui/material";
import TableBox from "../../coreUI/usable-component/Boxes/TableBox";
import ProjectsTable from "../../coreUI/usable-component/Tables/ProjectsTable";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";

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
  const [expanded, setExpanded] = useState<boolean>(false);
  const [doneExpanded, setDoneExpanded] = useState<boolean>(false);
  const backgroundColor = ["#FFC5001A", "#00ACBA1A", "#b5b5be"];
  const { register, watch, control } = useForm();
  const onHandleChange = (e: any) => {
    let filter = watch();
    dispatch(filterProjects(filter));
  };
  return (
    <Grid
      width={"100%"}
      minHeight={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      container
      paddingX={4}
      paddingTop={6}
    >
      <Grid container xs={12} justifyContent="flex-start" direction={"row"}>
        <Grid item xs={12} marginBottom={4}>
          <Typography variant="h3" fontFamily={"Cairo"}>
            Projects
          </Typography>
        </Grid>
        <Grid marginX={1} item>
          <Box
            textAlign={"center"}
            sx={{ bgcolor: "white", borderRadius: 4 }}
            width={38}
            height={38}
            paddingTop={1.2}
          >
            <img src={IMAGES.filtericon} alt="FILTER" />
          </Box>
        </Grid>
        <Grid marginX={0.2} item>
          <Controller
            name="sort"
            control={control}
            render={(props) => (
              <SelectInput
                name="Due Date"
                labelValue="Due Date: "
                {...props}
                options={[
                  { id: "deadline", text: "Deadline", value: "deadline" },
                ]}
                placeholder="Project Managers"
                handleChange={(e) => {
                  e.preventDefault();
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
                selectValue={props.field.value}
                selectLabel={
                  PMs?.find((val) => val._id === props.field.value)?.name
                }
              />
            )}
          />
        </Grid>
        <Grid marginX={0.2} item>
          <Controller
            name="projectManager"
            control={control}
            render={(props) => (
              <SelectInput
                name="projectManager"
                labelValue="Project Manager: "
                {...props}
                options={PMs.map((item) => {
                  return { id: item._id, value: item._id, text: item.name };
                })}
                placeholder="Project Managers: "
                handleChange={(e) => {
                  e.preventDefault();
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
                selectValue={props.field.value}
                selectLabel={
                  PMs?.find((val) => val._id === props.field.value)?.name
                }
              />
            )}
          />
        </Grid>
        <Grid marginX={0.2} item>
          <Controller
            name="clientId"
            control={control}
            render={(props) => (
              <SelectInput
                name="clientId"
                labelValue={"Client: "}
                {...props}
                options={clients.map((item) => {
                  return {
                    id: item._id,
                    value: item._id,
                    text: item.clientName,
                  };
                })}
                placeholder="Client"
                handleChange={(e) => {
                  e.preventDefault();
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
                selectValue={props.field.value}
                selectLabel={
                  clients.find((val) => val._id === props.field.value)
                    ?.clientName
                }
              />
            )}
          />
        </Grid>
        <Grid marginX={0.2} item>
          <Controller
            name="projectStatus"
            control={control}
            render={(props) => (
              <>
                <SelectInput
                  name="status"
                  labelValue={"Status"}
                  {...props}
                  options={[
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
                  placeholder="Status"
                  handleChange={(e) => {
                    e.preventDefault();
                    props.field.onChange(e);
                    onHandleChange(e);
                  }}
                  selectValue={props.field.value}
                  selectLabel={props.field.value}
                />
              </>
            )}
          />
        </Grid>
        <Grid xs={2.5} marginX={0.2} item>
          <SearchBar />
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
        {loading === false ? (
          <>
            <CreateNewProject />
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
