import React from "react";
import IMAGES from "../../assets/img/index";
// import AddNewTeam from "./AddNewTeam";
// import CreateNewDepartment from "./CreateNewDepartment";
import DepartmentCard from "./departmentCard";
import "./departments.css";
import CreateNewDepartment from "../../components/popups/CreateNewDepartment";
import CreateNewTeam from "../../components/popups/CreateNewTeam";

type Props = {};
const departments: React.FC<Props> = () => {
  return (
    <div className="departments-page">
      <h2 className="departments-title">Departments</h2>
      <div className="department-tools">
        <div className="filter-icon">
          <img src={IMAGES.filtericon} alt="FILTER" />
        </div>
        <div className="select-wrap">
          <label>Project type:</label>
          <select className="select-filter" name="color">
            <option value="Done">Done</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </div>
        <div className="select-wrap">
          <label>No. of project:</label>
          <select className="select-filter" name="color">
            <option value="All">All</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
        <div className="select-wrap">
          <label>No. of project:</label>
          <select className="select-filter" name="color">
            <option value="All">All</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </div>
      
        <CreateNewTeam />
      </div>
      <div className="all-departments">
        <DepartmentCard />
        <DepartmentCard />
        <DepartmentCard />
        <DepartmentCard />
        <DepartmentCard />
        <CreateNewDepartment />
      </div>
    </div>
  );
};
export default departments;
