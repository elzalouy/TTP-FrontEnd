import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import "../../style.css";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
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
  const { projects } = useAppSelector(selectAllProjects);
  const allCategories = useAppSelector(selectAllCategories);
  const [filterPopup, openFilterPopup] = useState(false);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [allJournies, setAllJournies] = useState<
    {
      id: string;
      name: string;
      journies: Journies;
    }[]
  >([]);
  const [journies, setJournies] = useState<
    {
      id: string;
      name: string;
      journies: Journies;
    }[]
  >([]);

  const [state, setState] = useState<StateType>({
    data: {
      labels: [],
      datasets: [],
    },
    filter: { start: "", end: "" },
    filterPopup: false,
    options: null,
    comparisonBy: "Teams",
    // year: new Date(Date.now()).getFullYear(),
    quarter: 1,
  });

  useEffect(() => {
    let tasksData = [...options.tasks];
    let newTasks: ITaskInfo[] = tasksData.map((item) => {
      let project = projects.find((project) => project._id === item.projectId);
      let manager = managers.find(
        (i) => i._id === project?.projectManager
      )?._id;
      let client = clients.find((i) => i._id === project?.clientId)?.clientName;
      let category = allCategories.find((i) => i._id === item.categoryId);
      let team = options.boards
        .find((i) => i._id === item.boardId)
        ?.teams.find((i) => i._id === item.teamId && i.isDeleted === false);

      let newTask: ITaskInfo = {
        ...item,
        clientId: project?.clientId,
        projectManager: project?.projectManager,
        projectManagerName: manager,
        clientName: client,
        projectName: project?.name,
        categoryName: category?.category,
        subCategoryName: category?.subCategoriesId.find(
          (i) => i._id === item.subCategoryId
        )?.subCategory,
        teamName: team?.name,
      };
      return newTask;
    });

    setTasks([...newTasks]);
  }, [projects, options.tasks]);

  useEffect(() => {
    let journiesData = tasks.map((item) => getTaskJournies(item));
    setJournies(journiesData);
    setAllJournies(journiesData);
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

  const onSetFilterResult = (filter: {
    clients: string[];
    managers: string[];
    subCategories: string[];
    teams: string[];
    categories: string[];
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

    let subsIds = _.flattenDeep(
      categories.map((i) => i.subCategoriesId.map((s) => s._id))
    );
    let journiesData = allJournies.filter(
      (j) =>
        j.journies[0].teamId &&
        filter.teams.includes(j.journies[0].teamId) &&
        j.journies[0].projectManager &&
        filter.managers.includes(j.journies[0].projectManager) &&
        j.journies[0].categoryId &&
        filter.categories.includes(j.journies[0].categoryId) &&
        j.journies[0].clientId &&
        filter.clients.includes(j.journies[0].clientId)
    );
    journiesData = journiesData.filter(
      (j) =>
        (j.journies[0].subCategoryId &&
          filter.subCategories.includes(j.journies[0].subCategoryId)) ||
        j.journies[0].subCategoryId === null ||
        !subsIds.includes(j.journies[0].subCategoryId)
    );
    setJournies(journiesData);
  };

  const onGetDatasetsByAll = () => {
    const months = Months;
    let totalJournies = _.flattenDeep(
      [...journies].map((item) => item.journies)
    );
    totalJournies = totalJournies.map((journey) => {
      return {
        ...journey,
        startedAtMonth: new Date(journey.movements[0].movedAt).toLocaleString(
          "en-us",
          {
            month: "long",
          }
        ),
      };
    });
    let revised = _.flattenDeep(
      journies.map((item) => {
        let journies = item.journies.slice(1, item.journies.length);
        return journies;
      })
    );
    revised = revised.map((journey) => {
      return {
        ...journey,
        startedAtMonth: new Date(journey.movements[0].movedAt).toLocaleString(
          "en-us",
          {
            month: "long",
          }
        ),
      };
    });

    let unique = _.flattenDeep(
      journies.map((item) => {
        let journies = item.journies.slice(0, 1);
        return journies;
      })
    );
    unique = unique.map((journey) => {
      return {
        ...journey,
        startedAtMonth: new Date(journey.movements[0].movedAt).toLocaleString(
          "en-us",
          {
            month: "long",
          }
        ),
      };
    });

    const types = [
      {
        type: "total",
        journies: totalJournies,
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
        options={{ clients, managers, categories, teams, subCategories }}
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
