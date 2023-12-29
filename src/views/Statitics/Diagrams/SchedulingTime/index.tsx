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
import {
  Category,
  SubCategory,
  selectAllCategories,
} from "src/models/Categories";
import {
  DatasetType,
  ITaskInfo,
  Journies,
  StateType,
} from "src/types/views/Statistics";
import { selectAllProjects } from "src/models/Projects";
import { Task, TaskMovement } from "src/types/models/Projects";
import { Download as DownloadIcon } from "@mui/icons-material";

import {
  Months,
  convertToCSV,
  getTaskJournies,
  randomColors,
} from "src/helpers/generalUtils";
import { getCsvFile, getJourneySchedulingTime } from "../../utils";
import _ from "lodash";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
const SchedulingTime: FC<SchedulingTimeProps> = ({ options }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, setState] = useState<StateType>({
    filterPopup: false,
    data: {
      labels: [],
      datasets: [],
    },
    filter: { start: "", end: "" },
    options: null,
    comparisonBy: "Departments",
  });
  const { projects } = useAppSelector(selectAllProjects);
  const [departments, setDepartments] = useState<IDepartmentState[]>([]);
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [journies, setJournies] = useState<Journies>([]);
  const [allJournies, setAllJournies] = useState<Journies>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  useEffect(() => {
    setTeams(options.teams);
  }, [options.teams]);

  useEffect(() => {
    let boards =
      state.comparisonBy === "Departments"
        ? options.boards.slice(0, 4)
        : options.boards;
    setDepartments(boards);
    setTeams(_.flattenDeep(boards.map((i) => i.teams)));
  }, [options.boards, state.comparisonBy]);

  useEffect(() => {
    setTeams(options.teams);
  }, [options.teams]);

  useEffect(() => {
    setManagers(options.managers);
  }, [options.managers]);

  useEffect(() => {
    setCategories(options.categories);
    setSubCategories(
      _.flattenDeep(options.categories.map((item) => item.selectedSubCategory))
    );
  }, [options.categories]);

  useEffect(() => {
    setClients(options.clients);
  }, [options.clients]);

  useEffect(() => {
    let tasksData = [...options.tasks];
    let boardIds = departments.map((i) => i.boardId);
    let teamsIds = teams.map((i) => i._id);
    let managersIds = managers.map((i) => i._id);
    let clientIds = clients.map((i) => i._id);
    let categoriesIds = categories.map((i) => i._id);
    let newTasks: ITaskInfo[] = tasksData
      .map((item) => {
        let project = projects.find(
          (project) => project._id === item.projectId
        );
        let newTask: ITaskInfo = {
          ...item,
          clientId: project?.clientId,
          projectManager: project?.projectManager,
        };
        return newTask;
      })
      .filter(
        (task) =>
          task.clientId &&
          clientIds.includes(task.clientId) &&
          task.projectManager &&
          managersIds.includes(task.projectManager) &&
          task.teamId &&
          teamsIds.includes(task.teamId) &&
          task.boardId &&
          boardIds.includes(task.boardId) &&
          task.categoryId &&
          categoriesIds.includes(task.categoryId)
      );
    setTasks([...newTasks]);
  }, [projects, options.tasks, departments, teams, managers, clients]);

  useEffect(() => {
    let journiesData = tasks.map((item) => getTaskJournies(item).journies);
    let flattenedJournies = _.flatten(journiesData);
    flattenedJournies = flattenedJournies.map((item) => {
      let start = item.movements
        ? item.movements[0]?.movedAt
        : item.cardCreatedAt;
      return {
        ...item,
        startedAtMonth: start
          ? new Date(start).toLocaleString("en-us", { month: "long" })
          : undefined,
      };
    });
    setAllJournies(flattenedJournies);
    setJournies(flattenedJournies);
  }, [tasks]);

  useEffect(() => {
    let months = Months;
    const data: DatasetType = {
      labels: months,
      datasets:
        state.comparisonBy === "Departments"
          ? onGetDataSetsByDepartments()
          : [onGetDatasetsByAll()],
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
              let totalHours = value * 24;
              let days = Math.floor(totalHours / 24);
              const hours = Math.floor(totalHours % 24);
              return [context.dataset.label, `(${days} days, ${hours} hours)`];
            } else return null;
          },
          font: {
            weight: "bold",
            size: "10px",
          },
        },
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
            text: "Month (Started At)",
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
          max: max * 2,
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
  }, [journies]);

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, comparisonBy: e.target.value });
  };

  const onSetFilterResult = (filter: {
    clients: string[];
    categories: string[];
    teams: string[];
    departments: string[];
    managers: string[];
    subCategories: string[];
  }) => {
    setClients(
      options.clients.filter((i) => i._id && filter.clients.includes(i._id))
    );
    setDepartments(
      options.boards.filter((i) => filter.departments.includes(i.boardId))
    );
    setManagers(
      options.managers.filter((m) => filter.managers.includes(m._id))
    );
    setTeams(
      _.flattenDeep(
        options.boards
          .filter((b) => filter.departments.includes(b.boardId))
          .map((i) => i.teams)
      ).filter((team) => filter.teams.includes(team._id ?? ""))
    );
    let categories = options.categories.filter(
      (i) => i._id && filter.categories.includes(i._id)
    );
    setCategories(categories);
    setSubCategories(
      _.flattenDeep(categories.map((i) => i.selectedSubCategory)).filter(
        (sub) => filter.subCategories.includes(sub._id)
      )
    );
    setJournies(
      allJournies.filter(
        (j) =>
          j.teamId &&
          filter.teams.includes(j.teamId) &&
          j.categoryId &&
          filter.categories.includes(j.categoryId) &&
          j.subCategoryId &&
          filter.subCategories.includes(j.subCategoryId) &&
          j.clientId &&
          filter.clients.includes(j.clientId) &&
          j.projectManager &&
          filter.managers.includes(j.projectManager)
      )
    );
  };

  const onGetDataSetsByDepartments = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    return departments.map((department, index) => {
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

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
          comparisonName: department.name,
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
        journies: journiesData,
        datasetData,
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
        (item) => item.startedAtMonth === month.id
      );
      return {
        journies: journiesData ?? [],
        color,
        borderColor,
        comparisonId: month.id,
        comparisonName: month.name,
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
      datasetData,
      journies: journies,
    };
  };
  const onDownload = () => {
    let data = [...state.data.datasets];
    let { bars, comparisons } = getCsvFile({
      labels: [...state.data.labels],
      datasets: data,
    });
    if (comparisons.length > 0 && formRef.current) {
      let csvData = convertToCSV(comparisons);
      let dataBlob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.style.display = "none";
      link.download = "Review Time (Journies data)";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    }
    if (bars.length > 0 && formRef.current) {
      let csvData = convertToCSV(bars);
      let dataBlob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.style.display = "none";
      link.download = "Review Time (Bars data)";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
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
            Scheduling Time
          </Typography>
          <Typography fontSize={10} fontWeight={"400"} color={"#808191"}>
            Limiting the scope to tasks within a specific project, assigned to a
            designated team, and categorized of them. This enables the
            identification of scheduling times for individual tasks,
            facilitating their distribution across boards and allowing for
            effective filtering based on these criteria.{" "}
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
          {/* Download csv button */}
          <form ref={formRef}>
            <IconButton
              type="button"
              onClick={onDownload}
              sx={{
                bgcolor: "white",
                borderRadius: 3,
                float: "right",
                cursor: "pointer",
                width: "38px",
                height: "38px",
              }}
              disableRipple
            >
              <DownloadIcon htmlColor="black"></DownloadIcon>
            </IconButton>
          </form>
        </Grid>
        <Line
          plugins={[ChartDataLabels]}
          options={state.options}
          data={state.data}
        />
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
          subCategories: _.flattenDeep(
            categories.map((item) => item.selectedSubCategory)
          ),
        }}
        options={{
          clients,
          teams,
          categories,
          managers,
          departments,
          subCategories,
        }}
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
