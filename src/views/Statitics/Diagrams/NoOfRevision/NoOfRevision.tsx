import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import "../../style.css";
import { useAppSelector } from "src/models/hooks";
import { selectProjectsState } from "src/models/Projects";
import { Category, SubCategory } from "src/models/Categories";
import { Line } from "react-chartjs-2";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import { Download as DownloadIcon } from "@mui/icons-material";
import _ from "lodash";
import {
  Months,
  convertToCSV,
  getTaskJournies,
  randomColors,
} from "src/helpers/generalUtils";
import { Task } from "src/types/models/Projects";
import { Client } from "src/models/Clients";
import { DatasetType, Journies, StateType } from "src/types/views/Statistics";
import { Manager } from "src/models/Managers";
import IMAGES from "src/assets/img/Images";
import FilterBar from "./FilterMenu";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getCsvFile } from "../../utils";

interface ITaskInfo extends Task {
  clientId?: string;
  projectManager?: string;
}

type NoOfRevisionProps = {
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
const NoOfRevision = ({ options }: NoOfRevisionProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { projects } = useAppSelector(selectProjectsState);
  const [filterPopup, openFilterPopup] = useState(false);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);
  const [allJournies, setAllJournies] = useState<Journies>([]);
  const [journies, setJournies] = useState<Journies>([]);

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
      let newTask: ITaskInfo = {
        ...item,
        clientId: project?.clientId,
        projectManager: project?.projectManager,
      };
      return newTask;
    });
    setTasks([...newTasks]);
  }, [options.tasks, projects]);

  useEffect(() => {
    let journiesData = _.flattenDeep(
      tasks.map((item) => getTaskJournies(item).journies)
    );
    setJournies(journiesData);
    setAllJournies(journiesData);
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
    let months = Months;
    const data: DatasetType = {
      labels: months,
      datasets:
        state.comparisonBy === "PMs"
          ? onGetDataSetsByPM()
          : state.comparisonBy === "Teams"
          ? onGetDatasetsByTeams()
          : state.comparisonBy === "All"
          ? onGetDatasetsByAll()
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
              return `${context.dataset.label}= ${value} % Revision Journeys`;
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
            poisition: "top",
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
            text: "Number Of Revision Percentage",
            poisition: "bottom",
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
    subCategories: string[];
    teams: string[];
  }) => {
    setTeams(
      options.teams.filter((i) => i._id && filter.teams.includes(i._id))
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

    let journiesData = allJournies.filter(
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
      (j) =>
        (j.subCategoryId && filter.subCategories.includes(j.subCategoryId)) ||
        j.subCategoryId === null
    );
    setJournies(journiesData);
  };

  const onGetDataSetsByPM = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });

    const result = managers.map((manager, index) => {
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;
      let journiesData = journies.filter(
        (i) => i.projectManager === manager._id
      );
      let revised = journiesData.filter((i) => i.revision === true);
      let revisionOfManagerByMonth = {
        ..._.groupBy(revised, "startedAtMonth"),
      };

      let journiesOfManagerByMonth = {
        ..._.groupBy(journiesData, "startedAtMonth"),
      };

      let datasetData = months.map((item) => {
        let journies = journiesOfManagerByMonth[item.id];
        let revision = revisionOfManagerByMonth[item.id];
        return {
          comparisonId: manager._id,
          comparisonName: manager.name,
          journies: journies ?? [],
          color,
          borderColor,
          revision: revision ?? [],
        };
      });

      return {
        label: manager.name,
        data: datasetData.map((i) => {
          return Math.floor((i.revision.length / i.journies.length) * 100);
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

  const onGetDatasetsByTeams = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    const result = teams.map((team, index) => {
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;

      let journiesData = journies.filter(
        (i) => i.teamId && i.teamId === team._id
      );
      let revised = journiesData.filter((i) => i.revision === true);

      let revisionOfManagerByMonth = {
        ..._.groupBy(revised, "startedAtMonth"),
      };

      let journiesOfManagerByMonth = {
        ..._.groupBy(journiesData, "startedAtMonth"),
      };

      let datasetData = months.map((item) => {
        let journies = journiesOfManagerByMonth[item.id];
        let revision = revisionOfManagerByMonth[item.id];
        return {
          comparisonId: team._id,
          comparisonName: team.name,
          journies: journies ?? [],
          color,
          borderColor,
          revision: revision ?? [],
        };
      });

      return {
        label: team.name,
        data: datasetData.map((i) => {
          return Math.floor((i.revision.length / i.journies.length) * 100);
        }),
        journies: journiesData,
        backgroundColor: datasetData.map((items) => items.color),
        borderColor: datasetData.map((items) => items.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
        datasetData,
      };
    });
    return result;
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, comparisonBy: e.target.value });
  };

  const onGetDatasetsByAll = () => {
    const journiesData = journies;
    const revised = journiesData.filter((i) => i.revision === true);
    const journiesByMonth = {
      ..._.groupBy(journiesData, "startedAtMonth"),
    };
    const revisionByMonth = {
      ..._.groupBy(revised, "startedAtMonth"),
    };
    let months = Months.map((item) => {
      return { id: item, name: item };
    });
    let color = "rgb(255,207,36,0.2)";
    let borderColor = "rgb(255,207,36)";
    let datasetData = months.map((month, index) => {
      let journiesOfMonth = journiesByMonth[month.id];
      let revisionOfMonth = revisionByMonth[month.id];
      return {
        journies: journiesOfMonth ?? [],
        color,
        borderColor,
        comparisonId: month.id,
        comparisonName: month.name,
        revision: revisionOfMonth ?? [],
      };
    });

    const OrganizationResult = [
      {
        label: "Organization",
        data: datasetData.map((i) => {
          return Math.floor((i.revision.length / i.journies.length) * 100);
        }),
        backgroundColor: datasetData.map((i) => i.color),
        borderColor: datasetData.map((i) => i.borderColor),
        borderWidth: 3,
        hoverBorderWidth: 4,
        skipNull: true,
        datasetData,
        journies: journiesData,
      },
    ];
    return OrganizationResult;
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
      link.download = "Number of revision (Journies data)";
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
      link.download = "Number of revision (Bars data)";
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
        Number of Revision
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
          id="all-NoOfRevision"
          value={"All"}
          name="all-NoOfRevision"
          checked={state.comparisonBy === "All"}
          onChange={onHandleChange}
        />
        <label htmlFor="all-NoOfRevision">All</label>
        <input
          type="checkbox"
          id={"teams-NoOfRevision"}
          value={"Teams"}
          name="teams-NoOfRevision"
          checked={state.comparisonBy === "Teams"}
          onChange={onHandleChange}
        />
        <label htmlFor="teams-NoOfRevision">Teams</label>
        <input
          id="pms-NoOfRevision"
          type="checkbox"
          value={"PMs"}
          name="pms-NoOfRevision"
          checked={state.comparisonBy === "PMs"}
          onChange={onHandleChange}
        />
        <label htmlFor="pms-NoOfRevision">Project Managers</label>
      </form>
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

export default NoOfRevision;

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
