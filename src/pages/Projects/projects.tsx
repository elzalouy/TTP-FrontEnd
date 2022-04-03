import React, { useEffect, useState } from "react";
import CreateNewProject from "./newProject";
import IMAGES from "../../assets/img/index";
import "./projects.css";
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
import { useForm } from "react-hook-form";
import SearchBox from "../../components/SearchBox";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";

const Projects: React.FC = () => {
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

    <Box className="projects-page" sx={{ width: "100%" }}>
      <Box sx={{ paddingTop: '30px' }}>
        <Typography
          variant="h2"
          style={{
            margin: "10px 0",
            paddingBottom: "20px",
          }}
        >
          Projects
        </Typography>
      </Box>      <div
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
        <Box className="projects-option">
          <label>Sort By:</label>
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="A to Z">A to Z</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>
        <Box className="projects-option">
          <label>Project manager:</label>
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="Nawaf m">Nawaf m</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>
        <Box className="projects-option">
          <label>Project team:</label>
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="Nawaf m">Developers team</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>
        <Box className="projects-option">
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="Nawaf m">Client name</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>
        <Box className="projects-option">
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="Nawaf m">Status</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>
        <div>
          <SearchBox></SearchBox>
        </div>
      </div>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
        <CreateNewProject />
        <ProjectCard status={"In progress"} Projects={inProgressProjects} />
        <ProjectCard status={"Done"} Projects={doneProjects} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="filter-icon">
            <img src={IMAGES.filtericon} alt="FILTER" />
          </div>
          <div>
            <label style={{ padding: 0 }}>Project manager:</label>
            <select className="select-filter" name="color">
              {PMs &&
                PMs.length > 0 &&
                PMs.map((item: any) => (
                  <option
                    {...register("projectManager")}
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}{" "}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label style={{ padding: 0 }}>Client Name:</label>
            <select className="select-filter" name="color">
              {clients?.length > 0 &&
                clients.map((item: any) => (
                  <option
                    key={item._id}
                    {...register("client")}
                    value={item?._id}
                  >
                    {item?.clientName}{" "}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label style={{ padding: 0 }}>Status</label>
            <select className="select-filter" name="color">
              <option value="delivered on time">delivered on time</option>
              <option value="delivered before time">
                delivered before time
              </option>
              <option value="delivered after time">delivered after time</option>
              <option value="late">late</option>
              <option value="inProgress">inProgress</option>
            </select>
          </div>
          {/* <div>
            <SearchBar />
          </div> */}
        </Box>
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
      </Box>

    </Box >

  );
};

export default Projects;
