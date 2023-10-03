import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import "../../../style.css";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { Category, selectAllCategories } from "src/models/Categories";
import { Bar } from "react-chartjs-2";
import { selectAllDepartments, selectAllTeams } from "src/models/Departments";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import _ from "lodash";
import {
  Months,
  getTaskJournies,
  randomColors,
} from "src/helpers/generalUtils";
import { Task, TaskMovement } from "src/types/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { Journies } from "src/types/views/Statistics";
import { Manager, selectPMs } from "src/models/Managers";
import { getJourneyLeadTime } from "../../../utils";
import IMAGES from "src/assets/img/Images";
import ChartDataLabels from "chartjs-plugin-datalabels";
import FilterBar from "./FilterMenu";

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

type BySharedMonthProps = {
  options: {
    teams: ITeam[];
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    boards: IDepartmentState[];
    tasks: Task[];
  };
};
/**
 * Time of delivery diagram by the Category
 * @param param0
 * @returns
 */
const BySharedMonth = ({ options }: BySharedMonthProps) => {
  const { projects } = useAppSelector(selectAllProjects);
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
      };
    });
    setJournies(flattenedJournies);
    setAllJournies(flattenedJournies);
  }, [tasks]);

  useEffect(() => {
    setClients(
      state.comparisonBy === "Clients"
        ? options.clients.slice(0, 4)
        : options.clients
    );
  }, [options.clients, state.comparisonBy]);

  useEffect(() => {
    setManagers(
      state.comparisonBy === "PMs"
        ? options.managers.slice(0, 4)
        : options.managers
    );
  }, [options.managers, state.comparisonBy]);

  useEffect(() => {
    setCategories(options.categories);
  }, [options.categories]);

  useEffect(() => {
    setTeams(
      state.comparisonBy === "Teams" ? options.teams.slice(0, 4) : options.teams
    );
  }, [options.teams, state.comparisonBy]);

  useEffect(() => {
    let months = Months;
    const data = {
      labels: months,
      datasets:
        state.comparisonBy === "Clients"
          ? onGetDataSetsByClient()
          : state.comparisonBy === "PMs"
          ? onGetDataSetsByPM()
          : state.comparisonBy === "Teams"
          ? onGetDatasetsByTeams()
          : [onGetDatasetsByAll()],
    };

    let maxArray = data.datasets.map((item) => _.max(item.data));
    let max = _.max(maxArray);
    let maxN = max ? max : 100;

    const options = {
      plugins: {
        datalabels: {
          anchor: "end",
          align: "top",
          formatter: (value: any, context: any) => {
            const label = context.dataset.label;
            if (value > 0) {
              let totalHours = value * 24;
              let days = Math.floor(totalHours / 24);
              const hours = Math.floor(totalHours % 24);
              return [label, `(${days} days, ${hours} hours)`];
            } else return null;
          },
          font: {
            weight: "bold",
            size: "10px",
          },
        },
        legend: {
          display: false,
          position: "right",
          align: "start",
        },

        tooltip: {
          callbacks: {
            label: function (context: any) {
              const value: number = context.dataset.data[context.dataIndex];
              let totalHours = value * 24;
              let days = Math.floor(totalHours / 24);
              const hours = Math.floor(totalHours % 24);
              return `${context.dataset.label}:${days} days, ${hours} hours`;
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
          min: 0,
          max: Math.floor(maxN - (maxN % 5) + (maxN - (maxN % 5))),
          ticks: {
            beginAtZero: true,
            stepSize: 5,
          },
          title: {
            display: true,
            text: "TOD (Days & Hours)",
            poisition: "top",
            align: "end",
            color: "black",
          },
        },
      },
    };

    setState({ ...state, options, data });
  }, [teams, clients, managers, journies]);

  const onSetFilterResult = (filter: {
    clients: string[];
    managers: string[];
    categories: string[];
    teams: string[];
  }) => {
    setTeams(
      options.teams.filter((i) => i._id && filter.teams.includes(i._id))
    );
    setManagers(
      options.managers.filter((i) => i._id && filter.managers.includes(i._id))
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
          j.projectManager &&
          filter.managers.includes(j.projectManager) &&
          j.categoryId &&
          filter.categories.includes(j.categoryId) &&
          j.clientId &&
          filter.clients.includes(j.clientId)
      )
    );
  };

  const onGetDataSetsByPM = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    const result = managers.map((manager, index) => {
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

      let journiesData = journies.filter(
        (i) => i.projectManager && i.projectManager === manager._id
      );
      journiesData = journiesData.map((item) => {
        return { ...item, leadTime: getJourneyLeadTime(item) };
      });
      let journiesOfManagerGroupedByMonth = {
        ..._.groupBy(journiesData, "sharedAtMonth"),
      };
      let datasetData = months.map((item) => {
        let journies = journiesOfManagerGroupedByMonth[item.id];
        return {
          journies: journies ?? [],
          color,
          borderColor,
          comparisonId: manager._id,
        };
      });
      return {
        label: manager.name,
        data: datasetData.map(
          (i) =>
            _.sum(i.journies.map((j) => j.leadTime)) / i.journies.length / 24
        ),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      };
    });
    return result;
  };

  const onGetDataSetsByClient = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    const result = clients.map((client, index) => {
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

      let journiesData = journies.filter(
        (i) => i.clientId && i.clientId === client._id
      );
      journiesData = journiesData.map((item) => {
        return { ...item, leadTime: getJourneyLeadTime(item) };
      });
      let journiesOfManagerGroupedByMonth = {
        ..._.groupBy(journiesData, "sharedAtMonth"),
      };
      let datasetData = months.map((item) => {
        let journies = journiesOfManagerGroupedByMonth[item.id];
        return {
          journies: journies ?? [],
          color,
          borderColor,
          comparisonId: client._id,
        };
      });
      return {
        label: client.clientName,
        data: datasetData.map(
          (i) =>
            _.sum(i.journies.map((j) => j.leadTime)) / i.journies.length / 24
        ),
        datasetData,
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      };
    });
    return result;
  };

  const onGetDatasetsByTeams = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });

    return teams.map((team, index) => {
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

      let journiesData = journies.filter(
        (i) => i.teamId && i.teamId === team._id
      );
      journiesData = journiesData.map((item) => {
        return { ...item, leadTime: getJourneyLeadTime(item) };
      });
      let journiesOfManagerGroupedByMonth = {
        ..._.groupBy(journiesData, "sharedAtMonth"),
      };
      let datasetData = months.map((item) => {
        let journies = journiesOfManagerGroupedByMonth[item.id];
        return {
          journies: journies ?? [],
          color,
          borderColor,
          comparisonId: team._id,
        };
      });
      return {
        label: team.name,
        data: datasetData.map(
          (i) =>
            _.sum(i.journies.map((j) => j.leadTime)) / i.journies.length / 24
        ),
        datasetData,
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

    let datasetData = months.map((month, index) => {
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;
      let journiesData = journies.filter(
        (item) => item.sharedAtMonth === month.id
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
      data: datasetData.map(
        (i) =>
          _.sum(i.journies.map((journey) => getJourneyLeadTime(journey))) /
          i.journies.length /
          24
      ),
      backgroundColor: datasetData.map((i) => i.color),
      borderColor: datasetData.map((i) => i.borderColor),
      borderWidth: 3,
      hoverBorderWidth: 4,
      skipNull: true,
    };
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, comparisonBy: e.target.value });
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
        Time Of Delivery Diagram Trend Comparison
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
      <Bar
        plugins={[ChartDataLabels]}
        options={state.options}
        data={state.data}
      />
      <form className="ComparisonOptions">
        <input
          type="checkbox"
          id="all-bySharedDate"
          value={"All-bySharedDate"}
          name="all-bySharedDate"
          checked={state.comparisonBy === "All-bySharedDate"}
          onChange={onHandleChange}
        />
        <label htmlFor="all-bySharedDate">All</label>
        <input
          type="checkbox"
          id="clients-bySharedDate"
          value={"Clients"}
          name="clients-bySharedDate"
          checked={state.comparisonBy === "Clients"}
          onChange={onHandleChange}
        />
        <label htmlFor="clients-bySharedDate">Clients</label>
        <input
          type="checkbox"
          id={"teams-bySharedDate"}
          value={"Teams"}
          name="teams-bySharedDate"
          checked={state.comparisonBy === "Teams"}
          onChange={onHandleChange}
        />
        <label htmlFor="teams-bySharedDate">Teams</label>
        <input
          id="pms-bySharedDate"
          type="checkbox"
          value={"PMs"}
          name="pms-bySharedDate"
          checked={state.comparisonBy === "PMs"}
          onChange={onHandleChange}
        />
        <label htmlFor="pms-bySharedDate">Project Managers</label>
      </form>
      <FilterBar
        allOptions={{
          clients: options.clients,
          teams: options.teams,
          managers: options.managers,
          categories: options.categories,
        }}
        options={{ clients, managers, categories, teams }}
        filter={filterPopup}
        onCloseFilter={() => openFilterPopup(false)}
        onSetFilterResult={onSetFilterResult}
      />
    </Grid>
  );
};

export default BySharedMonth;

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
