import { Avatar, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import {useEffect,useState} from "react";
import IMAGES from "../../assets/img/index";
import SearchBox from "../../coreUI/usable-component/Inputs/SearchBox";
import CreateNewPM from "../../components/popups/CreateNewPM";
import "./projectManagers.css";
import ProjectManagersTable from "../../coreUI/usable-component/Tables/PMtable";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { ProjectManager, selectPMs } from "../../redux/PM";

type Props = {};

const ProjectManagers: React.FC<Props> = () => {

  const [cellsData , setCellsData] = useState<ProjectManager[]>([]);
  const dispatch = useDispatch(); 
  const productManagerData = useAppSelector(selectPMs);

  useEffect(()=>{
    setCellsData(productManagerData);
  },[productManagerData]);

  return (
    <Box sx={{ backgroundColor: "#FAFAFB", width: "100%" }}>
      <Box
        width={"100%"}
        paddingLeft={3.8}
        paddingRight={12.5}
        paddingTop={6}
        paddingBottom={12}
        flexDirection="row"
        display="inline-flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2">Project Managers</Typography>
        <CreateNewPM />
      </Box>
      <Paper className="pm-container">
        <ProjectManagersTable cellsData={cellsData} />
      </Paper>
    </Box>
  );
};
export default ProjectManagers;
