import "src/views/TasksListView/Read/TasksListView.css";
import * as React from "react";
import "src/App/App.css";
import { useHistory } from "react-router";
import {
  Grid,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "src/models/hooks";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Project, Task } from "src/types/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { selectAllProjects } from "src/models/Projects";
import TablePaginationActions from "src/coreUI/components/Tables/TablePaginationActions";
import { getTaskJournies } from "src/helpers/generalUtils";
import { getJourneyLeadTime, getMeetingDeadline } from "../Statitics/utils";
import { ITaskInfo, Journies } from "src/types/views/Statistics";
import IMAGES from "src/assets/img/Images";
import FiltersBar from "./FilterMenu";
import _ from "lodash";

interface HeadCell {
  id: any;
  label: string;
  type: string;
}
enum Order {
  "asc",
  "desc",
  false,
}

const TeableHeaderCells: readonly HeadCell[] = [
  {
    id: "clientName",
    label: "Client Name",
    type: "string",
  },
  {
    id: "lastBrief",
    label: "Last Brief",
    type: "number",
  },
  {
    id: "_ofProjects",
    label: "# of Projects",
    type: "number",
  },
  {
    id: "_OfTasks",
    label: "# of Tasks",
    type: "number",
  },
  {
    id: "_OfJournies",
    label: "# of journies",
    type: "number",
  },
  {
    id: "averageTOD",
    label: "Average TOD",
    type: "number",
  },
  {
    id: "revision",
    label: "Revision %",
    type: "number",
  },
  {
    id: "meetDeadline",
    label: "Meet Deadline",
    type: "number",
  },
];

type stateType = {
  popup: boolean;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: string;
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  journeys: { id: string; name: string; journies: Journies }[];
  cells: {
    clientId: string;
    clientName: string;
    lastBrief: number;
    _ofProjects: number;
    _OfJournies: number;
    averageTOD: number;
    revision: number;
    meetDeadline: number;
    _OfTasks: number;
  }[];
  filter: {
    startDate: string | null;
    endDate: string | null;
  };
};

