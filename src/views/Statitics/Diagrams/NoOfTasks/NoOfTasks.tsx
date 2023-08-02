import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import "../../style.css";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { Category, selectAllCategories } from "src/models/Categories";
import { Line } from "react-chartjs-2";
import { selectAllDepartments } from "src/models/Departments";
import { ITeam } from "src/types/models/Departments";
import _ from "lodash";
import {
  Months,
  getRandomColor,
  getTaskJournies,
} from "src/helpers/generalUtils";
import { Task, TaskMovement } from "src/types/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { Journies } from "src/types/views/Statistics";
import { Manager, selectPMs } from "src/models/Managers";
import IMAGES from "src/assets/img/Images";
import FilterBar from "./FilterMenu";
import { data } from "cypress/types/jquery";

interface StateType {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  options: any;
  comparisonBy: string;
  year: number;
  quarter?: number;
}

interface ITaskInfo extends Task {
  clientId?: string;
  projectManager?: string;
}

/**
 * Time of delivery diagram by the Category
 * @param param0
 * @returns
 */
const NoOfTasks = () => {
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const allCategories = useAppSelector(selectAllCategories);
  const departments = useAppSelector(selectAllDepartments);
  const allManagers = useAppSelector(selectPMs);
  const allClients = useAppSelector(selectAllClients);
  const [allTeams, setAllTeams] = useState<ITeam[]>([]);
  const [filterPopup, openFilterPopup] = useState(false);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);
  const [allJournies, setAllJournies] = useState<Journies>([]);
  const [journies, setJournies] = useState<Journies>([]);

  const [state, setState] = useState<StateType>({
    data: {
      labels: [],
      datasets: [],
    },
    options: null,
    comparisonBy: "Teams",
    year: new Date(Date.now()).getFullYear(),
    quarter: 1,
  });

  useEffect(() => {
    let tasksData = [...allTasks];
    let newTasks: ITaskInfo[] = tasksData.map((item) => {
      let project = projects.find((project) => project._id === item.projectId);
      let newTask: ITaskInfo = {
        ...item,
        clientId: project?.clientId,
        projectManager: project?.projectManager,
      };
      return newTask;
    });
    setTasks([...newTasks]);
  }, [projects, allTasks]);

  useEffect(() => {
    let journiesData = tasks.map((item) => getTaskJournies(item).journies);
    let flattenedJournies = _.flatten(journiesData);
    flattenedJournies = flattenedJournies.map((item) => {
      let shared =
        item.movements &&
        _.findLast(
          item.movements,
          (move: TaskMovement) => move.status === "Shared"
        )?.movedAt;
      return {
        ...item,
        sharedAtMonth: shared
          ? new Date(shared).toLocaleString("en-us", { month: "long" })
          : undefined,
        startedAt: new Date(item.movements[0].movedAt).toLocaleString("en-us", {
          month: "long",
        }),
      };
    });
    setJournies(flattenedJournies);
    setAllJournies(flattenedJournies);
  }, [tasks]);

  useEffect(() => {
    setClients(allClients);
  }, [allClients]);

  useEffect(() => {
    setManagers(allManagers);
  }, [allManagers]);

  useEffect(() => {
    setCategories(allCategories);
  }, [allCategories]);

  useEffect(() => {
    setAllTeams(_.flattenDeep(departments.map((item) => item.teams)));
    setTeams(_.flattenDeep(departments.map((item) => item.teams)));
  }, [departments]);

  useEffect(() => {
    let months = Months;
    const data = {
      labels: months,
      datasets: onGetDatasetsByAll(),
    };
    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value: number = context.dataset.data[context.dataIndex];
              return `${context.dataset.label}= ${value} journeys`;
            },
          },
        },
      },
      scales: {
        x: {
          type: "category",
          position: "bottom",
          ticks: {
            beginAtZero: true,
          },
        },
        y: {
          min: 0,
        },
      },
    };
    setState({ ...state, options, data });
  }, [journies, state.comparisonBy]);

  const onSetFilterResult = (filter: {
    clients: string[];
    managers: string[];
    categories: string[];
    teams: string[];
  }) => {
    setTeams(allTeams.filter((i) => i._id && filter.teams.includes(i._id)));
    setManagers(
      allManagers.filter((i) => i._id && filter.managers.includes(i._id))
    );
    setClients(
      allClients.filter((i) => i._id && filter.clients.includes(i._id))
    );
    setCategories(
      allCategories.filter((i) => i._id && filter.categories.includes(i._id))
    );
    setJournies(
      allJournies.filter(
        (j) =>
          j.teamId &&
          filter.teams.includes(j.teamId) &&
          j.projectManager &&
          filter.managers.includes(j.projectManager) &&
          j.categoryId &&
          filter.categories.includes(j.categoryId) &&
          j.clientId &&
          filter.clients.includes(j.clientId)
      )
    );
  };

  const onGetDatasetsByAll = () => {
    let bgColors: string[] = [];
    let borderColors: string[] = [];
    let months = Months;

    let types = [
      {
        type: "total",
        journies: journies,
      },
      {
        type: "revised",
        journies: _.flattenDeep(
          allTasks
            .map((i) => getTaskJournies(i))
            .filter((j) => j.journies.length > 1)
            .map((i) =>
              i.journies.map((j) => {
                return {
                  ...j,
                  startedAt: new Date(j.movements[0].movedAt).toLocaleString(
                    "us-en",
                    { month: "long" }
                  ),
                };
              })
            )
        ),
      },
      {
        type: "unique",
        journies: _.flattenDeep(
          allTasks
            .map((i) => getTaskJournies(i))
            .filter((j) => j.journies.length === 1)
            .map((i) =>
              i.journies.map((j) => {
                return {
                  ...j,
                  startedAt: new Date(j.movements[0].movedAt).toLocaleString(
                    "us-en",
                    { month: "long" }
                  ),
                };
              })
            )
        ),
      },
    ];
    return types.map((type) => {
      let color = "rgb(255,207,36,0.2)";
      let borderColor = "rgb(255,207,36)";
      let jounriesGroupedByMonth = _.groupBy(type.journies, "startedAt");

      let dataset = months.map((month) => {
        let data = jounriesGroupedByMonth[month];
        return {
          data: data ?? [],
          color,
          borderColor,
          comparisonId: type.type,
          name: type.type,
        };
      });
      return {
        label: type.type,
        data: dataset.map((i) => i.data.length),
        backgroundColor: dataset.map((i) => i.color),
        borderColor: dataset.map((i) => i.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      };
    });
  };

  return (
    <Grid
      container
      sx={{
        background: "white",
        borderRadius: "5px",
        margin: "8px",
        padding: 1,
        marginBottom: 2,
        justifyContent: "space-between",
      }}
    >
      <Typography fontSize={18} mb={1} fontWeight={"600"}>
        Total Number of Tasks
      </Typography>
      <Grid xs={2}>
        <IconButton
          disableRipple
          onClick={() => openFilterPopup(true)}
          sx={filterBtnStyle}
        >
          <img src={IMAGES.filtericon} alt="FILTER" />
        </IconButton>
      </Grid>
      <Line options={state.options} data={state.data} />
      <FilterBar
        allOptions={{
          clients: allClients,
          managers: allManagers,
          categories: allCategories,
          teams: allTeams,
        }}
        options={{ clients, managers, categories, teams }}
        filter={filterPopup}
        onCloseFilter={() => openFilterPopup(false)}
        onSetFilterResult={onSetFilterResult}
      />
    </Grid>
  );
};

export default NoOfTasks;

const filterBtnStyle = {
  bgcolor: "#FAFAFB",
  borderRadius: 3,
  paddingTop: 1.2,
  float: "right",
  cursor: "pointer",
  width: "38px",
  height: "38px",
  textAlign: "center",
};
