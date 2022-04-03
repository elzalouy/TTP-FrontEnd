import React from "react";
// <<<<<<< HEAD
// import CreateNewProject from "./createNewProject";
// =======
import CreateNewProject from "./newProject";
import IMAGES from "../../assets/img/index";
import "./projects.css";
import Box from "@mui/material/Box";
import ProjectCard from "./ProjectCard";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useAppSelector } from "../../redux/hooks";
import {
  selectDoneProjects,
  selectInprogressProjects,
} from "../../redux/Projects/projects.selectors";
import SearchBox from "../../components/SearchBox";
import { Typography } from "@mui/material";

const Projects: React.FC = () => {
  const inProgressProjects = useAppSelector(selectInprogressProjects);
  const doneProjects = useAppSelector(selectDoneProjects);
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
      </Box>

    </Box >

  );
};

export default Projects;
