import "src/views/TasksListView/Read/TasksListView.css";
import * as React from "react";
import "src/App/App.css";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import { useAppSelector } from "src/models/hooks";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { selectAllClients } from "src/models/Clients";
import { selectAllProjects } from "src/models/Projects";
import TablePaginationActions from "src/coreUI/components/Tables/TablePaginationActions";
import { getTaskJournies } from "src/helpers/generalUtils";
import IMAGES from "src/assets/img/Images";
import FiltersBar from "./FilterMenu";
import _ from "lodash";
import TableLoading from "src/coreUI/components/Loading/TableLoading";
import ClientTableRow from "./ClientTableRow";
import { selectStatisticsFilterDefaults } from "src/models/Statistics";
import {
  selectAllCategories,
  selectSubCategories,
} from "src/models/Categories";
import {
  Order,
  TeableHeaderCells,
  stateType,
} from "src/types/views/ClientHealth";
import OrganizationRow from "./Organization";
import {
  onDownloadTasksFile,
  setTableRows,
  setTableOrganizationRow,
} from "./utils";
import { selectPMs } from "src/models/Managers";
import { selectRole } from "src/models/Auth";
import { ITaskInfo } from "src/types/views/Statistics";
import { useLocation } from "react-router";

const TrackClientHealthTable = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const subCategories = useAppSelector(selectSubCategories);
  const categories = useAppSelector(selectAllCategories);
  const clients = useAppSelector(selectAllClients);
  const managers = useAppSelector(selectPMs);
  const { date, boards } = useAppSelector(selectStatisticsFilterDefaults);
  const role = useAppSelector(selectRole);
  const location = useLocation();

  /**
   * First DOM changing (in case of loading allTasks, projects, clients, managers)
   * 1. Getting all clients data
   * 2. Getting all Tasks data
   * 3. Building the journies based on movements
   * 4. Calculating the other columns (revision, tod, no_of_active, meeting_deadline)
   * Second DOM changing (in case of filteration by any filter input,)
   * 1. Change the state (allTasks, allJournies, allProjects will not be changed) but (tasks, journies, and projects will be changed)
   * 2. Step 4 in first DOM changing.
   */
  const [state, setState] = React.useState<stateType>({
    popup: false,
    loading: true,
    page: 0,
    rowsPerPage: 8,
    order: Order.asc,
    orderBy: "lastBrief",
    tasks: [],
    allProjects: [],
    allTasks: [],
    projects: [],
    clients: [],
    cells: [],
    allJournies: [],
    journies: [],
    organization: {
      lastBrief: 0,
      _ofProjects: 0,
      averageTOD: 0,
      _OfRevision: 0,
      meetDeadline: 0,
      _OfTasks: 0,
      _OfActive: 0,
      journies: 0,
    },
    filter: {
      startDate: null,
      endDate: null,
      categories: [],
      subCategories: [],
    },
  });

  React.useEffect(() => {
    if (allTasks.length > 0 && projects.length > 0) {
      let State = { ...state };
      let tasks = allTasks.filter((task) => {
        if (boards.includes(task.boardId)) {
          if (
            task.cardCreatedAt &&
            new Date(task.cardCreatedAt).getTime() >= date.getTime()
          ) {
            return task;
          } else if (
            task.createdAt &&
            new Date(task.createdAt).getTime() >= date.getTime()
          )
            return task;
        }
      });
      let tasksInfo: ITaskInfo[] = _.orderBy(
        tasks.map((i) => {
          let p = projects.find((p) => p._id === i.projectId);
          return {
            ...i,
            clientId: p?.clientId,
            clientName: clients.find((i) => i._id === p?.clientId)?.clientName,
            projectManager: p?.projectManager,
            projectManagerName: managers.find(
              (pm) => pm._id === p?.projectManager
            ),
            categoryName: categories.find((c) => c._id === i.categoryId)
              ?.category,
            projectName: p?.name,
            subCategoryName: subCategories.find(
              (s) => s._id === i.subCategoryId
            )?.subCategory,
          };
        }),
        "cardCreatedAt",
        "asc"
      );
      let journies = tasksInfo.map((i) => getTaskJournies(i));
      // setting the tasks info.
      State.projects = State.allProjects = [...projects];
      State.tasks = State.allTasks = tasksInfo;
      State.journies = State.allJournies = journies;
      State = setTableOrganizationRow(State);
      State = setTableRows(State, clients, subCategories);
      setState(State);
    }
  }, [allTasks, projects, date, boards, clients]);

  React.useEffect(() => {
    if (state.allTasks.length > 0 && state.allProjects.length > 0) {
      let State = { ...state };
      State = setTableOrganizationRow(State);
      State = setTableRows(State, clients, subCategories);
      setState(State);
    }
  }, [
    state.filter.categories,
    state.filter.subCategories,
    state.filter.startDate,
    state.filter.endDate,
  ]);

  const emptyRows =
    state.page > 0
      ? Math.max(0, (1 + state.page) * state.rowsPerPage - state.cells.length)
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

  const createSortHandler = (
    orderBy:
      | "clientName"
      | "lastBrief"
      | "_ofProjects"
      | "meetDeadline"
      | "averageTOD"
      | "_OfTasks"
      | "_OfActive"
      | "_OfRevision",
    type: string
  ) => {
    const order =
      state.orderBy !== orderBy
        ? "asc"
        : state.order === Order.asc
        ? "desc"
        : "asc";
    let State = { ...state };
    State.orderBy = orderBy;
    State.order = Order[order];
    State.cells = _.orderBy(State.cells, (i) => i[orderBy], order);
    setState(State);
  };

  const onSetFilter = (type: string, value: any) => {
    let State = { ...state };
    if (type === "startDate") State.filter.startDate = value;
    if (type === "endDate") State.filter.endDate = value;
    if (type === "categories") State.filter.categories = value;
    if (type === "subCategories") State.filter.subCategories = value;
    setState(State);
  };

  return (
    <Grid
      className="customScrollBar"
      sx={{
        display: "flex",
        background: "white",
        borderRadius: "5px",
        margin: "8px",
        pl: 1,
        pr: 1,
        pt: 1,
        marginBottom: 2,
        justifyContent: "space-between",
      }}
      container
    >
      <Grid xs={8}>
        <Typography fontSize={18} mb={1} p={2} fontWeight={"600"}>
          Client Health Tracker
        </Typography>
      </Grid>
      <Grid xs={2}>
        <IconButton
          disableRipple
          onClick={() => setState({ ...state, popup: true })}
          sx={filterBtnStyle}
        >
          <img src={IMAGES.filtericon} alt="FILTER" />
        </IconButton>
        {["OM", "SM", undefined].includes(role) && (
          <Grid item>
            <form ref={formRef}>
              <IconButton
                type="button"
                onClick={() => onDownloadTasksFile(state.tasks, formRef)}
                sx={{
                  bgcolor: "#fafafb",
                  borderRadius: 3,
                  float: "right",
                  cursor: "pointer",
                  width: "38px",
                  height: "38px",
                }}
                disableRipple
              >
                <DownloadIcon htmlColor="black"></DownloadIcon>
              </IconButton>
            </form>
          </Grid>
        )}
      </Grid>
      <Table style={{ width: "100%", overflowX: "scroll" }}>
        <TableHead>
          <TableRow>
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
                    height: "40px",
                  }}
                  sortDirection={
                    state.orderBy === headCell.id
                      ? state.order === Order.asc
                        ? "asc"
                        : "desc"
                      : undefined
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
                        state.order === Order.asc ? (
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
                      state.orderBy === headCell.id
                        ? state.order === Order.asc
                          ? "asc"
                          : "desc"
                        : "asc"
                    }
                    onClick={(e) =>
                      createSortHandler(headCell.id, headCell.type)
                    }
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
            <OrganizationRow
              organization={state.organization}
              loading={state.loading}
            />
            {state.loading ? (
              <TableLoading rows={3} columns={8} name="client-health-tracker" />
            ) : (
              <>
                {(state.rowsPerPage > 0
                  ? state.cells.slice(
                      state.page * state.rowsPerPage,
                      state.page * state.rowsPerPage + state.rowsPerPage
                    )
                  : state.cells
                ).map((item, index) => {
                  const {
                    clientId,
                    clientName,
                    _OfActive,
                    meetDeadline,
                    lastBrief,
                    averageTOD,
                    _OfRevision,
                    _ofProjects,
                    _OfTasks,
                    journies,
                  } = item;
                  let lastBriefDate = new Date(lastBrief);
                  let localLastBriefDate = lastBriefDate.toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  );
                  let totalDays =
                    averageTOD > 0 ? Math.floor(averageTOD / journies / 24) : 0;
                  let totalHours =
                    averageTOD > 0
                      ? Math.floor((averageTOD / journies) % 24)
                      : 0;

                  return (
                    <ClientTableRow
                      clientId={clientId}
                      loading={state.loading}
                      clientName={clientName}
                      lastBrief={lastBrief}
                      localLastBriefDate={localLastBriefDate}
                      _ofProjects={_ofProjects}
                      _OfActive={_OfActive}
                      _OfTasks={_OfTasks}
                      _OfRevision={_OfRevision}
                      totalDays={totalDays}
                      totalHours={totalHours}
                      meetDeadline={meetDeadline}
                      journies={journies}
                    />
                  );
                })}
              </>
            )}
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
              count={state.cells.length}
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
      <FiltersBar
        start={state.filter.startDate}
        end={state.filter.endDate}
        onSetFilter={onSetFilter}
        filterPopup={state.popup}
        closeFilterPopup={() => setState({ ...state, popup: false })}
      />
    </Grid>
  );
};

export default TrackClientHealthTable;
const filterBtnStyle = {
  bgcolor: "#FAFAFB",
  borderRadius: 3,
  paddingTop: 1.2,
  float: "right",
  cursor: "pointer",
  width: "38px",
  height: "38px",
  textAlign: "center",
  marginX: 1,
};
