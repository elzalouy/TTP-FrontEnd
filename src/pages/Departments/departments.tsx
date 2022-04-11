import React from "react";
import IMAGES from "../../assets/img/index";
import DepartmentCard from "./departmentCard";
import "./departments.css";
import CreateNewDepartment from "../../components/popups/CreateNewDepartment";
import CreateNewTeam from "../../components/popups/CreateNewTeam";
import { Box, Grid, Typography } from "@mui/material";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";
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
        <Grid marginX={1.8}>
          <SelectInput
            labelValue="Project type: "
            options={[
              { id: "done", text: "done", value: "done" },
              { id: "in Progress", text: "In Progress", value: "in Progress" },
            ]}
            name="status"
            placeholder=""
            handleChange={() => null}
            selectValue=""
          />
        </Grid>
        <Grid marginX={1.8}>
          <SelectInput
            labelValue="No. of projects: "
            options={[
              { id: "done", text: "done", value: "done" },
              { id: "in Progress", text: "In Progress", value: "in Progress" },
            ]}
            name="status"
            placeholder=""
            handleChange={() => null}
            selectValue=""
          />
        </Grid>
        <Grid marginX={1.8}>
          <SelectInput
            labelValue="No. of Tasks: "
            options={[
              { id: "done", text: "done", value: "done" },
              { id: "in Progress", text: "In Progress", value: "in Progress" },
            ]}
            name="status"
            placeholder=""
            handleChange={() => null}
            selectValue=""
          />
        </Grid>
        <CreateNewTeam />
      </div>
      <Grid container direction={"row"} className="all-departments">
        <Grid xs={12} sm={12} md={12} lg={4} padding={1}>
          <DepartmentCard
            backgroundColor={alternatingColor[0][1]}
            fontColor={alternatingColor[0][0]}
          />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={4} padding={1}>
          <DepartmentCard
            backgroundColor={alternatingColor[1][1]}
            fontColor={alternatingColor[1][0]}
          />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={4} padding={1}>
          <DepartmentCard
            backgroundColor={alternatingColor[2][1]}
            fontColor={alternatingColor[2][0]}
          />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={4} padding={1}>
          <DepartmentCard
            backgroundColor={alternatingColor[3][1]}
            fontColor={alternatingColor[3][0]}
          />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={4} padding={1}>
          <DepartmentCard
            backgroundColor={alternatingColor[4][1]}
            fontColor={alternatingColor[4][0]}
          />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={4} padding={1}>
          <CreateNewDepartment />
        </Grid>
      </Grid>
    </Box>
  );
};
export default departments;
