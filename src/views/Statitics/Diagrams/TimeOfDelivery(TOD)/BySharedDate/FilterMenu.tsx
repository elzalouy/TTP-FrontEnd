import { Box, Drawer, Grid, IconButton, Typography } from "@mui/material";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { useAppSelector } from "src/models/hooks";
import { Client, selectClientOptions } from "src/models/Clients";
import { selectProjectsState, selectProjectOptions } from "src/models/Projects";
import { ProjectsInterface, Task } from "src/types/models/Projects";
import { Options } from "src/types/views/Projects";
import { Controller, useForm } from "react-hook-form";
import { Manager, selectPMOptions } from "src/models/Managers";
import {
  Category,
  SubCategory,
  selectCategoriesOptions,
} from "src/models/Categories";
import { selectTeamsOptions } from "src/models/Departments";
import { useDispatch } from "react-redux";
import { DialogOption } from "src/types/components/SelectDialog";
import { MulitSelectDialogComponent } from "src/coreUI/components/Inputs/SelectDialog/MuliSelectFilterDialog";
import { ITeam } from "src/types/models/Departments";
import _ from "lodash";
import { getYearsRange } from "src/helpers/generalUtils";

interface FilterBarProps {
  filter: boolean;
  onCloseFilter: any;

  onSetFilterResult: (filter: {
    clients: string[];
    managers: string[];
    categories: string[];
    teams: string[];
    subCategories: string[];
    year: number;
  }) => void;

  options: {
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    teams: ITeam[];
    subCategories: SubCategory[];
    year: number;
  };
  allOptions: {
    clients: Client[];
    managers: Manager[];
    categories: Category[];
    teams: ITeam[];
    subCategories: SubCategory[];
  };
}

