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
import "src/App/App.css";
import _ from "lodash";
import { useHistory } from "react-router";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";
import { checkIndexForLastRow } from "../../../helpers/generalUtils";
import { useDispatch } from "react-redux";
import { ITasksTableProps } from "src/types/components/Table";

const TasksTable: React.FC<ITasksTableProps> = ({
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
  const openProject = (projectId: string | undefined) => {
    if (projectId !== undefined) history.push(`/TasksBoard/${projectId}`);
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
                <TableRow
                  sx={{
                    ":hover": {
                      boxShadow: "0px 5px 15px #0000001A",
                    },
                  }}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={_id}
                >
                  <TableCell
                    style={{
                      color: "#334D6E",
                      width: "20px",
                      margin: "0px",
                      padding: checkIndexForLastRow(index, tasks)
                        ? "12px 8px 12px 8px"
                        : "0px 8px 0px 8px",
                      textTransform: "capitalize",
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
                    onClick={() => openProject(projectId)}
                    align="left"
                    style={{
                      color: "#334D6E",
                      margin: "0px",
                      padding: checkIndexForLastRow(index, tasks)
                        ? "12px 8px 12px 0px"
                        : "0px 8px 0px 0px",
                      textTransform: "capitalize",
                      width: "130px",
                      cursor: projectId !== undefined ? "pointer" : undefined,
                    }}
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
                    onClick={() => openProject(projectId)}
                    align="left"
                    style={{
                      cursor: "pointer",
                      color: "#323C47",
                      width: "300px",
                      margin: "0px",
                      padding:
                        tasks.length - 1 === index
                          ? "12px 0px 12px 50px"
                          : "0px 0px 0px 50px",
                      textTransform: "capitalize",
                      fontWeight: "500",
                    }}
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    onClick={() => openProject(projectId)}
                    style={{
                      color: "#707683",
                      width: "300px",
                      margin: "0px",
                      padding:
                        tasks.length - 1 === index
                          ? "12px 0px 12px 8px"
                          : "0px 0px 0px 8px",
                      textTransform: "capitalize",
                      cursor: "pointer",
                    }}
                    align="left"
                  >
                    {projectId !== undefined ? (
                      projects.find((project) => project._id === projectId)
                        ?.name
                    ) : (
                      <div
                        className="endedStatus"
                        style={{ width: "fit-content" }}
                      >
                        Un Assigned
                      </div>
                    )}
                  </TableCell>
                  <TableCell
                    onClick={() => openProject(projectId)}
                    align="left"
                    style={{ color: "#707683", cursor: "pointer" }}
                  >
                    {start !== null
                      ? moment(start).format("MMMM Do, YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell
                    onClick={() => openProject(projectId)}
                    style={{
                      color: "#707683",
                      width: "160px",
                      margin: "0px",
                      padding:
                        tasks.length - 1 === index
                          ? "12px 15px 12px 8px"
                          : "0px 15px 0px 8px",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
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
