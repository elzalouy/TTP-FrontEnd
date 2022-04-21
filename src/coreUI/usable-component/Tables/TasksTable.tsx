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
import _ from "lodash";
interface TasksTableProps {
  tasks: Task[];
  projects: Project[];
  selects: any[];
  setAllSelected: (value: any) => any;
}

const TasksTable: React.FC<TasksTableProps> = ({
  tasks,
  projects,
  selects,
  setAllSelected,
}) => {
  const [select, setSelected] = React.useState(false);
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
  console.log(tasks);
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
              <Checkbox
                onChange={(e, checked) => {
                  setSelected(checked);
                  if (checked) setAllSelected(tasks?.map((item) => item._id));
                  else setAllSelected([]);
                }}
                className="col-grey"
                color="primary"
              />
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
          {tasks &&
            tasks?.map((item) => {
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
                    <Checkbox
                      checked={
                        select || selects.findIndex((i) => i === _id) >= 0
                      }
                      onChange={(e, checked) =>
                        setSingleSelect(`${_id}`, checked)
                      }
                      className="col-grey"
                      color="primary"
                    />
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
                      color: "#323C47",
                      width: "300px",
                      margin: "0px",
                      padding: "0px 0px 0px 15px",
                    }}
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#707683",
                      width: "300px",
                      margin: "0px",
                      padding: "0px 0px 0px 8px",
                    }}
                    align="left"
                  >
                    {
                      projects.find((project) => project._id === projectId)
                        ?.name
                    }
                  </TableCell>
                  <TableCell align="left" style={{ color: "#707683" }}>
                    {new Date(start).toDateString()}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#707683",
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
