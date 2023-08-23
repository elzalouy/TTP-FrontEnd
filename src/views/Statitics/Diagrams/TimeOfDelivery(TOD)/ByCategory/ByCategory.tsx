import React, { useEffect, useState } from "react";
import { Grid, IconButton, ListItem, Typography } from "@mui/material";
import "../../../style.css";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { Category, selectAllCategories } from "src/models/Categories";
import { Bar } from "react-chartjs-2";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import _, { filter } from "lodash";
import { getTaskJournies } from "src/helpers/generalUtils";
import { Client, selectClientOptions } from "src/models/Clients";
import { User } from "src/types/models/user";
import {
  Manager,
  selectManagers,
  selectPMOptions,
  selectPMs,
} from "src/models/Managers";
import { ITaskInfo, Journies } from "src/types/views/Statistics";
import { getJourneyLeadTime } from "../../../utils";
import { TooltipItem } from "chart.js";
import FiltersBar from "./FilterMenu";
import IMAGES from "src/assets/img/Images";
import { Filter } from "@mui/icons-material";
import { selectAllTeams, selectTeamsOptions } from "src/models/Departments";
import { DialogOption } from "src/types/components/SelectDialog";
import { Task } from "src/types/models/Projects";

interface StateType {
  filterPopup: boolean;
  filter: {
    start: string | null;
    end: string | null;
  };
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
}
type TodByCategoryProps = {
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

const TodByCategory = ({ options }: TodByCategoryProps) => {
  const { projects } = useAppSelector(selectAllProjects);
  const teamsOptions = useAppSelector(selectTeamsOptions);
  const pmsOptions = useAppSelector(selectPMOptions);
  const clientsOptions = useAppSelector(selectClientOptions);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);
  const [journies, setJournies] = useState<Journies>([]);
  const [allJournies, setAllJournies] = useState<Journies>([]);
  const [state, setState] = useState<StateType>({
    filterPopup: false,
    filter: {
      start: null,
      end: null,
    },
    data: {
      labels: [],
      datasets: [],
    },
    options: null,
    comparisonBy: "Teams",
  });

  useEffect(() => {
    let newTasks: ITaskInfo[] = tasks.map((item) => {
      let project = projects.find((project) => project._id === item.projectId);
      let newTask: ITaskInfo = {
        ...item,
        clientId: project?.clientId,
        projectManager: project?.projectManager,
      };
      return newTask;
    });
    let journiesData = newTasks.map((item) => getTaskJournies(item).journies);
    let flattenedJournies = _.flatten(journiesData);
    setJournies(flattenedJournies);
    setAllJournies(flattenedJournies);
  }, [tasks, teams, managers, projects]);

  useEffect(() => {
    setTasks(options.tasks);
  }, [options.tasks]);

  useEffect(() => {
    setManagers(
      state.comparisonBy === "PMs"
        ? options.managers.slice(0, 4)
        : options.managers
    );
  }, [options.managers, state.comparisonBy]);

  useEffect(() => {
    setClients(
      state.comparisonBy === "Clients"
        ? options.clients.slice(0, 4)
        : options.clients
    );
  }, [options.clients, state.comparisonBy]);

  useEffect(() => {
    setTeams(
      state.comparisonBy === "Teams" ? options.teams.slice(0, 4) : options.teams
    );
  }, [options.teams, state.comparisonBy]);

  // console.log({
  //   TOB_ByCategory_data: state.data,
  //   TOD_By_Category_journies: journies,
  // });
  useEffect(() => {
    if (tasks.length > 0 && journies.length > 0) {
      let Categories = options.categories.map((item) => {
        return { id: item._id, name: item.category };
      });

      const data = {
        labels: Categories.map((item) => item.name),
        datasets:
          state.comparisonBy === "Clients"
            ? onGetDataSetsByClient()
            : state.comparisonBy === "PMs"
            ? onGetDataSetsByPM()
            : state.comparisonBy === "Teams"
            ? onGetDatasetsByTeams()
            : [onGetDatasetsByAll()],
      };
      const Options = {
        plugins: {
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
                return [
                  `${context.dataset.label} :- `,
                  `(${days} days, ${hours} hours)`,
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
              text: "Category",
              poisition: "bottom",
              align: "end",
              color: "black",
            },
          },
          y: {
            ticks: {
              beginAtZero: true,
            },
            title: {
              display: true,
              text: "TOD (Days & Hours)",
              poisition: "bottom",
              align: "end",
              color: "black",
            },
          },
        },
      };
      setState({ ...state, options: Options, data });
    }
  }, [journies, tasks]);

  React.useEffect(() => {
    let journiesData = [...allJournies];
    if (state.filter.start)
      journiesData = journiesData.filter(
        (i) =>
          i.journeyFinishedAtDate &&
          state.filter.start &&
          new Date(i.journeyFinishedAtDate).getTime() >=
            new Date(state.filter.start).getTime()
      );
    if (state.filter.end)
      journiesData = journiesData.filter(
        (i) =>
          i.journeyFinishedAtDate &&
          state.filter.end &&
          new Date(i.journeyFinishedAtDate).getTime() <=
            new Date(state.filter.end).getTime()
      );
    setJournies(journiesData);
  }, [state.filter.start, state.filter.end]);

  const onGetDatasetsByAll = () => {
    let Categories = options.categories.map((item) => {
      return { id: item._id, name: item.category };
    });
    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";

    let datasetData = Categories.map((category) => {
      let journiesData = journies.filter(
        (item) => item.categoryId === category.id
      );
      return {
        journies: journiesData ?? [],
        color,
        borderColor,
        comparisonId: category.id,
        name: category.name,
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
  const onGetDataSetsByPM = () => {
    let Categories = options.categories.map((item) => {
      return { id: item._id, name: item.category };
    });
    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";
    return managers.map((manager, index) => {
      let journiesData = journies.filter(
        (item) => item.projectManager === manager._id
      );
      let journiesOfClientGroupedByCategory = {
        ..._.groupBy(journiesData, "categoryId"),
      };
      let datasetData = Categories.map((item) => {
        let journies = journiesOfClientGroupedByCategory[item.id];
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
            _.sum(i.journies.map((journey) => getJourneyLeadTime(journey))) / 24
        ),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      };
    });
  };

  const onGetDataSetsByClient = () => {
    let Categories = options.categories.map((item) => {
      return { id: item._id, name: item.category };
    });
    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";

    return clients.map((client, index) => {
      let journiesData = journies.filter(
        (item) => item.clientId === client._id
      );
      let journiesOfClientGroupedByCategory = {
        ..._.groupBy(journiesData, "categoryId"),
      };
      let datasetData = Categories.map((item) => {
        let journies = journiesOfClientGroupedByCategory[item.id];
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
            _.sum(i.journies.map((journey) => getJourneyLeadTime(journey))) /
            i.journies.length /
            24
        ),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      };
    });
  };
  const onGetDatasetsByTeams = () => {
    let Categories = options.categories.map((item) => {
      return { id: item._id, name: item.category };
    });

    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";
    return teams.map((team, index) => {
      let journiesData = journies.filter((item) => item.teamId === team._id);
      let journiesOfClientGroupedByCategory = {
        ..._.groupBy(journiesData, "categoryId"),
      };
      let datasetData = Categories.map((item) => {
        let journies = journiesOfClientGroupedByCategory[item.id];
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
            _.sum(i.journies.map((journey) => getJourneyLeadTime(journey))) /
            i.journies.length /
            24
        ),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      };
    });
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, comparisonBy: e.target.value });
  };

  const onSetFilter = (type: string, value: string) => {
    let State = { ...state };
    let journies = [...allJournies];
    if (type === "startDate") {
      State.filter.start = value;
      journies = journies.filter((i) => {
        let date =
          i?.journeyFinishedAtDate !== null && i.journeyFinishedAtDate
            ? new Date(i.journeyFinishedAtDate).getTime()
            : null;
        let filterBy = new Date(value).getTime();
        return date && filterBy < date;
      });
    }
    if (type === "endDate") {
      journies = journies.filter((i) => {
        let date =
          i?.journeyFinishedAtDate !== null && i.journeyFinishedAtDate
            ? new Date(i.journeyFinishedAtDate).getTime()
            : null;
        let filterBy = new Date(value).getTime();
        return date && filterBy > date;
      });
      State.filter.end = value;
    }
    setState(State);
  };

  const onSelect = (value: DialogOption) => {
    if (state.comparisonBy === "Teams") {
      let t = options.teams.find((i) => i._id && i._id === value.id);
      if (t) setTeams([...teams, t]);
    }
    if (state.comparisonBy === "PMs") {
      let pm = options.managers.find((p) => p._id === value.id);
      if (pm) setManagers([...managers, pm]);
    }
    if (state.comparisonBy === "Clients") {
      let client = options.clients.find((c) => c._id === value.id);
      if (client) setClients([...clients, client]);
    }
  };

  const onDiselect = (value: DialogOption) => {
    if (state.comparisonBy === "Teams") {
      setTeams([...teams].filter((i) => i._id !== value.id));
    }
    if (state.comparisonBy === "PMs") {
      setManagers([...managers].filter((i) => i._id !== value.id));
    }
    if (state.comparisonBy === "Clients") {
      setClients([...clients].filter((i) => i._id !== value.id));
    }
  };
  const onSelectAll = (select: boolean) => {
    if (state.comparisonBy === "Teams") {
      setTeams(select ? options.teams : []);
    }
    if (state.comparisonBy === "PMs") {
      setManagers(select ? options.managers : []);
    }
    if (state.comparisonBy === "Clients") {
      setClients(select ? options.clients : []);
    }
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
            Time Of Delivery Diagram Category Comparison
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

        <Bar options={state.options} data={state.data} />
        <form className="ComparisonOptions">
          <input
            type="checkbox"
            id="all"
            value={"All"}
            name="all"
            checked={state.comparisonBy === "All"}
            onChange={onHandleChange}
          />
          <label htmlFor="all">All</label>
          <input
            type="checkbox"
            id="clients"
            value={"Clients"}
            name="clients"
            checked={state.comparisonBy === "Clients"}
            onChange={onHandleChange}
          />
          <label htmlFor="clients">Clients</label>
          <input
            type="checkbox"
            id={"teams"}
            value={"Teams"}
            name="teams"
            checked={state.comparisonBy === "Teams"}
            onChange={onHandleChange}
          />
          <label htmlFor="teams">Teams</label>

          <input
            id="pms"
            type="checkbox"
            value={"PMs"}
            name="pms"
            checked={state.comparisonBy === "PMs"}
            onChange={onHandleChange}
          />
          <label htmlFor="pms">Project Managers</label>
        </form>
      </Grid>
      <FiltersBar
        comparison={{
          name: state.comparisonBy,
          label: `${state.comparisonBy} : `,
          options:
            state.comparisonBy === "Teams"
              ? teamsOptions.map((i) => {
                  return { id: i.id ?? "", label: i.text ?? "" };
                })
              : state.comparisonBy === "PMs"
              ? pmsOptions.map((i) => {
                  return { id: i.id, label: i.text };
                })
              : state.comparisonBy === "Clients"
              ? clientsOptions.map((i) => {
                  return { id: i.id, label: i.text };
                })
              : [],
          onSelect: onSelect,
          onDiselect: onDiselect,
          onSelectAll: onSelectAll,
          selected:
            state.comparisonBy === "Teams"
              ? teams.map((i) => {
                  return { id: i._id ?? "", label: i.name ?? "" };
                })
              : state.comparisonBy === "PMs"
              ? managers.map((i) => {
                  return { id: i._id ?? "", label: i.name ?? "" };
                })
              : state.comparisonBy === "Clients"
              ? clients.map((i) => {
                  return { id: i._id, label: i.clientName };
                })
              : [],
        }}
        start={state.filter.start}
        end={state.filter.end}
        onSetFilter={onSetFilter}
        closeFilterPopup={() =>
          setState({
            ...state,
            filterPopup: false,
          })
        }
        filterPopup={state.filterPopup}
      />
    </>
  );
};

export default TodByCategory;
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
