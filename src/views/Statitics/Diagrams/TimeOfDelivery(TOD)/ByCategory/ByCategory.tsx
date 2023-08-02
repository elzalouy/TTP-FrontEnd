import React, { useEffect, useState } from "react";
import { Grid, ListItem, Typography } from "@mui/material";
import "../../../style.css";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { selectAllCategories } from "src/models/Categories";
import { Bar } from "react-chartjs-2";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import _ from "lodash";
import { getRandomColor, getTaskJournies } from "src/helpers/generalUtils";
import { Client, selectAllClients } from "src/models/Clients";
import { User } from "src/types/models/user";
import { selectManagers, selectPMs } from "src/models/Managers";
import { ITaskInfo, Journies } from "src/types/views/Statistics";
import { getJourneyLeadTime } from "../../../utils";
import { TooltipItem } from "chart.js";

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
}
type TodByCategoryProps = {
  departments: IDepartmentState[];
};

/**
 * Time of delivery diagram by the Category
 * @param param0
 * @returns
 */

const TodByCategory = ({ departments }: TodByCategoryProps) => {
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const categories = useAppSelector(selectAllCategories);
  const managers = useAppSelector(selectPMs);
  const clients = useAppSelector(selectAllClients);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);
  const [journies, setJournies] = useState<Journies>([]);
  const [state, setState] = useState<StateType>({
    data: {
      labels: [],
      datasets: [],
    },
    options: null,
    comparisonBy: "Teams",
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
    let journiesData = newTasks.map((item) => getTaskJournies(item).journies);
    let flattenedJournies = _.flatten(journiesData);
    setJournies(flattenedJournies);
  }, [clients, projects, managers, allTasks]);

  useEffect(() => {
    setTeams(
      _.flattenDeep(departments.map((item) => item.teams)).filter(
        (t) => t.isDeleted === false
      )
    );
  }, [departments]);

  useEffect(() => {
    let Categories = categories.map((item) => {
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
    const options = {
      plugins: {
        legend: {
          display: true,
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
              return `${context.dataset.label}: ${days} days, ${hours} hours`;
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
    setState({ ...state, options, data });
  }, [categories, tasks, teams, state.comparisonBy]);

  useEffect(() => {}, [state.comparisonBy]);

  const onGetDatasetsByAll = () => {
    let Categories = categories.map((item) => {
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
          _.sum(i.journies.map((journey) => getJourneyLeadTime(journey))) / 24
      ),
      backgroundColor: datasetData.map((i) => i.color),
      borderColor: datasetData.map((i) => i.borderColor),
      borderWidth: 3,
      hoverBorderWidth: 4,
      skipNull: true,
    };
  };
  const onGetDataSetsByPM = () => {
    let Categories = categories.map((item) => {
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
        hidden: index >= 4 ? true : false,
      };
    });
  };

  const onGetDataSetsByClient = () => {
    let Categories = categories.map((item) => {
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
            _.sum(i.journies.map((journey) => getJourneyLeadTime(journey))) / 24
        ),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
        hidden: index >= 4 ? true : false,
      };
    });
  };
  const onGetDatasetsByTeams = () => {
    let Categories = categories.map((item) => {
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
            _.sum(i.journies.map((journey) => getJourneyLeadTime(journey))) / 24
        ),
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
        hidden: index >= 4 ? true : false,
      };
    });
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
      }}
    >
      <Typography fontSize={18} mb={1} fontWeight={"600"}>
        Time Of Delivery Diagram Category Comparison
      </Typography>
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
  );
};

export default TodByCategory;
