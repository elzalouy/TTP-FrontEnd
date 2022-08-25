import { Grid, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import IMAGES from "../../../assets/img/Images";
import SearchBox from "../../../coreUI/components/Inputs/SearchBox";
import SelectInput from "../../../coreUI/components/Inputs/SelectInput";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppSelector } from "../../../models/hooks";
import TasksTable from "../../../coreUI/components/Tables/TasksTable";
import {
  filterTasks,
  selectAllProjects,
  ProjectsActions,
  deleteTasks,
} from "../../../models/Projects";
import DeleteTask from "../Delete/DeleteTaskFromTaskTable";
import "./TasksListView.css";
import Loading from "../../../coreUI/usable-elements/Loading";
import { ProjectsInterface } from "../../../types/models/Projects";
interface Props {
  projectId?: string;
}
export const TasksListView: React.FC<Props> = (props: any) => {
  const dispatch = useDispatch();
  const projects: ProjectsInterface = useAppSelector(selectAllProjects);
  const [selects, setAllSelected] = React.useState<string[]>([]);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const LG = useMediaQuery(theme.breakpoints.up("md"));
  const [Show, setShow] = React.useState("none");
  const [filter, setFilter] = React.useState(true);
  const { watch, control, setValue } = useForm();

  React.useEffect(() => {
    //To clear all filters on each page change
    dispatch(filterTasks({}));

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
      <Grid display="flex" justifyContent={"space-between"} width="100%">
        <Grid direction="row" justifyContent="flex-start" alignItems="center">
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
                  projects?.projects?.find(
                    (item) => item._id === props.projectId
                  )?.name
                }
              </>
            )}
          </Typography>
        </Grid>
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
      </Grid>
      <Grid
        marginBottom={2}
        container
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
              <Controller
                control={control}
                name="deadline"
                render={(props) => (
                  <SelectInput
                    label="Due Date: "
                    {...props}
                    options={[
                      { id: "All", text: "All", value: "" },
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
            <Grid marginX={0.5} item xs={6} sm={3} md={3} lg={4} marginY={1}>
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
                        { id: "All", value: "", text: "All" },
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

            <Grid marginX={0.5} item xs={4} sm={3} md={3} lg={4} marginY={1}>
              <Box className="tasks-option">
                <Controller
                  name="projectId"
                  control={control}
                  render={(props) => (
                    <SelectInput
                      label={"Project: "}
                      {...props}
                      options={[
                        { id: "All", value: "", text: "All" },
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
        <div style={{ width: "20px" }}></div>
        <Grid
          width="100%"
          display="flex"
          justifyContent={"flex-end"}
          alignItems="center"
        >
          <Grid marginX={0.5} item xs={6} sm={6} md={6} lg={6} marginY={1}>
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
                      console.log(e);
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