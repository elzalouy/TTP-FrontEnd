import CreateNewDepartment from "../Create/CreateNewDepartment";
import { selectRole } from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import { IDepartmentState } from "../../../types/models/Departments";
import { selectAllDepartments } from "../../../models/Departments/departments.selectors";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import "./departments.css";
import DepartmentCard from "./Card/DepartmentCard";

export const Departments = (props: any) => {
  let departments = useAppSelector(selectAllDepartments);
  const role = useAppSelector(selectRole);
  const theme = useTheme();

  return (
    <Box className="departments-page">
      <Box>
        <Typography
          fontSize={24}
          variant="h2"
          style={{
            paddingBottom: "20px",
          }}
        >
          Departments
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          border: 1,
          borderRadius: "16px",
          borderColor: "#e2e2ea",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        {departments?.map((dep: IDepartmentState) => (
          <Grid sm={6} xs={12} md={6} lg={4} padding={2}>
            <DepartmentCard department={dep} key={dep._id} />
          </Grid>
        ))}
        <Grid sm={6} xs={12} md={6} lg={4} padding={2}>
          {role !== "PM" && <CreateNewDepartment />}
        </Grid>
      </Grid>
    </Box>
  );
};
