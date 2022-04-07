import React, { useEffect, useState } from "react";
import CreateNewProject from "./newProject";
import IMAGES from "../../assets/img/index";
import "../Departments/departments.css";
import SearchBar from "../Category/SearchBar";
import Box from "@mui/material/Box";
import ProjectCard from "../../components/Projects/ProjectCard";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useAppSelector } from "../../redux/hooks";
import {
  selectDoneProjects,
  selectInprogressProjects,
  selectLateProjects,
  selectLoading,
  filterProjects,
} from "../../redux/Projects";
import { selectPMs } from "../../redux/PM";
import { selectAllMembers } from "../../redux/techMember";
import { selectClients } from "../../redux/Clients";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import SelectInput from "../../coreUI/usable-component/SelectInput";
import { Grid, Typography } from "@mui/material";
import Select from "../../coreUI/usable-component/Select";

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
  const lateProjects = useAppSelector(selectLateProjects);
  const PMs = useAppSelector(selectPMs);
  const clients = useAppSelector(selectClients);
  const { register, watch, control } = useForm();
  const onHandleChange = (e: any) => {
    let filter = watch();
    dispatch(filterProjects(filter));
  };
  return (
    <Grid
      width={"100%"}
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
            justifyContent={"center"}
            alignItems="center"
            sx={{ bgcolor: "white", borderRadius: 4 }}
            width="auto"
            paddingX={1}
            paddingY={1.1}
          >
            <img src={IMAGES.filtericon} alt="FILTER" />
          </Box>
        </Grid>
        <Grid marginX={0.2} item>
          <Controller
            name="sort"
            control={control}
            render={(props) => (
              <Select
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
              <Select
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
              <Select
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
                <Select
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
            <ProjectCard
              {...props}
              status={"In progress"}
              Projects={inProgressProjects}
            />
            <ProjectCard {...props} status={"Done"} Projects={doneProjects} />
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
