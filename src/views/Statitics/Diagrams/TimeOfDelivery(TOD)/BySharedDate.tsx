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
import {
  Months,
  getRandomColor,
  getTaskJournies,
} from "src/helpers/generalUtils";
import { Task, TaskMovement } from "src/types/models/Projects";
import { selectAllClients } from "src/models/Clients";
import { Journies } from "src/types/views/Statistics";
import { selectPMs } from "src/models/Managers";
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
const BySharedMonth = () => {
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
    let journiesData = newTasks.map((item) => getTaskJournies(item).journies);
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
  }, [clients, projects, managers, allTasks]);

  useEffect(() => {
    setTeams(_.flattenDeep(departments.map((item) => item.teams)));
  }, [departments]);

  useEffect(() => {
    let months = Months;
    // chart data

    const data = {
      labels: months,
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
  }, [tasks, teams, state.comparisonBy, managers, clients]);

  const onGetDataSetsByPM = () => {
    let bgColors: string[] = [];
    let borderColors: string[] = [];
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    return managers.map((manager) => {
      let { color, borderColor } = getRandomColor(bgColors);
      bgColors.push(color);
      borderColors.push(borderColor);
      let journiesData = journies.filter(
        (i) => i.projectManager && i.projectManager === manager._id
      );
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
          (i) => _.sum(i.journies.map((j) => getJourneyLeadTime(j))) / 24
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
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    return clients.map((client) => {
      let { color, borderColor } = getRandomColor(bgColors);
      bgColors.push(color);
      borderColors.push(borderColor);
      let journiesData = journies.filter(
        (i) => i.clientId && i.clientId === client._id
      );
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
          (i) => _.sum(i.journies.map((j) => getJourneyLeadTime(j))) / 24
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
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    return teams.map((team) => {
      let { color, borderColor } = getRandomColor(bgColors);
      bgColors.push(color);
      borderColors.push(borderColor);
      let journiesData = journies.filter(
        (i) => i.teamId && i.teamId === team._id
      );
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
          (i) => _.sum(i.journies.map((j) => getJourneyLeadTime(j))) / 24
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
        Time of delivery by Shared Month
      </Typography>
      <Bar options={state.options} data={state.data} />
      <form className="ComparisonOptions">
        <label htmlFor="teams-bySharedDate">Teams</label>
        <input
          type="radio"
          id={"teams-bySharedDate"}
          value={"Teams"}
          name="teams-bySharedDate"
          checked={state.comparisonBy === "Teams"}
          onChange={onHandleChange}
        />
        <label htmlFor="clients-bySharedDate">Clients</label>
        <input
          type="radio"
          id="clients-bySharedDate"
          value={"Clients"}
          name="clients-bySharedDate"
          checked={state.comparisonBy === "Clients"}
          onChange={onHandleChange}
        />
        <label htmlFor="pms-bySharedDate">Project Managers</label>
        <input
          id="pms-bySharedDate"
          type="radio"
          value={"PMs"}
          name="pms-bySharedDate"
          checked={state.comparisonBy === "PMs"}
          onChange={onHandleChange}
        />
      </form>
    </Grid>
  );
};

export default BySharedMonth;
