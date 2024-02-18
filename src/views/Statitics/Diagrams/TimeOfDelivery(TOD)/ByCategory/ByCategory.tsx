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
import { selectProjectsState } from "src/models/Projects";
import { selectTeamsOptions } from "src/models/Departments";
import { Manager, selectPMOptions } from "src/models/Managers";
import React, { useEffect, useState } from "react";
import { Client, selectClientOptions } from "src/models/Clients";
import { Grid, IconButton, Typography } from "@mui/material";
import { getTaskJournies } from "src/helpers/generalUtils";
import { Download as DownloadIcon } from "@mui/icons-material";
import {
  chartOptions,
  onDownload,
  onGetDataSetsByClient,
  onGetDataSetsByPM,
  onGetDatasetsByAll,
  onGetDatasetsByTeams,
} from "./utils";
import {
  Category,
  SubCategory,
  selectAllCategories,
} from "src/models/Categories";

/**
 * Time of delivery diagram by the Category
 * @param param0
 * @returns
 */

const TodByCategory = ({ options }: TodByCategoryProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [mounted, setMounted] = useState(false);
  // Global state used in Filteration
  const allCategories = useAppSelector(selectAllCategories);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const { projects } = useAppSelector(selectProjectsState);
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
    year: new Date(Date.now()).getFullYear(),
  });

  useEffect(() => {
    setCategories(options.categories);
    setSubCategories(
      _.flattenDeep(options.categories.map((item) => item.subCategoriesId))
    );
  }, [options.categories, state.comparisonBy]);

  useEffect(() => {
    setClients(
      state.comparisonBy === "Clients"
        ? options.clients.slice(0, 4)
        : options.clients
    );
  }, [options.clients, state.comparisonBy]);

  useEffect(() => {
    setManagers(
      state.comparisonBy === "PMs"
        ? options.managers.slice(0, 4)
        : options.managers
    );
  }, [options.managers, state.comparisonBy]);

  useEffect(() => {
    setTeams(
      state.comparisonBy === "Teams" ? options.teams.slice(0, 4) : options.teams
    );
  }, [options.teams, state.comparisonBy]);

  useEffect(() => {
    let journiesData = _.flattenDeep(
      tasks.map((item) => getTaskJournies(item).journies)
    );
    setJournies(journiesData);
    setAllJournies(journiesData);
    setMounted(!mounted);
  }, [tasks]);

  useEffect(() => {
    let tasksData = [...options.tasks];
    let newTasks: ITaskInfo[] = tasksData.map((item) => {
      let project = projects.find((project) => project._id === item.projectId);
      let category = allCategories.find((i) => i._id === item.categoryId);
      let subCategory = item.subCategoryId
        ? category?.subCategoriesId.find((s) => s._id === item.subCategoryId)
            ?.subCategory
        : "";
      let client = clientsOptions.find((i) => i.id === project?.clientId)?.text;
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

  // Prepare the datasets and render the diagram with the new values.
  useEffect(() => {
    if (journies && journies.length > 0) {
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
    }
  }, [journies, state.comparisonBy]);

  useEffect(() => {
    let journiesData = [...allJournies];
    if (allJournies && journies && journies.length > 0) {
      let teamsIds = teams.map((i) => i._id);
      let managersIds = managers.map((i) => i._id);
      let categoriesIds = categories.map((i) => i._id);
      let subCategoriesIds = subCategories.map((i) => i._id);
      let clientsIds = clients.map((i) => i._id);
      journiesData = [...allJournies].filter(
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
        allCategories.map((i) => i.subCategoriesId.map((i) => i._id))
      );

      journiesData = journiesData.filter(
        (i) =>
          subCategoriesIds.includes(i.subCategoryId) ||
          i.subCategoryId === null ||
          (i.subCategoryId.length > 0 && !allSubs.includes(i.subCategoryId))
      );

      journiesData = journiesData.filter(
        (i) => i.sharedAt && new Date(i.sharedAt).getFullYear() === state.year
      );

      let State = { ...state };
      if (State.filter.start && State.filter.end) {
        let start = new Date(State.filter.start).getTime();
        let end = new Date(State.filter.end).getTime() + 86400000;
        journiesData = journiesData.filter(
          (i) =>
            i.startedAt &&
            i.journeyFinishedAtDate &&
            new Date(i.startedAt).getTime() >= start &&
            new Date(i.startedAt).getTime() <= end &&
            new Date(i.journeyFinishedAtDate).getTime() <= end &&
            new Date(i.journeyFinishedAtDate).getTime() >= start
        );
      }
    }
    setJournies(journiesData);
    console.log({ clients, journies, categories, managers, teams });
  }, [
    state.filter.start,
    state.filter.end,
    teams,
    clients,
    managers,
    categories,
    subCategories,
    mounted,
  ]);

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, comparisonBy: e.target.value });
  };

  // Filter by the Shared date.
  const onSetFilter = (start: string, end: string) => {
    setState({ ...state, filter: { start: start, end: end } });
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
              onClick={() =>
                onDownload(state.data, formRef, state.comparisonBy)
              }
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
