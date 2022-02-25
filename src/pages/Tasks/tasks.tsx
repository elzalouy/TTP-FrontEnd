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
import IMAGES from "../../assets/img/index";
import SearchBox from "../../components/SearchBox";
import DeleteTask from "./DeleteTask";
import "./tasks.css";
const cellsData = [
  {
    id: 1,
    status: "Shared",
    taskName: "Lorem ipsum dolor sit amet",
    projectName: "Lindsey Stroud",
    version: 3,
    briefDate: "Dec 14, 2018",
    deadLine: "Dec 14, 2018",
  },
  {
    id: 2,
    status: "Ended",
    taskName: "Lorem ipsum dolor sit amet",
    projectName: "Lindsey Stroud",
    version: 3,
    briefDate: "Dec 14, 2018",
    deadLine: "Dec 14, 2018",
  },
  {
    id: 3,
    status: "Done",
    taskName: "Lorem ipsum dolor sit amet",
    projectName: "Lindsey Stroud",
    version: 3,
    briefDate: "Dec 14, 2018",
    deadLine: "Dec 14, 2018",
  },
  {
    id: 4,
    status: "Done",
    taskName: "Lorem ipsum dolor sit amet",
    projectName: "Lindsey Stroud",
    version: 3,
    briefDate: "Dec 14, 2018",
    deadLine: "Dec 14, 2018",
  },
  {
    id: 5,
    status: "Shared",
    taskName: "Lorem ipsum dolor sit amet",
    projectName: "Lindsey Stroud",
    version: 3,
    briefDate: "Dec 14, 2018",
    deadLine: "Dec 14, 2018",
  },
  {
    id: 6,
    status: "Ended",
    taskName: "Lorem ipsum dolor sit amet",
    projectName: "Lindsey Stroud",
    version: 3,
    briefDate: "Dec 14, 2018",
    deadLine: "Dec 14, 2018",
  },
  {
    id: 7,
    status: "Shared",
    taskName: "Lorem ipsum dolor sit amet",
    projectName: "Lindsey Stroud",
    version: 3,
    briefDate: "Dec 14, 2018",
    deadLine: "Dec 14, 2018",
  },
  {
    id: 8,
    status: "Done",
    taskName: "Lorem ipsum dolor sit amet",
    projectName: "Lindsey Stroud",
    version: 3,
    briefDate: "Dec 14, 2018",
    deadLine: "Dec 14, 2018",
  },
  {
    id: 9,
    status: "Ended",
    taskName: "Lorem ipsum dolor sit amet",
    projectName: "Lindsey Stroud",
    version: 3,
    briefDate: "Dec 14, 2018",
    deadLine: "Dec 14, 2018",
  },
];

type Props = {};
const tasks: React.FC<Props> = () => {
  return (
    <Box className="tasks-page" sx={{ backgroundColor: "#FAFAFB" }}>
      <Typography variant="h2" className="tsk-header">
        Tasks
      </Typography>
      <Box className="tasks-settings">
        <Box className="tasks-option">
          <label>Date:</label>
          <select className="select-filter" name="color">
            <option value="Due Date">Due Date</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </Box>

        <Box className="tasks-option">
          <label>Status:</label>
          <select
            style={{ width: "50px" }}
            className="select-filter"
            name="color"
          >
            <option value="All">All</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </Box>

        <Box className="tasks-option">
          <label style={{ width: "110px" }}>Project Manager:</label>
          <select className="select-filter" name="color">
            <option value="Nawaf M">Nawaf M</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </Box>
        <Box className="tasks-option">
          <label>Clients:</label>
          <select
            style={{ width: "50px" }}
            className="select-filter"
            name="color"
          >
            <option value="All">All</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </Box>
        <Box className="tasks-option">
          <label>Project:</label>
          <select
            style={{ width: "50px" }}
            className="select-filter"
            name="color"
          >
            <option value="All">All</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </Box>
        <Box className="tasks-option">
          <label>Teams:</label>
          <select
            style={{ width: "50px" }}
            className="select-filter"
            name="color"
          >
            <option value="All">All</option>
            <option value="option 2">Option 2</option>
            <option value="option 3">Option 3</option>
          </select>
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
                    width: "500px",
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
                    width: "200px",
                    margin: "0px",
                    paddingRight: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Version
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
              {cellsData.map((cellData) => {
                const {
                  id,
                  status,
                  taskName,
                  projectName,
                  version,
                  briefDate,
                  deadLine,
                } = cellData;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={id}>
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
                          status === "Shared"
                            ? "sharedStatus"
                            : status === "Ended"
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
                      {taskName}
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
                      {projectName}
                    </TableCell>
                    <TableCell align="left">{version}</TableCell>
                    <TableCell align="left">{briefDate}</TableCell>

                    <TableCell
                      style={{
                        color: "#334D6E",
                        width: "160px",
                        margin: "0px",
                        padding: "0px 15px 0px 8px",
                      }}
                      align="left"
                    >
                      {deadLine}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box
        style={{ width: "100%", marginTop: "25px", backgroundColor: "#F1F1F4" }}
        className="filter-icon"
      >
        <img src={IMAGES.progressCircles} alt="sortout" />{" "}
        <Typography style={{ color: "#909090", paddingLeft: "10px" }}>
          Loading More
        </Typography>
      </Box>
    </Box>
  );
};
export default tasks;
