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
import { clientsDataSelector } from "../../redux/Clients";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import SelectInput from "../../coreUI/usable-component/SelectInput";

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
  const clients = useAppSelector(clientsDataSelector);
  const { register, watch, control } = useForm();
  const onHandleChange = (e: any) => {
    let filter = watch();
    dispatch(filterProjects(filter));
  };
  return (
    <Box sx={{ display: "inline", width: "100%" }} className="departments-page">
      <h2 className="departments-title">Projects</h2>
      <div
        className="department-tools"
        style={{
          marginTop: "2%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="filter-icon">
          <img src={IMAGES.filtericon} alt="FILTER" />
        </div>
        <div>
          <Controller
            name="projectManager"
            control={control}
            render={(props) => (
              <SelectInput
                name="projectManager"
                {...props}
                options={PMs.map((item) => {
                  return { id: item._id, value: item._id, text: item.name };
                })}
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
        </div>
        <div>
          {/* <label style={{ padding: 0 }}>Client Name:</label> */}
          <Controller
            name="clientId"
            control={control}
            render={(props) => (
              <SelectInput
                name="clientId"
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
        </div>
        <div>
          <Controller
            name="projectStatus"
            control={control}
            render={(props) => (
              <>
                {/* <select
                  {...props}
                  className="select-filter"
                  onChange={(e) => {
                    props.field.onChange(e);
                    onHandleChange(e);
                  }}
                >
                  <option value={""}>select Client</option>
                  <option value="delivered on time">delivered on time</option>
                  <option value="delivered before time">
                    delivered before time
                  </option>
                  <option value="delivered after time">
                    delivered after time
                  </option>
                  <option value="late">late</option>
                  <option value="inProgress">inProgress</option>
                </select> */}
                <SelectInput
                  name="status"
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
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
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
            <ProjectCard {...props} status={"Late"} Projects={lateProjects} />
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
    </Box>
  );
};

export default Projects;
