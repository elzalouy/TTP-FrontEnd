import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import "./style.css";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { selectAllCategories } from "src/models/Categories";
import { Bar } from "react-chartjs-2";
import { selectAllDepartments } from "src/models/Departments";
import { ITeam } from "src/types/models/Departments";
import _ from "lodash";
import { getRandomColor, getTaskJournies } from "src/helpers/generalUtils";
import { Task, TaskFile, TaskMovement } from "src/types/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { User } from "src/types/models/user";
import { selectManagers, selectPMs } from "src/models/Managers";
import { ITaskInfo, Journies } from "src/types/views/Statistics";
import { getJourneyLeadTime } from "../../utils";

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
/**
 * Time of delivery diagram by the Category
 * @param param0
 * @returns
 */
const TodByCategory = () => {
  const { allTasks, projects } = useAppSelector(selectAllProjects);
  const categories = useAppSelector(selectAllCategories);
  const departments = useAppSelector(selectAllDepartments);
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
    setTeams(_.flattenDeep(departments.map((item) => item.teams)));
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
          : onGetDatasetsByTeams(),
    };
    const options = {
      scales: {
        x: {
          type: "category",
          position: "bottom",
          ticks: {
            beginAtZero: true,
          },
        },
        y: {
          ticks: {
            beginAtZero: true,
          },
        },
      },
    };
    setState({ ...state, options, data });
  }, [categories, tasks, teams, state.comparisonBy]);

  const onGetDataSetsByPM = () => {
    let bgColors: string[] = [];
    let borderColors: string[] = [];
    let Categories = categories.map((item) => {
      return { id: item._id, name: item.category };
    });
    return managers.map((manager) => {
      let { color, borderColor } = getRandomColor(bgColors);
      bgColors.push(color);
      borderColors.push(borderColor);
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
    let bgColors: string[] = [];
    let borderColors: string[] = [];
    let Categories = categories.map((item) => {
      return { id: item._id, name: item.category };
    });
    return clients.map((client) => {
      let { color, borderColor } = getRandomColor(bgColors);
      bgColors.push(color);
      borderColors.push(borderColor);
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
      };
    });
  };
  const onGetDatasetsByTeams = () => {
    let bgColors: string[] = [];
    let borderColors: string[] = [];
    let Categories = categories.map((item) => {
      return { id: item._id, name: item.category };
    });
    return teams.map((team) => {
      let { color, borderColor } = getRandomColor(bgColors);
      bgColors.push(color);
      borderColors.push(borderColor);
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
        Time of delivery By Categories
      </Typography>
      <Bar options={state.options} data={state.data} />
      <form className="ComparisonOptions">
        <label htmlFor="teams">Teams</label>
        <input
          type="radio"
          id={"teams"}
          value={"Teams"}
          name="teams"
          checked={state.comparisonBy === "Teams"}
          onChange={onHandleChange}
        />
        <label htmlFor="clients">Clients</label>
        <input
          type="radio"
          id="clients"
          value={"Clients"}
          name="clients"
          checked={state.comparisonBy === "Clients"}
          onChange={onHandleChange}
        />
        <label htmlFor="pms">Project Managers</label>
        <input
          id="pms"
          type="radio"
          value={"PMs"}
          name="pms"
          checked={state.comparisonBy === "PMs"}
          onChange={onHandleChange}
        />
      </form>
    </Grid>
  );
};

export default TodByCategory;
