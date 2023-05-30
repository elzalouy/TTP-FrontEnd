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
  deleteTasks,
  downloadTasks,
  selectAllProjects,
  selectProjectOptions,
} from "../../../models/Projects";
import { ProjectsInterface, Task } from "../../../types/models/Projects";
import "./TasksListView.css";
import { selectPMOptions } from "src/models/Managers";
import { Options } from "src/types/views/Projects";
import FiltersBar from "./FiltersBar";
import DeleteTask from "../Delete/DeleteTaskFromTaskTable";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import EditTasks from "../Edit/EditTasks";
import { selectRole, selectUser } from "src/models/Auth";
import DownloadIcon from "@mui/icons-material/Download";
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
  | "category";
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
};
export const TasksListView: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const role = useAppSelector(selectRole);
  const user = useAppSelector(selectUser);
  const projects: ProjectsInterface = useAppSelector(selectAllProjects);
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
  const [Show, setShow] = React.useState("none");

  React.useEffect(() => {
    let id = props.match.params?.projectId;
    setValue("projectId", id ?? "");
    setState({
      ...state,
      tasks: id
        ? projects.allTasks.filter((item) => item.projectId === id) ?? []
        : projects.allTasks ?? [],
    });
    if (user?.role === "PM") onSetFilter("projectManager", user._id);
  }, [props.match.params, projects]);

  const onSetFilter = (name: filterTypes, value: string | undefined) => {
    setValue(name, value);
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
      let project = projects.projects.find((p) => p._id === filter?.projectId);
      setValue("projectManager", project?.projectManager ?? "");
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
    State.tasks = tasks;
    setState(State);
  };
  const clearFilters = () => {
    reset();
    setState({ ...state, tasks: projects.allTasks });
  };
  const onDeleteTasks = () => {
    dispatch(deleteTasks({ data: { ids: selects } }));
    setShow("none");
  };
  const onDownloadTasksFile = () => {
    dispatch(
      downloadTasks(
        selects.length > 0 ? selects : state.tasks.map((item) => item._id)
      )
    );
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
                    onChange={(e) => onSetFilter("name", e.target.value)}
                    size={"custom"}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <DeleteTask
                task={selects}
                Show={Show}
                setShow={setShow}
                onDelete={onDeleteTasks}
              />
            </Grid>
            <Grid item>
              {["OM", "SM", undefined].includes(role) && (
                <Grid item>
                  <IconButton
                    sx={{
                      bgcolor: state.filter ? "black" : "white",
                      borderRadius: 3,
                      float: "right",
                      cursor: "pointer",
                      width: "38px",
                      height: "38px",
                    }}
                    disableRipple
                    onClick={onDownloadTasksFile}
                  >
                    <DownloadIcon htmlColor="black"></DownloadIcon>
                  </IconButton>
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
        onSetFilter={onSetFilter}
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
