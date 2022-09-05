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
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const LG = useMediaQuery(theme.breakpoints.up("md"));
  const [Show, setShow] = React.useState("none");
  const [filter, setFilter] = React.useState(true);
  const { watch, control, setValue } = useForm();

  React.useEffect(() => {
    let state: any = props.location.state;
    if (props.location.state && state.projectId) {
      setValue("projectId", state.projectId);
      dispatch(filterTasks({ projectId: state.projectId }));
    }
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
      alignItems="flex-start"
      container
      alignContent={"flex-start"}
      alignSelf="flex-start"
      padding={SM ? 2 : 4}
      marginTop={MD ? 6 : 0}
      sx={{ backgroundColor: "#FAFAFB" }}
    >
      <Grid
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sm={12}
        md={12}
        lg={12}
        xs={12}
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
      <Grid container sm={12} md={12} lg={12} xs={12}>
        <Grid display="flex" justifyContent={"flex-end"} alignItems="center">
          {!LG && (
            <>
              <Box
                onClick={() => setFilter(!filter)}
                textAlign={"center"}
                sx={
                  !filter
                    ? { bgcolor: "black", borderRadius: 3, paddingTop: 1.2 }
                    : { bgcolor: "white", borderRadius: 3, paddingTop: 1.2 }
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
        <Grid container alignItems={"center"}>
          <Grid
            item
            lg={7}
            md={7}
            sm={7}
            xs={7}
            gap="2%"
            display="flex"
            direction={"row"}
            alignItems={"center"}
            width={"100%"}
            wrap={MD ? "wrap" : "nowrap"}
          >
            {filter && (
              <>
                <Grid
                  marginX={0.5}
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  lg={4}
                  marginY={1}
                  flex={1}
                >
                  <ControlledSelect
                    name="sort"
                    control={control}
                    label="Due Date: "
                    elementType="filter"
                    textTruncate={2}
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
                  lg={4}
                  marginY={1}
                >
                  <Box className="tasks-option">
                    <ControlledSelect
                      name="status"
                      control={control}
                      label="Status: "
                      elementType="filter"
                      textTruncate={3}
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
                  lg={4}
                  marginY={1}
                >
                  <Box className="tasks-option">
                    <ControlledSelect
                      name="projectId"
                      control={control}
                      label="Project: "
                      elementType="filter"
                      textTruncate={4}
                      onSelect={(e: any) => {
                        onChangeFilter(e, "projectId");
                      }}
                      options={projectOptions}
                    />
                  </Box>
                </Grid>
              </>
            )}
            <Grid marginX={0.5} item xs={1} sm={12} md={2} lg={2}>
              <DeleteTask
                task={selects}
                Show={Show}
                setShow={setShow}
                onDelete={onDeleteTasks}
              />
            </Grid>
          </Grid>
          <Grid
            item
            display="flex"
            justifyContent={"flex-end"}
            xs={5}
            sm={5}
            md={5}
            lg={5}
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
                  size={"medium"}
                />
              )}
            />
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
          <Paper className="tsk-container">
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
