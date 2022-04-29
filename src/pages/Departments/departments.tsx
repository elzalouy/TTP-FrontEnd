import React, { useEffect, useState } from "react";
import DepartmentCard from "./departmentCard";
import "./departments.css";
import CreateNewDepartment from "../../components/popups/CreateNewDepartment";
import CreateNewTeam from "../../components/popups/CreateNewTeam";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Department, getAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import { selectAllDepartments } from "../../redux/Departments/departments.selectors";
import { selectAllMembers } from "../../redux/techMember/techMembers.selectors";
import { selectRole } from "../../redux/Auth";

interface IProps {
  alternatingColor: string[][];
}
const Departments: React.FC<IProps> = () => {
  const [department, setDepartment] = useState<null | Department[]>(null);
  let departmentData = useAppSelector(selectAllDepartments);
  const role = useAppSelector(selectRole);
  let teamsData = useAppSelector(selectAllMembers);
  const dispatch = useDispatch();

  useEffect(() => {
    setDepartment(departmentData);
  }, [departmentData]);
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
       {role !== "PM" && <CreateNewTeam />}
      </div>
      <div className="all-departments">
        {department?.map((dep: Department) => (
          <DepartmentCard
            backgroundColor={alternatingColor[0][1]}
            fontColor={alternatingColor[0][0]}
            department={dep}
            key={dep._id}
          />
        ))}

        {role !== "PM" && <CreateNewDepartment />}
      </div>
    </Box>
  );
};
export default Departments;
