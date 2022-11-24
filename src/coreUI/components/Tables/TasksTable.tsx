import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
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
import TablePaginationActions from "./TablePagination";
import { useAppSelector } from "src/models/hooks";
import { getAllCategories, selectAllCategories } from "src/models/Categories";
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
  const categories = useAppSelector(selectAllCategories);
  const [state, setState] = React.useState({
    page: 0,
    rowsPerPage: 5,
  });

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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    state.page > 0
      ? Math.max(0, (1 + state.page) * state.rowsPerPage - tasks.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setState({ ...state, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log({ rowsPerPage: parseInt(event.target.value, 10) });
    let newState = { ...state };
    newState.page = 0;
    newState.rowsPerPage = parseInt(event.target.value, 10);
    setState({ ...newState });
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
              Category
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
          <>
            {(state.rowsPerPage > 0
              ? tasks.slice(
                  state.page * state.rowsPerPage,
                  state.page * state.rowsPerPage + state.rowsPerPage
                )
              : tasks
            ).map((item, index) => {
              const {
                _id,
                status,
                name,
                projectId,
                start,
                deadline,
                categoryId,
              } = item;
              return (
                <TableRow
                  sx={{
                    ":hover": {
                      backgroundColor: "white !important",
                      boxShadow: "0px 10px 20px #0000001A",
                      transition: "all 0.5s ease-out !important",
                      WebkitAppearance: "none",
                      WebkitBoxShadow: "0px 10px 20px #0000001A",
                      borderBottom: 0,
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
                        status === "In Progress"
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
                      {status === "In Progress" ? "In Progress" : status}
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
                    style={{
                      color: "#707683",
                      cursor: "pointer",
                    }}
                  >
                    {
                      categories.find((item) => item._id === categoryId)
                        ?.category
                    }
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
          </>
          <>
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              sx={{
                ".MuiTablePagination-toolbar": { height: "40px !important" },
              }}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={tasks.length}
              rowsPerPage={state.rowsPerPage}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              page={state.page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
