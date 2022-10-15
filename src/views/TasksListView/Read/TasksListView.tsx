import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
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
import { ProjectsInterface } from "../../../types/models/Projects";
import DeleteTask from "../Delete/DeleteTaskFromTaskTable";
import EditTasks from "../Edit/EditTasks";
import "./TasksListView.css";
interface Props {
  projectId?: string;
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}

export const TasksListView: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const projects: ProjectsInterface = useAppSelector(selectAllProjects);
  const projectOptions = useAppSelector(selectProjectOptions);
  const clientsOptions = useAppSelector(selectClientOptions);
  const [selects, setAllSelected] = React.useState<string[]>([]);
  const [showEditTasks, setShowEditTasks] = React.useState("none");
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const XS = useMediaQuery(theme.breakpoints.down("xs"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const LG = useMediaQuery(theme.breakpoints.up("lg"));
  const [Show, setShow] = React.useState("none");
  const [filter, setFilter] = React.useState(true);
  const { watch, control, setValue } = useForm();

  React.useEffect(() => {
    let state: any = props.location.state;
    if (props.location.state && state.projectId) {
      setValue("projectId", state.projectId);
      dispatch(filterTasks({ projectId: state.projectId }));
    } else dispatch(getAllTasks(null));
  }, []);

  const onHandleChangeFilter = () => {
    let filter = watch();
    dispatch(
      filterTasks({
        projectId: filter.projectId,
        status: filter.status,
        name: filter.name,
      })
    );
  };

  const onHandleChangeStaticFilter = async () => {
    let filter = watch();
    setValue("projectId", "");
    await dispatch(
      filterTasks({ projectId: filter.projectId, status: filter.status })
    );
    dispatch(
      ProjectsActions.onChangeStaticFilters({ clientId: filter.clientId })
    );
  };

  const onChangeFilter = (e: any, name: string) => {
    setValue(name, e.target.id);
    onHandleChangeFilter();
  };

  const onChangeStaticFilter = (e: any, name: string) => {
    e.preventDefault();
    console.log(name, e.target.id);
    setValue(name, e.target.id);
    onHandleChangeStaticFilter();
  };
  const onSortTasks = (e: any, name: string) => {
    e.preventDefault();
    setValue(name, e.target.id);
    dispatch(ProjectsActions.onSortTasks(e.target.id));
  };

  const onDeleteTasks = async () => {
    dispatch(deleteTasks({ data: { ids: selects }, dispatch: dispatch }));
    setShow("none");
  };

  React.useEffect(() => {
    if (MD) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  }, [MD]);

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
        mb={SM ? 3 : 0}
      >
        <Typography
          variant="h2"
          marginBottom={2}
          marginTop={SM ? 5 : MD ? 2 : 0}
        >
          Tasks
          {props.projectId && props.projectId && (
            <>
              <img
                style={{ margin: "0 20px" }}
                src={IMAGES.arrowHeader}
                alt="more"
              />
              {
                projects?.projects?.find((item) => item._id === props.projectId)
                  ?.name
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
                onClick={() => setFilter(!filter)}
                textAlign={"center"}
                sx={{
                  bgcolor: !filter ? "black" : "white",
                  borderRadius: 3,
                  paddingTop: 1.2,
                  float: "right",
                }}
                width={38}
                height={38}
              >
                <img
                  src={!filter ? IMAGES.filtericonwhite : IMAGES.filtericon}
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
                onChange={(e) => {
                  props.field.onChange(e);
                  onHandleChangeFilter();
                }}
                size={"custom"}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"} alignItems="center">
        {filter && (
          <>
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
              <ControlledSelect
                name="sort"
                control={control}
                label="Due Date: "
                elementType="filter"
                textTruncate={6}
                onSelect={(e: any) => onSortTasks(e, "sort")}
                options={options[0]}
              />
            </Grid>
            <Grid paddingX={0.5} item xs={6} sm={2} md={3} lg={1.9} marginY={1}>
              <Box className="tasks-option">
                <ControlledSelect
                  name="status"
                  control={control}
                  label="Status: "
                  elementType="filter"
                  textTruncate={10}
                  onSelect={(e: any) => onChangeFilter(e, "status")}
                  options={options[1]}
                />
              </Box>
            </Grid>
            <Grid paddingX={0.5} item sm={2} md={3} lg={1.9} marginY={1}>
              <Box className="tasks-option">
                <ControlledSelect
                  name="projectId"
                  control={control}
                  label="Project: "
                  elementType="filter"
                  textTruncate={10}
                  onSelect={(e: any) => {
                    onChangeFilter(e, "projectId");
                  }}
                  options={projectOptions}
                />
              </Box>
            </Grid>
            <Grid paddingX={0.5} item sm={2} md={3} lg={1.9} marginY={1}>
              <Box className="tasks-option">
                <ControlledSelect
                  name="clientId"
                  control={control}
                  label="Client: "
                  elementType="filter"
                  textTruncate={10}
                  onSelect={(e: any) => {
                    onChangeStaticFilter(e, "clientId");
                  }}
                  options={clientsOptions}
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
                onClick={() => setShowEditTasks("flex")}
                type="main"
                size="x-small"
                label="Edit Tasks"
                style={{
                  marginTop: "0px",
                  display: selects.length > 0 ? "block" : "none",
                }}
              />
              <EditTasks
                show={showEditTasks}
                setShow={setShowEditTasks}
                selects={selects}
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
                onChange={(e) => {
                  props.field.onChange(e);
                  onHandleChangeFilter();
                }}
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
              tasks={projects.filteredTasks}
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
      id: "inProgress",
      value: "inProgress",
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
