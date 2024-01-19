import {
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
import "../../../coreUI/themes/style.css";
import "src/App/App.css";
import MailLockIcon from "@mui/icons-material/MailLock";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { FC } from "react";
import IMAGES from "../../../assets/img/Images";
import {
  PMsActions,
  Manager,
  resendMail,
  selectManagers,
} from "../../../models/Managers";
import EditManager from "../Edit/Edit";
import DeleteManager from "../Delete/Delete";
import { useDispatch } from "react-redux";
import {
  toggleDeleteProjectManagerPopup,
  toggleEditProjectManagerPopup,
} from "../../../models/Ui";
import moment from "moment";
import { useAppSelector } from "../../../models/hooks";
import { selectProjectsState } from "../../../models/Projects";
import { useMediaQuery, useTheme } from "@mui/material";
import { ToastSuccess, ToastWarning } from "src/coreUI/components/Typos/Alert";
import { selectUser } from "src/models/Auth";

const ManagersList = () => {
  const managersData = useAppSelector(selectManagers);
  const project = useAppSelector(selectProjectsState);
  const dispatch = useDispatch();
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const user = useAppSelector(selectUser);

  const refreshUser = (id: string) => {
    //Checking time limit
    let timeLimit = localStorage.getItem("limit");
    let currentTime = moment.now().toString();
    if (timeLimit && timeLimit >= currentTime) {
      ToastWarning("Please try to resend after one hour");
    } else {
      ToastSuccess("Verification email sent successfully");
      dispatch(resendMail(id));
      let duration = moment().add(1, "h").unix().toString();
      localStorage.setItem("limit", duration);
    }
  };

  const toggleDeletePopUp = (e: any, cellData: Manager) => {
    dispatch(PMsActions.setId(cellData));
    dispatch(toggleDeleteProjectManagerPopup("flex"));
  };

  const toggleUpdatePopUp = (e: any, cellData: Manager) => {
    dispatch(PMsActions.setId(cellData));
    dispatch(toggleEditProjectManagerPopup("flex"));
  };

  return (
    <>
      <EditManager />
      <DeleteManager />
      <TableContainer
        style={{ paddingTop: "10px" }}
        className="customScrollBar"
      >
        <Table
          size="small"
          aria-label="a dense table"
          style={{ width: "100%", borderColor: "#EBEFF2" }}
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
                User Name
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
                User Role
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
            {managersData.map((cellData) => {
              const { _id, name, email, verified, role } = cellData;
              let inProgress = project?.projects?.filter(
                (item) =>
                  item.projectManager === _id &&
                  item.projectStatus === "In Progress"
              )?.length;
              let done = project?.projects?.filter(
                (item) =>
                  item.projectManager === _id &&
                  (item.projectStatus === "delivered before deadline" ||
                    item.projectStatus === "delivered on time" ||
                    item.projectStatus === "delivered after deadline")
              )?.length;
              return (
                <TableRow
                  sx={{ height: 40, maxHeight: 40 }}
                  className="trow"
                  role="checkbox"
                  tabIndex={-1}
                  key={_id}
                >
                  <TableCell
                    align="left"
                    style={
                      MD
                        ? {
                            width: "300px",
                            margin: "0px",
                            paddingLeft: "20px",
                          }
                        : {
                            width: "300px",
                            margin: "0px",
                            paddingLeft: "40px",
                          }
                    }
                  >
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={1}
                    >
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
                    {role}
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
                    <Typography
                      color="#707683"
                      data-test-id="number-inprogress-pm"
                    >
                      {role === "PM" ? inProgress : "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color="#707683" data-test-id="number-done-pm">
                      {role === "PM" ? done : "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {((user?.role === "OM" && role === "PM") ||
                      user?.role === "SM") && (
                      <Box display={"inline-flex"}>
                        <IconButton
                          sx={{ paddingY: 0 }}
                          disableRipple
                          onClick={() => {
                            if (!verified) {
                              refreshUser(_id);
                            }
                          }}
                        >
                          {!verified ? <MailLockIcon /> : <MarkEmailReadIcon />}
                        </IconButton>
                        <IconButton
                          sx={{ paddingY: 0 }}
                          disableRipple
                          onClick={(e) => toggleUpdatePopUp(e, cellData)}
                        >
                          <img src={IMAGES.editicon} alt="editicon" />
                        </IconButton>
                        <IconButton
                          disableRipple
                          sx={{ paddingY: 0 }}
                          onClick={(e) => toggleDeletePopUp(e, cellData)}
                          data-test-id="delete-pm-button"
                        >
                          <img src={IMAGES.deleteicon} alt="deleteicon" />
                        </IconButton>
                      </Box>
                    )}
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

export default ManagersList;
