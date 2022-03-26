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
  selectAllProjects,
  filterProjects,
} from "../../redux/Projects";
import { selectPMs } from "../../redux/PM";
import { selectAllMembers } from "../../redux/techMember";
import { selectClients } from "../../redux/Clients";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useAppSelector(selectLoading);
  const inProgressProjects = useAppSelector(selectInprogressProjects);
  const doneProjects = useAppSelector(selectDoneProjects);
  const lateProjects = useAppSelector(selectLateProjects);
  const projects = useAppSelector(selectAllProjects);
  const PMs = useAppSelector(selectPMs);
  const techMembers = useAppSelector(selectAllMembers);
  const clients = useAppSelector(selectClients);
  const { register, watch, control } = useForm();
  const onHandleChange = (e: any) => {
    let filter = watch();
    dispatch(filterProjects(filter));
  };
  return (
    <div className="departments-page">
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
          <label style={{ padding: 0 }}>Project manager:</label>
          <Controller
            name="projectManager"
            control={control}
            render={(props) => (
              <select
                {...props}
                onChange={(e) => {
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
                className="select-filter"
              >
                <option value={""}>select PM</option>
                {PMs &&
                  PMs.length > 0 &&
                  PMs.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            )}
          />
        </div>
        <div>
          <label style={{ padding: 0 }}>Client Name:</label>
          <Controller
            name="clientId"
            control={control}
            render={(props) => (
              <select
                {...props}
                onChange={(e) => {
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
                className="select-filter"
              >
                <option value={""}>select Client</option>
                {clients?.length > 0 &&
                  clients.map((item) => (
                    <option key={item._id} value={item?._id}>
                      {item?.clientName}
                    </option>
                  ))}
              </select>
            )}
          />
        </div>
        <div>
          <label style={{ padding: 0 }}>Status</label>
          <Controller
            name="projectStatus"
            control={control}
            render={(props) => (
              <>
                <select
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
                </select>
              </>
            )}
          />
        </div>
          <SearchBar />
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
                status={"In progress"}
                Projects={inProgressProjects}
              />
              <ProjectCard status={"Done"} Projects={doneProjects} />
              <ProjectCard status={"Late"} Projects={lateProjects} />
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
      </div>
    </div>
  );
};

export default Projects;
