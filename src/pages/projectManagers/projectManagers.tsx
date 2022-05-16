import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CreateNewPM from "../../components/popups/CreateNewPM";
import "./projectManagers.css";
import ProjectManagersTable from "../../coreUI/usable-component/Tables/PMtable";
import { useAppSelector } from "../../redux/hooks";
import { ProjectManager, selectPMs } from "../../redux/PM";
import { selectRole } from "../../redux/Auth";
import { Redirect } from "react-router";

type Props = {};

const ProjectManagers: React.FC<Props> = () => {
  const [cellsData, setCellsData] = useState<ProjectManager[]>([]);
  const productManagerData = useAppSelector(selectPMs);
  const onlyPMS = productManagerData.filter((pm) => pm.role !== "OM");
  const role = useAppSelector(selectRole);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setCellsData(onlyPMS);
  }, [productManagerData]);

  if (role === "PM") {
    return <Redirect to={"/Overview"} />;
  }

  return (
    <Box
      sx={
        SM
          ? { paddingTop: "20px", backgroundColor: "#FAFAFB", width: "100%" }
          : { backgroundColor: "#FAFAFB", width: "100%" }
      }
    >
      <Box
        width={"100%"}
        paddingLeft={MD ? 4 : 10.5}
        paddingRight={MD ? 4 : 12.5}
        paddingTop={MD ? 8 : 6}
        paddingBottom={MD ? 4 : 12}
        flexDirection="row"
        display="inline-flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant={SM ? "h3" : "h2"}>Project Managers</Typography>
        <CreateNewPM />
      </Box>
      <Paper className="pm-container">
        <ProjectManagersTable cellsData={cellsData} />
      </Paper>
    </Box>
  );
};
export default ProjectManagers;
