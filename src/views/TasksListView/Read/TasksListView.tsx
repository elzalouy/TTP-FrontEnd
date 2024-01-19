import { Badge, Grid, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import IMAGES from "../../../assets/img/Images";
import SearchBox from "../../../coreUI/components/Inputs/Search/SearchBox";
import Loading from "../../../coreUI/components/Loading/Loading";
import TasksTable from "../../../coreUI/components/Tables/TasksTable";
import { useAppSelector } from "../../../models/hooks";
import {
  selectProjectsState,
  selectProjectOptions,
} from "../../../models/Projects";
import {
  Project,
  ProjectsInterface,
  Task,
} from "../../../types/models/Projects";
import "./TasksListView.css";
import { Manager, selectManagers, selectPMOptions } from "src/models/Managers";
import { Options } from "src/types/views/Projects";
import FiltersBar from "./FiltersBar";
import Button from "src/coreUI/components/Buttons/Button";
import EditTasks from "../Edit/EditTasks";
import { selectRole, selectUser } from "src/models/Auth";
import DownloadIcon from "@mui/icons-material/Download";
import {
  convertToCSV,
  getCancelationType,
  getTotalDifferenceFromTo,
  getTaskJournies,
  getTaskLeadTime,
  isMissedDelivery,
  totalUnClearTime,
} from "src/helpers/generalUtils";
import { ITaskInfo, TaskJourniesDetails } from "src/types/views/Statistics";
import {
  Category,
  SubCategory,
  selectAllCategories,
} from "src/models/Categories";
import { Client, selectAllClients } from "src/models/Clients";
import _ from "lodash";
import { Link } from "react-router-dom";
import { format } from "date-fns";
interface Props {
  projectId?: string;
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps<{ projectId?: string }>["match"];
}

type filterTypes =
  | "name"
  | "clientId"
  | "projectManager"
  | "projectId"
  | "clientId"
  | "status"
  | "start"
  | "end"
  | "category"
  | "createdAt"
  | "boardId";

interface IState {
  filter: boolean;
  showEditTasks: string;
  tasks: Task[];
  projectsOptions: Options;
  projectManagersOptions: Options;
  openFilter: boolean;
}

type filterType = {
  projectId?: string;
  name: string;
  projectManager: string;
  status: string;
  clientId: string;
  start: string;
  end: string;
  category: string;
  createdAt: string;
  boardId: string;
};

const defaultValues: filterType = {
  projectId: "",
  name: "",
  projectManager: "",
  status: "",
  clientId: "",
  start: "",
  end: "",
  category: "",
  createdAt: "",
  boardId: "",
};

export const TasksListView: React.FC<Props> = (props) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const role = useAppSelector(selectRole);
  const user = useAppSelector(selectUser);
  const projects: ProjectsInterface = useAppSelector(selectProjectsState);
  const clients = useAppSelector(selectAllClients);
  const managers = useAppSelector(selectManagers);
  const categories = useAppSelector(selectAllCategories);
  const projectOptions = useAppSelector(selectProjectOptions);
  const PmsOptions = useAppSelector(selectPMOptions);
  const [selects, setAllSelected] = React.useState<string[]>([]);
  const { watch, control, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });

  const [state, setState] = React.useState<IState>({
    tasks: projects.allTasks,
    showEditTasks: "none",
    filter: false,
    projectsOptions: projectOptions,
    projectManagersOptions: PmsOptions,
    openFilter: false,
  });
  const onSetTasksJourniesData = () => {
    let selectsData = [...selects];
    if (selectsData.length <= 0)
      selectsData = projects.allTasks.map((i) => i._id);
    if (selectsData.length > 0) {
      let task: Task | undefined,
        project: Project | undefined,
        category: Category | undefined,
        subCategory: SubCategory | undefined,
        client: Client | undefined,
        projectManager: Manager | undefined;
      let tasksJourniesDetails = _.flattenDeep(
        selectsData.map((id) => {
          task = state.tasks.find((task) => task._id === id);
          if (task) {
            project = projects.projects.find(
              (project) => project._id === task?.projectId
            );
            category = categories.find(
              (category) => category._id === task?.categoryId
            );
            subCategory = category?.selectedSubCategory.find(
              (sub) => sub._id === task?.subCategoryId
            );
            client = clients.find((client) => client._id === project?.clientId);
            projectManager = managers.find(
              (pm) => pm._id === project?.projectManager
            );

            let taskInfo: ITaskInfo = {
              ...task,
              clientId: client?._id,
              projectManager: projectManager?._id,
            };

            let tasksJournies = getTaskJournies(taskInfo);
            let journies = tasksJournies.journies;
            let taskJourniesDetails = journies.map((journey, index) => {
              let leadTime = getTaskLeadTime(journey.movements);
              let schedulingTime = getTotalDifferenceFromTo(
                "Tasks Board",
                "In Progress",
                journey.movements
              );
              let processingTime = getTotalDifferenceFromTo(
                "In Progress",
                "Shared",
                journey.movements
              );
              let unClear = totalUnClearTime(journey.movements);
              let turnAround = getTotalDifferenceFromTo(
                "Not Clear",
                "In Progress",
                journey.movements
              );
              let fulfillment = getTotalDifferenceFromTo(
                "In Progress",
                "Review",
                journey.movements
              );
              let delivery = getTotalDifferenceFromTo(
                "Review",
                "Shared",
                journey.movements
              );
              let closing = getTotalDifferenceFromTo(
                "Shared",
                "Done",
                journey.movements
              );
              let clearBack = getTotalDifferenceFromTo(
                "Not Clear",
                "Tasks Board",
                journey.movements
              );
              let cancelMoves = getCancelationType(journey.movements);
              let missedDelivery = isMissedDelivery(journey.movements);
              let wrongOrMissingFulfillment = getTotalDifferenceFromTo(
                "Review",
                "Tasks Board",
                journey.movements
              );
              let commentsTime = getTotalDifferenceFromTo(
                "Shared",
                "Tasks Board",
                journey.movements
              );
              let revisitingTime = getTotalDifferenceFromTo(
                "Done",
                "Tasks Board",
                journey.movements
              );
              let revivedTime = getTotalDifferenceFromTo(
                "Cancled",
                "Tasks Board",
                journey.movements
              );

              let journeyDetails: TaskJourniesDetails = {
                taskId: taskInfo._id,
                name: taskInfo.name,
                journeyIndex: index + 1,
                projectName: project?.name ?? "",
                clientName: client?.clientName ?? "",
                teamName: taskInfo.teamName ?? "",
                taskJourniesCount: tasksJournies.journies.length.toString(),
                categoryName: category?.category ?? "",
                subCategoryName: subCategory?.subCategory ?? "",
                status: taskInfo.status ?? "",
                projectManager: projectManager?.name ?? "",
                startDate: taskInfo.start
                  ? format(new Date(taskInfo.start), "dd MMMM yyyy HH:MM")
                  : "",
                dueDate: journey.journeyDeadline
                  ? format(
                      new Date(journey.journeyDeadline),
                      "dd MMMM yyyy HH:MM"
                    )
                  : "",
                deliveryStatus: missedDelivery ? "Missed" : "On Time",
                movementsCount: journey.movements.length,
                journeyLeadTime: `${leadTime.difference.days}D / ${leadTime.difference.hours}H / ${leadTime.difference.mins}M`,
                journeyProcessingTime: `${processingTime.dif.difference.days}D / ${processingTime.dif.difference.hours}H / ${processingTime.dif.difference.mins}M`,
                journeySchedulingTime: `${schedulingTime.dif.difference.days}D / ${schedulingTime.dif.difference.hours}H / ${schedulingTime.dif.difference.mins}M`,
                journeyUnClearTime: `${unClear.difference.days}D / ${unClear.difference.hours}H / ${unClear.difference.hours}H / ${unClear.difference.mins}`,
                journeyUnClearCounts: unClear.times,
                journeyTurnAroundTime: `${turnAround.dif.difference.days}D / ${turnAround.dif.difference.hours}H /  ${turnAround.dif.difference.mins}M`,
                journeyFullfilmentTime: `${fulfillment.dif.difference.days}D / ${fulfillment.dif.difference.hours} / ${fulfillment.dif.difference.mins}M`,
                journeyDeliveryTime: `${delivery.dif.difference.days}D / ${delivery.dif.difference.hours}H / ${delivery.dif.difference.mins}M`,
                journeyClosingTime: `${closing.dif.difference.days}D / ${closing.dif.difference.hours}H /  ${closing.dif.difference.mins}M`,
                journeyCanceled: cancelMoves.includes("Canceled"),
                journeyDisturbed: cancelMoves.includes("Disturbed"),
                journeyFlagged: cancelMoves.includes("Flagged"),
                journeyLateScheduling:
                  schedulingTime.dif.difference.days > 0 ? true : false,
                missedDelivery: missedDelivery,
                journeyVerified: unClear.times === 0 && turnAround.times === 0,
                journeyUnHealthy: unClear.times > 0 && turnAround.times > 0,
                journeyClearBackTime: `${clearBack.dif.difference.days}D / ${clearBack.dif.difference.hours}H  / ${clearBack.dif.difference.mins}M`,
                wrongOrMissingFulfillmentTime: `${wrongOrMissingFulfillment.dif.difference.days}D  / ${wrongOrMissingFulfillment.dif.difference.hours}H / ${wrongOrMissingFulfillment.dif.difference.mins}M`,
                commentsOrChangesTime: `${commentsTime.dif.difference.days}D / ${commentsTime.dif.difference.hours}H  / ${commentsTime.dif.difference.mins}M`,
                revisitingTime: `${revisitingTime.dif.difference.days}D / ${revisitingTime.dif.difference.hours}H  / ${revisitingTime.dif.difference.mins}M`,
                revivedTime: `${revivedTime.dif.difference.days}D / ${revivedTime.dif.difference.hours}H / ${revivedTime.dif.difference.mins}M`,
                wrongOrMissingFulfillmentTimes:
                  wrongOrMissingFulfillment.times.toString(),
                commentsOrChangesTimes: commentsTime.times.toString(),
                revisitingTimes: revisitingTime.times.toString(),
                revivedTimes: revivedTime.times.toString(),
              };
              return journeyDetails;
            });
            return taskJourniesDetails;
          } else return [];
        })
      );
      return tasksJourniesDetails;
    }
  };

  React.useEffect(() => {
    let id = props.match.params?.projectId;
    if (id) setValue("projectId", id ?? "");
    if (user?.role === "PM") setValue("projectManager", user._id);
  }, [props.match.params, projects]);

  // React.useEffect(() => {
  //   let project = projects.projects.find((p) => p._id === watch().projectId);
  //   setValue("projectManager", project?.projectManager ?? "");
  // }, [watch().projectId]);

  React.useEffect(() => {
    onSetFilter();
  }, [
    watch().boardId,
    watch().category,
    watch().clientId,
    watch().createdAt,
    watch().start,
    watch().end,
    watch().name,
    watch().projectId,
    watch().projectManager,
    watch().status,
    projects.allTasks,
  ]);

  const onSetFilter = () => {
    let State = { ...state };
    let filter = watch();
    let tasks = projects.allTasks;
    let projectsIds: string[] = projects.projects.map((item) => item?._id);
    if (filter.clientId !== "") {
      projectsIds = projects.projects
        .filter((item) => item.clientId === filter.clientId)
        .map((item) => item?._id);
      tasks = projects.allTasks.filter((item) =>
        projectsIds.includes(item.projectId)
      );
    }
    if (filter.projectManager !== "") {
      projectsIds = projects.projects
        .filter((item) => item.projectManager === filter.projectManager)
        .map((item) => item?._id);
      State.projectsOptions = projectOptions.filter((item) =>
        projectsIds.includes(item.id)
      );
      tasks = projects.allTasks.filter((item) =>
        projectsIds.includes(item.projectId)
      );
    }
    if (![null, "", undefined].includes(filter.projectId)) {
      tasks = projects.allTasks.filter(
        (item) => item.projectId === filter?.projectId
      );
    }
    if (filter.status !== "")
      tasks = tasks.filter((item) => item.status === filter.status);
    if (filter.name !== "")
      tasks = tasks.filter((item) =>
        item.name.toLocaleLowerCase().includes(filter.name.toLocaleLowerCase())
      );

    if (filter.start !== "")
      tasks = tasks.filter(
        (item) =>
          new Date(item.deadline).getTime() >= new Date(filter.start).getTime()
      );
    if (filter.end !== "")
      tasks = tasks.filter(
        (item) =>
          new Date(item.deadline).getTime() <= new Date(filter.end).getTime()
      );
    if (filter.category !== "")
      tasks = tasks.filter((item) => item.categoryId === filter.category);
    if (filter.projectId === undefined) {
      tasks = tasks.filter((item) =>
        [null, "", undefined].includes(item.projectId)
      );
    }
    if (filter.boardId !== "") {
      tasks = tasks.filter((i) => i.boardId === filter.boardId);
    }
    if (filter.createdAt !== "") {
      tasks = tasks.filter((task) => {
        if (
          task.cardCreatedAt &&
          new Date(task.cardCreatedAt).getTime() >=
            new Date(filter.createdAt).getTime()
        )
          return task;
      });
    }
    State.tasks = tasks;
    setState(State);
  };

  const clearFilters = () => {
    reset();
    setState({ ...state, tasks: projects.allTasks });
  };

  const onDownloadTasksFile = () => {
    let tasksJourniesDetails = onSetTasksJourniesData();
    if (
      tasksJourniesDetails &&
      tasksJourniesDetails.length > 0 &&
      formRef.current
    ) {
      let data = convertToCSV([...tasksJourniesDetails]);
      let dataBlob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.style.display = "none";
      link.download = "Tasks Master Report";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Grid
      bgcolor={"#FAFAFB"}
      justifyContent={"flex-start"}
      container
      alignItems="center"
      alignContent={"center"}
      alignSelf="flex-start"
      sx={{ backgroundColor: "#FAFAFB" }}
    >
      <Grid direction={"row"} container justifyContent={"space-between"} mb={1}>
        <Grid item xs={6} mt={1}>
          <Typography variant="h2">Tasks</Typography>
        </Grid>
        <Grid item xs={6} direction={"row"}>
          <Grid direction={"row"} container justifyContent={"space-between"}>
            <Grid item xs={3}>
              <Button
                onClick={() => setState({ ...state, showEditTasks: "flex" })}
                type="main"
                size="x-small"
                label="Edit Tasks"
                style={{
                  marginTop: "0px",
                  display: selects.length > 0 ? "block" : "none",
                }}
              />
              <EditTasks
                show={state.showEditTasks}
                setShow={(val: string) =>
                  setState({ ...state, showEditTasks: val })
                }
                selects={selects}
                setAllSelected={setAllSelected}
              />
            </Grid>
            <Grid item>
              <Controller
                name="name"
                control={control}
                render={(props) => (
                  <SearchBox
                    value={props.field.value}
                    placeholder="Search"
                    onChange={(e) => setValue("name", e.target.value)}
                    size={"custom"}
                  />
                )}
              />
            </Grid>
            <Grid item>
              {/* <DeleteTask
                task={selects}
                Show={Show}
                setShow={setShow}
                onDelete={onDeleteTasks}
              /> */}
            </Grid>
            <Grid item>
              {["OM", "SM", undefined].includes(role) && (
                <Grid item>
                  <form ref={formRef}>
                    <IconButton
                      type="button"
                      onClick={onDownloadTasksFile}
                      sx={{
                        bgcolor: state.filter ? "black" : "white",
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
            <Grid item>
              <Box>
                {projects.allTasks === state.tasks ? (
                  <IconButton
                    disableRipple
                    onClick={() =>
                      setState({ ...state, filter: !state.filter })
                    }
                    sx={filterBtnStyle}
                  >
                    <img
                      src={
                        state.filter
                          ? IMAGES.filtericonwhite
                          : IMAGES.filtericon
                      }
                      alt="FILTER"
                    />
                  </IconButton>
                ) : (
                  <Badge
                    overlap="circular"
                    badgeContent=""
                    variant="dot"
                    color="warning"
                  >
                    <IconButton
                      disableRipple
                      onClick={() =>
                        setState({ ...state, filter: !state.filter })
                      }
                      sx={filterBtnStyle}
                    >
                      <img
                        src={
                          state.filter
                            ? IMAGES.filtericonwhite
                            : IMAGES.filtericon
                        }
                        alt="FILTER"
                      />
                    </IconButton>
                  </Badge>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {projects.loading === true ? (
        <>
          <Box
            style={{
              width: "100%",
              marginTop: "25px",
              backgroundColor: "#F1F1F4",
            }}
            className="filter-icon"
          >
            <Loading color="grey" type="spinningBubbles" />
            <Typography style={{ color: "#909090", paddingLeft: "10px" }}>
              Loading
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Paper className="task-container">
            <TasksTable
              selects={selects}
              setAllSelected={setAllSelected}
              projects={projects.projects}
              tasks={state.tasks}
              {...props}
            />
          </Paper>
        </>
      )}
      <FiltersBar
        selects={selects}
        watch={watch}
        state={state}
        setState={setState}
        setAllSelected={setAllSelected}
        onSetFilter={setValue}
        control={control}
        clearFilters={clearFilters}
      />
    </Grid>
  );
};
const filterBtnStyle = {
  bgcolor: "white",
  borderRadius: 3,
  paddingTop: 1.2,
  float: "right",
  cursor: "pointer",
  width: "38px",
  height: "38px",
  textAlign: "center",
};
