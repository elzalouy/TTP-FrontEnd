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
import { ArrowDownward, ArrowUpward, Mediation } from "@mui/icons-material";
import { Project, Task } from "src/types/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { selectAllProjects } from "src/models/Projects";
import TablePaginationActions from "src/coreUI/components/Tables/TablePaginationActions";
import { getTaskJournies } from "src/helpers/generalUtils";
import { getJourneyLeadTime, getMeetingDeadline } from "../Statitics/utils";
import { ITaskInfo, Journies } from "src/types/views/Statistics";
import IMAGES from "src/assets/img/Images";
import FiltersBar from "./FilterMenu";
import _, { flatten, isNaN } from "lodash";
import TableLoading from "src/coreUI/components/Loading/TableLoading";
import ClientTableRow from "./ClientTableRow";
import { selectStatisticsFilterDefaults } from "src/models/Statistics";
import TaskInfo from "../TaskViewBoard/Read/Card/TaskInfo";
import { DialogOption } from "src/types/components/SelectDialog";
import { selectCategoriesDialogOptions } from "src/models/Categories";

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
    id: "journies",
    label: "# of Journies",
    type: "number",
  },
  {
    id: "_OfRevision",
    label: "# of Revision",
    type: "number",
  },
  {
    id: "averageTOD",
    label: "Average TOD",
    type: "number",
  },
  {
    id: "_OfActive",
    label: "# of Active",
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
    averageTOD: number;
    _OfRevision: number;
    meetDeadline: number;
    _OfTasks: number;
    _OfActive: number;
    journies: number;
  }[];
  organization: {
    lastBrief: number;
    _ofProjects: number;
    averageTOD: number;
    _OfRevision: number;
    meetDeadline: number;
    _OfTasks: number;
    _OfActive: number;
    journies: number;
  };
  filter: {
    startDate: string | null;
    endDate: string | null;
    categories: DialogOption[];
    subCategories: DialogOption[];
  };
};

