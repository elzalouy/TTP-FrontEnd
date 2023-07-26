import {
  Box,
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import "../../../TasksListView/Read/TasksListView.css";
import * as React from "react";
import "src/App/App.css";
import _, { orderBy } from "lodash";
import { useHistory } from "react-router";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAppSelector } from "src/models/hooks";
import { selectAllCategories } from "src/models/Categories";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Project, Task } from "src/types/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { selectAllProjects } from "src/models/Projects";
import TablePaginationActions from "src/coreUI/components/Tables/TablePaginationActions";
import { getTaskJournies } from "src/helpers/generalUtils";
import { getJourneyLeadTime, getMeetingDeadline } from "../../utils";
import { Journies } from "src/types/views/Statistics";

interface HeadCell {
  id: string;
  label: string;
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
  },
  {
    id: "lastBrief",
    label: "Last Brief",
  },
  {
    id: "_ofProjects",
    label: "# of Projects",
  },
  {
    id: "_OfJournies",
    label: "# of journies",
  },
  {
    id: "averageTOD",
    label: "Average TOD",
  },
  {
    id: "revision",
    label: "Revision %",
  },
  {
    id: "meetDeadline",
    label: "Meet Deadline",
  },
];

const TrackClientHealthTable = () => {
  const history = useHistory();
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const categories = useAppSelector(selectAllCategories);
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const clients = useAppSelector(selectAllClients);

  const [state, setState] = React.useState<{
    loading: boolean;
    page: number;
    rowsPerPage: number;
    order: Order;
    orderBy: string;
    clients: Client[];
    projects: Project[];
    tasks: Task[];
    cells: {
      clientId: string;
      clientName: string;
      lastBrief: string;
      _ofProjects: number;
      _OfJournies: number;
      averageTOD: string;
      revision: number;
      meetDeadline: number;
    }[];
  }>({
    loading: true,
    page: 0,
    rowsPerPage: 8,
    order: Order.asc,
    orderBy: "name",
    tasks: [],
    projects: [],
    clients: [],
    cells: [],
  });

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
    State.cells = clients.map((item) => {
      let {
        lastBrief,
        _ofProjects,
        _OfJournies,
        meetDeadline,
        averageTOD,
        revision,
      } = getClientTrack(item._id);
      let lastBriefDate = new Date(lastBrief);
      let localLastBriefDate = lastBriefDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      let totalDays = Math.floor(averageTOD / 24);
      let totalHours = Math.floor(averageTOD % 24);
      return {
        clientId: item._id ?? "",
        clientName: item.clientName,
        meetDeadline,
        lastBrief: localLastBriefDate,
        averageTOD: `${totalDays} Days, ${totalHours} Hours`,
        _OfJournies,
        _ofProjects,
        revision,
      };
    });
    setState(State);
  }, [allTasks, projects, categories, clients]);

  React.useEffect(() => {
    if (
      state.cells.length === clients.length &&
      state.cells[state.cells.length - 1] &&
      state.cells[state.cells.length - 1].lastBrief !== "Invalid Date"
    )
      setState({ ...state, loading: false });
  }, [state.cells]);

  const getClientTrack = (clientId: string) => {
    setState({ ...state, loading: true });
    let projectIds: string[],
      tasks,
      orderedTasks,
      journies: {
        id: string;
        name: string;
        journies: Journies;
      }[],
      clientJournies,
      tlts,
      averageTOD,
      revisionJournies,
      revision,
      meetDeadlineResult;
    projectIds = projects
      .filter((i: Project) => i.clientId === clientId)
      .map((i: Project) => i._id);
    tasks = allTasks.filter((item: Task) =>
      projectIds.includes(item.projectId)
    );
    orderedTasks = _.orderBy(tasks, "createdAt");

    journies = tasks.map((i) => getTaskJournies(i));
    clientJournies = _.flattenDeep(journies.map((i) => i.journies));
    tlts = clientJournies.map((item) => getJourneyLeadTime(item));
    averageTOD =
      _.sum(tlts) > 0 ? Math.floor(_.sum(tlts) / journies.length) : 0;

    meetDeadlineResult = getMeetingDeadline(clientJournies);
    const meet = Math.floor(
      (meetDeadlineResult.notPassedDeadline.length / clientJournies.length) *
        100
    );
    revisionJournies = journies.filter((i) => i.journies.length > 1);
    revision = Math.floor((revisionJournies.length / journies.length) * 100);
    return {
      lastBrief: orderedTasks[orderedTasks.length - 1]?.createdAt,
      _ofProjects: projectIds.length,
      _OfJournies: clientJournies.length,
      meetDeadline: meet,
      averageTOD,
      revision,
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

  const createSortHandler = (e: any, orderBy: string) => {
    const isAsc = state.orderBy === orderBy && state.order === Order.asc;
    const order = isAsc ? "desc" : "asc";
    setState({
      ...state,
      orderBy: orderBy,
      order: Order[order],
      cells: _.orderBy(state.cells, [orderBy], order),
    });
  };

  return (
    <TableContainer
      sx={{ backgroundColor: "#FFFFFF", borderRadius: 2 }}
      className="customScrollBar"
    >
      <Typography fontSize={18} mb={1} p={2} fontWeight={"600"}>
        Client Health Tracker
      </Typography>
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
                      <>{lastBrief}</>
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
                      <>{averageTOD}</>
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
                      <>{revision ?? 0} %</>
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
                      <>{meetDeadline} %</>
                    )}
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
    </TableContainer>
  );
};

export default TrackClientHealthTable;
