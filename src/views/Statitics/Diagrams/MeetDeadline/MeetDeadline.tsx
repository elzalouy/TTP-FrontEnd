import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import "../../style.css";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { Category, selectAllCategories } from "src/models/Categories";
import { Line } from "react-chartjs-2";
import { selectAllDepartments } from "src/models/Departments";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import _ from "lodash";
import { Months, getTaskJournies } from "src/helpers/generalUtils";
import { Task, TaskMovement } from "src/types/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { Journies } from "src/types/views/Statistics";
import { Manager, selectPMs } from "src/models/Managers";
import { getMeetingDeadline } from "../../utils";
import IMAGES from "src/assets/img/Images";
import FilterBar from "./FilterMenu";
import ChartDataLabels from "chartjs-plugin-datalabels";

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

type MeetDeadlineProps = {
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
const MeetDeadline = ({ options }: MeetDeadlineProps) => {
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
  }, [options.tasks, projects]);

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
    setClients(options.clients);
  }, [options.clients]);

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
    setManagers(
      state.comparisonBy === "PMs"
        ? options.managers.slice(0, 4)
        : options.managers
    );

    setTeams(
      state.comparisonBy === "Teams" ? options.teams.slice(0, 4) : options.teams
    );
  }, [state.comparisonBy, options]);

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
          : onGetDatasetsByAll(),
    };
    let maxArray = data.datasets.map((item) => Math.max(...item.data));
    let max = Math.max(...maxArray);
    const options = {
      plugins: {
        datalabels: {
          anchor: "end",
          align: "top",
          formatter: (value: any, context: any) => {
            if (value > 0) {
              return [context.dataset.label, `${value}%`];
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
              return ` ${context.dataset.label} : ${value}% Meet the deadline`;
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
          max: 100,
          ticks: {
            callback: function (value: any, index: any, values: any) {
              return value + "%";
            },
          },
          title: {
            display: true,
            text: "Meeting Deadline Percentage",
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
      options.teams.filter(
        (i) => i._id && filter.teams.includes(i._id) && i.isDeleted === false
      )
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
    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";
    return managers.map((manager, index) => {
      let journiesData = journies.filter(
        (i) => i.projectManager && i.projectManager === manager._id
      );
      let journiesOfManagerGroupedByMonth = {
        ..._.groupBy(journiesData, "journeyFinishedAt"),
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
        data: datasetData.map((i) => {
          let result = getMeetingDeadline(i.journies);
          return Math.floor(
            (result.notPassedDeadline.length / i.journies.length) * 100
          );
        }),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      };
    });
  };
  const onGetDataSetsByClient = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";
    return clients.map((client, index) => {
      let journiesData = journies.filter(
        (i) => i.clientId && i.clientId === client._id
      );
      let journiesOfManagerGroupedByMonth = {
        ..._.groupBy(journiesData, "journeyFinishedAt"),
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
        data: datasetData.map((i) => {
          let result = getMeetingDeadline(i.journies);
          return Math.floor(
            (result.notPassedDeadline.length / i.journies.length) * 100
          );
        }),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
        datasetData,
      };
    });
  };

  const onGetDatasetsByTeams = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";
    return teams.map((team, index) => {
      let journiesData = journies.filter(
        (i) => i.teamId && i.teamId === team._id
      );
      let journiesOfManagerGroupedByMonth = {
        ..._.groupBy(journiesData, "journeyFinishedAt"),
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
        data: datasetData.map((i) => {
          let result = getMeetingDeadline(i.journies);
          return Math.floor(
            (result.notPassedDeadline.length / i.journies.length) * 100
          );
        }),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
        datasetData,
      };
    });
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, comparisonBy: e.target.value });
  };

  const onGetDatasetsByAll = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";
    let allJourniesGroupedbyMonth = {
      ..._.groupBy(journies, "journeyFinishedAt"),
    };
    let datasetData = months.map((month) => {
      let journiesData = journies.filter(
        (item) => item.journeyFinishedAt === month.id
      );
      return {
        journies: journiesData ?? [],
        color,
        borderColor,
        comparisonId: month.id,
        name: month.name,
      };
    });
    const result = [
      {
        label: "",
        data: datasetData.map((i) => {
          let result = getMeetingDeadline(i.journies);
          return Math.floor(
            (result.notPassedDeadline.length / i.journies.length) * 100
          );
        }),
        datasetData,
        backgroundColor: datasetData.map((i) => i.color),
        borderColor: datasetData.map((i) => i.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      },
    ];
    return result;
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
        Meeting Deadline
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
      <Line
        plugins={[ChartDataLabels]}
        options={state.options}
        data={state.data}
      />
      <form className="ComparisonOptions">
        <input
          type="checkbox"
          id="all-meetDeadline"
          value={"All-meetDeadline"}
          name="all-meetDeadline"
          checked={state.comparisonBy === "All-meetDeadline"}
          onChange={onHandleChange}
        />
        <label htmlFor="all-meetDeadline">All</label>
        <input
          type="checkbox"
          id={"teams-meetDeadline"}
          value={"Teams"}
          name="teams-meetDeadline"
          checked={state.comparisonBy === "Teams"}
          onChange={onHandleChange}
        />
        <label htmlFor="teams-meetDeadline">Teams</label>
        <input
          id="pms-meetDeadline"
          type="checkbox"
          value={"PMs"}
          name="pms-meetDeadline"
          checked={state.comparisonBy === "PMs"}
          onChange={onHandleChange}
        />
        <label htmlFor="pms-meetDeadline">Project Managers</label>
      </form>
      <FilterBar
        allOptions={{
          clients: options.clients,
          managers: options.managers,
          categories: options.categories,
          teams: options.teams,
        }}
        options={{ clients, managers, categories, teams }}
        filter={filterPopup}
        onCloseFilter={() => openFilterPopup(false)}
        onSetFilterResult={onSetFilterResult}
      />
    </Grid>
  );
};

export default MeetDeadline;

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
