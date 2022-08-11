import DepartmentCard from "./Card";
import CreateNewDepartment from "../Create/CreateNewDepartment";
import { selectRole } from "../../../redux/Auth";
import { useAppSelector } from "../../../redux/hooks";
import { IDepartmentState } from "../../../interfaces/models/Departments";
import { selectAllDepartments } from "../../../redux/Departments/departments.selectors";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import "./departments.css";

const Departments = () => {
  let departments = useAppSelector(selectAllDepartments);
  const role = useAppSelector(selectRole);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box className="departments-page" sx={{ width: "100%" }}>
      <Box
        sx={
          SM
            ? {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "30px",
              }
            : {
                paddingTop: "60px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }
        }
      >
        <Typography
          variant="h2"
          style={
            SM
              ? { marginTop: "50px", paddingBottom: "0px" }
              : {
                  marginBottom: "100px",
                  paddingBottom: "0px",
                }
          }
        >
          Departments
        </Typography>
      </Box>
      <div className="all-departments">
        {departments?.map((dep: IDepartmentState) => (
          <DepartmentCard department={dep} key={dep._id} />
        ))}
        {role !== "PM" && <CreateNewDepartment />}
      </div>
    </Box>
  );
};
export default Departments;
