import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import AddManager from "../Create/AddManager";
import "./managers.css";
import ManagersList from "./ManagersList";

export const Managers = (Props: any) => {
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
        alignItems="flex-start"
      >
        <Typography variant={SM ? "h3" : "h2"} p={0} m={0}>
          Managers
        </Typography>
        <AddManager />
      </Box>
      <Paper className="pm-container">
        <ManagersList />
      </Paper>
    </Box>
  );
};
