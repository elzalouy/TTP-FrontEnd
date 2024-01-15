import "../../../style.css";
import _ from "lodash";
import IMAGES from "src/assets/img/Images";
import FiltersBar from "./FilterMenu";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  DatasetType,
  ITaskInfo,
  Journies,
  StateType,
  TodByCategoryProps,
} from "src/types/views/Statistics";
import { Bar } from "react-chartjs-2";
import { ITeam } from "src/types/models/Departments";
import { DialogOption } from "src/types/components/SelectDialog";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { selectTeamsOptions } from "src/models/Departments";
import { Manager, selectPMOptions } from "src/models/Managers";
import React, { useEffect, useState } from "react";
import { Client, selectClientOptions } from "src/models/Clients";
import { Grid, IconButton, Typography } from "@mui/material";
import { convertToCSV, getTaskJournies } from "src/helpers/generalUtils";
import { Download as DownloadIcon } from "@mui/icons-material";
import {
  chartOptions,
  onDownload,
  onGetDataSetsByClient,
  onGetDataSetsByPM,
  onGetDatasetsByAll,
  onGetDatasetsByTeams,
} from "./utils";
import { getCsvFile } from "../../../utils";
import { TaskMovement } from "src/types/models/Projects";
import { selectAllCategories } from "src/models/Categories";

/**
 * Time of delivery diagram by the Category
 * @param param0
 * @returns
 */

