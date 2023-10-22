import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import "../../../views/TasksListView/Read/TasksListView.css";
import * as React from "react";
import "src/App/App.css";
import _ from "lodash";
import { useHistory } from "react-router";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";
import { ITasksTableProps } from "src/types/components/Table";
import TablePaginationActions from "./TablePaginationActions";
import { useAppSelector } from "src/models/hooks";
import { selectAllCategories } from "src/models/Categories";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Task } from "src/types/models/Projects";
import { ProjectsActions, selectAllProjects } from "src/models/Projects";
import { toggleViewTaskPopup } from "src/models/Ui";
import { useDispatch } from "react-redux";

interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
}
type Order = "asc" | "desc";

const TeableHeaderCells: readonly HeadCell[] = [
  {
    id: "status",
    label: "Status",
    numeric: false,
  },
  {
    id: "name",
    label: "Task Name",
    numeric: false,
  },
  {
    id: "projectName",
    label: "Project Name",
    numeric: false,
  },
  {
    id: "categoryName",
    label: "Category",
    numeric: false,
  },
  {
    id: "deadline",
    label: "Deadline",
    numeric: false,
  },
];

const TasksTable: React.FC<ITasksTableProps> = ({
  tasks,
  projects,
  selects,
  setAllSelected,
}) => {
  const { openTaskDetails: task } = useAppSelector(selectAllProjects);
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const [select, setSelected] = React.useState(false);
  const categories = useAppSelector(selectAllCategories);
  const [state, setState] = React.useState<{
    page: number;
    rowsPerPage: number;
    order: Order;
    orderBy: string;
    tasks: Task[];
  }>({
    page: 0,
    rowsPerPage: 8,
    order: "asc",
    orderBy: "name",
    tasks: tasks,
  });

  React.useEffect(() => {
    setState({
      ...state,
      page: 0,
      order: "asc",
      orderBy: "name",
      tasks: _.orderBy(tasks, ["name"], "asc").map((item) => {
        return {
          ...item,
          categoryName: categories.find((cat) => cat._id === item.categoryId)
            ?.category,
          projectName: projects.find(
            (project) => project._id === item.projectId
          )?.name,
        };
      }),
    });
  }, [tasks, projects, categories]);

  const onViewTaskDetails = async (item: Task) => {
    dispatch(ProjectsActions.onOpenTask(item));
    dispatch(toggleViewTaskPopup("flex"));
  };

  const setSingleSelect = (val: string, checked: boolean) => {
    let selected = [...selects];
    if (checked === true) {
      selected.push(val);
    } else {
      selected = selected.filter((item) => item !== val);
      setAllSelected(selected);
    }
    selected = _.uniq(selected);
    setAllSelected(selected);
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
    let newState = { ...state };
    newState.page = 0;
    newState.rowsPerPage = parseInt(event.target.value, 10);
    setState({ ...newState });
  };
  const createSortHandler = (e: any, orderBy: string) => {
    const isAsc = state.orderBy === orderBy && state.order === "asc";
    const order = isAsc ? "desc" : "asc";
    setState({
      ...state,
      orderBy: orderBy,
      order: order,
      tasks: _.orderBy(state.tasks, [orderBy], order),
    });
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
              size="small"
              style={{
                color: "#334D6E",
                width: "20px",
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
            {TeableHeaderCells.map((headCell) => {
              return (
                <TableCell
                  size="small"
                  key={headCell.id}
                  style={{
                    color:
                      state.orderBy === headCell.id ? "#ffc500" : "#334D6E",
                    fontWeight:
                      state.orderBy === headCell.id ? "bold" : "normal",
                    visibility: "visible",
                  }}
                  sortDirection={
                    state.orderBy === headCell.id ? state.order : undefined
                  }
                >
                  <TableSortLabel
                    color="#334D6E"
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                      paddingLeft: "5px",
                      color: "#334D6E",
                      ":hover": {
                        color:
                          headCell.id === state.orderBy ? "black" : "#334D6E",
                      },
                    }}
                    hideSortIcon={false}
                    IconComponent={() =>
                      state.orderBy === headCell.id ? (
                        state.order === "asc" ? (
                          <ArrowDownward
                            sx={{
                              color:
                                state.orderBy === headCell.id
                                  ? "black"
                                  : "#334D6E",
                              fontSize: "14px",
                            }}
                          ></ArrowDownward>
                        ) : (
                          <ArrowUpward
                            sx={{
                              color:
                                state.orderBy === headCell.id
                                  ? "black"
                                  : "#334D6E",
                              fontSize: "14px",
                            }}
                          ></ArrowUpward>
                        )
                      ) : (
                        <ArrowDownward
                          sx={{
                            color: "#334D6E",
                            fontSize: "14px",
                          }}
                        ></ArrowDownward>
                      )
                    }
                    active={state.orderBy === headCell.id}
                    direction={
                      state.orderBy === headCell.id ? state.order : "asc"
                    }
                    onClick={(e) => createSortHandler(e, headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {(state.rowsPerPage > 0
              ? state.tasks.slice(
                  state.page * state.rowsPerPage,
                  state.page * state.rowsPerPage + state.rowsPerPage
                )
              : state.tasks
            ).map((item, index) => {
              const {
                _id,
                status,
                name,
                projectId,
                projectName,
                categoryName,
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
                    size="small"
                    style={{
                      color: "#334D6E",
                      width: "20px",
                      textTransform: "capitalize",
                    }}
                  >
                    <Checkbox
                      checked={selects.find((i) => i === _id) !== undefined}
                      onChange={(e, checked) =>
                        setSingleSelect(`${_id}`, checked)
                      }
                      className="col-grey"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell
                    size="small"
                    onClick={() => onViewTaskDetails(item)}
                    align="left"
                    style={{
                      color: "#334D6E",
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
                      {status}
                    </div>
                  </TableCell>
                  <TableCell
                    size="small"
                    onClick={() => onViewTaskDetails(item)}
                    align="left"
                    style={{
                      cursor: "pointer",
                      color: "#323C47",
                      width: "200px",
                      fontWeight: "500",
                    }}
                  >
                    {name}
                  </TableCell>
                  <TableCell
                    size="small"
                    onClick={() => openProject(projectId)}
                    style={{
                      color: "#707683",
                      width: "200px",
                      textTransform: "capitalize",
                      cursor: "pointer",
                    }}
                    align="left"
                  >
                    {projectName !== undefined ? (
                      projectName
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
                    size="small"
                    onClick={() => onViewTaskDetails(item)}
                    align="left"
                    style={{
                      color: "#707683",
                      cursor: "pointer",
                    }}
                  >
                    {categoryName ? categoryName : "-"}
                  </TableCell>
                  <TableCell
                    size="small"
                    onClick={() => onViewTaskDetails(item)}
                    style={{
                      color: "#707683",
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
              rowsPerPageOptions={[5, 8, 10, 25, { label: "All", value: -1 }]}
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
