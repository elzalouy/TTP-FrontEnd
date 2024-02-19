import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import "../../style.css";
import { useAppSelector } from "src/models/hooks";
import { selectProjectsState } from "src/models/Projects";
import {
  Category,
  SubCategory,
  selectAllCategories,
} from "src/models/Categories";
import { Line } from "react-chartjs-2";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import _ from "lodash";
import {
  Months,
  convertToCSV,
  getTaskJournies,
  randomColors,
} from "src/helpers/generalUtils";
import { Task } from "src/types/models/Projects";
import { Client } from "src/models/Clients";
import {
  DatasetType,
  ITaskInfo,
  Journies,
  StateType,
} from "src/types/views/Statistics";
import { Manager } from "src/models/Managers";
import IMAGES from "src/assets/img/Images";
import FilterBar from "./FilterMenu";
import { getCsvFile } from "../../utils";
import { Download as DownloadIcon } from "@mui/icons-material";

interface NoOfTasksProps {
  options: {
    teams: ITeam[];
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    boards: IDepartmentState[];
    tasks: Task[];
  };
}
/**
 * Time of delivery diagram by the Category
 * @param param0
 * @returns
 */
const NoOfTasks = ({ options }: NoOfTasksProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { projects } = useAppSelector(selectProjectsState);
  const allCategories = useAppSelector(selectAllCategories);
  const [filterPopup, openFilterPopup] = useState(false);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [allJournies, setAllJournies] = useState<Journies>([]);
  const [journies, setJournies] = useState<Journies>([]);
  const [mounted, setMounted] = useState(false);

  const [state, setState] = useState<StateType>({
    data: {
      labels: [],
      datasets: [],
    },
    filter: { start: "", end: "" },
    filterPopup: false,
    options: null,
    comparisonBy: "Teams",
    year: new Date(Date.now()).getFullYear(),
    quarter: 1,
  });

  useEffect(() => {
    let tasksData = [...options.tasks];
    let newTasks: ITaskInfo[] = tasksData.map((item) => {
      let project = projects.find((project) => project._id === item.projectId);
      let category = options.categories.find((i) => i._id === item.categoryId);
      let subCategory = item.subCategoryId
        ? category?.subCategoriesId.find((s) => s._id === item.subCategoryId)
            ?.subCategory
        : "";
      let client = options.clients.find(
        (i) => i._id === project?.clientId
      )?.clientName;
      let manager = managers.find(
        (i) => i._id === project?.projectManager
      )?.name;
      let newTask: ITaskInfo = {
        ...item,
        clientId: project?.clientId,
        projectManager: project?.projectManager,
        projectName: project?.name,
        categoryName: category?.category,
        subCategoryName: subCategory,
        clientName: client,
        projectManagerName: manager,
      };
      return newTask;
    });
    setTasks([...newTasks]);
  }, [projects, options.tasks]);

  useEffect(() => {
    let journiesData = _.flattenDeep(
      tasks.map((item) => getTaskJournies(item).journies)
    );
    setJournies(journiesData);
    setAllJournies(journiesData);
    setMounted(!mounted);
  }, [tasks]);

  useEffect(() => {
    setClients(options.clients);
  }, [options.clients]);

  useEffect(() => {
    setManagers(options.managers);
  }, [options.managers]);

  useEffect(() => {
    setCategories(options.categories);
    setSubCategories(
      _.flattenDeep(options.categories.map((item) => item.subCategoriesId))
    );
  }, [options.categories]);

  useEffect(() => {
    setTeams(options.teams);
  }, [options.teams]);

  useEffect(() => {
    let months = Months;
    const data: DatasetType = {
      labels: months,
      datasets: onGetDatasetsByAll(),
    };
    let maxArray = data.datasets.map((item) => _.max(item.data));
    let max = _.max(maxArray);
    let maxN = max && max > 50 ? max : 50;
    const options = {
      plugins: {
        datalabels: {
          anchor: "end",
          align: "top",
          formatter: (value: any, context: any) => {
            if (value > 0) {
              return [context.dataset.label, `${value} journeys`];
            } else return null;
          },
          font: {
            weight: "bold",
            size: "10px",
          },
        },
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
          },
          title: {
            display: true,
            text: "Number of tasks",
            poisition: "bottom",
            align: "end",
            color: "black",
          },
        },
      },
    };
    setState({ ...state, options, data });
  }, [journies, state.comparisonBy]);

  useEffect(() => {
    let teamsIds = teams.map((i) => i._id);
    let managersIds = managers.map((i) => i._id);
    let categoriesIds = categories.map((i) => i._id);
    let subCategoriesIds = subCategories.map((i) => i._id);
    let clientsIds = clients.map((i) => i._id);

    let journiesData = allJournies.filter(
      (j) =>
        j.teamId &&
        teamsIds.includes(j.teamId) &&
        j.projectManager &&
        managersIds.includes(j.projectManager) &&
        j.categoryId &&
        categoriesIds.includes(j.categoryId) &&
        j.clientId &&
        clientsIds.includes(j.clientId)
    );
    let allSubs = _.flattenDeep(
      allCategories.map((i) => i.subCategoriesId.map((s) => s._id))
    );
    journiesData = journiesData.filter(
      (i) =>
        i.journeyFinishedAtDate &&
        new Date(i.journeyFinishedAtDate).getFullYear() === state.year
    );
    journiesData = journiesData.filter(
      (j) =>
        (j.subCategoryId && subCategoriesIds.includes(j.subCategoryId)) ||
        j.subCategoryId === null ||
        !allSubs.includes(j.subCategoryId)
    );
    journiesData = journiesData.filter(
      (i) => i.startedAt && new Date(i.startedAt).getFullYear() === state.year
    );
    setJournies(journiesData);
  }, [
    state.year,
    clients,
    categories,
    managers,
    teams,
    subCategories,
    mounted,
  ]);

  const onSetFilterResult = (filter: {
    clients: string[];
    managers: string[];
    subCategories: string[];
    teams: string[];
    categories: string[];
    year: number;
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
    let categories = options.categories.filter(
      (i) => i._id && filter.categories.includes(i._id)
    );
    setCategories(categories);
    setSubCategories(
      _.flattenDeep(categories.map((i) => i.subCategoriesId)).filter((sub) =>
        filter.subCategories.includes(sub._id)
      )
    );
    setState({ ...state, year: filter.year });
  };

  const onGetDatasetsByAll = () => {
    const months = Months;
    let journiesData = [...journies];
    let revised = [...journies].filter((i) => i.revision === true);
    revised = journies.filter((i) => i.revision === true);

    let unique = journiesData.filter((i) => i.unique === true);
    const types = [
      {
        type: "total",
        journies: journiesData,
      },
      {
        type: "revised",
        journies: revised,
      },
      {
        type: "unique",
        journies: unique,
      },
    ];

    const result = types.map((type, index) => {
      let jounriesGroupedByMonth = _.groupBy(type.journies, "startedAtMonth");
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;
      let datasetData = months.map((month, index) => {
        let data = jounriesGroupedByMonth[month];
        return {
          journies: data ?? [],
          color,
          borderColor,
          comparisonId: type.type,
          comparisonName: type.type,
        };
      });
      return {
        label: type.type,
        data: datasetData.map((i) => i.journies.length),
        datasetData,
        journies: type.journies,
        backgroundColor: datasetData.map((i) => i.color),
        borderColor: datasetData.map((i) => i.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      };
    });
    return result;
  };

  const onDownload = () => {
    let data = [...state.data.datasets];
    data = data.filter((i) => i.label !== "total");
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
      link.download = "Number of Journies (Journies data)";
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
      link.download = "Number of journies (Bars data)";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    }
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
      <Line options={state.options} data={state.data} />
      <FilterBar
        allOptions={{
          clients: options.clients,
          managers: options.managers,
          categories: options.categories,
          teams: options.teams,
          subCategories: _.flattenDeep(
            categories.map((item) => item.subCategoriesId)
          ),
        }}
        options={{
          clients,
          managers,
          categories,
          teams,
          subCategories,
          year: state.year,
        }}
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
