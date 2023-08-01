import { Box, Drawer, Grid, Typography } from "@mui/material";
import { useAppSelector } from "src/models/hooks";
import { Client, selectClientOptions } from "src/models/Clients";
import { selectAllProjects, selectProjectOptions } from "src/models/Projects";
import { ProjectsInterface } from "src/types/models/Projects";
import { Controller, useForm } from "react-hook-form";
import { Manager, selectPMOptions } from "src/models/Managers";
import { Category, selectCategoriesOptions } from "src/models/Categories";
import {
  selectBoardsOptions,
  selectDepartmentOptions,
  selectTeamsOptions,
} from "src/models/Departments";
import { DialogOption } from "src/types/components/SelectDialog";
import { MulitSelectDialogComponent } from "src/coreUI/components/Inputs/SelectDialog/MuliSelectFilterDialog";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import { useDispatch } from "react-redux";

interface FilterBarProps {
  filter: boolean;
  onCloseFilter: any;
  onSetFilterResult: (filter: {
    clients: string[];
    managers: string[];
    categories: string[];
    teams: string[];
    boards: string[];
  }) => void;
  options: {
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    teams: ITeam[];
    boards: IDepartmentState[];
  };
  allOptions: {
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    teams: ITeam[];
    boards: IDepartmentState[];
  };
}

const FilterMenu = ({
  filter,
  onCloseFilter,
  onSetFilterResult,
  options,
  allOptions,
}: FilterBarProps) => {
  const { control, watch, setValue, reset } = useForm<{
    clientId: string;
    projectManager: string;
    category: string;
    boardId: string;
    teamId: string;
    projectId: string;
  }>({
    defaultValues: {
      clientId: "",
      projectManager: "",
      category: "",
      boardId: "",
      projectId: "",
    },
  });

  const dispatch = useDispatch();
  const clientsOptions = useAppSelector(selectClientOptions);
  const PmsOptions = useAppSelector(selectPMOptions);
  const categoriesOptions = useAppSelector(selectCategoriesOptions);
  const projects: ProjectsInterface = useAppSelector(selectAllProjects);
  const boardOptions = useAppSelector(selectBoardsOptions);
  const departmentsOptions = useAppSelector(selectDepartmentOptions);
  const teamOptions = useAppSelector(selectTeamsOptions);
  const projectsOptions = useAppSelector(selectProjectOptions);

  const onSelectAll = (select: boolean, filter: string) => {
    onSetFilterResult({
      clients:
        filter === "Clients"
          ? select
            ? allOptions.clients.map((item) => item._id)
            : []
          : options.clients.map((i) => i._id),
      managers:
        filter === "Project Managers"
          ? select
            ? allOptions.managers.map((item) => item._id)
            : []
          : options.managers.map((m) => m._id),
      categories:
        filter === "Categories"
          ? select
            ? allOptions.categories.map((item) => item._id)
            : []
          : options.categories.map((i) => i._id),
      teams:
        filter === "Teams"
          ? select
            ? allOptions.teams.map((item) => item._id ?? "")
            : []
          : options.teams.map((t) => t._id ?? ""),
      boards:
        filter === "Boards"
          ? select
            ? allOptions.boards.map((i) => i._id)
            : []
          : options.boards.map((i) => i._id),
    });
  };

  const onSelectBoard = (value: DialogOption) => {
    let values = {
      clients: options.clients.map((item) => item._id),
      managers: options.managers.map((item) => item._id),
      categories: options.categories.map((item) => item._id),
      teams: options.teams.map((i) => i._id ?? ""),
      boards:
        value.id === "all"
          ? allOptions.boards.map((item) => item._id)
          : [...options.boards.map((item) => item._id), value.id],
    };
    onSetFilterResult(values);
  };

  const onDiselectBoard = (item: DialogOption) => {
    let values = {
      clients: options.clients.map((item) => item._id),
      managers: options.managers.map((item) => item._id),
      categories: options.categories.map((item) => item._id),
      teams: options.teams.map((item) => item._id ?? ""),
      boards: options.boards.map((i) => i._id),
    };
    values.boards =
      item.id === "all" ? [] : [...values.boards].filter((i) => i !== item.id);
    onSetFilterResult(values);
  };

  return (
    <Drawer
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          background: "#FAFAFB",
          width: "280px",
          transition: "all 0.5s ease !important",
        },
      }}
      open={filter}
      variant="temporary"
      onClose={onCloseFilter}
    >
      <Grid
        container
        justifyContent={"space-between"}
        p={2}
        alignItems="center"
      >
        <Grid item xs={12} justifyContent={"space-between"} container>
          <Typography mt={1} variant="h4">
            Filter Tasks
          </Typography>
        </Grid>
        <Grid paddingX={0.5} item xs={6} sm={12} marginY={1}>
          <Box className="tasks-option">
            <Controller
              name="boardId"
              control={control}
              render={(props) => (
                <MulitSelectDialogComponent
                  allOption
                  name="boardId"
                  selected={options.boards.map((item) => {
                    return { id: item._id, label: item.name };
                  })}
                  options={departmentsOptions.map((item) => {
                    return { id: item.id, label: item.text };
                  })}
                  onSelectAll={(select: boolean) =>
                    onSelectAll(select, "Boards")
                  }
                  label="Board: "
                  onSelect={onSelectBoard}
                  onDiselect={onDiselectBoard}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default FilterMenu;

const options = [
  [
    { id: "asc", text: "Ascending", value: "asc" },
    { id: "desc", text: "Descending", value: "desc" },
  ],
  [
    {
      id: "Tasks Board",
      value: "Tasks Board",
      text: "Tasks Board",
    },
    {
      id: "Not Clear",
      value: "Not Clear",
      text: "Not Clear",
    },
    {
      id: "In Progress",
      value: "In Progress",
      text: "In Progress",
    },
    { id: "Review", value: "Review", text: "Review" },
    { id: "Shared", value: "Shared", text: "Shared" },
    {
      id: "Done",
      value: "Done",
      text: "Done",
    },
    { id: "Cancled", value: "Cancled", text: "Cancled" },
  ],
];
