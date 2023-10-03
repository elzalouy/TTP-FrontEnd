import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import "../../style.css";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { Category, selectAllCategories } from "src/models/Categories";
import { Line } from "react-chartjs-2";
import { selectAllDepartments } from "src/models/Departments";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import _ from "lodash";
import {
  Months,
  getRandomColor,
  getTaskJournies,
  randomColors,
} from "src/helpers/generalUtils";
import { Task, TaskMovement } from "src/types/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { Journey, Journies } from "src/types/views/Statistics";
import { Manager, selectPMs } from "src/models/Managers";
import { getMeetingDeadline } from "../../utils";
import IMAGES from "src/assets/img/Images";
import FilterBar from "./FilterMenu";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
  const { projects } = useAppSelector(selectAllProjects);
  const [filterPopup, openFilterPopup] = useState(false);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);
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
    let journiesData = tasks.map((item) => getTaskJournies(item));
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
  }, [options.categories]);

  useEffect(() => {
    setTeams(
      state.comparisonBy === "Teams" ? options.teams.slice(0, 4) : options.teams
    );
  }, [options.teams, state.comparisonBy]);

  useEffect(() => {
    let months = Months;
    const data = {
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
              return `${context.dataset.label}= ${value}% Revision Journeys`;
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
    setCategories(
      options.categories.filter(
        (i) => i._id && filter.categories.includes(i._id)
      )
    );
    const filteredJournies = [...allJournies].filter(
      (j) =>
        j?.journies[0]?.teamId &&
        filter.teams.includes(j?.journies[0]?.teamId) &&
        j?.journies[0]?.projectManager &&
        filter.managers.includes(j?.journies[0]?.projectManager) &&
        j.journies[0].categoryId &&
        filter.categories.includes(j?.journies[0]?.categoryId) &&
        j.journies[0].clientId &&
        filter.clients.includes(j.journies[0].clientId)
    );
    setJournies(filteredJournies);
  };

  const onGetDataSetsByPM = () => {
    let months = Months.map((item) => {
      return { id: item, name: item };
    });

    const result = managers.map((manager, index) => {
      let color = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]},0.2)`;
      let borderColor = `rgb(${randomColors[index][0]},${randomColors[index][1]},${randomColors[index][2]})`;
      let tasksJournies = journies.filter(
        (i) =>
          i?.journies[0]?.projectManager &&
          i?.journies[0]?.projectManager === manager._id
      );
      let journiesData = _.flattenDeep(
        tasksJournies.map((item) => item.journies)
      );
      let revised = _.flattenDeep(
        tasksJournies.map((item) => {
          let journies = item.journies.slice(1, item.journies.length);
          return journies;
        })
      );
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
          journies: journies ?? [],
          color,
          borderColor,
          comparisonId: manager._id,
          revision: revision ?? [],
        };
      });
      return {
        label: manager.name,
        data: datasetData.map((i) => {
          return Math.floor((i.revision.length / i.journies.length) * 100);
        }),
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

      let tasksJournies = journies.filter(
        (i) => i.journies[0]?.teamId && i.journies[0]?.teamId === team._id
      );

      let journiesData = _.flattenDeep(
        tasksJournies.map((item) => item.journies)
      );

      let revised = _.flattenDeep(
        tasksJournies.map((item) => {
          let journies = item.journies.slice(1, item.journies.length);
          return journies;
        })
      );

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
          journies: journies ?? [],
          color,
          borderColor,
          comparisonId: team._id,
          revision: revision ?? [],
        };
      });

      return {
        label: team.name,
        data: datasetData.map((i) => {
          return Math.floor((i.revision.length / i.journies.length) * 100);
        }),
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
    const tasksJournies = [...journies];
    const journiesData = _.flattenDeep(
      tasksJournies.map((item) => item.journies)
    );
    const revised = _.flattenDeep(
      tasksJournies.map((item) => {
        let revisedJournies = item.journies.slice(1, item.journies.length);
        return revisedJournies;
      })
    );
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
        name: month.name,
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
        journies,
      },
    ];
    return OrganizationResult;
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
        }}
        options={{ clients, managers, categories, teams }}
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
