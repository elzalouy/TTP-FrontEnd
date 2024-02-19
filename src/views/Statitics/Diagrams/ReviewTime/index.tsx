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
import { Download as DownloadIcon } from "@mui/icons-material";
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
import { selectProjectsState } from "src/models/Projects";
import { Task, TaskMovement } from "src/types/models/Projects";
import {
  Months,
  convertToCSV,
  getTaskJournies,
  randomColors,
} from "src/helpers/generalUtils";
import { getJourneyReviewTime } from "../../utils";
import _ from "lodash";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getCsvFile } from "../../utils";
interface ReviewTimeProps {
  options: {
    teams: ITeam[];
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    boards: IDepartmentState[];
    tasks: Task[];
  };
}

const ReviewTime: FC<ReviewTimeProps> = ({ options }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, setState] = useState<StateType>({
    filterPopup: false,
    data: {
      labels: [],
      datasets: [],
    },
    filter: { start: "", end: "" },
    options: null,
    year: new Date(Date.now()).getFullYear(),

    comparisonBy: "PMs",
  });

  const { projects } = useAppSelector(selectProjectsState);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [journies, setJournies] = useState<Journies>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [allJournies, setAllJournies] = useState<Journies>([]);
  const [mounted, setMounted] = useState(false);
  const allCategories = useAppSelector(selectAllCategories);

  useEffect(() => {
    setTeams(options.teams);
  }, [options.teams]);

  useEffect(() => {
    setManagers(
      state.comparisonBy === "PMs"
        ? options.managers.slice(0, 4)
        : options.managers
    );
  }, [options.managers, state.comparisonBy]);

  useEffect(() => {
    setCategories(options.categories);
    setSubCategories(
      _.flattenDeep(options.categories.map((item) => item.subCategoriesId))
    );
  }, [options.categories]);

  useEffect(() => {
    setClients(options.clients);
  }, [options.clients]);

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
    let months = Months;
    const data: DatasetType = {
      labels: months,
      datasets:
        state.comparisonBy === "PMs"
          ? onGetDataSetsByPM()
          : [onGetDatasetsByAll()],
    };
    let maxArray = data.datasets.map((item) => _.max(item.data));
    let max = _.max(maxArray);
    let maxN = max ? max : 50;
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
                `${context.dataset.label} :`,
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
            text: "(Reviewed At) Month",
            poisition: "bottom",
            align: "end",
            color: "black",
          },
        },
        y: {
          min: 0,
          max: maxN * 2,
          ticks: {
            beginAtZero: true,
          },
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
  }, [teams, managers, clients, categories, journies, state.comparisonBy]);

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
      (i) => i.reviewAt && new Date(i.reviewAt).getFullYear() === state.year
    );
    setJournies(journiesData);
  }, [
    teams,
    categories,
    clients,
    managers,
    state.year,
    subCategories,
    mounted,
  ]);

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, comparisonBy: e.target.value });
  };

  const onSetFilterResult = (filter: {
    clients: string[];
    categories: string[];
    teams: string[];
    managers: string[];
    subCategories: string[];
    year: number;
  }) => {
    setTeams(
      options.teams.filter((i) => i._id && filter.teams.includes(i._id))
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
    setManagers(
      options.managers.filter((i) => i._id && filter.managers.includes(i._id))
    );
    setState({ ...state, year: filter.year });
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
      let journiesOfManagerGroupedByMonth = {
        ..._.groupBy(journiesData, "reviewAtMonth"),
      };
      let datasetData = months.map((item) => {
        let journies = journiesOfManagerGroupedByMonth[item.id];
        return {
          journies: journies ?? [],
          color,
          borderColor,
          comparisonId: manager._id,
          comparisonName: manager.name,
        };
      });
      return {
        label: manager.name,
        data: datasetData.map((i) => {
          let val =
            _.sum(i.journies.map((journey) => getJourneyReviewTime(journey))) /
            i.journies.length /
            24;
          return val > 0 ? val : 0;
        }),
        journies: journiesData,
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

  const onGetDatasetsByAll = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });

    let datasetData = months.map((month, index) => {
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

      let journiesData = journies.filter(
        (item) => item.reviewAtMonth === month.id
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

    const result = {
      label: "Organization Review Time",
      data: datasetData.map((i) => {
        let val =
          _.sum(i.journies.map((journey) => getJourneyReviewTime(journey))) /
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
      journies,
    };
    return result;
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
            Review Time
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
            id="all-review"
            value={"All"}
            name="all-review"
            checked={state.comparisonBy === "All"}
            onChange={onHandleChange}
          />
          <label htmlFor="all-review">All</label>
          <input
            id="pms-review"
            type="checkbox"
            value={"PMs"}
            name="pms-review"
            checked={state.comparisonBy === "PMs"}
            onChange={onHandleChange}
          />
          <label htmlFor="pms-review">Project Managers</label>
        </form>
      </Grid>
      <FilterBar
        allOptions={{
          clients: options.clients,
          categories: options.categories,
          teams: options.teams,
          managers: options.managers,
          subCategories: _.flattenDeep(
            categories.map((item) => item.subCategoriesId)
          ),
        }}
        options={{
          clients,
          teams,
          categories,
          managers,
          subCategories,
          year: state.year,
        }}
        filter={state.filterPopup}
        onCloseFilter={() => setState({ ...state, filterPopup: false })}
        onSetFilterResult={onSetFilterResult}
      />
    </>
  );
};

export default ReviewTime;
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
