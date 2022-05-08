import {
  Avatar,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { FC, useState } from "react";
import IMAGES from "../../../assets/img";
import _ from "lodash";
import { PMsActions, ProjectManager, resendMail } from "../../../redux/PM";
import EditPM from "../../../components/popups/EditPM";
import DeletePM from "../../../components/popups/DeletePM";
import { useDispatch } from "react-redux";
import {
  toggleDeleteProjectManagerPopup,
  toggleEditProjectManagerPopup,
} from "../../../redux/Ui";
import { toast } from "react-toastify";
import moment from "moment";
import { useAppSelector } from "../../../redux/hooks";
import { selectAllProjects, selectTasks } from "../../../redux/Projects";

interface ProjectManagersProps {
  cellsData: ProjectManager[];
}

const ProjectManagersTable: FC<ProjectManagersProps> = ({ cellsData }) => {
  const [select, setSelected] = useState<boolean>(false);
  const project = useAppSelector(selectAllProjects);
  const tasks = useAppSelector(selectTasks);
  const dispatch = useDispatch();
  const [selects, setAllSelected] = useState<string[]>([]);

  const setSingleSelect = (val: string, checked: boolean) => {
    if (checked === true) {
      let selected = [...selects];
      selected.push(val);
      selected = _.uniq(selected);
      setAllSelected(selected);
    } else {
      let selected = [...selects];
      _.remove(selected, (item) => item === val);
      setAllSelected(selected);
    }
  };

  const refreshUser = (id: string) => {
    //Checking time limit
    let timeLimit = localStorage.getItem("limit");
    let currentTime = moment.now().toString();
    if (timeLimit && timeLimit >= currentTime) {
      toast.warn("Please try to resend after one hour", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId:"mail"
      });
    } else {
      dispatch(resendMail(id));
      let duration = moment().add(1, "h").unix().toString();
      localStorage.setItem("limit", duration);
    }
  };

  const toggleDeletePopUp = (e: any, cellData: ProjectManager) => {
    dispatch(PMsActions.setId(cellData));
    dispatch(toggleDeleteProjectManagerPopup("flex"));
  };

  const toggleUpdatePopUp = (e: any, cellData: ProjectManager) => {
    dispatch(PMsActions.setId(cellData));
    dispatch(toggleEditProjectManagerPopup("flex"));
  };

  return (
    <>
      <EditPM hideButton />
      <DeletePM hideButton />
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  color: "#334D6E",
                  width: "30px",
                  margin: "0px",
                  padding: "0px 0px 0px 10px",
                }}
              >
                <Checkbox
                  onChange={(e, checked) => {
                    setSelected(checked);
                    if (checked)
                      setAllSelected(cellsData.map((item) => item._id));
                    else setAllSelected([]);
                  }}
                  className="col-grey"
                  color="primary"
                />
              </TableCell>
              <TableCell
                style={{
                  color: "#334D6E",
                  width: "300px",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                PM Name
              </TableCell>
              <TableCell
                style={{
                  color: "#334D6E",
                  width: "300px",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  color: "#334D6E",
                  width: "200px",
                  margin: "0px",
                  paddingRight: "15px",
                }}
              >
                In Progress Task
              </TableCell>
              <TableCell
                style={{
                  color: "#334D6E",
                  width: "250px",
                  margin: "0px",
                  paddingRight: "15px",
                }}
              >
                In Progress Projects
              </TableCell>
              <TableCell
                style={{
                  color: "#334D6E",
                  width: "158px",
                  margin: "0px",
                  paddingRight: "15px",
                }}
              >
                Done Project
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#334D6E", width: "50px", margin: "0px" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cellsData.map((cellData) => {
              const { _id, name, email, password } = cellData;

              const getNumberOfProjectsForPMWithStatus = (name:string,status:string) => {
                let projects = project.projects.filter((project)=>{
                  return project.projectManagerName===name
                });
                let statusOfProject = projects.filter((project)=>{
                  return project.projectStatus===status
                })
                return statusOfProject.length;
              }
              
              const getNumberOfTasks = (name:string) => {
                let projects = project.projects.filter((project)=>{
                  return project.projectManagerName===name
                });
                let inProgressTasks = tasks.filter((task)=>{
                  return task.status==="inProgress"
                });
                let pmTasks = inProgressTasks.filter((task)=>{
                  let inProgressTaskProjects = projects.filter((project)=>{
                    return project._id === task.projectId
                  }) 
                  return inProgressTaskProjects
                })
                return pmTasks.length;
              }

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={_id}>
                  <TableCell
                    style={{
                      width: "50px",
                      margin: "0px",
                      paddingLeft: "10px",
                    }}
                  >
                    <Checkbox
                      checked={
                        select || selects.findIndex((i) => i === _id) >= 0
                      }
                      onChange={(e, checked) => setSingleSelect(_id, checked)}
                      className="col-grey"
                      color="primary"
                    />
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{
                      width: "300px",
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={1}
                    >
                      <Avatar sx={{ width: 20, height: 20 }} />
                      <Typography
                        fontWeight={"700"}
                        fontSize={15}
                        textTransform={"capitalize"}
                        sx={{
                          color: "#323C47",
                        }}
                      >
                        {name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "300px",
                      margin: "0px",
                      padding: "0px",
                      color: "#707683",
                    }}
                  >
                    {email}
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="#707683">
                      {getNumberOfTasks(name)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="#707683">
                     {getNumberOfProjectsForPMWithStatus(name,"inProgress")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="#707683">
                    {getNumberOfProjectsForPMWithStatus(name,"done")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box display={"inline-flex"}>
                      <IconButton
                        onClick={() => {
                          if (!password) {
                            refreshUser(_id);
                          }
                        }}
                      >
                        {!password ? <LockOpenIcon /> : <LockIcon />}
                      </IconButton>
                      <IconButton
                        onClick={(e) => toggleUpdatePopUp(e, cellData)}
                      >
                        <img src={IMAGES.editicon} alt="editicon" />
                      </IconButton>
                      <IconButton
                        onClick={(e) => toggleDeletePopUp(e, cellData)}
                      >
                        <img src={IMAGES.deleteicon} alt="deleteicon" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectManagersTable;
