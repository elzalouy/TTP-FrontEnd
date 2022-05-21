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
import { RouteComponentProps, useHistory } from "react-router";
import moment from "moment";
import { useMediaQuery,useTheme } from "@mui/material";
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
    <TableContainer sx={{ backgroundColor: "#FFFFFF", borderRadius: 2 }}>
      <Table style={MD? {width:"150%"} : {width:"100%"}}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                color:"#334D6E",
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
                color:"#334D6E",
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
                color:"#334D6E",
                width: "300px",
                margin: "0px",
                padding: "0px 0px 0px 15px",
                fontWeight: "normal",
              }}
            >
              Task Name
            </TableCell>
            <TableCell
              style={{
                color:"#334D6E",
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
                color:"#334D6E",
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
                color:"#334D6E",
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
                    align="left"
                    style={{
                      color: "#334D6E",
                      width: "30px",
                      margin: "0px",
                      padding: "0px 8px 0px 0px",
                      textTransform: "capitalize",
                    }}
                  >
                    <div
                      className={
                        status === "inProgress"
                          ? "inProgressStatus"
                          : status === "review"
                          ? "reviewStatus"
                          : status === "not clear" 
                          ? "notClearStatus" 
                          : status === "not started"
                          ? "notStartedStatus" 
                          : status === "done"
                          ? "doneStatus" 
                          : status === "shared" 
                          ? "sharedStatus" 
                          : "endedStatus"
                      }
                    >
                      {status}
                    </div>
                  </TableCell>
                  <TableCell
                    onClick={() => history.push(`/TasksBoard/${projectId}`)}
                    align="left"
                    style={{
                      cursor: "pointer",
                      color: "#323C47",
                      width: "300px",
                      margin: "0px",
                      padding: "0px 0px 0px 15px",
                      textTransform: "capitalize",
                      fontWeight:"500"
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
                      textTransform: "capitalize",
                    }}
                    align="left"
                  >
                    {
                      projects.find((project) => project._id === projectId)
                        ?.name
                    }
                  </TableCell>
                  <TableCell align="left" style={{ color: "#707683" }}>
                    {start !== null ? moment(start).format('MMMM Do, YYYY') : "-"}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#707683",
                      width: "160px",
                      margin: "0px",
                      padding: "0px 15px 0px 8px",
                      textTransform: "capitalize",
                    }}
                    align="left"
                  >
                    {deadline !== null ? moment(deadline).format('MMMM Do, YYYY') : "-"}
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