const TrackClientHealthTable = () => {
  const history = useHistory();
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const clients = useAppSelector(selectAllClients);

  const [state, setState] = React.useState<stateType>({
    popup: false,
    loading: true,
    page: 0,
    rowsPerPage: 8,
    order: Order.asc,
    orderBy: "clientName",
    tasks: [],
    projects: [],
    clients: [],
    cells: [],
    journeys: [],
    filter: {
      startDate: null,
      endDate: null,
    },
  });

  React.useEffect(() => {
    if (projects.length > 0 && clients.length > 0 && allTasks.length > 0) {
      let tasks: ITaskInfo[] = allTasks.map((i) => {
        let p = projects.find((p) => p._id === i.projectId);
        return {
          ...i,
          clientId: p?.clientId,
          projectManager: p?.projectManager,
        };
      });
      let journeys = tasks.map((i) => getTaskJournies(i));
      setState({
        ...state,
        clients: clients,
        tasks: allTasks,
        projects: projects,
        journeys: journeys,
      });
    }
  }, [allTasks, projects, clients]);

  React.useEffect(() => {
    let State = {
      ...state,
      page: 0,
      order: Order.asc,
      orderBy: "clientName",
      tasks: allTasks,
      projects: projects,
      clients: clients,
    };
    State.cells = _.orderBy(
      clients.map((item) => {
        let {
          lastBrief,
          _ofProjects,
          _OfJournies,
          meetDeadline,
          averageTOD,
          revision,
          _OfTasks,
        } = getClientTrack(item._id);

        return {
          clientId: item._id ?? "",
          clientName: item.clientName,
          meetDeadline,
          lastBrief: lastBrief,
          averageTOD: averageTOD,
          _OfJournies,
          _ofProjects,
          revision,
          _OfTasks,
        };
      }),
      (i) => i.clientName,
      "asc"
    );
    State.loading = false;
    setState(State);
  }, [state.journeys, state.projects, state.tasks]);

  React.useEffect(() => {
    let State = { ...state };
    if (State.filter.startDate)
      State.projects = projects.filter((i) => {
        let startDate = new Date(i.startDate).getTime();
        if (
          State.filter.startDate &&
          startDate >= new Date(State.filter.startDate).getTime()
        )
          return i;
      });
    if (State.filter.endDate)
      State.projects = projects.filter((i) => {
        let startDate = new Date(i.startDate);
        if (
          State.filter.endDate &&
          startDate.getTime() <= new Date(State.filter.endDate).getTime()
        )
          return i;
      });
    let ids = State.projects.map((i) => i._id);
    State.tasks = State.tasks.filter((i) => ids.includes(i.projectId));
    State.journeys = State.tasks.map((i) => getTaskJournies(i));
  }, [state.filter.startDate, state.filter.endDate]);

  const getClientTrack = (clientId: string) => {
    let projectIds: string[],
      tasks,
      orderedTasks,
      journies: { id: string; name: string; journies: Journies }[],
      clientJournies,
      tlts,
      averageTOD: number,
      revisionJournies,
      revision,
      meetDeadlineResult;
    projectIds = state.projects
      .filter((i: Project) => i.clientId === clientId)
      .map((i: Project) => i._id);
    tasks = state.tasks.filter((item: Task) =>
      projectIds.includes(item.projectId)
    );
    orderedTasks = _.orderBy(tasks, "createdAt");

    journies = tasks.map((i) => getTaskJournies(i));
    clientJournies = _.flattenDeep(journies.map((j) => j.journies));
    tlts = clientJournies.map((item) => getJourneyLeadTime(item));
    averageTOD =
      _.sum(tlts) > 0 ? Math.floor(_.sum(tlts) / journies.length) : 0;

    meetDeadlineResult = getMeetingDeadline(clientJournies);
    const meet = Math.floor(
      (meetDeadlineResult.notPassedDeadline.length / clientJournies.length) *
        100
    );
    revisionJournies = journies.filter((i) => i.journies.length > 1);
    revision =
      Math.floor((revisionJournies.length / journies.length) * 100) ?? 0;
    return {
      lastBrief: new Date(
        orderedTasks[orderedTasks.length - 1]?.createdAt
      ).getTime(),
      _OfTasks: tasks.length,
      _ofProjects: projectIds.length,
      _OfJournies: clientJournies.length,
      meetDeadline: meet >= 0 ? meet : 0,
      averageTOD: averageTOD >= 0 ? averageTOD : 0,
      revision: revision >= 0 ? revision : 0,
    };
  };

  // Avoid a layout jump when reaching the last page with empty rows.
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
      | "lastBrief"
      | "_ofProjects"
      | "_OfJournies"
      | "meetDeadline"
      | "averageTOD"
      | "revision"
      | "_OfTasks",
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

  const onSetFilter = (type: string, value: string) => {
    let State = { ...state };
    let start = type === "startDate" ? value : null;
    let end = type === "endDate" ? value : null;
    if (start) State.filter.startDate = start;
    if (end) State.filter.endDate = end;
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
      <Grid xs={10}>
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
      </Grid>
      <Table style={MD ? { width: "150%" } : { width: "100%" }}>
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
            {state.loading ? (
              [0, 1, 2].map((i) => (
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
                >
                  <TableCell
                    size="small"
                    align="left"
                    style={{
                      color: "#334D6E",
                      textTransform: "capitalize",
                      width: "130px",
                      height: "45px",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                  </TableCell>
                  <TableCell
                    size="small"
                    align="left"
                    style={{
                      cursor: "pointer",
                      color: "#323C47",
                      width: "200px",
                      fontWeight: "500",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                  </TableCell>
                  <TableCell
                    size="small"
                    style={{
                      color: "#707683",
                      width: "200px",
                      textTransform: "capitalize",
                      cursor: "pointer",
                    }}
                    align="left"
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                  </TableCell>
                  <TableCell
                    size="small"
                    align="left"
                    style={{
                      color: "#707683",
                      cursor: "pointer",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                  </TableCell>
                  <TableCell
                    size="small"
                    style={{
                      color: "#707683",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                    align="left"
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                  </TableCell>
                  <TableCell
                    size="small"
                    style={{
                      color: "#707683",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                    align="left"
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                  </TableCell>
                  <TableCell
                    size="small"
                    style={{
                      color: "#707683",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                    align="left"
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={20}
                    />
                  </TableCell>
                </TableRow>
              ))
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
                    revision,
                    meetDeadline,
                    lastBrief,
                    averageTOD,
                    _OfJournies,
                    _ofProjects,
                    _OfTasks,
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
                  let totalDays = Math.floor(averageTOD / 24);
                  let totalHours = Math.floor(averageTOD % 24);

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
                      key={clientId}
                    >
                      <TableCell
                        size="small"
                        align="left"
                        style={{
                          color: "#334D6E",
                          textTransform: "capitalize",
                          width: "130px",
                          height: "45px",
                        }}
                      >
                        {state.loading === true ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={20}
                          />
                        ) : (
                          <div style={{ cursor: "pointer" }}>{clientName}</div>
                        )}
                      </TableCell>
                      <TableCell
                        size="small"
                        align="left"
                        style={{
                          cursor: "pointer",
                          color: "#323C47",
                          width: "200px",
                          fontWeight: "500",
                        }}
                      >
                        {state.loading === true ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={20}
                          />
                        ) : (
                          <>{lastBrief ? localLastBriefDate : ""}</>
                        )}
                      </TableCell>
                      <TableCell
                        size="small"
                        style={{
                          color: "#707683",
                          width: "200px",
                          textTransform: "capitalize",
                          cursor: "pointer",
                        }}
                        align="left"
                      >
                        {state.loading === true ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={20}
                          />
                        ) : (
                          <>{_ofProjects}</>
                        )}
                      </TableCell>
                      <TableCell
                        size="small"
                        align="left"
                        style={{
                          color: "#707683",
                          cursor: "pointer",
                        }}
                      >
                        {state.loading === true ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={20}
                          />
                        ) : (
                          <>{_OfTasks}</>
                        )}
                      </TableCell>
                      <TableCell
                        size="small"
                        align="left"
                        style={{
                          color: "#707683",
                          cursor: "pointer",
                        }}
                      >
                        {state.loading === true ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={20}
                          />
                        ) : (
                          <>{_OfJournies}</>
                        )}
                      </TableCell>
                      <TableCell
                        size="small"
                        style={{
                          color: "#707683",
                          cursor: "pointer",
                          textTransform: "capitalize",
                        }}
                        align="left"
                      >
                        {state.loading === true ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={20}
                          />
                        ) : (
                          <>{`${totalDays} Days, ${totalHours} Hours`}</>
                        )}
                      </TableCell>
                      <TableCell
                        size="small"
                        style={{
                          color: "#707683",
                          cursor: "pointer",
                          textTransform: "capitalize",
                        }}
                        align="left"
                      >
                        {state.loading === true ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={20}
                          />
                        ) : (
                          <>{revision} %</>
                        )}
                      </TableCell>
                      <TableCell
                        size="small"
                        style={{
                          color: "#707683",
                          cursor: "pointer",
                          textTransform: "capitalize",
                        }}
                        align="left"
                      >
                        {state.loading === true ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={20}
                          />
                        ) : (
                          <>{meetDeadline >= 0 ? meetDeadline : 0} %</>
                        )}
                      </TableCell>
                    </TableRow>
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
};
