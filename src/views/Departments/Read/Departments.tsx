import CreateNewDepartment from "../Create/CreateNewDepartment";
import { selectRole } from "../../../models/Auth";
import { useAppSelector } from "../../../models/hooks";
import { IDepartmentState } from "../../../types/models/Departments";
import { selectAllDepartments } from "../../../models/Departments/departments.selectors";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import "./departments.css";
import DepartmentCard from "./Card/DepartmentCard";


export const Departments = () => {
  let departments = useAppSelector(selectAllDepartments);
  const role = useAppSelector(selectRole);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className="departments-page" sx={{ width: "100%" }}>
      <Box sx={MD ? { paddingTop: "50px" } : { paddingTop: "0px" }}>
        <Typography
          fontSize={24}
          variant="h2"
          style={
            SM
              ? { margin: "40px 0", paddingBottom: "20px" }
              : {
                margin: "10px 0",
                paddingBottom: "20px",
              }
          }
        >
          Departments
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          border: 1,
          borderRadius: "16px",
          borderColor: "#e2e2ea",
          marginTop: 4,
        }}>
        {/* <div className="all-departments"> */}
        {departments?.map((dep: IDepartmentState) => (
          <Grid sm={6} xs={12} md={6} lg={4} padding={2}>
            <DepartmentCard department={dep} key={dep._id} />
          </Grid>
        ))}
        <Grid sm={6} xs={12} md={6} lg={4} padding={2}>
          {role !== "PM" && <CreateNewDepartment />}
        </Grid>
        {/* </div> */}
      </Grid>
    </Box>
  );
};
