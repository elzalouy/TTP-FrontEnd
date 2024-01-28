import "../../../style.css";
import _ from "lodash";
import IMAGES from "src/assets/img/Images";
import FilterBar from "./FilterMenu";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { Client } from "src/models/Clients";
import { Manager } from "src/models/Managers";
import {
  Category,
  SubCategory,
  selectAllCategories,
} from "src/models/Categories";
import {
  onDownload,
  onGetDataSetsByClient,
  onGetDataSetsByPM,
  onGetDatasetsByAll,
  onGetDatasetsByTeams,
  setOptions,
} from "./utils";
import { useAppSelector } from "src/models/hooks";
import { selectProjectsState } from "src/models/Projects";
import { Task } from "src/types/models/Projects";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import {
  DatasetType,
  ITaskInfo,
  Journies,
  StateType,
} from "src/types/views/Statistics";
import { Download as DownloadIcon } from "@mui/icons-material";
import { Months, getTaskJournies } from "src/helpers/generalUtils";
import { useLocation } from "react-router";

type BySharedMonthProps = {
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
const BySharedMonth = ({ options }: BySharedMonthProps) => {
  const [mounted, setMounted] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const allCategories = useAppSelector(selectAllCategories);
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
  const [year, setYear] = useState<number>(new Date(Date.now()).getFullYear());
  const [state, setState] = useState<StateType>({
    data: {
      labels: [],
      datasets: [],
    },
    filter: { start: null, end: null },
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
      let category = allCategories.find((i) => i._id === item.categoryId);
      let subCategory = item.subCategoryId
        ? category?.subCategoriesId.find((s) => s._id === item.subCategoryId)
            ?.subCategory
        : "";
      let client = clients.find((i) => i._id === project?.clientId)?.clientName;
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
    let journiesData = tasks.map((item) => getTaskJournies(item).journies);
    let flattenedJournies = _.flatten(journiesData);
    setJournies(flattenedJournies);
    setAllJournies(flattenedJournies);
    setMounted(!mounted);
  }, [tasks]);

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
    setCategories(options.categories);
    setSubCategories(
      _.flattenDeep(options.categories.map((item) => item.subCategoriesId))
    );
  }, [options.categories, state.comparisonBy]);

  useEffect(() => {
    setTeams(
      state.comparisonBy === "Teams" ? options.teams.slice(0, 4) : options.teams
    );
  }, [options.teams, state.comparisonBy]);

  useEffect(() => {
    let teamsIds = teams.map((i) => i._id);
    let managersIds = managers.map((i) => i._id);
    let categoriesIds = categories.map((i) => i._id);
    let subCategoriesIds = subCategories.map((i) => i._id);
    let clientsIds = clients.map((i) => i._id);
    let journiesData: Journies = allJournies.filter(
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
    setJournies(journiesData);
  }, [teams, clients, managers, categories, subCategories, mounted]);

  useEffect(() => {
    let months = Months;
    const data: DatasetType = {
      labels: months,
      datasets:
        state.comparisonBy === "Clients"
          ? onGetDataSetsByClient(clients, journies)
          : state.comparisonBy === "PMs"
          ? onGetDataSetsByPM(managers, journies)
          : state.comparisonBy === "Teams"
          ? onGetDatasetsByTeams(teams, journies)
          : [onGetDatasetsByAll(journies)],
    };
    const options = setOptions(data);
    setState({ ...state, options, data });
  }, [journies, state.comparisonBy]);

  const onSetFilterResult = (filter: {
    clients: string[];
    managers: string[];
    categories: string[];
    teams: string[];
    subCategories: string[];
    year: number;
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
        justifyContent: "space-between",
      }}
    >
      <Typography fontSize={18} mb={1} fontWeight={"600"}>
        Time Of Delivery Diagram Trend Comparison
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
            onClick={() => onDownload(state.data, formRef, state.comparisonBy)}
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
          id="all-bySharedDate"
          value={"All-bySharedDate"}
          name="all-bySharedDate"
          checked={state.comparisonBy === "All-bySharedDate"}
          onChange={onHandleChange}
        />
        <label htmlFor="all-bySharedDate">All</label>
        <input
          type="checkbox"
          id="clients-bySharedDate"
          value={"Clients"}
          name="clients-bySharedDate"
          checked={state.comparisonBy === "Clients"}
          onChange={onHandleChange}
        />
        <label htmlFor="clients-bySharedDate">Clients</label>
        <input
          type="checkbox"
          id={"teams-bySharedDate"}
          value={"Teams"}
          name="teams-bySharedDate"
          checked={state.comparisonBy === "Teams"}
          onChange={onHandleChange}
        />
        <label htmlFor="teams-bySharedDate">Teams</label>
        <input
          id="pms-bySharedDate"
          type="checkbox"
          value={"PMs"}
          name="pms-bySharedDate"
          checked={state.comparisonBy === "PMs"}
          onChange={onHandleChange}
        />
        <label htmlFor="pms-bySharedDate">Project Managers</label>
      </form>
      <FilterBar
        allOptions={{
          clients: options.clients,
          teams: options.teams,
          managers: options.managers,
          categories: options.categories,
          subCategories: _.flattenDeep(
            categories.map((item) => item.subCategoriesId)
          ),
        }}
        options={{ clients, managers, categories, teams, subCategories, year }}
        filter={filterPopup}
        onCloseFilter={() => openFilterPopup(false)}
        onSetFilterResult={onSetFilterResult}
      />
    </Grid>
  );
};

export default BySharedMonth;

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
