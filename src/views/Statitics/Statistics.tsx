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

type stateType = {
  filter: boolean;
  loading: boolean;
};

const Statistics = (props: any) => {
  const dispatch = useDispatch();
  const allDepartments = useAppSelector(selectAllDepartments);
  const allTeams = useAppSelector(selectAllTeams);
  const allManagers = useAppSelector(selectManagers);
  const allClients = useAppSelector(selectAllClients);
  const allCategories = useAppSelector(selectAllCategories);
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const [state, setState] = useState<{
    filter: boolean;
    options: {
      teams: ITeam[];
      clients: Client[];
      managers: Manager[];
      categories: Category[];
      boards: IDepartmentState[];
    };
  }>({
    filter: false,
    options: {
      teams: [],
      clients: [],
      managers: [],
      categories: [],
      boards: [],
    },
  });

  useEffect(() => {
    let State = {
      ...state,
      options: {
        managers: allManagers,
        clients: allClients,
        categories: allCategories,
        teams: allTeams,
        boards: allDepartments.filter((d) => d.priority === 1),
      },
    };
    setState(State);
  }, [
    allClients,
    allCategories,
    allTasks,
    allTeams,
    allDepartments,
    allManagers,
  ]);

  const onSetFilterResult = (filter: {
    clients: string[];
    managers: string[];
    categories: string[];
    teams: string[];
    boards: string[];
  }) => {
    let State = { ...state };
    State.options = {
      managers: allManagers.filter((i) => filter.managers.includes(i._id)),
      clients: allClients.filter((i) => filter.clients.includes(i._id)),
      teams: allTeams.filter((i) => filter.teams.includes(i._id ?? "")),
      categories: allCategories.filter((i) =>
        filter.categories.includes(i._id)
      ),
      boards: allDepartments.filter((i) => filter.boards.includes(i._id)),
    };
    setState(State);
    dispatch(updateDepartmentsPriority(filter.boards));
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
        <Grid xs={12} height={"auto"}>
          <TodByCategory departments={state.options.boards} />
        </Grid>
        <Grid xs={12} height={"auto"}>
          <BySharedMonth departments={state.options.boards} />
        </Grid>
        <Grid xs={12} height={"auto"}>
          <MeetDeadline departments={state.options.boards} />
        </Grid>
        <Grid xs={12} height={"auto"}>
          <NoOfRevision departments={state.options.boards} />
        </Grid>
        <Grid xs={12} height={"auto"}>
          <NoOfTasks />
        </Grid>
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
