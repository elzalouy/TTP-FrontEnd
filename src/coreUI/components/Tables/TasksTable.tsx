import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../../views/TasksListView/Read/TasksListView.css";
import * as React from "react";
import "../../../App.css";
import { ProjectsActions } from "../../../models/Projects";
import _ from "lodash";
import { RouteComponentProps, useHistory } from "react-router";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";
import { checkIndexForLastRow } from "../../../helpers/generalUtils";
import { useDispatch } from "react-redux";
import { toggleViewTaskPopup } from "../../../models/Ui";
import { Project, Task } from "../../../types/models/Projects";
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
  const history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
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

  return (
    <TableContainer
      sx={{ backgroundColor: "#FFFFFF", borderRadius: 2 }}
      className="customScrollBar"
    >
      <Table style={MD ? { width: "150%" } : { width: "100%" }}>
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
                fontWeight: "normal",
              }}
            >
              Status
            </TableCell>
            <TableCell
              style={{
                color: "#334D6E",
                width: "300px",
                margin: "0px",
                padding: "0px 0px 0px 50px",
                fontWeight: "normal",
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
                fontWeight: "normal",
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
                fontWeight: "normal",
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
                fontWeight: "normal",
              }}
            >
              Deadline
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            tasks?.map((item, index) => {
              const { _id, status, name, projectId, start, deadline } = item;

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={_id}>
                  <TableCell
                    style={
                      checkIndexForLastRow(index, tasks)
                        ? {
                            color: "#334D6E",
                            width: "20px",
                            margin: "0px",
                            padding: "12px 8px 12px 8px",
                            textTransform: "capitalize",
                          }
                        : {
                            color: "#334D6E",
                            width: "20px",
                            margin: "0px",
                            padding: "0px 8px 0px 8px",
                            textTransform: "capitalize",
                          }
                    }
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
                    style={
                      checkIndexForLastRow(index, tasks)
                        ? {
                            color: "#334D6E",
                            margin: "0px",
                            padding: "12px 8px 12px 0px",
                            textTransform: "capitalize",
                            width: "130px",
                            cursor: "pointer",
                          }
                        : {
                            color: "#334D6E",
                            margin: "0px",
                            padding: "0px 8px 0px 0px",
                            textTransform: "capitalize",
                            width: "130px",
                            cursor: "pointer",
                          }
                    }
                  >
                    <div
                      className={
                        status === "inProgress"
                          ? "inProgressStatus"
                          : status === "Review"
                          ? "reviewStatus"
                          : status === "Not Clear"
                          ? "notClearStatus"
                          : status === "Tasks Board"
                          ? "notStartedStatus"
                          : status === "Done"
                          ? "doneStatus"
                          : status === "Shared"
                          ? "sharedStatus"
                          : "endedStatus"
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {status === "inProgress" ? "In Progress" : status}
                    </div>
                  </TableCell>
                  <TableCell
                    onClick={() => history.push(`/TasksBoard/${projectId}`)}
                    align="left"
                    style={
                      checkIndexForLastRow(index, tasks)
                        ? {
                            cursor: "pointer",
                            color: "#323C47",
                            width: "300px",
                            margin: "0px",
                            padding: "12px 0px 12px 50px",
                            textTransform: "capitalize",
                            fontWeight: "500",
                          }
                        : {
                            cursor: "pointer",
                            color: "#323C47",
                            width: "300px",
                            margin: "0px",
                            padding: "0px 0px 0px 50px",
                            textTransform: "capitalize",
                            fontWeight: "500",
                          }
                    }
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    style={
                      checkIndexForLastRow(index, tasks)
                        ? {
                            color: "#707683",
                            width: "300px",
                            margin: "0px",
                            padding: "12px 0px 12px 8px",
                            textTransform: "capitalize",
                          }
                        : {
                            color: "#707683",
                            width: "300px",
                            margin: "0px",
                            padding: "0px 0px 0px 8px",
                            textTransform: "capitalize",
                          }
                    }
                    align="left"
                  >
                    {
                      projects.find((project) => project._id === projectId)
                        ?.name
                    }
                  </TableCell>
                  <TableCell align="left" style={{ color: "#707683" }}>
                    {start !== null
                      ? moment(start).format("MMMM Do, YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell
                    style={
                      checkIndexForLastRow(index, tasks)
                        ? {
                            color: "#707683",
                            width: "160px",
                            margin: "0px",
                            padding: "12px 15px 12px 8px",
                            textTransform: "capitalize",
                          }
                        : {
                            color: "#707683",
                            width: "160px",
                            margin: "0px",
                            padding: "0px 15px 0px 8px",
                            textTransform: "capitalize",
                          }
                    }
                    align="left"
                  >
                    {deadline === null || deadline === ""
                      ? "-"
                      : moment(deadline).format("MMMM Do, YYYY")}
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
