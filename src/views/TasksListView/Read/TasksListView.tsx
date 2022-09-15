import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
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
import { ProjectsInterface } from "../../../types/models/Projects";
import DeleteTask from "../Delete/DeleteTaskFromTaskTable";
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
  const [selects, setAllSelected] = React.useState<string[]>([]);
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
    dispatch(filterTasks(filter));
  };

  const onChangeFilter = (e: any, name: string) => {
    setValue(name, e.target.id);
    onHandleChangeFilter();
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
      padding={SM ? 2 : 4}
      marginTop={MD ? 6 : 0}
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
        <Grid display="flex" justifyContent={"flex-end"} alignItems="center" mr={1}>
          {MD && (
            <>
              <Box
                onClick={() => setFilter(!filter)}
                textAlign={"center"}
                sx={
                  !filter
                    ? { bgcolor: "black", borderRadius: 3, paddingTop: 1.2, float: "right" }
                    : { bgcolor: "white", borderRadius: 3, paddingTop: 1.2, float: "right" }
                }
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
          marginX={0.5}
          item
          xs={8} sm={5} md={8} lg={8}
          alignItems="center"
          justifyContent={{ xs: "", sm: "flex-end", md: "flex-end", lg: "flex-end" }}
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
      <Grid container alignItems={"center"}>
        <Grid
          item
          lg={9}
          md={10}
          sm={12}
          xs={12}
          gap="2%"
          display="flex"
          direction={"row"}
          alignItems={"center"}
          width={"100%"}
          wrap={MD ? "wrap" : "nowrap"}
        >
          {filter && (
            <Grid container xs={12} sm={12}>
              <Grid
                marginX={0.5}
                item
                xs={6}
                sm={3}
                md={3}
                lg={3}
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
              <Grid
                marginX={0.5}
                item
                xs={6}
                sm={3}
                md={3}
                lg={3}
                marginY={1}
              >
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
              <Grid
                marginX={0.5}
                item
                xs={4}
                sm={3}
                md={3}
                lg={3}
                marginY={1}
              >
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
              <Grid
                marginX={0.5}
                my={{ sm: 1, xs: 1, md: 1, lg: 1 }}
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
              >
                <DeleteTask
                  task={selects}
                  Show={Show}
                  setShow={setShow}
                  onDelete={onDeleteTasks}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          display={{ xs: "none", sm: "none", md: "flex", lg: "flex" }}
          justifyContent={"flex-end"}
          xs={12}
          sm={12}
          md={2}
          lg={3}
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
      )
      }
    </Grid >
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
      id: "not clear",
      value: "Not Clear",
      text: "Not Clear",
    },
    {
      id: "inProgress",
      value: "inProgress",
      text: "In Progress",
    },
    { id: "review", value: "Review", text: "Review" },
    { id: "shared", value: "Shared", text: "Shared" },
    {
      id: "done",
      value: "Done",
      text: "Done",
    },
    { id: "canceled", value: "Cancled", text: "Cancled" },
  ],
];
