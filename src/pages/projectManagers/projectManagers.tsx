import { Avatar, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import {useEffect,useState} from "react";
import CreateNewPM from "../../components/popups/CreateNewPM";
import "./projectManagers.css";
import ProjectManagersTable from "../../coreUI/usable-component/Tables/PMtable";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { PMsActions, ProjectManager, selectPMs } from "../../redux/PM";
import { selectRole } from "../../redux/Auth";
import pmSlice from "../../redux/PM/pm.slice";
import { Redirect } from "react-router";

type Props = {};

const ProjectManagers: React.FC<Props> = () => {

  const [cellsData , setCellsData] = useState<ProjectManager[]>([]);
  const productManagerData = useAppSelector(selectPMs);
  const dispatch = useDispatch();
  const role = useAppSelector(selectRole);

  useEffect(() => {
   dispatch(PMsActions.getAllPM(null));
  }, []);

  useEffect(()=>{
    setCellsData(productManagerData);
  },[productManagerData]);

  if(role === "PM"){
    return <Redirect to={"/Overview"}/>
  }

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
