import React from "react";
import IMAGES from "../../assets/img/index";
// import AddNewTeam from "./AddNewTeam";
// import CreateNewDepartment from "./CreateNewDepartment";
import DepartmentCard from "./departmentCard";
import "./departments.css";
import CreateNewDepartment from "../../components/popups/CreateNewDepartment";
import CreateNewTeam from "../../components/popups/CreateNewTeam";
import { Box, Typography } from "@mui/material";
type Props = {};
interface IProps {
  alternatingColor: string[][];
}
const departments: React.FC<IProps> = () => {
  const alternatingColor = [
    ["#0079BF", "#E1EDF6"],
    ["#B04632", "#F3E8E7"],
    ["#D29034", "#F7F0E7"],
    ["#783DBD", "#EFEBF2"],
    ["#00AECC", "#E1F3F7"],
  ];
  return (
    <Box className="departments-page" sx={{ width: "100%" }}>
      <Box sx={{ paddingTop: "30px" }}>
        <Typography
          variant="h2"
          style={{
            margin: "10px 0",
            paddingBottom: "20px",
          }}
        >
          Departments
        </Typography>
      </Box>
      <div className="department-tools">
        <div className="filter-icon">
          <img src={IMAGES.filtericon} alt="FILTER" />
        </div>
        <Box className="department-option">
          <label>Project type:</label>
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="A to Z">Done</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>
        <Box className="department-option">
          <label>No. of projects:</label>
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="A to Z">All</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>
        <Box className="department-option">
          <label>No. of tasks:</label>
          <div className="select-container">
            <select className="select-filter" name="color">
              <option value="A to Z">All</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
            <div className="line"></div>
          </div>
        </Box>

        <CreateNewTeam />
      </div>
      <div className="all-departments">
        <DepartmentCard
          backgroundColor={alternatingColor[0][1]}
          fontColor={alternatingColor[0][0]}
        />
        <DepartmentCard
          backgroundColor={alternatingColor[1][1]}
          fontColor={alternatingColor[1][0]}
        />
        <DepartmentCard
          backgroundColor={alternatingColor[2][1]}
          fontColor={alternatingColor[2][0]}
        />
        <DepartmentCard
          backgroundColor={alternatingColor[3][1]}
          fontColor={alternatingColor[3][0]}
        />
        <DepartmentCard
          backgroundColor={alternatingColor[4][1]}
          fontColor={alternatingColor[4][0]}
        />
        <CreateNewDepartment />
      </div>
    </Box>
  );
};
export default departments;
