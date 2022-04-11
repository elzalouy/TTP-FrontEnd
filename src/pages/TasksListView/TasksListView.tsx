import { Checkbox, Grid, Typography } from "@mui/material";
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
import SearchBox from "../../coreUI/usable-component/Inputs/SearchBox";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";
import { getAllCategories } from "../../redux/Categories";
import { getAllClients, clientsDataSelector } from "../../redux/Clients";
import { getAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import { getPMs, selectPMs } from "../../redux/PM";
import {
  filterTasks,
  getAllProjects,
  getAllTasks,
  selectAllProjects,
  ProjectsInterface,
} from "../../redux/Projects";
import { getAllMembers, selectAllMembers } from "../../redux/techMember";
import DeleteTask from "./DeleteTask";
import "./TasksListView.css";

const Tasks: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const projects: ProjectsInterface = useAppSelector(selectAllProjects);
  const PMs = useAppSelector(selectPMs);
  const clients = useAppSelector(clientsDataSelector);
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
    <Grid
      bgcolor={"#FAFAFB"}
      justifyContent={"flex-start"}
      alignItems="flex-start"
      container
      alignContent={"flex-start"}
      alignSelf="flex-start"
      padding={4}
      sx={{ backgroundColor: "#FAFAFB" }}
    >
      <Typography variant="h2" marginBottom={2}>
        Tasks
      </Typography>
      <Grid marginBottom={2} container direction={"row"}>
        <Grid marginX={0.5} item>
          <Controller
            name="sort"
            control={control}
            render={(props) => (
              <SelectInput
                name="Due Date"
                labelValue="Due Date: "
                {...props}
                options={[
                  { id: "deadline", text: "Deadline", value: "deadline" },
                ]}
                placeholder="Project Managers"
                handleChange={(e) => {
                  e.preventDefault();
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
                selectValue={props.field.value}
                selectLabel={
                  PMs?.find((val) => val._id === props.field.value)?.name
                }
              />
            )}
          />
        </Grid>
        <Grid marginX={0.5} item>
          <Box className="tasks-option">
            <Controller
              name="status"
              control={control}
              render={(props) => (
                <SelectInput
                  name="status"
                  labelValue="Status: "
                  {...props}
                  options={[
                    { id: "", value: "", text: "All" },
                    {
                      id: "inProgress",
                      value: "inProgress",
                      text: "In Progres",
                    },
                    { id: "delivered", value: "delivered", text: "Delivered" },
                    { id: "late", value: "late", text: "late" },
                    { id: "not clear", value: "not clear", text: "Not Clear" },
                    { id: "canceled", value: "canceled", text: "Canceled" },
                  ]}
                  placeholder="Project Managers: "
                  handleChange={(e) => {
                    e.preventDefault();
                    props.field.onChange(e);
                    onHandleChange(e);
                  }}
                  selectValue={props.field.value}
                  selectLabel={props.field.value}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid marginX={0.5} item>
          <Box className="tasks-option">
            <Controller
              name="projectId"
              control={control}
              render={(props) => (
                <SelectInput
                  name="projectId"
                  labelValue={"Project: "}
                  {...props}
                  options={projects.projects?.map((item) => {
                    return {
                      id: item._id,
                      value: item._id,
                      text: item.name,
                    };
                  })}
                  placeholder="Project"
                  handleChange={(e) => {
                    e.preventDefault();
                    props.field.onChange(e);
                    onHandleChange(e);
                  }}
                  selectValue={props.field.value}
                  selectLabel={
                    projects?.projects?.find(
                      (val) => val._id === props.field.value
                    )?.name
                  }
                />
              )}
            />
          </Box>
        </Grid>
        <Grid marginX={0.5} item>
          <Box className="tasks-option" width={"100%"}>
            <Controller
              name="memberId"
              control={control}
              render={(props) => (
                <SelectInput
                  name="Members"
                  labelValue={"Members : "}
                  {...props}
                  options={techMembers.techMembers.map((item) => {
                    return {
                      id: item._id,
                      value: item._id,
                      text: item.name,
                    };
                  })}
                  placeholder="Members"
                  handleChange={(e) => {
                    e.preventDefault();
                    props.field.onChange(e);
                    onHandleChange(e);
                  }}
                  selectValue={props.field.value}
                  selectLabel={
                    techMembers.techMembers.find(
                      (val) => val._id === props.field.value
                    )?.name
                  }
                />
              )}
            />
          </Box>
        </Grid>
        <Grid marginX={0.5} item>
          <DeleteTask />
        </Grid>
        <Grid marginX={0.5} item>
          <Box
            style={{
              backgroundColor: "#fafafa",
              width: "160px",
              marginLeft: "20px",
            }}
          >
            {/* <SearchBox></SearchBox> */}
          </Box>
        </Grid>
      </Grid>
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
          <Paper className="tsk-container">
            <TableContainer sx={{ borderRadius: 2 }}>
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
                              projects?.projects?.find(
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
    </Grid>
  );
};
export default Tasks;