const TodByCategory = ({ options }: TodByCategoryProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  // Global state used in Filteration
  const { projects } = useAppSelector(selectAllProjects);
  const teamsOptions = useAppSelector(selectTeamsOptions);
  const pmsOptions = useAppSelector(selectPMOptions);
  const clientsOptions = useAppSelector(selectClientOptions);
  // Component State : Managers, teams, clients are the selected ones for the filteration
  const [managers, setManagers] = useState<Manager[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  // Component State : Tasks after updating it and setting the project, the client, and the manager information.
  const [tasks, setTasks] = useState<ITaskInfo[]>([]);

  // Journies of all tasks concatinated together.
  const [journies, setJournies] = useState<Journies>([]);
  const [allJournies, setAllJournies] = useState<Journies>([]);

  // the filter values, and the data of the diagram sepereted by  the labels provided and by the datasets.
  const [state, setState] = useState<StateType>({
    filterPopup: false,
    filter: {
      start: null,
      end: null,
    },
    data: {
      labels: [],
      datasets: [],
    },
    options: null,
    comparisonBy: "Teams",
  });

  // Getting every needed information of each task like Project manager, client, etc.
  useEffect(() => {
    let newTasks: ITaskInfo[] = tasks.map((item) => {
      let project = projects.find((project) => project._id === item.projectId);
      let newTask: ITaskInfo = {
        ...item,
        clientId: project?.clientId,
        projectManager: project?.projectManager,
      };
      return newTask;
    });
    let journiesData = newTasks.map((item) => getTaskJournies(item).journies);
    let flattenedJournies = _.flatten(journiesData);
    setJournies(flattenedJournies);
    setAllJournies(flattenedJournies);
  }, [tasks, teams, managers, projects]);

  // Once the tasks and boards options from the component props are ready update their state.
  useEffect(() => {
    setTasks(options.tasks);
  }, [options.tasks, options.boards]);

  // Once the Managers from the component props are ready, update the state.
  useEffect(() => {
    setManagers(
      state.comparisonBy === "PMs"
        ? options.managers.slice(0, 4)
        : options.managers
    );
  }, [options.managers, state.comparisonBy]);

  // Any change
  useEffect(() => {
    setClients(
      state.comparisonBy === "Clients"
        ? options.clients.slice(0, 4)
        : options.clients
    );
  }, [options.clients, state.comparisonBy]);

  // Once the Teams data from the component props is ready, update the state.
  useEffect(() => {
    setTeams(
      state.comparisonBy === "Teams" ? options.teams.slice(0, 4) : options.teams
    );
  }, [options.teams, state.comparisonBy]);

  // Prepare the datasets and render the diagram with the new values.
  useEffect(() => {
    let Categories = options.categories.map((item) => {
      return { id: item._id, name: item.category };
    });

    const data: DatasetType = {
      labels: Categories.map((item) => item.name),
      datasets:
        state.comparisonBy === "Clients"
          ? onGetDataSetsByClient(options.categories, clients, journies)
          : state.comparisonBy === "PMs"
          ? onGetDataSetsByPM(options.categories, managers, journies)
          : state.comparisonBy === "Teams"
          ? onGetDatasetsByTeams(options.categories, teams, journies)
          : [onGetDatasetsByAll(options.categories, journies)],
    };
    let Options = chartOptions(data);
    setState({ ...state, options: Options, data });
  }, [journies, tasks, state.comparisonBy, clients, managers, teams]);

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, comparisonBy: e.target.value });
  };

  // Filter by the Shared date.
  const onSetFilter = (type: string, value: string) => {
    let State = { ...state };
    let journies = [...allJournies];
    console.log({ value: new Date(value), type });
    if (type === "startDate") {
      State.filter.start = value;
      journies = journies.filter(
        (i) =>
          i.startedAt &&
          value &&
          new Date(i.startedAt).getTime() >= new Date(value).getTime()
      );
    }
    if (type === "endDate") {
      State.filter.end = value;
      journies = journies.filter(
        (i) =>
          i.startedAt &&
          value &&
          new Date(i.startedAt).getTime() <= new Date(value).getTime()
      );
    }
    setJournies(journies);
    setState(State);
  };

  const onSelect = (value: DialogOption) => {
    if (state.comparisonBy === "Teams") {
      let t = options.teams.find((i) => i._id && i._id === value.id);
      if (t) setTeams([...teams, t]);
    }
    if (state.comparisonBy === "PMs") {
      let pm = options.managers.find((p) => p._id === value.id);
      if (pm) setManagers([...managers, pm]);
    }
    if (state.comparisonBy === "Clients") {
      let client = options.clients.find((c) => c._id === value.id);
      if (client) setClients([...clients, client]);
    }
  };

  const onDiselect = (value: DialogOption) => {
    if (state.comparisonBy === "Teams") {
      setTeams([...teams].filter((i) => i._id !== value.id));
    }
    if (state.comparisonBy === "PMs") {
      setManagers([...managers].filter((i) => i._id !== value.id));
    }
    if (state.comparisonBy === "Clients") {
      setClients([...clients].filter((i) => i._id !== value.id));
    }
  };

  const onSelectAll = (select: boolean) => {
    if (state.comparisonBy === "Teams") {
      setTeams(select ? options.teams : []);
    }
    if (state.comparisonBy === "PMs") {
      setManagers(select ? options.managers : []);
    }
    if (state.comparisonBy === "Clients") {
      setClients(select ? options.clients : []);
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
        <Grid xs={10} mb={1}>
          <Typography fontSize={18} mb={1} fontWeight={"600"}>
            Time Of Delivery Diagram Category Comparison
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
              onClick={() => onDownload(state.data, formRef)}
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
        <Bar
          plugins={[ChartDataLabels]}
          options={state.options}
          data={state.data}
        />
        <form className="ComparisonOptions">
          <input
            type="checkbox"
            id="all"
            value={"All"}
            name="all"
            checked={state.comparisonBy === "All"}
            onChange={onHandleChange}
          />
          <label htmlFor="all">All</label>
          <input
            type="checkbox"
            id="clients"
            value={"Clients"}
            name="clients"
            checked={state.comparisonBy === "Clients"}
            onChange={onHandleChange}
          />
          <label htmlFor="clients">Clients</label>
          <input
            type="checkbox"
            id={"teams"}
            value={"Teams"}
            name="teams"
            checked={state.comparisonBy === "Teams"}
            onChange={onHandleChange}
          />
          <label htmlFor="teams">Teams</label>
          <input
            id="pms"
            type="checkbox"
            value={"PMs"}
            name="pms"
            checked={state.comparisonBy === "PMs"}
            onChange={onHandleChange}
          />
          <label htmlFor="pms">Project Managers</label>
        </form>
      </Grid>
      <FiltersBar
        comparison={{
          name: state.comparisonBy,
          label: `${state.comparisonBy} : `,
          options:
            state.comparisonBy === "Teams"
              ? teamsOptions.map((i) => {
                  return { id: i.id ?? "", label: i.text ?? "" };
                })
              : state.comparisonBy === "PMs"
              ? pmsOptions.map((i) => {
                  return { id: i.id, label: i.text };
                })
              : state.comparisonBy === "Clients"
              ? clientsOptions.map((i) => {
                  return { id: i.id, label: i.text };
                })
              : [],
          onSelect: onSelect,
          onDiselect: onDiselect,
          onSelectAll: onSelectAll,
          selected:
            state.comparisonBy === "Teams"
              ? teams.map((i) => {
                  return { id: i._id ?? "", label: i.name ?? "" };
                })
              : state.comparisonBy === "PMs"
              ? managers.map((i) => {
                  return { id: i._id ?? "", label: i.name ?? "" };
                })
              : state.comparisonBy === "Clients"
              ? clients.map((i) => {
                  return { id: i._id, label: i.clientName };
                })
              : [],
        }}
        start={state.filter.start}
        end={state.filter.end}
        onSetFilter={onSetFilter}
        closeFilterPopup={() =>
          setState({
            ...state,
            filterPopup: false,
          })
        }
        filterPopup={state.filterPopup}
      />
    </>
  );
};

export default TodByCategory;

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
