import { Grid, IconButton, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import TodByCategory from "./Diagrams/TimeOfDelivery(TOD)/ByCategory/ByCategory";
import BySharedMonth from "./Diagrams/TimeOfDelivery(TOD)/BySharedDate/BySharedDate";
import MeetDeadline from "./Diagrams/MeetDeadline/MeetDeadline";
import NoOfRevision from "./Diagrams/NoOfRevision/NoOfRevision";
import NoOfTasks from "./Diagrams/NoOfTasks/NoOfTasks";
import FilterMenu from "./FilterMenu";
import { useAppSelector } from "src/models/hooks";
import {
  selectAllDepartments,
  selectAllTeams,
  updateDepartmentsPriority,
} from "src/models/Departments";
import { Client, selectAllClients } from "src/models/Clients";
import { selectAllProjects } from "src/models/Projects";
import { Project, Task } from "src/types/models/Projects";
import { User } from "src/types/models/user";
import { Manager, selectManagers } from "src/models/Managers";
import { Category, selectAllCategories } from "src/models/Categories";
import { DialogOption } from "src/types/components/SelectDialog";
import { useDispatch } from "react-redux";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import IMAGES from "src/assets/img/Images";
import ReviewTime from "./Diagrams/ReviewTime";
import SchedulingTime from "./Diagrams/SchedulingTime";
import ProjectsReport from "./Diagrams/ProjectsReport";
import {
  selectStatisticsFilterDefaults,
  setStatisticsFilterDefaults,
} from "src/models/Statistics";

type time = {
  hours: number;
  mins: number;
  totalDurationsAndTimes: {
    taskId: string;
    times: number;
    movesTimesMins: number;
  }[];
  totalTimesInAllTasks: number;
};

const Statistics = (props: any) => {
  // Global State
  const dispatch = useDispatch();
  const allDepartments = useAppSelector(selectAllDepartments);
  const allTeams = useAppSelector(selectAllTeams);
  const allManagers = useAppSelector(selectManagers);
  const allClients = useAppSelector(selectAllClients);
  const allCategories = useAppSelector(selectAllCategories);
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const { date, boards } = useAppSelector(selectStatisticsFilterDefaults);
  // Component State
  const [state, setState] = useState<{
    filter: boolean;
    mounted: boolean;
    boardIds: string[];
    options: {
      teams: ITeam[];
      clients: Client[];
      managers: Manager[];
      categories: Category[];
      boards: IDepartmentState[];
      tasks: Task[];
    };
  }>({
    filter: false,
    mounted: false,
    boardIds: [],
    options: {
      teams: [],
      clients: [],
      managers: [],
      categories: [],
      boards: allDepartments.filter((p) => p.priority === 1),
      tasks: [],
    },
  });

  useEffect(() => {
    if (
      allClients.length > 0 &&
      allTasks.length > 0 &&
      allCategories.length > 0 &&
      allTeams &&
      allDepartments.length > 0 &&
      state.mounted === false
    ) {
      let boardIds = allDepartments
        .filter((i) => i.priority === 1)
        .map((i) => i.boardId);
      let boards = allDepartments.filter((i) => i.priority === 1);

      let teams = _.flattenDeep(boards.map((i) => i.teams)).filter(
        (team) => team.isDeleted === false
      );

      let State = {
        ...state,
        mounted: true,
        boardIds: boardIds,
        options: {
          managers: allManagers,
          clients: allClients,
          categories: allCategories,
          teams: teams,
          boards: allDepartments.filter((i) => i.priority === 1),
          tasks: allTasks.filter((task) => {
            if (boardIds.includes(task.boardId)) {
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
          }),
        },
      };
      setState(State);
    }
  }, [
    allClients,
    allCategories,
    allTasks,
    allTeams,
    allDepartments,
    allManagers,
    state.mounted,
  ]);

  const onSetFilterResult = (filter: { boards: string[]; date: Date }) => {
    let boardIds = allDepartments
      .filter((i) => filter.boards.includes(i.boardId))
      .map((b) => b.boardId);
    let depIds = allDepartments
      .filter((i) => boardIds.includes(i.boardId))
      .map((i) => i._id);
    setState({
      ...state,
      options: {
        ...state.options,
        tasks: allTasks.filter((task) => {
          if (boardIds.includes(task.boardId)) {
            if (
              task.cardCreatedAt &&
              new Date(task.cardCreatedAt).getTime() >=
                new Date(filter.date).getTime()
            ) {
              return task;
            } else if (
              task.createdAt &&
              new Date(task.createdAt).getTime() >=
                new Date(filter.date).getTime()
            )
              return task;
          }
        }),
        teams: _.flattenDeep(
          allDepartments
            .filter((i) => boardIds.includes(i.boardId))
            .map((i) => i.teams)
        ),
        boards: allDepartments.filter((item) =>
          boardIds.includes(item.boardId)
        ),
      },
    });
    dispatch(
      setStatisticsFilterDefaults({ boards: boardIds, date: filter.date })
    );
    dispatch(
      updateDepartmentsPriority({
        data: depIds,
        boardIds: boardIds,
      })
    );
  };

  return (
    <>
      <Grid
        container
        justifyContent={"flex-start"}
        alignItems={"center"}
        direction={"row"}
        bgcolor={"#FAFAFB"}
      >
        <Grid container xs={12} direction={"row"}>
          <Grid item xs={10} mb={4}>
            <Typography variant="h2" fontFamily={"Cairo"}>
              Statistics
            </Typography>
          </Grid>
          <Grid xs={2}>
            <IconButton
              disableRipple
              onClick={() => setState({ ...state, filter: !state.filter })}
              sx={filterBtnStyle}
            >
              <img
                src={state.filter ? IMAGES.filtericonwhite : IMAGES.filtericon}
                alt="FILTER"
              />
            </IconButton>
          </Grid>
        </Grid>
        {state.mounted === true ? (
          <>
            <Grid xs={12} height={"auto"}>
              <TodByCategory options={{ ...state.options }} />
            </Grid>
            <Grid xs={12} height={"auto"}>
              <BySharedMonth options={{ ...state.options }} />
            </Grid>
            {/* <Grid xs={12} height={"auto"}>
              <MeetDeadline options={{ ...state.options }} />
            </Grid> */}
            {/* <Grid xs={12} height={"auto"}>
              <NoOfRevision options={{ ...state.options }} />
            </Grid> */}
            <Grid xs={12} height={"auto"}>
              <NoOfTasks options={{ ...state.options }} />
            </Grid>
            <Grid xs={12} height={"auto"}>
              <ReviewTime options={{ ...state.options }} />
            </Grid>
            <Grid xs={12} height={"auto"}>
              <SchedulingTime options={{ ...state.options }} />
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
      <FilterMenu
        onSetFilterResult={onSetFilterResult}
        filter={state.filter}
        onCloseFilter={() => setState({ ...state, filter: false })}
        options={{
          clients: state.options.clients,
          teams: state.options.teams,
          managers: state.options.managers,
          categories: state.options.categories,
          boards: state.options.boards,
        }}
        allOptions={{
          clients: allClients,
          managers: allManagers,
          categories: allCategories,
          teams: allTeams,
          boards: allDepartments,
        }}
      />
    </>
  );
};

export default Statistics;

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
