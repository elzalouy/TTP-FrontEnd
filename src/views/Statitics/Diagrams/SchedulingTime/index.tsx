import { Grid, IconButton, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import IMAGES from "src/assets/img/Images";
import FilterBar from "./FilterMenu";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import { useAppSelector } from "src/models/hooks";
import { Manager, selectManagers } from "src/models/Managers";
import { selectAllTeams } from "src/models/Departments";
import { Client, selectAllClients } from "src/models/Clients";
import { Category, selectAllCategories } from "src/models/Categories";
import { ITaskInfo, Journies } from "src/types/views/Statistics";
import { selectAllProjects } from "src/models/Projects";
import { Task, TaskMovement } from "src/types/models/Projects";
import { Months, getTaskJournies } from "src/helpers/generalUtils";
import { getJourneySchedulingTime } from "../../utils";
import _ from "lodash";

interface SchedulingTimeProps {
  options: {
    teams: ITeam[];
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    boards: IDepartmentState[];
    tasks: Task[];
  };
}
type StateType = {
  filterPopup: boolean;
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
};
const SchedulingTime: FC<SchedulingTimeProps> = ({ options }) => {
  const [state, setState] = useState<StateType>({
    filterPopup: false,
    data: {
      labels: [],
      datasets: [],
    },
    options: null,
    comparisonBy: "Departments",
  });
  const { projects } = useAppSelector(selectAllProjects);
  const [departments, setDepartments] = useState<IDepartmentState[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [journies, setJournies] = useState<Journies>([]);
  const [allJournies, setAllJournies] = useState<Journies>([]);
  useEffect(() => {
    setTeams(options.teams);
  }, [options.teams]);
  useEffect(() => {
    setDepartments(
      state.comparisonBy === "Departments"
        ? options.boards.slice(0, 4)
        : options.boards
    );
  }, [options.boards, state.comparisonBy]);

  useEffect(() => {
    setManagers(options.managers);
  }, [options.managers]);

  useEffect(() => {
    setCategories(options.categories);
  }, [options.categories]);

  useEffect(() => {
    setClients(options.clients);
  }, [options.clients]);

  useEffect(() => {
    let tasksData = [...options.tasks];
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
  }, [projects, options.tasks]);

  useEffect(() => {
    let journiesData = tasks.map((item) => getTaskJournies(item).journies);
    let flattenedJournies = _.flatten(journiesData);
    flattenedJournies = flattenedJournies.map((item) => {
      let start = item.movements && item.movements[0]?.movedAt;
      return {
        ...item,
        startedAtMonth: start
          ? new Date(start).toLocaleString("en-us", { month: "long" })
          : undefined,
      };
    });
    setJournies(flattenedJournies);
    setAllJournies(flattenedJournies);
  }, [tasks]);

  useEffect(() => {
    let months = Months;
    const data = {
      labels: months,
      datasets:
        state.comparisonBy === "Departments"
          ? onGetDataSetsByDepartments()
          : [onGetDatasetsByAll()],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value: number = context.dataset.data[context.dataIndex];
              let totalHours = value * 24;
              let days = Math.floor(totalHours / 24);
              const hours = Math.floor(totalHours % 24);
              return [
                `${context.dataset.label} :-`,
                `${days} days, ${hours} hours`,
              ];
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
          title: {
            display: true,
            text: "Month",
            poisition: "bottom",
            align: "end",
            color: "black",
          },
        },
        y: {
          ticks: {
            beginAtZero: true,
          },
          min: 0,
          title: {
            display: true,
            text: "Review Time (Days & Hours)",
            poisition: "top",
            align: "end",
            color: "black",
          },
        },
      },
    };
    setState({ ...state, options, data });
  }, [teams, managers, clients, categories, journies, state.comparisonBy]);

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, comparisonBy: e.target.value });
  };
  const onSetFilterResult = (filter: {
    clients: string[];
    categories: string[];
    teams: string[];
  }) => {
    setTeams(
      options.teams.filter((i) => i._id && filter.teams.includes(i._id))
    );
    setClients(
      options.clients.filter((i) => i._id && filter.clients.includes(i._id))
    );
    setCategories(
      options.categories.filter(
        (i) => i._id && filter.categories.includes(i._id)
      )
    );
    setJournies(
      allJournies.filter(
        (j) =>
          j.teamId &&
          filter.teams.includes(j.teamId) &&
          j.categoryId &&
          filter.categories.includes(j.categoryId) &&
          j.clientId &&
          filter.clients.includes(j.clientId)
      )
    );
  };

  const onGetDataSetsByDepartments = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";
    return departments.map((department, index) => {
      let journiesData = journies.filter(
        (i) => i.boardId && i.boardId === department.boardId
      );
      let journiesOfManagerGroupedByBoard = {
        ..._.groupBy(journiesData, "startedAtMonth"),
      };
      let datasetData = months.map((item) => {
        let journies = journiesOfManagerGroupedByBoard[item.id];
        return {
          journies: journies ?? [],
          color,
          borderColor,
          comparisonId: department.boardId,
        };
      });
      return {
        label: department.name,
        data: datasetData.map((i) => {
          let val =
            _.sum(
              i.journies.map((journey) => getJourneySchedulingTime(journey))
            ) /
            i.journies.length /
            24;
          return val > 0 ? val : 0;
        }),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      };
    });
  };
  const onGetDatasetsByAll = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });

    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";

    let datasetData = months.map((month) => {
      let journiesData = journies.filter(
        (item) => item.startedAtMonth === month.id
      );
      return {
        journies: journiesData ?? [],
        color,
        borderColor,
        comparisonId: month.id,
        name: month.name,
      };
    });

    return {
      label: "",
      data: datasetData.map((i) => {
        let val =
          _.sum(
            i.journies.map((journey) => getJourneySchedulingTime(journey))
          ) /
          i.journies.length /
          24;

        return val > 0 ? val : 0;
      }),
      backgroundColor: datasetData.map((i) => i.color),
      borderColor: datasetData.map((i) => i.borderColor),
      borderWidth: 3,
      hoverBorderWidth: 4,
      skipNull: true,
    };
  };
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          background: "white",
          borderRadius: "5px",
          margin: "8px",
          pl: 1,
          pr: 1,
          pt: 1,
          marginBottom: 2,
          justifyContent: "space-between",
        }}
      >
        <Grid xs={10}>
          <Typography fontSize={18} mb={1} fontWeight={"600"}>
            Scheduling Time
          </Typography>
        </Grid>
        <Grid xs={2}>
          <IconButton
            disableRipple
            onClick={() => setState({ ...state, filterPopup: true })}
            sx={filterBtnStyle}
          >
            <img src={IMAGES.filtericon} alt="FILTER" />
          </IconButton>
        </Grid>
        <Line options={state.options} data={state.data} />
        <form className="ComparisonOptions">
          <input
            type="checkbox"
            id="all-scheduling"
            value={"All"}
            name="all-scheduling"
            checked={state.comparisonBy === "All"}
            onChange={onHandleChange}
          />
          <label htmlFor="all-scheduling">All</label>
          <input
            id="scheduling-departments"
            type="checkbox"
            value={"Departments"}
            name="scheduling-departments"
            checked={state.comparisonBy === "Departments"}
            onChange={onHandleChange}
          />
          <label htmlFor="scheduling-departments">Departments</label>
        </form>
      </Grid>
      <FilterBar
        allOptions={{
          clients: options.clients,
          categories: options.categories,
          teams: options.teams,
          managers: options.managers,
          departments: options.boards,
        }}
        options={{ clients, teams, categories, managers, departments }}
        filter={state.filterPopup}
        onCloseFilter={() => setState({ ...state, filterPopup: false })}
        onSetFilterResult={onSetFilterResult}
      />
    </>
  );
};

export default SchedulingTime;
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
