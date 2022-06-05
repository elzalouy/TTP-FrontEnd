import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../../pages/TasksListView/TasksListView.css";
import * as React from "react";
import { Project, Task } from "../../../redux/Projects";
import _ from "lodash";
import { RouteComponentProps, useHistory } from "react-router";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";
import { checkIndexForLastRow } from "../../../helpers/generalUtils";
interface OverviewTasksTableProps {
  tasks: Task[];
  projects: Project[];
  selects: any[];
  setAllSelected: (value: any) => any;
}
const cssHeadTableCell: any = {
  color: "#334D6E",
  width: "30px",
  margin: "0px",
  padding: "12px 8px 12px 20px",
  fontWeight: "normal",
};

const OverviewTasksTable: React.FC<OverviewTasksTableProps> = ({
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
      <Table style={{ width: MD ? "150%" : "100%", borderRadius: 3 }}>
        <TableHead>
          <TableRow sx={{ borderBottom: "2px solid #FAFAFB;", paddingTop: 2 }}>
            <TableCell style={cssHeadTableCell}>Status</TableCell>
            <TableCell style={cssHeadTableCell}>Task Name</TableCell>
            <TableCell style={cssHeadTableCell}>Project Name</TableCell>
            <TableCell style={cssHeadTableCell}>Deadline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            tasks?.map((item, index) => {
              const cssCell: any = {
                color: "#334D6E",
                margin: "0px",
                padding: "20px",
                textTransform: "capitalize",
                width: "130px",
                align: "left",
              };
              const { _id, status, name, projectId, start, deadline } = item;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ borderBottom: "2px solid #FAFAFB;" }}
                  tabIndex={-1}
                  key={_id}
                >
                  <TableCell align="left" style={cssCell}>
                    <div
                      className={
                        status === "inProgress"
                          ? "inProgressStatus"
                          : status === "Review"
                          ? "reviewStatus"
                          : status === "Not Clear"
                          ? "notClearStatus"
                          : status === "Not Started"
                          ? "notStartedStatus"
                          : status === "Done"
                          ? "doneStatus"
                          : status === "Shared"
                          ? "sharedStatus"
                          : "endedStatus"
                      }
                    >
                      {status === "inProgress" ? "In Progress" : status}
                    </div>
                  </TableCell>
                  <TableCell
                    onClick={() => history.push(`/TasksBoard/${projectId}`)}
                    style={cssCell}
                  >
                    {name}
                  </TableCell>
                  <TableCell style={cssCell} align="left">
                    {
                      projects.find((project) => project._id === projectId)
                        ?.name
                    }
                  </TableCell>
                  <TableCell style={cssCell} align="left">
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

export default OverviewTasksTable;
