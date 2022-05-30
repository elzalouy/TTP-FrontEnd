import { Grid, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import IMAGES from "../../assets/img/index";
import SearchBox from "../../coreUI/usable-component/Inputs/SearchBox";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { selectPMs } from "../../redux/PM/pm.selectors";
import { useAppSelector } from "../../redux/hooks";
import TasksTable from "../../coreUI/usable-component/Tables/TasksTable";
import {
  filterTasks,
  selectAllProjects,
  ProjectsInterface,
  ProjectsActions,
  deleteTasks,
} from "../../redux/Projects";
import { selectAllMembers } from "../../redux/techMember";
import DeleteTask from "./DeleteTask";
import "./TasksListView.css";
interface Props {
  projectId?: string;
}
const Tasks: React.FC<Props> = (props: any) => {
  const dispatch = useDispatch();
  const projects: ProjectsInterface = useAppSelector(selectAllProjects);
  const techMembers = useAppSelector(selectAllMembers);
  const pMs = useAppSelector(selectPMs);
  const [selects, setAllSelected] = React.useState<string[]>([]);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const [Show, setShow] = React.useState("none");
  const { register, watch, control, setValue } = useForm();

  React.useEffect(() => {
    if (props?.location?.state?.projectId) {
      setValue("projectId", props?.location?.state?.projectId);
      let filter = watch();
      dispatch(filterTasks(filter));
    }
  }, []);

  const onHandleChange = (e: any) => {
    e.preventDefault();
    let filter = watch();
    dispatch(filterTasks(filter));
  };

  const onHandleSort = (e: any) => {
    let filter = watch();
    dispatch(ProjectsActions.onSortTasks(filter.deadline));
  };

  const onDeleteTasks = async () => {
    let filter = watch();
    dispatch(deleteTasks({ data: { ids: selects }, dispatch: dispatch }));
    setShow("none");
  };

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
      <Stack direction="row" justifyContent="flex-start" alignItems="center">
        <Typography
          variant="h2"
          marginBottom={2}
          marginTop={SM ? 5 : MD ? 2 : 0}
        >
          Tasks
          {props.projectId && (
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
      </Stack>
      <Grid marginBottom={2} container direction={"row"} alignItems={"center"}>
        <Grid
          marginX={0.5}
          item
          xs={6}
          sm={3}
          md={2}
          lg={2}
          marginY={1}
          flex={1}
        >
          <Controller
            control={control}
            name="deadline"
            render={(props) => (
              <SelectInput
                label="Due Date: "
                {...props}
                options={[
                  { id: "", text: "All", value: "all" },
                  { id: "asc", text: "Ascending", value: "asc" },
                  { id: "desc", text: "Descending", value: "desc" },
                ]}
                handleChange={(e) => {
                  e.preventDefault();
                  props.field.onChange(e);
                  onHandleSort(e);
                }}
                selectValue={props.field.value}
                selectText={props.field.value}
              />
            )}
          />
        </Grid>
        <div style={{ width: "20px" }}></div>
        <Grid marginX={0.5} item xs={6} sm={3} md={2} lg={2} marginY={1}>
          <Box className="tasks-option">
            <Controller
              name="status"
              control={control}
              render={(props) => (
                <SelectInput
                  label="Status: "
                  placeholder="All"
                  {...props}
                  options={[
                    { id: "", value: "", text: "All" },
                    {
                      id: "not started",
                      value: "Not Started",
                      text: "Not Started",
                    },
                    { id: "not clear", value: "Not Clear", text: "Not Clear" },
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
                  ]}
                  handleChange={(e) => {
                    e.preventDefault();
                    props.field.onChange(e);
                    onHandleChange(e);
                  }}
                  selectValue={props.field.value}
                  selectText={props.field.value}
                />
              )}
            />
          </Box>
        </Grid>
        <div style={{ width: "20px" }}></div>
        {/* <Grid marginX={0.5} item xs={8} sm={4} md={2} lg={2} marginY={1}>
          <Box className="tasks-option">
            <Controller
              name="projectManager"
              control={control}
              render={(props) => (
                <SelectInput
                  label={"Project Manager: "}
                  {...props}
                  options={[
                    { id: "", value: "", text: "All" },
                    ...pMs.map((pm) => {
                      return { id: pm._id, value: pm.name, text: pm.name };
                    }),
                  ]}
                  handleChange={(e) => {
                    e.preventDefault();
                    props.field.onChange(e);
                    onHandleChange(e);
                  }}
                  selectValue={props.field.value}
                  selectText={props.field.value}
                />
              )}
            />
          </Box>
        </Grid> */}
        <Grid marginX={0.5} item xs={4} sm={3} md={2} lg={2} marginY={1}>
          <Box className="tasks-option">
            <Controller
              name="projectId"
              control={control}
              render={(props) => (
                <SelectInput
                  label={"Project: "}
                  {...props}
                  options={[
                    { id: "", value: "", text: "All" },
                    ...projects.projects?.map((item) => {
                      return {
                        id: item._id,
                        value: item._id,
                        text: item.name,
                      };
                    }),
                  ]}
                  handleChange={(e) => {
                    e.preventDefault();
                    props.field.onChange(e);
                    onHandleChange(e);
                  }}
                  selectValue={props.field.value}
                  selectText={
                    projects?.projects?.find(
                      (val) => val._id === props.field.value
                    )?.name
                  }
                />
              )}
            />
          </Box>
        </Grid>
        <div style={{ width: "20px" }}></div>
        {/*  <Grid marginX={0.5} item xs={6} sm={3} md={2} lg={2} marginY={1}>
          <Controller
            name="memberId"
            control={control}
            render={(props) => (
              <SelectInput
                label={"Members:"}
                {...props}
                options={[
                  { id: "", value: "", text: "All" },
                  ...techMembers.techMembers.map((item) => {
                    return {
                      id: item._id,
                      value: item._id,
                      text: item.name,
                    };
                  }),
                ]}
                handleChange={(e) => {
                  e.preventDefault();
                  props.field.onChange(e);
                  onHandleChange(e);
                }}
                selectValue={props.field.value}
                selectText={
                  techMembers.techMembers.find(
                    (val) => val._id === props.field.value
                  )?.name
                }
              />
            )}
          />
        </Grid> */}
        <Grid marginX={0.5} item xs={6} sm={3} md={2} lg={2} marginY={1}>
          <Box
            style={
              SM
                ? {
                    backgroundColor: "#fafafa",
                    width: "100%",
                    marginLeft: "5px",
                  }
                : {
                    backgroundColor: "#fafafa",
                    width: "100%",
                    marginLeft: "0px",
                  }
            }
          >
            <Controller
              name="name"
              control={control}
              render={(props) => (
                <SearchBox
                  onChange={(e) => {
                    props.field.onChange(e);
                    onHandleChange(e);
                  }}
                  value={props.field.value}
                  placeholder="Search"
                />
              )}
            />
          </Box>
        </Grid>
        <div style={{ width: "20px" }}></div>
        <Grid marginX={0.5} item xs={2} sm={2} md={1}>
          <DeleteTask
            task={selects}
            Show={Show}
            setShow={setShow}
            onDelete={onDeleteTasks}
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
            <img src={IMAGES.progressCircles} alt="sortout" />{" "}
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
export default Tasks;
