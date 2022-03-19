import React from "react";
import CreateNewProject from "./newProject";
import IMAGES from "../../assets/img/index";
import "../Departments/departments.css";
import SearchBar from "../Category/SearchBar";
import Box from "@mui/material/Box";
import ProjectCard from "./ProjectCard";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useAppSelector } from "../../redux/hooks";
import {
  selectDoneProjects,
  selectInprogressProjects,
} from "../../redux/Projects/projects.selectors";

const Projects: React.FC = () => {
  const inProgressProjects = useAppSelector(selectInprogressProjects);
  const doneProjects = useAppSelector(selectDoneProjects);
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
          <label>Sort by:</label>
          <select className="select-filter" name="color">
            <option value="0">Due Date</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </div>
        <div>
          <label style={{ padding: 0 }}>Project manager:</label>
          <select className="select-filter" name="color">
            <option value="Nawaf m">Nawaf M</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
        <div>
          <label style={{ padding: 0 }}>Project team:</label>
          <select className="select-filter" name="color">
            <option value="Developers team">Developers team</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
        <div>
          <label style={{ padding: 0 }}>Client Name:</label>
          <select className="select-filter" name="color">
            <option value="">Client name</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
        <div>
          <label style={{ padding: 0 }}>Status</label>
          <select className="select-filter" name="color">
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
        <div>
          <SearchBar />
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
    </div>
  );
};

export default Projects;
