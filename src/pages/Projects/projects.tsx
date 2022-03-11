import React from "react";
import CreateNewProject from "./createNewProject";
import IMAGES from "../../assets/img/index";
import "../Departments/departments.css";
import SearchBar from "../Category/SearchBar";
import Box from "@mui/material/Box";
import ProjectCard from "./ProjectCard";
import RotateRightIcon from "@mui/icons-material/RotateRight";
type Props = {};

const projects: React.FC<Props> = () => {
  return (
   <Box sx={{ width: "100%" }}>
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
            <option value="Due Datee">Due Date</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </div>
        <div>
          <label style={{ padding: 0 }}>Project manager:</label>
          <select className="select-filter" style={{}} name="color">
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
          <select className="select-filter" name="color">
            <option value="">Client name</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
        <div>
          <select className="select-filter" name="color">
            <option value="">Status</option>
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
        <ProjectCard status={"In progress"} />
        <ProjectCard status={"Done"} />
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
   </Box>
  );
};

export default projects;
