import "../../style.css";
import _ from "lodash";
import IMAGES from "src/assets/img/Images";
import FilterBar from "./FilterMenu";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { Client } from "src/models/Clients";
import { Manager } from "src/models/Managers";
import {
  DatasetType,
  ITaskInfo,
  Journies,
  StateType,
} from "src/types/views/Statistics";
import {
  Category,
  SubCategory,
  selectAllCategories,
} from "src/models/Categories";
import { getCsvFile } from "../../utils";
import { useAppSelector } from "src/models/hooks";
import { selectProjectsState } from "src/models/Projects";
import { Task, TaskMovement } from "src/types/models/Projects";
import { getMeetingDeadline } from "../../utils";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import { Download as DownloadIcon } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import {
  Months,
  convertToCSV,
  getTaskJournies,
} from "src/helpers/generalUtils";

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
  const formRef = React.useRef<HTMLFormElement>(null);
  const { projects } = useAppSelector(selectProjectsState);
  const allCategories = useAppSelector(selectAllCategories);
  const [filterPopup, openFilterPopup] = useState(false);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);
  const [allJournies, setAllJournies] = useState<Journies>([]);
  const [journies, setJournies] = useState<Journies>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

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
      let team = item.teamId
        ? teams.find((i) => i._id === item.teamId)?.name
        : undefined;
      let client = clients.find((i) => i._id === project?.clientId);
      let category = categories.find((i) => i._id === item.categoryId);
      let manager = managers.find((m) => m._id === project?.projectManager);
      let newTask: ITaskInfo = {
        ...item,
        clientId: project?.clientId,
        projectManager: project?.projectManager,
        teamName: team,
        clientName: client?.clientName,
        projectName: project?.name,
        categoryName: category?.category,
        subCategoryName: category?.subCategoriesId.find(
          (i) => i._id === item.subCategoryId
        )?.subCategory,
        projectManagerName: manager?.name,
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
    setSubCategories(
      _.flattenDeep(options.categories.map((item) => item.subCategoriesId))
    );
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
    const data: DatasetType = {
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
    subCategories: string[];
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
    let allSubs = _.flattenDeep(
      allCategories.map((i) => i.subCategoriesId.map((s) => s._id))
    );

    setSubCategories(
      _.flattenDeep(categories.map((i) => i.subCategoriesId)).filter((sub) =>
        filter.subCategories.includes(sub._id)
      )
    );

    let journiesData: Journies = allJournies.filter(
      (j) =>
        j.teamId &&
        filter.teams.includes(j.teamId) &&
        j.projectManager &&
        filter.managers.includes(j.projectManager) &&
        j.categoryId &&
        filter.categories.includes(j.categoryId) &&
        j.clientId &&
        filter.clients.includes(j.clientId)
    );

    journiesData = journiesData.filter(
      (i) =>
        filter.subCategories.includes(i.subCategoryId) ||
        i.subCategoryId === null ||
        !allSubs.includes(i.subCategoryId)
    );
    setJournies(journiesData);
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
          comparisonId: manager._id,
          comparisonName: manager.name,
          journies: journies ?? [],
          color,
          borderColor,
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
        datasetData,
        journies,
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
          comparisonName: client.clientName,
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
        journies,
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
          comparisonName: team.name,
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
        journies,
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
        journies,
        backgroundColor: datasetData.map((i) => i.color),
        borderColor: datasetData.map((i) => i.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
      },
    ];
    return result;
  };

  const onDownload = () => {
    let { bars, comparisons } = getCsvFile(state.data);
    if (comparisons.length > 0 && formRef.current) {
      let csvData = convertToCSV(comparisons);
      let dataBlob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.style.display = "none";
      link.download = "Meeting Deadline (Journies data)";
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
      link.download = "Meeting Deadline (Bars data)";
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
          subCategories: _.flattenDeep(
            categories.map((item) => item.selectedSubCategory)
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
