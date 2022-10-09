import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import AddManager from "../Create/AddManager";
import "./managers.css";
import ManagersList from "./ManagersList";
import { useAppSelector } from "../../../models/hooks";
import { Manager, selectPMs } from "../../../models/Managers";

export const Managers = (Props: any) => {
  const managers = useAppSelector(selectPMs);
  const [ManagersData, setManagersData] = useState(
    managers.filter((obj: Manager) => obj.role === "OM" || obj.role === "PM")
  );
  useEffect(() => {
    setManagersData(
      managers.filter((obj: Manager) => obj.role === "OM" || obj.role === "PM")
    );
  }, [managers]);

  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

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
        flexDirection="row"
        display="inline-flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant={SM ? "h3" : "h2"}>Managers</Typography>
        <AddManager />
      </Box>
      <Paper className="pm-container">
        <ManagersList cellsData={ManagersData} />
      </Paper>
    </Box>
  );
};
