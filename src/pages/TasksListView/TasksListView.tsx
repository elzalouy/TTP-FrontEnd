import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import IMAGES from "../../assets/img/index";
import SearchBox from "../../coreUI/usable-component/Inputs/SearchBox";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getAllCategories } from "../../redux/Categories";
import { getAllClients, clientsDataSelector } from "../../redux/Clients";
import { getAllDepartments } from "../../redux/Departments";
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

const Tasks: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const projects: ProjectsInterface = useAppSelector(selectAllProjects);
  const techMembers = useAppSelector(selectAllMembers);
  const [selects, setAllSelected] = React.useState<string[]>([]);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down('sm'));
  const MD = useMediaQuery(theme.breakpoints.down('md'));
  const [Show, setShow] = React.useState("none");
  const { register, watch, control } = useForm();

  const onHandleChange = (e: any) => {
    console.log("called");
    e.preventDefault();
    let filter = watch();
    dispatch(filterTasks(filter));
  };

  const onHandleSort = (e: any) => {
    let filter = watch();
    dispatch(ProjectsActions.onSortTasks(filter.deadline));
  };

  const onDeleteTasks = async () => {
    dispatch(deleteTasks({ data: { ids: selects }, dispatch: dispatch }));
    setShow("none");
  };

  React.useEffect(() => {
    console.log("changed");
    console.log(projects.allTasks);
  }, [projects.allTasks]);

  return (
    <Grid
      bgcolor={"#FAFAFB"}
      justifyContent={"flex-start"}
      alignItems="flex-start"
      container
      alignContent={"flex-start"}
      alignSelf="flex-start"
      padding={SM ? 2 : 4}
      marginTop={MD ? 10 : 0}
      sx={{ backgroundColor: "#FAFAFB" }}
    >
      <Typography variant="h2" marginBottom={2}>
        Tasks
      </Typography>
      <Grid marginBottom={2} container direction={"row"}>
        <Grid marginX={0.5} item xs={12} sm={12} md={4} lg={2} marginY={1}>
          <Controller
            control={control}
            name="deadline"
            render={(props) => (
              <SelectInput
                label="Due Date: "
                {...props}
                options={[
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
        <Grid marginX={0.5} item xs={12} sm={12} md={4} lg={2} marginY={1}>
          <Box className="tasks-option">
            <Controller
              name="status"
              control={control}
              render={(props) => (
                <SelectInput
                  label="Status: "
                  {...props}
                  options={[
                    { id: "", value: "", text: "All" },
                    {
                      id: "inProgress",
                      value: "inProgress",
                      text: "In Progres",
                    },
                    { id: "shared", value: "shared", text: "Shared" },
                    { id: "late", value: "late", text: "late" },
                    { id: "not clear", value: "not clear", text: "Not Clear" },
                    { id: "canceled", value: "canceled", text: "Canceled" },
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
        <Grid marginX={0.5} item xs={12} sm={12} md={4} lg={2} marginY={1}>
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
        <Grid marginX={0.5} item xs={12} sm={12} md={4} lg={2} marginY={1}>
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
        </Grid>
        <Grid marginX={0.5} item xs={2} sm={4} marginY={1}>
          <DeleteTask Show={Show} setShow={setShow} onDelete={onDeleteTasks} />
        </Grid>
        <Grid marginX={0.5} item xs={8} sm={8} md={4} lg={2.5} marginY={1}>
          <Box
            style={SM ? { backgroundColor: "#fafafa",
            width: "100%",
            marginLeft: "5px",} : {
              backgroundColor: "#fafafa",
              width: "100%",
              marginLeft: "20px",
            }}
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
                />
              )}
            />
          </Box>
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
              tasks={projects.allTasks}
              {...props}
            />
          </Paper>
        </>
      )}
    </Grid>
  );
};
export default Tasks;
