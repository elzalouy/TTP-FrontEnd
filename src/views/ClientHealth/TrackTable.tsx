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
import TableLoading from "src/coreUI/components/Loading/TableLoading";

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
  tasks: ITaskInfo[];
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
    orderBy: "lastBrief",
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
    let State = { ...state };
    if (projects.length > 0 && clients.length > 0 && allTasks.length > 0) {
      State.tasks = allTasks.map((i) => {
        let p = projects.find((p) => p._id === i.projectId);
        return {
          ...i,
          clientId: p?.clientId,
          projectManager: p?.projectManager,
        };
      });

      State.clients = clients;
      State.projects = projects;
      if (State.filter.startDate) {
        State.projects = State.projects.filter(
          (t) =>
            State.filter.startDate &&
            new Date(t.startDate).getTime() >=
              new Date(State.filter.startDate).getTime()
        );
        let ids = State.projects.map((i) => i._id);
        State.tasks = State.tasks.filter((i) => ids.includes(i.projectId));
      }
      if (State.filter.endDate) {
        State.projects = State.projects.filter(
          (t) =>
            State.filter.endDate &&
            new Date(t.startDate).getTime() <=
              new Date(State.filter.endDate).getTime()
        );
        let ids = State.projects.map((i) => i._id);
        State.tasks = State.tasks.filter((i) => ids.includes(i.projectId));
      }

      let journeys = State.tasks.map((i) => getTaskJournies(i));
      State.journeys = journeys;
      State.cells = _.orderBy(
        clients.map((client) => {
          let clientProjects = State.projects.filter(
            (i) => i.clientId === client._id
          );
          let clientTasks = State.tasks.filter(
            (task) => task.clientId === client._id
          );
          let orderTasks = _.orderBy(clientTasks, "createdAt");
          let clientJourniesPerTask = clientTasks.map((i) =>
            getTaskJournies(i)
          );
          let clientJournies = _.flattenDeep(
            clientJourniesPerTask.map((i) => i.journies)
          );
          let joiurniesLeadTime = clientJournies.map((j) =>
            getJourneyLeadTime(j)
          );
          let averageLeadTime =
            _.sum(joiurniesLeadTime) > 0
              ? Math.floor(_.sum(joiurniesLeadTime) / clientJournies.length)
              : 0;
          let meetingDeadline = Math.floor(
            (getMeetingDeadline(clientJournies).notPassedDeadline.length /
              clientJournies.length) *
              100
          );
          let revisionJournies = clientJourniesPerTask.filter(
            (j) => j.journies.length > 1
          );
          let length = revisionJournies.length;
          let flattenedRevisionJournies =
            _.flattenDeep(revisionJournies.map((i) => i.journies)).length -
            length;
          let revisionPercentage =
            Math.floor(
              (flattenedRevisionJournies / clientJournies.length) * 100
            ) ?? 0;
          return {
            clientId: client._id,
            clientName: client.clientName,
            revision: revisionPercentage > 0 ? revisionPercentage : 0,
            meetDeadline: meetingDeadline > 0 ? meetingDeadline : 0,
            lastBrief: new Date(
              orderTasks[orderTasks.length - 1]?.createdAt
            ).getTime(),
            averageTOD: averageLeadTime > 0 ? averageLeadTime : 0,
            _OfTasks: clientTasks.length,
            _ofProjects: clientProjects.length,
            _OfJournies: clientJournies.length,
          };
        }),
        state.orderBy,
        "desc"
      );
      State.order = Order.desc;
      State.cells = State.cells.filter((i) => i.lastBrief > 0);
      State.loading = false;
      setState(State);
    }
  }, [
    allTasks,
    projects,
    clients,
    state.filter.startDate,
    state.filter.endDate,
  ]);

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
    if (type === "startDate") State.filter.startDate = value;
    if (type === "endDate") State.filter.endDate = value;
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
                          width: "130px",
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
                          width: "130px",
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
