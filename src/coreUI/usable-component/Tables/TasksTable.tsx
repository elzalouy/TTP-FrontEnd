import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";
import { Project, Task } from "../../../redux/Projects";

interface TasksTableProps {
  tasks: Task[] | null;
  projects: Project[];
}

const TasksTable: React.FC<TasksTableProps> = (props) => {
  return (
    <TableContainer sx={{ backgroundColor: "#FFFFFF", borderRadius: 2 }}>
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
          {props?.tasks &&
            props.tasks?.map((item) => {
              const { _id, status, name, projectId, start, deadline } = item;
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
                      props.projects.find(
                        (project) => project._id === projectId
                      )?.name
                    }
                  </TableCell>
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
  );
};

export default TasksTable;