const TrackClientHealthTable = () => {
  const theme = useTheme();
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const clients = useAppSelector(selectAllClients);
  const { date, boards } = useAppSelector(selectStatisticsFilterDefaults);
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
    let State = { ...state };
    // getting all tasks created after the global Date filteration.
    //  when the tasks is getting ready
    let tasksInfo = allTasks.filter((task) => {
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
    // Building the tasks information array
    // when the projects, project managers, tasks getting ready.
    tasksInfo = _.orderBy(
      tasksInfo.map((i) => {
        let p = projects.find((p) => p._id === i.projectId);
        return {
          ...i,
          clientId: p?.clientId,
          projectManager: p?.projectManager,
        };
      }),
      "cardCreatedAt",
      "asc"
    );
    // setting the tasks info.
    setState({ ...State, tasks: tasksInfo });
  }, [allTasks, projects, date, boards]);

  React.useEffect(() => {
    let State = { ...state };
    // setting the journies of tasks
    // when the tasks state get ready
    let tasksJournies = State.tasks.map((item) => getTaskJournies(item));
    tasksJournies = tasksJournies.map((item) => {
      item.journies = item.journies.map((journey) => {
        let leadTimeInHours = getJourneyLeadTime(journey);
        journey.leadTime = leadTimeInHours;
        return journey;
      });
      return item;
    });

    // flattening the journies in one array, for getting journeyLeadTime, _OfActive, hasDeadline,and journies length values.
    let flattened = _.flattenDeep(tasksJournies.map((i) => i.journies));
    State.organization._OfActive = flattened.filter(
      (i) =>
        !["Shared", "Done", "Cancled"].includes(
          i.movements[i.movements.length - 1].status
        )
    ).length;
    let revisedTasks = tasksJournies.filter((i) => i.journies.length > 1);
    let journeysLeadTime = flattened.map((j) => {
      return j.leadTime;
    });
    let sortedByCreatedAtTasks = _.orderBy(State.tasks, "cardCreatedAt", "asc");

    State.organization._OfRevision =
      _.flattenDeep(revisedTasks.map((i) => i.journies)).length -
      revisedTasks.length;
    State.organization._OfTasks = State.tasks.length;
    State.organization._ofProjects = projects.length;
    State.organization.averageTOD = _.sum(journeysLeadTime);
    State.organization.lastBrief = new Date(
      sortedByCreatedAtTasks[sortedByCreatedAtTasks.length - 1]?.cardCreatedAt
    ).getTime();
    let hasDeadline = flattened.filter((i) => i.journeyDeadline !== null);
    let meetDeadline = getMeetingDeadline(hasDeadline).notPassedDeadline.length;
    State.organization.journies = flattened.length;
    State.organization.meetDeadline = Math.floor(
      (meetDeadline / hasDeadline.length) * 100
    );
    setState({ ...State });
  }, [state.tasks]);

  // get all projects and its tasks and filter them by the start, and end date
  // then building the tasks journies for the filtered tasks
  React.useEffect(() => {
    let State = { ...state };
    if (projects.length > 0 && clients.length > 0 && allTasks.length > 0) {
      let allTasksInfo = _.orderBy(
        allTasks
          .filter((i) => i.projectId)
          .map((i) => {
            let p = projects.find((p) => p._id === i.projectId);
            return {
              ...i,
              clientId: p?.clientId,
              projectManager: p?.projectManager,
            };
          })
          .filter(
            (task) =>
              task.cardCreatedAt &&
              boards.includes(task.boardId) &&
              new Date(task.cardCreatedAt).getTime() >= date.getTime()
          ),
        "cardCreatedAt",
        "asc"
      );

      State.tasks = [...allTasksInfo];
      State.clients = clients;
      State.projects = projects;
      console.log({
        dates: State.tasks.map((i) => i.cardCreatedAt),
        tasksBefore: State.tasks.length,
        start: State.filter.startDate,
        end: State.filter.endDate,
      });
      // Filtering using the start and end date
      if (State.filter.startDate && State.filter.endDate) {
        State.projects = State.projects.filter(
          (t) =>
            State.filter.startDate &&
            State.filter.endDate &&
            new Date(t.startDate).getTime() >=
              new Date(State.filter.startDate).getTime() - 86400000 &&
            new Date(t.startDate).getTime() <=
              new Date(State.filter.endDate).getTime() + 86400000
        );
        // Filtering the tasks
        State.tasks = State.tasks.filter(
          (i) =>
            i.cardCreatedAt &&
            State.filter.startDate &&
            State.filter.endDate &&
            new Date(i.cardCreatedAt).getTime() >=
              new Date(State.filter.startDate).getTime() - 86400000 &&
            new Date(i.cardCreatedAt).getTime() <=
              new Date(State.filter.endDate).getTime() + 86400000
        );
      }

      if (State.filter.categories) {
        let catsIds = State.filter.categories.map((i) => i.id);
        State.tasks = State.tasks.filter(
          (item) =>
            catsIds.includes(item.categoryId) || item.categoryId === null
        );
      }
      if (State.filter.subCategories) {
        let subsIds = State.filter.subCategories.map((i) => i.id);
        State.tasks = State.tasks.filter(
          (item) =>
            subsIds.includes(item.subCategoryId) || item.subCategoryId === null
        );
      }

      let journeys = State.tasks.map((i) => getTaskJournies(i));
      State.journeys = journeys;
      State.cells = _.orderBy(
        clients.map((client) => {
          let notFilteredClientTasks = _.orderBy(
            State.tasks.filter((t: ITaskInfo) => t.clientId === client._id),
            "createdAt",
            "asc"
          );
          let clientProjects = State.projects.filter(
            (i) => i.clientId === client._id
          );
          let clientTasks = State.tasks.filter(
            (task) => task.clientId === client._id
          );
          let clientJourniesPerTask = clientTasks.map((i) =>
            getTaskJournies(i)
          );
          let clientJournies = _.flattenDeep(
            clientJourniesPerTask.map((i) => i.journies)
          );
          clientJournies = clientJournies.map((j) => {
            return {
              ...j,
              leadTime: getJourneyLeadTime(j),
            };
          });
          let averageLeadTime = _.sum(clientJournies.map((i) => i.leadTime));
          let hasDeadline = clientJournies.filter(
            (i) => i.journeyDeadline !== null
          );
          let meetingDeadline = Math.floor(
            (getMeetingDeadline(hasDeadline).notPassedDeadline.length /
              hasDeadline.length) *
              100
          );
          let revisionJournies = clientJourniesPerTask.filter(
            (j) => j.journies.length > 1
          );
          let length = revisionJournies.length;
          let flattenedRevisionJournies =
            _.flattenDeep(revisionJournies.map((i) => i.journies)).length -
            length;
          let lastBrief = new Date(
            notFilteredClientTasks[notFilteredClientTasks.length - 1]
              ?.cardCreatedAt ??
              notFilteredClientTasks[notFilteredClientTasks.length - 1]
                ?.createdAt
          ).getTime();
          lastBrief = _.isNaN(lastBrief) ? 0 : lastBrief;
          let _OfActive = clientJournies.filter(
            (i) =>
              !["Done", "Cancled", "Shared"].includes(
                i.movements[i.movements.length - 1].status
              )
          ).length;
          return {
            clientName: client.clientName,
            meetDeadline: !_.isNaN(meetingDeadline) ? meetingDeadline : 0,
            _OfRevision: flattenedRevisionJournies,
            lastBrief: lastBrief,
            averageTOD: averageLeadTime ?? 0,
            _OfTasks: clientTasks.length,
            _ofProjects: clientProjects.length,
            clientId: client._id,
            _OfActive,
            journies: clientJournies.length,
          };
        }),
        state.orderBy,
        "desc"
      ).filter((i) => i._OfTasks > 0 && i._ofProjects > 0);
      State.order = Order.desc;
      State.loading = false;
      setState(State);
    }
  }, [
    allTasks,
    projects,
    clients,
    state.filter.startDate,
    state.filter.endDate,
    state.filter.categories,
    state.filter.subCategories,
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

  const OrganizationRow = () => {
    let {
      lastBrief,
      meetDeadline,
      journies,
      averageTOD,
      _ofProjects,
      _OfTasks,
      _OfRevision,
      _OfActive,
    } = state.organization;
    let lastBriefDate = new Date(lastBrief);
    let localLastBriefDate = lastBriefDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let totalDays = Math.floor(averageTOD / journies / 24);
    let totalHours = Math.floor((averageTOD / journies) % 24);
    return (
      <ClientTableRow
        clientId={"organization"}
        loading={state.loading}
        clientName={"TTP Organization"}
        lastBrief={lastBrief}
        localLastBriefDate={localLastBriefDate}
        _ofProjects={_ofProjects}
        _OfActive={_OfActive}
        _OfTasks={_OfTasks}
        _OfRevision={_OfRevision}
        journies={journies}
        totalDays={totalDays}
        totalHours={totalHours}
        meetDeadline={meetDeadline}
      />
    );
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
            <OrganizationRow />
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
                  let average = Math.floor(averageTOD / journies);
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
};
