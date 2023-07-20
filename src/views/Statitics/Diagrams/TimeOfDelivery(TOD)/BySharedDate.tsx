import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import "./style.css";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { selectAllCategories } from "src/models/Categories";
import { Bar } from "react-chartjs-2";
import { selectAllDepartments } from "src/models/Departments";
import { ITeam } from "src/types/models/Departments";
import { get_TLT_ByComparisonTasks } from "../../utils";
import _ from "lodash";
import { Months, getRandomColor } from "src/helpers/generalUtils";
import { Task, TaskFile, TaskMovement } from "src/types/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { User } from "src/types/models/user";
import { selectManagers, selectPMs } from "src/models/Managers";

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
  }, [clients, projects, managers]);

  useEffect(() => {
    setTeams(_.flattenDeep(departments.map((item) => item.teams)));
  }, [departments]);

  useEffect(() => {
    let months = Months;
    // chart data
    const data = {
      labels: months,
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
          backgroundColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderWidth: 1,
        },
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderWidth: 1,
        },
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderWidth: 1,
        },
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderWidth: 1,
        },
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderColor: [
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
            getRandomColor([]),
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [tasks, teams, state.comparisonBy]);

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
      let tasksData = tasks.filter(
        (i) => i.projectManager && i.projectManager === manager._id
      );
      tasksData = tasksData.filter(
        (item) => item.categoryId !== null && item.categoryId !== undefined
      );
      let tasksOfTeamGroupedByCategories = {
        ..._.groupBy(tasksData, "categoryId"),
      };
      let datasetData = Categories.map((item) => {
        let tasks = tasksOfTeamGroupedByCategories[item.id];

        return {
          tasks: tasks ?? [],
          color,
          borderColor,
          comparisonId: manager._id,
        };
      });

      return {
        label: manager.name,
        data: datasetData.map(
          (items) => get_TLT_ByComparisonTasks(items.tasks) / 24
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
      let tasksData = tasks.filter(
        (i) => i.clientId && i.clientId === client._id
      );
      tasksData = tasksData.filter(
        (item) => item.categoryId !== null && item.categoryId !== undefined
      );
      let tasksOfTeamGroupedByCategories = {
        ..._.groupBy(tasksData, "categoryId"),
      };
      let datasetData = Categories.map((item) => {
        let tasks = tasksOfTeamGroupedByCategories[item.id];

        return {
          tasks: tasks ?? [],
          color,
          borderColor,
          comparisonId: client._id,
        };
      });

      return {
        label: client.clientName,
        data: datasetData.map(
          (items) => get_TLT_ByComparisonTasks(items.tasks) / 24
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
      let tasksData = tasks.filter((i) => i.teamId && i.teamId === team._id);
      tasksData = tasksData.filter(
        (item) => item.categoryId !== null && item.categoryId !== undefined
      );
      let tasksOfTeamGroupedByCategories = {
        ..._.groupBy(tasksData, "categoryId"),
      };
      let datasetData = Categories.map((item) => {
        let tasks = tasksOfTeamGroupedByCategories[item.id];

        return {
          tasks: tasks ?? [],
          color,
          borderColor,
          comparisonId: team._id,
        };
      });

      return {
        label: team.name,
        data: datasetData.map(
          (items) => get_TLT_ByComparisonTasks(items.tasks) / 24
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
      <form>
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

export default BySharedMonth;
