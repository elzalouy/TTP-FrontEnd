import { Box, Drawer, Grid, IconButton, Typography } from "@mui/material";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { useAppSelector } from "src/models/hooks";
import { Client, selectClientOptions } from "src/models/Clients";
import { selectAllProjects, selectProjectOptions } from "src/models/Projects";
import { ProjectsInterface, Task } from "src/types/models/Projects";
import { Options } from "src/types/views/Projects";
import { Controller, useForm } from "react-hook-form";
import { Manager, selectPMOptions } from "src/models/Managers";
import IMAGES from "src/assets/img/Images";
import { Category, selectCategoriesOptions } from "src/models/Categories";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import {
  selectAllDepartments,
  selectBoardsOptions,
  selectDepartmentOptions,
  selectTeamsOptions,
  updateDepartmentsPriority,
} from "src/models/Departments";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DialogOption } from "src/types/components/SelectDialog";
import { MulitSelectDialogComponent } from "src/coreUI/components/Inputs/SelectDialog/MuliSelectFilterDialog";
import { ITeam } from "src/types/models/Departments";

type filterTypes =
  | "clientId"
  | "projectManager"
  | "category"
  | "boardId"
  | "teamId"
  | "projectId";

interface IState {
  filter: boolean;
  showEditTasks: string;
  tasks: Task[];
  projectsOptions: Options;
  projectManagersOptions: Options;
}

interface FilterBarProps {
  filter: boolean;
  onCloseFilter: any;
  onSetFilterResult: (filter: {
    clients: string[];
    managers: string[];
    categories: string[];
    teams: string[];
  }) => void;
  options: {
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    teams: ITeam[];
  };
}

const FilterBar = ({
  filter,
  onCloseFilter,
  onSetFilterResult,
  options,
}: FilterBarProps) => {
  const teamOptions = useAppSelector(selectTeamsOptions);
  const clientsOptions = useAppSelector(selectClientOptions);
  const managersOptions = useAppSelector(selectPMOptions);
  const categoriesOptions = useAppSelector(selectCategoriesOptions);

  const { control, watch, setValue, reset } = useForm<{
    clientId: string;
    projectManager: string;
    categoryId: string;
    teamId: string;
  }>({
    defaultValues: {
      clientId: "",
      projectManager: "",
      categoryId: "",
      teamId: "",
    },
  });

  const dispatch = useDispatch();

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
          <Box
            mr={1}
            style={{ height: "32px", width: "32px", padding: "0 10px" }}
            className="filter-icon"
          >
            <IconButton
              disableRipple
              onClick={() => {
                reset();
              }}
            >
              <img src={IMAGES.deleteicon} alt="sortout" />
            </IconButton>
          </Box>
        </Grid>
        <Grid paddingX={0.5} item xs={6} sm={12} marginY={1}>
          <Box className="tasks-option">
            <Controller
              name="teamId"
              control={control}
              render={(props) => (
                <MulitSelectDialogComponent
                  name="teamId"
                  selected={options.teams.map((item) => {
                    return { id: item._id ?? "", label: item.name ?? "" };
                  })}
                  options={teamOptions.map((item) => {
                    return { id: item?.id ?? "", label: item.text };
                  })}
                  label="Teams: "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      clients: options.clients.map((item) => item._id),
                      managers: options.managers.map((item) => item._id),
                      categories: options.categories.map((item) => item._id),
                      teams: [
                        ...options.teams.map((item) => item._id ?? ""),
                        value.id,
                      ],
                    };
                    onSetFilterResult(values);
                  }}
                  onDiselect={(item: DialogOption) => {
                    let values = {
                      clients: options.clients.map((item) => item._id),
                      managers: options.managers.map((item) => item._id),
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                    };
                    values.teams = [...values.teams].filter(
                      (i) => i !== item.id
                    );
                    onSetFilterResult(values);
                  }}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid paddingX={0.5} item xs={6} sm={12} marginY={1}>
          <Box className="tasks-option">
            <Controller
              name="projectManager"
              control={control}
              render={(props) => (
                <MulitSelectDialogComponent
                  name="projectManager"
                  selected={options.managers.map((item) => {
                    return { id: item._id ?? "", label: item.name ?? "" };
                  })}
                  options={managersOptions.map((item) => {
                    return { id: item?.id ?? "", label: item.text };
                  })}
                  label="Project Managers: "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      clients: options.clients.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      categories: options.categories.map((item) => item._id),
                      managers: [
                        ...options.managers.map((item) => item._id),
                        value.id,
                      ],
                    };
                    onSetFilterResult(values);
                  }}
                  onDiselect={(item: DialogOption) => {
                    let values = {
                      clients: options.clients.map((item) => item._id),
                      managers: options.managers.map((item) => item._id),
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                    };
                    values.managers = [...values.managers].filter(
                      (i) => i !== item.id
                    );
                    onSetFilterResult(values);
                  }}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid paddingX={0.5} item xs={6} sm={12} marginY={1}>
          <Box className="tasks-option">
            <Controller
              name="categoryId"
              control={control}
              render={(props) => (
                <MulitSelectDialogComponent
                  name="categoryId"
                  selected={options.categories.map((item) => {
                    return { id: item._id ?? "", label: item.category ?? "" };
                  })}
                  options={categoriesOptions.map((item) => {
                    return { id: item?.id ?? "", label: item.text };
                  })}
                  label="Categories : "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      clients: options.clients.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      categories: [
                        ...options.categories.map((item) => item._id),
                        value.id,
                      ],
                    };
                    onSetFilterResult(values);
                  }}
                  onDiselect={(item: DialogOption) => {
                    let values = {
                      clients: options.clients.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      categories: options.categories.map((item) => item._id),
                    };
                    values.categories = values.categories.filter(
                      (i) => i !== item.id
                    );
                    onSetFilterResult(values);
                  }}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid paddingX={0.5} item xs={6} sm={12} marginY={1}>
          <Box className="tasks-option">
            <Controller
              name="clientId"
              control={control}
              render={(props) => (
                <MulitSelectDialogComponent
                  name="clientId"
                  selected={options.clients.map((item) => {
                    return { id: item._id ?? "", label: item.clientName ?? "" };
                  })}
                  options={clientsOptions.map((item) => {
                    return { id: item?.id ?? "", label: item.text };
                  })}
                  label="Clients : "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      clients: [
                        ...options.clients.map((item) => item._id),
                        value.id,
                      ],
                    };
                    onSetFilterResult(values);
                  }}
                  onDiselect={(item: DialogOption) => {
                    let values = {
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      clients: options.clients.map((item) => item._id),
                    };
                    values.clients = values.clients.filter(
                      (i) => i !== item.id
                    );
                    onSetFilterResult(values);
                  }}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default FilterBar;
