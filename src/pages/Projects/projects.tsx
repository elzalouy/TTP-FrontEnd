import React from "react";
import CreateNewProject from "./createNewProject";
import IMAGES from "../../assets/img/index";
import "../Departments/departments.css";
import SearchBar from "../Category/SearchBar";
import Box from "@mui/material/Box";
import ProjectCard from "./ProjectCard";

type Props = {};

const projects: React.FC<Props> = () => {
  return (
    <div className="departments-page">
      <h2 className="departments-title">Projects</h2>
      <div className="department-tools" style={{ marginTop: "2%" }}>
        <div className="filter-icon">
          <img src={IMAGES.filtericon} alt="FILTER" />
        </div>
        <div className="select-wrap">
          <label>Sort by:</label>
          <select className="select-filter" name="color">
            <option value="Due Datee">Due Date</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </div>
        <div className="select-wrap">
          <label>Project mannager:</label>
          <select className="select-filter" name="color">
            <option value="Nawaf m">Nawaf M</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
        <div className="select-wrap">
          <select className="select-filter" name="color">
            <option value="">Client name</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
        <div className="select-wrap">
          <select className="select-filter" name="color">
            <option value="">Status</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
        <div style={{ marginLeft: "25%" }}>
          <SearchBar />
        </div>
      </div>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
        <ProjectCard status={"In progress"} />
        <ProjectCard status={"Done"} />
        <CreateNewProject />
      </Box>
    </div>
  );
};

export default projects;
