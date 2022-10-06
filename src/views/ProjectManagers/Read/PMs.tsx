import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CreateNewPM from "../Create/CreateNewPM";
import "./projectManagers.css";
import ProjectManagersTable from "../../../coreUI/components/Tables/PMtable";
import { useAppSelector } from "../../../models/hooks";
import { ProjectManager, selectPMs } from "../../../models/PM";
import { selectRole } from "../../../models/Auth";
import { Redirect } from "react-router";

export const ProjectManagers = (Props: any) => {
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
      sx={{
        bgcolor: "#FAFAFB !important",
        backgroundColor: "#FAFAFB",
        width: "100%",
      }}
    >
      <Box
        width={"100%"}
        paddingLeft={MD ? 1 : 0}
        paddingRight={MD ? 1 : 13.5}
        paddingTop={MD ? 10 : 0}
        paddingBottom={MD ? 4 : 0}
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
