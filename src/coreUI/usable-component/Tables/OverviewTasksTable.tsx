import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";

import "../../../pages/TasksListView/TasksListView.css";
import * as React from "react";
import _ from "lodash";
import { RouteComponentProps, useHistory } from "react-router";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";
import { checkIndexForLastRow } from "../../../helpers/generalUtils";
import Status from "../Typos/Status";
import { Project, Task } from "../../../interfaces/models/Projects";
interface OverviewTasksTableProps {
  tasks?: Task[] | null;
  projects: Project[];
  selects: any[];
  setAllSelected: (value: any) => any;
}
const cssHeadTableCell: any = {
  color: "#9FA1AB",
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
  const css = Style();
  return (
    <Paper className={css.Paper}>
      <TableContainer
        sx={{ backgroundColor: "#FFFFFF", borderRadius: 2 }}
        className={css.tableContainer + " " + "customScrollBar"}
      >
        <Table stickyHeader={true} style={{ borderRadius: 3 }}>
          <TableHead style={{ position: "relative", top: 0, zIndex: 1 }}>
            <TableRow
              sx={{ borderBottom: "2px solid #FAFAFB;", paddingTop: 2 }}
            >
              <TableCell style={cssHeadTableCell}>Status</TableCell>
              <TableCell style={cssHeadTableCell}>Task Name</TableCell>
              <TableCell style={cssHeadTableCell}>Project Name</TableCell>
              <TableCell style={cssHeadTableCell}>Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks &&
              tasks?.map((item, index) => {
                const { _id, status, name, projectId, start, deadline } = item;
                return (
                  <>
                    <TableRow
                      hover
                      role="checkbox"
                      sx={{ borderBottom: "2px solid #FAFAFB;" }}
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell align="left" className={css.Cell}>
                        <Status status={status} />
                      </TableCell>
                      <TableCell
                        onClick={() => history.push(`/TasksBoard/${projectId}`)}
                        className={css.Cell}
                      >
                        {name}
                      </TableCell>
                      <TableCell className={css.Cell} align="left">
                        {
                          projects.find((project) => project._id === projectId)
                            ?.name
                        }
                      </TableCell>
                      <TableCell className={css.Cell} align="left">
                        {deadline === null || deadline === ""
                          ? "-"
                          : moment(deadline).format("MMMM Do, YYYY")}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OverviewTasksTable;
const Style = makeStyles((theme: any) => ({
  Paper: {
    overFlow: "hidden",
  },
  Cell: {
    color: "#334D6E",
    margin: "0px",
    padding: "20px",
    textTransform: "capitalize",
    width: "130px",
    align: "left",
  },
  tableContainer: {
    maxHeight: "300px",
    overflow: "scroll",
    padding: 0,
  },
}));
