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
import "../style.css";
import MailLockIcon from '@mui/icons-material/MailLock';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
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
import { useMediaQuery, useTheme } from "@mui/material";

interface ProjectManagersProps {
  cellsData: ProjectManager[];
}

const ProjectManagersTable: FC<ProjectManagersProps> = ({ cellsData }) => {
  const project = useAppSelector(selectAllProjects);
  const dispatch = useDispatch();
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const [selects, setAllSelected] = useState<string[]>([]);
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
        toastId: "mail",
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
      <TableContainer style={{paddingTop:"10px"}}>
        <Table
          size="small"
          aria-label="a dense table"
          style={
            MD
              ? { width: "140%", borderColor: "#EBEFF2" }
              : { width: "100%", borderColor: "#EBEFF2" }
          }
        >
          <TableHead>
            <TableRow>
              <TableCell
                className="thead"
                style={
                  MD
                    ? {
                        paddingLeft: "20px",
                        color: "#334D6E",
                        width: "300px",
                        margin: "0px",
                      }
                    : {
                        paddingLeft: "40px",
                        color: "#334D6E",
                        width: "300px",
                        margin: "0px",
                      }
                }
              >
                PM Name
              </TableCell>
              <TableCell
                className="thead"
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
                className="thead"
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
                className="thead"
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
                className="thead"
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
              let inProgress = project?.projects?.filter(
                (item) =>
                  item.projectManager?._id === _id &&
                  item.projectStatus === "inProgress"
              )?.length;
              let done = project?.projects?.filter(
                (item) =>
                  item.projectManager?._id === _id &&
                  (item.projectStatus === "deliver before deadline" ||
                    item.projectStatus === "deliver on time" ||
                    item.projectStatus === "delivered after deadline")
              )?.length;

              return (
                <TableRow className="trow" role="checkbox" tabIndex={-1} key={_id}>
                  <TableCell
                    align="left"
                    style={MD ? {
                      width: "300px",
                      margin: "0px",
                      paddingLeft:"20px"
                    }: {
                      width: "300px",
                      margin: "0px",
                      paddingLeft:"40px"
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={1}
                    >
                      {/*  <Avatar sx={{ width: 20, height: 20 }} /> */}
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
                  <TableCell align="left">
                    <Typography color="#707683">{inProgress}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color="#707683">{done}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box display={"inline-flex"}>
                      <IconButton
                        disableRipple
                        onClick={() => {
                          if (!password) {
                            refreshUser(_id);
                          }
                        }}
                      >
                        {!password ? <MailLockIcon /> : <MarkEmailReadIcon />}
                      </IconButton>
                      <IconButton
                        disableRipple
                        onClick={(e) => toggleUpdatePopUp(e, cellData)}
                      >
                        <img src={IMAGES.editicon} alt="editicon" />
                      </IconButton>
                      <IconButton
                        disableRipple
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
