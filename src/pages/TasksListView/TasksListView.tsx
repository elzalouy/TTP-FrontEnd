import { Checkbox, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import IMAGES from "../../assets/img/index";
import SearchBox from "../../components/SearchBox";
import { getAllCategories } from "../../redux/Categories";
import { getAllClients, selectClients } from "../../redux/Clients";
import { getAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import { getPMs, selectPMs } from "../../redux/PM";
import {
  filterTasks,
  getAllProjects,
  getAllTasks,
  selectAllProjects,
} from "../../redux/Projects";
import { getAllMembers, selectAllMembers } from "../../redux/techMember";
import DeleteTask from "./DeleteTask";
import "./TasksListView.css";

const Tasks: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const projects = useAppSelector(selectAllProjects);
  const PMs = useAppSelector(selectPMs);
  const clients = useAppSelector(selectClients);
  const techMembers = useAppSelector(selectAllMembers);
  const { register, watch, control } = useForm();
  React.useEffect(() => {
    dispatch(getAllClients(null));
    dispatch(getPMs(null));
    dispatch(getAllDepartments(null));
    dispatch(getAllCategories(null));
    dispatch(getAllProjects(null));
    dispatch(getAllMembers(null));
    dispatch(getAllTasks(null));
  }, []);

  const onHandleChange = (e: any) => {
    let filter = watch();
    dispatch(filterTasks(filter));
  };
  return (
    <Box className="tasks-page" sx={{ backgroundColor: "#FAFAFB" }}>
      <Typography variant="h2" className="tsk-header">
        Tasks
      </Typography>
      <Box className="tasks-settings">
        <Box className="tasks-option">
          <label>Status:</label>
          <Controller
            name="status"
            control={control}
            render={(props) => (
              <select
                {...props}
                style={{ width: "50px" }}
                className="select-filter"
                onChange={(e) => {
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
              >
                <option value="">All</option>
                <option value="inProgress">In progress</option>
                <option value="delivered">Delivered on time</option>
                <option value="late">Late</option>
                <option value="not clear">Not clear</option>
                <option value="cancled">Canceled</option>
              </select>
            )}
          />
        </Box>
        <Box className="tasks-option">
          <label>Project:</label>
          <Controller
            name="projectId"
            control={control}
            render={(props) => (
              <select
                {...props}
                onChange={(e) => {
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
                style={{ width: "50px" }}
                className="select-filter"
              >
                <option value="">All</option>
                {projects.projects &&
                  projects.projects.map((item) => (
                    <option value={item._id}>{item.name} </option>
                  ))}
              </select>
            )}
          />
        </Box>
        <Box className="tasks-option">
          <label>Members:</label>
          <Controller
            name="memberId"
            control={control}
            render={(props) => (
              <select
                {...props}
                style={{ width: "50px" }}
                className="select-filter"
                onChange={(e) => {
                  onHandleChange(e);
                  props.field.onChange(e);
                }}
              >
                <option value="">All</option>
                {techMembers.techMembers &&
                  techMembers.techMembers.map((member) => (
                    <option value={member?._id}>{member?.name}</option>
                  ))}
              </select>
            )}
          />
        </Box>
        <DeleteTask />
        <Box
          style={{
            backgroundColor: "#fafafa",
            width: "160px",
            marginLeft: "20px",
          }}
        >
          <SearchBox></SearchBox>
        </Box>
      </Box>
      {projects.loading === true ? (
        <>
          <Box
            style={{
              width: "100%",
              marginTop: "25px",
              backgroundColor: "#F1F1F4",
            }}
            className="filter-icon"
          >
            <img src={IMAGES.progressCircles} alt="sortout" />{" "}
            <Typography style={{ color: "#909090", paddingLeft: "10px" }}>
              Loading
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Paper className="tsk-container" style={{ marginTop: "30px" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        color: "#334D6E",
                        width: "20px",
                        margin: "0px",
                        padding: "0px 0px 0px 8px",
                      }}
                    >
                      <Checkbox className="col-grey" color="primary" />
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#334D6E",
                        width: "30px",
                        margin: "0px",
                        padding: "0px 8px 0px 0px",
                        fontWeight: "bold",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#334D6E",
                        width: "300px",
                        margin: "0px",
                        padding: "0px 0px 0px 15px",
                        fontWeight: "bold",
                      }}
                    >
                      Task Name
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#334D6E",
                        width: "300px",
                        margin: "0px",
                        padding: "0px 0px 0px 8px",
                        fontWeight: "bold",
                      }}
                    >
                      Project Name
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#334D6E",
                        width: "250px",
                        margin: "0px",
                        paddingRight: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      Brief Date
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#334D6E",
                        width: "160px",
                        margin: "0px",
                        padding: "0px 15px 0px 8px",
                        fontWeight: "bold",
                      }}
                    >
                      Deadline
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects?.allTasks &&
                    projects?.allTasks?.map((item) => {
                      const { _id, status, name, projectId, start, deadline } =
                        item;
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={_id}>
                          <TableCell
                            style={{
                              color: "#334D6E",
                              width: "20px",
                              margin: "0px",
                              padding: "0px 8px 0px 8px",
                            }}
                          >
                            <Checkbox className="col-grey" color="primary" />
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              color: "#334D6E",
                              width: "30px",
                              margin: "0px",
                              padding: "0px 8px 0px 0px",
                            }}
                          >
                            <div
                              className={
                                status === "inProgress"
                                  ? "sharedStatus"
                                  : status === "delivered on time"
                                  ? "endedStatus"
                                  : "doneStatus"
                              }
                            >
                              {status}
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              color: "#334D6E",
                              width: "300px",
                              margin: "0px",
                              padding: "0px 0px 0px 15px",
                            }}
                          >
                            {name}
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#334D6E",
                              width: "300px",
                              margin: "0px",
                              padding: "0px 0px 0px 8px",
                            }}
                            align="left"
                          >
                            {
                              projects.projects.find(
                                (project) => project._id === projectId
                              )?.name
                            }
                          </TableCell>
                          {/* <TableCell align="left">{version}</TableCell> */}
                          <TableCell align="left">
                            {new Date(start).toDateString()}
                          </TableCell>
                          <TableCell
                            style={{
                              color: "#334D6E",
                              width: "160px",
                              margin: "0px",
                              padding: "0px 15px 0px 8px",
                            }}
                            align="left"
                          >
                            {new Date(deadline).toDateString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </Box>
  );
};
export default Tasks;
