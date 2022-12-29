import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RouteComponentProps, useParams } from "react-router";
import Button from "src/coreUI/components/Buttons/Button";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import IMAGES from "../../../assets/img/Images";
import SearchBox from "../../../coreUI/components/Inputs/Search/SearchBox";
import Loading from "../../../coreUI/components/Loading/Loading";
import TasksTable from "../../../coreUI/components/Tables/TasksTable";
import { useAppSelector } from "../../../models/hooks";
import {
  deleteTasks,
  filterTasks,
  getAllTasks,
  ProjectsActions,
  selectAllProjects,
  selectProjectOptions,
} from "../../../models/Projects";
import { selectClientOptions } from "src/models/Clients/clients.selectors";
import { ProjectsInterface, Task } from "../../../types/models/Projects";
import DeleteTask from "../Delete/DeleteTaskFromTaskTable";
import EditTasks from "../Edit/EditTasks";
import "./TasksListView.css";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { selectPMOptions } from "src/models/Managers";
import { Options } from "src/types/views/Projects";
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
  | "status";

export const TasksListView: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const projects: ProjectsInterface = useAppSelector(selectAllProjects);
  const projectOptions = useAppSelector(selectProjectOptions);
  const clientsOptions = useAppSelector(selectClientOptions);
  const PmsOptions = useAppSelector(selectPMOptions);
  const [selects, setAllSelected] = React.useState<string[]>([]);

  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const [Show, setShow] = React.useState("none");
  const { watch, control, setValue } = useForm({
    defaultValues: {
      projectId: "",
      name: "",
      projectManager: "",
      status: "",
      clientId: "",
    },
  });
  const [state, setState] = React.useState<{
    filter: boolean;
    showEditTasks: string;
    tasks: Task[];
    projectsOptions: Options;
    projectManagersOptions: Options;
  }>({
    tasks: projects.allTasks,
    showEditTasks: "none",
    filter: true,
    projectsOptions: projectOptions,
    projectManagersOptions: PmsOptions,
  });

  React.useEffect(() => {
    let id = props.match.params?.projectId;
    if (id) {
      setValue("projectId", id);
      setState({
        ...state,
        tasks: projects.allTasks
          ? projects.allTasks.filter((item) => item.projectId === id)
          : [],
      });
    } else {
      setState({ ...state, tasks: projects.allTasks ? projects.allTasks : [] });
    }
  }, [props.match.params, projects]);

  const onSetFilter = (name: filterTypes, value: string) => {
    setValue(name, value);
    let State = { ...state };
    let filter = watch();
    let tasks = projects.allTasks;
    let projectsIds: string[] = projects.projects.map((item) => item?._id);
    let projectManagersIds: string[] = projects.projects.map(
      (item) => item.projectManager?._id
    );
    if (filter.clientId !== "") {
      projectsIds = projects.projects
        .filter((item) => item.clientId === filter.clientId)
        .map((item) => item?._id);
      projectManagersIds = projects.projects
        .filter((item) => projectsIds.includes(item?._id))
        .map((item) => item.projectManager?._id);
      tasks = projects.allTasks.filter((item) =>
        projectsIds.includes(item.projectId)
      );
    }
    if (filter.projectManager !== "") {
      projectsIds = projects.projects
        .filter((item) => item.projectManager?._id === filter.projectManager)
        .map((item) => item?._id);
      State.projectsOptions = projectOptions.filter((item) =>
        projectsIds.includes(item.id)
      );
      tasks = projects.allTasks.filter((item) =>
        projectsIds.includes(item.projectId)
      );
    }
    if (filter.projectId !== "")
      tasks = projects.allTasks.filter(
        (item) => item.projectId === filter.projectId
      );
    if (filter.status !== "")
      tasks = tasks.filter((item) => item.status === filter.status);
    State.tasks = tasks;
    setState(State);
  };

  const onDeleteTasks = async () => {
    dispatch(deleteTasks({ data: { ids: selects }, dispatch: dispatch }));
    setShow("none");
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
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        lg={12}
        md={2}
        sm={2}
        xs={2}
        mt={{ sm: 2, xs: 2, md: 0, lg: 0, xl: 0 }}
      >
        <Typography variant="h2" marginBottom={2}>
          Tasks
          {props.projectId && props.projectId && (
            <>
              <img
                style={{ margin: "0 20px" }}
                src={IMAGES.arrowHeader}
                alt="more"
              />
              {
                projects?.projects?.find(
                  (item) => item?._id === props.projectId
                )?.name
              }
            </>
          )}
        </Typography>
      </Grid>
      <Grid container xs={10} sm={10} md={10} lg={12} justifyContent="flex-end">
        <Grid
          display="flex"
          justifyContent={"flex-end"}
          alignItems="center"
          mr={1}
        >
          {MD && (
            <>
              <Box
                onClick={() => setState({ ...state, filter: !state.filter })}
                textAlign={"center"}
                sx={{
                  bgcolor: !state.filter ? "black" : "white",
                  borderRadius: 3,
                  paddingTop: 1.2,
                  float: "right",
                }}
                width={38}
                height={38}
              >
                <img
                  src={
                    !state.filter ? IMAGES.filtericonwhite : IMAGES.filtericon
                  }
                  alt="FILTER"
                />
              </Box>
            </>
          )}
        </Grid>
        <Grid
          data-test-id="filter-projects"
          paddingX={0.5}
          item
          xs={8}
          sm={5}
          md={8}
          lg={8}
          alignItems="center"
          justifyContent={{
            xs: "",
            sm: "flex-end",
            md: "flex-end",
            lg: "flex-end",
          }}
          display={{ md: "none", lg: "none", sm: "flex", xs: "flex" }}
        >
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
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems="center">
        {state.filter && (
          <>
            <Grid paddingX={0.5} item sm={2} md={3} lg={1.9} marginY={1}>
              <Box className="tasks-option">
                <ControlledSelect
                  name="clientId"
                  selected={watch().clientId}
                  optionsType="dialog"
                  control={control}
                  label="Client: "
                  elementType="filter"
                  textTruncate={10}
                  onSelect={(value: any) => onSetFilter("clientId", value?.id)}
                  options={[
                    { id: "", value: "", text: "All", image: "avatar" },
                    ...clientsOptions,
                  ]}
                />
              </Box>
            </Grid>
            <Grid
              paddingX={0.5}
              item
              xs={6}
              sm={2}
              md={3}
              lg={1.9}
              marginY={1}
              flex={1}
            >
              <Controller
                name="projectManager"
                control={control}
                render={(props) => (
                  <Select
                    selected={watch().projectManager}
                    name="projectManager"
                    optionsType="dialog"
                    label="Manager: "
                    elementType="filter"
                    textTruncate={6}
                    onSelect={(value: any) =>
                      onSetFilter("projectManager", value?.id)
                    }
                    options={[
                      { id: "", value: "", text: "All" },
                      ...PmsOptions,
                    ]}
                  />
                )}
              />
            </Grid>
            <Grid paddingX={0.5} item sm={2} md={3} lg={1.9} marginY={1}>
              <Box className="tasks-option">
                <ControlledSelect
                  name="projectId"
                  selected={watch().projectId}
                  control={control}
                  label="Project: "
                  elementType="filter"
                  optionsType="dialog"
                  textTruncate={10}
                  onSelect={(e: any) => onSetFilter("projectId", e?.id)}
                  options={[
                    { id: "", value: "", text: "All" },
                    ...projectOptions,
                  ]}
                />
              </Box>
            </Grid>
            <Grid paddingX={0.5} item xs={6} sm={2} md={3} lg={1.9} marginY={1}>
              <Box className="tasks-option">
                <ControlledSelect
                  name="status"
                  control={control}
                  selected={watch().status}
                  label="Status: "
                  elementType="filter"
                  textTruncate={10}
                  onSelect={(e: any) => onSetFilter("status", e.target.id)}
                  options={options[1]}
                />
              </Box>
            </Grid>
            <Grid my={1} item xs={2} sm={2} md={1} lg={0.5}>
              <DeleteTask
                task={selects}
                Show={Show}
                setShow={setShow}
                onDelete={onDeleteTasks}
              />
            </Grid>
            <Grid my={1} item xs={3} sm={3} md={3} lg={1}>
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
          </>
        )}
        {/* </Grid> */}
        <Grid
          item
          display={{ xs: "none", sm: "none", md: "flex", lg: "flex" }}
          justifyContent={"flex-end"}
          xs={12}
          sm={12}
          md={8}
          lg={2}
          paddingLeft={1}
          mt={SM ? "10px" : "0px"}
        >
          <Controller
            name="name"
            control={control}
            render={(props) => (
              <SearchBox
                onChange={(e: any) => onSetFilter("name", e.target.value)}
                value={props.field.value}
                placeholder="Search"
                size={"custom"}
              />
            )}
          />
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
    </Grid>
  );
};

const options = [
  [
    { id: "asc", text: "Ascending", value: "asc" },
    { id: "desc", text: "Descending", value: "desc" },
  ],
  [
    {
      id: "Tasks Board",
      value: "Tasks Board",
      text: "Tasks Board",
    },
    {
      id: "Not Clear",
      value: "Not Clear",
      text: "Not Clear",
    },
    {
      id: "In Progress",
      value: "In Progress",
      text: "In Progress",
    },
    { id: "Review", value: "Review", text: "Review" },
    { id: "Shared", value: "Shared", text: "Shared" },
    {
      id: "Done",
      value: "Done",
      text: "Done",
    },
    { id: "Cancled", value: "Cancled", text: "Cancled" },
  ],
];