const FilterBar = ({
  filter,
  onCloseFilter,
  onSetFilterResult,
  options,
  allOptions,
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
    subCategoryId: string;
    year: number;
  }>({
    defaultValues: {
      clientId: "",
      projectManager: "",
      categoryId: "",
      teamId: "",
      year: new Date(Date.now()).getFullYear(),
    },
  });

  const dispatch = useDispatch();

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
      subCategories:
        filter === "SubCategories"
          ? select
            ? _.flattenDeep(
                options.categories.map((i) =>
                  i.subCategoriesId.map((j) => j._id)
                )
              )
            : []
          : _.flattenDeep(
              options.categories.map((c) => c.subCategoriesId.map((i) => i._id))
            ),
      year: watch().year,
    });
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
              name="teamId"
              control={control}
              render={(props) => (
                <MulitSelectDialogComponent
                  name="teamId"
                  allOption
                  selected={options.teams.map((item) => {
                    return { id: item._id ?? "", label: item.name ?? "" };
                  })}
                  onSelectAll={(select: boolean) =>
                    onSelectAll(select, "Teams")
                  }
                  options={teamOptions.map((item) => {
                    return { id: item?.id ?? "", label: item.text };
                  })}
                  label="Teams: "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      year: options.year,
                      clients: options.clients.map((item) => item._id),
                      managers: options.managers.map((item) => item._id),
                      categories: options.categories.map((item) => item._id),
                      teams:
                        value.id === "all"
                          ? allOptions.teams.map((item) => item._id ?? "")
                          : [
                              ...options.teams.map((item) => item._id ?? ""),
                              value.id,
                            ],
                      subCategories: options.subCategories.map(
                        (item) => item._id
                      ),
                    };
                    onSetFilterResult(values);
                  }}
                  onDiselect={(item: DialogOption) => {
                    let values = {
                      year: options.year,
                      clients: options.clients.map((item) => item._id),
                      managers: options.managers.map((item) => item._id),
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      subCategories: options.subCategories.map(
                        (item) => item._id
                      ),
                    };
                    values.teams =
                      item.id === "all"
                        ? []
                        : [...values.teams].filter((i) => i !== item.id);
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
                  allOption
                  selected={options.managers.map((item) => {
                    return { id: item._id ?? "", label: item.name ?? "" };
                  })}
                  options={managersOptions.map((item) => {
                    return { id: item?.id ?? "", label: item.text };
                  })}
                  onSelectAll={(select: boolean) =>
                    onSelectAll(select, "Project Managers")
                  }
                  label="Project Managers: "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      year: options.year,
                      clients: options.clients.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      categories: options.categories.map((item) => item._id),
                      managers:
                        value.id === "all"
                          ? allOptions.managers.map((i) => i._id)
                          : [
                              ...options.managers.map((item) => item._id),
                              value.id,
                            ],
                      subCategories: options.subCategories.map(
                        (item) => item._id
                      ),
                    };
                    onSetFilterResult(values);
                  }}
                  onDiselect={(item: DialogOption) => {
                    let values = {
                      year: options.year,
                      clients: options.clients.map((item) => item._id),
                      managers: options.managers.map((item) => item._id),
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      subCategories: options.subCategories.map(
                        (item) => item._id
                      ),
                    };
                    values.managers =
                      item.id === "all"
                        ? []
                        : [...values.managers].filter((i) => i !== item.id);
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
                  onSelectAll={(select: boolean) =>
                    onSelectAll(select, "Categories")
                  }
                  options={categoriesOptions.map((item) => {
                    return { id: item?.id ?? "", label: item.text };
                  })}
                  allOption
                  label="Categories : "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      year: options.year,
                      clients: options.clients.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      categories: [""],
                      subCategories: [""],
                    };
                    if (value.id === "all") {
                      values.categories = _.flattenDeep(
                        allOptions.categories.map((i) => i._id)
                      );
                      values.subCategories = _.flattenDeep(
                        allOptions.categories.map((i) =>
                          i.subCategoriesId.map((s) => s._id)
                        )
                      );
                    } else {
                      let cat = allOptions.categories.find(
                        (i) => i._id === value.id
                      );
                      if (cat) {
                        let cats = [...options.categories, cat];
                        let subs = _.flattenDeep(
                          cats.map((i) => i.subCategoriesId)
                        );
                        values.categories = cats.map((i) => i._id);
                        values.subCategories = subs.map((i) => i._id);
                      }
                    }
                    onSetFilterResult(values);
                  }}
                  onDiselect={(value: DialogOption) => {
                    let values = {
                      year: options.year,
                      clients: options.clients.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      categories: [""],
                      subCategories: [""],
                    };
                    if (value.id === "all") {
                      values.categories = [];
                      values.subCategories = [];
                    } else {
                      let cats = options.categories.filter(
                        (i) => i._id !== value.id
                      );
                      let subs = _.flattenDeep(
                        cats.map((i) => i.subCategoriesId)
                      );
                      values.categories = cats.map((i) => i._id);
                      values.subCategories = subs.map((i) => i._id);
                    }
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
              name="subCategoryId"
              control={control}
              render={(props) => (
                <MulitSelectDialogComponent
                  name="subCategoryId"
                  selected={options.subCategories.map((item) => {
                    return {
                      id: item._id ?? "",
                      label: item.subCategory ?? "",
                    };
                  })}
                  onSelectAll={(select: boolean) =>
                    onSelectAll(select, "SubCategories")
                  }
                  options={allOptions.subCategories.map((item) => {
                    return { id: item?._id ?? "", label: item.subCategory };
                  })}
                  allOption
                  label="Sub Categories : "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      year: options.year,
                      clients: options.clients.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      subCategories:
                        value.id === "all"
                          ? allOptions.subCategories.map((i) => i._id)
                          : [
                              ...options.subCategories.map((item) => item._id),
                              value.id,
                            ],
                      categories: options.categories.map((item) => item._id),
                    };
                    onSetFilterResult(values);
                  }}
                  onDiselect={(item: DialogOption) => {
                    let values = {
                      year: options.year,
                      clients: options.clients.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      categories: options.categories.map((item) => item._id),
                      subCategories: options.subCategories.map(
                        (item) => item._id
                      ),
                    };
                    values.subCategories =
                      item.id === "all"
                        ? []
                        : values.subCategories.filter((i) => i !== item.id);
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
                  allOption
                  selected={options.clients.map((item) => {
                    return { id: item._id ?? "", label: item.clientName ?? "" };
                  })}
                  options={clientsOptions.map((item) => {
                    return { id: item?.id ?? "", label: item.text };
                  })}
                  onSelectAll={(select: boolean) =>
                    onSelectAll(select, "Clients")
                  }
                  label="Clients : "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      year: options.year,
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      subCategories: options.subCategories.map(
                        (item) => item._id
                      ),
                      clients:
                        value.id === "all"
                          ? allOptions.clients.map((i) => i._id)
                          : [
                              ...options.clients.map((item) => item._id),
                              value.id,
                            ],
                    };
                    onSetFilterResult(values);
                  }}
                  onDiselect={(item: DialogOption) => {
                    let values = {
                      year: options.year,
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      clients: options.clients.map((item) => item._id),
                      subCategories: options.subCategories.map(
                        (item) => item._id
                      ),
                    };
                    values.clients =
                      item.id === "all"
                        ? []
                        : values.clients.filter((i) => i !== item.id);
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
              name="year"
              control={control}
              render={(props) => (
                <MulitSelectDialogComponent
                  name="year"
                  allOption={false}
                  onSelectAll={() => {}}
                  selected={getYearsRange().map((item) => {
                    return {
                      id: item.toString() ?? "",
                      label: item.toString() ?? "",
                    };
                  })}
                  options={getYearsRange().map((item) => {
                    return {
                      id: item.toString() ?? "",
                      label: item.toString(),
                    };
                  })}
                  label="By Year : "
                  onSelect={(value: DialogOption) => {
                    let values = {
                      year: parseInt(value.id),
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      subCategories: options.subCategories.map(
                        (item) => item._id
                      ),
                      clients: options.clients.map((item) => item._id),
                    };
                    onSetFilterResult(values);
                  }}
                  onDiselect={(item: DialogOption) => {
                    let values = {
                      year: parseInt(item.id),
                      categories: options.categories.map((item) => item._id),
                      teams: options.teams.map((item) => item._id ?? ""),
                      managers: options.managers.map((item) => item._id),
                      clients: options.clients.map((item) => item._id),
                      subCategories: options.subCategories.map(
                        (item) => item._id
                      ),
                    };
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
