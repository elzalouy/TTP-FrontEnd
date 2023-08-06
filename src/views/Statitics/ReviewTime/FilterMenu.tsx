import { Box, Drawer, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { MulitSelectDialogComponent } from "src/coreUI/components/Inputs/SelectDialog/MuliSelectFilterDialog";
import { Category } from "src/models/Categories";
import { Client } from "src/models/Clients";
import { Manager } from "src/models/Managers";
import { DialogOption } from "src/types/components/SelectDialog";
import { ITeam } from "src/types/models/Departments";

interface FilterBarProps {
  filter: boolean;
  onCloseFilter: any;
  onSetFilterResult: (filter: {
    clients: string[];
    categories: string[];
    teams: string[];
    managers: string[];
  }) => void;
  options: {
    clients: Client[];
    categories: Category[];
    teams: ITeam[];
    managers: Manager[];
  };
  allOptions: {
    clients: Client[];
    categories: Category[];
    teams: ITeam[];
    managers: Manager[];
  };
}

const FilterBar: FC<FilterBarProps> = ({
  filter,
  onCloseFilter,
  onSetFilterResult,
  options,
  allOptions,
}) => {
  const { control } = useForm();
  const onSelectAll = (select: boolean, filter: string) => {
    onSetFilterResult({
      clients:
        filter === "Clients"
          ? select
            ? allOptions.clients.map((item) => item._id)
            : []
          : options.clients.map((i) => i._id),
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
      managers:
        filter === "Project Managers"
          ? select
            ? allOptions.managers.map((item) => item._id)
            : []
          : options.managers.map((m) => m._id),
    });
  };

  return (
    <>
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
              Filter Journies
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
                    options={allOptions.teams.map((item) => {
                      return { id: item?._id ?? "", label: item.name };
                    })}
                    label="Teams: "
                    onSelect={(value: DialogOption) => {
                      let values = {
                        clients: options.clients.map((item) => item._id),
                        categories: options.categories.map((item) => item._id),
                        managers: options.managers.map((item) => item._id),
                        teams:
                          value.id === "all"
                            ? allOptions.teams.map((item) => item._id ?? "")
                            : [
                                ...options.teams.map((item) => item._id ?? ""),
                                value.id,
                              ],
                      };
                      onSetFilterResult(values);
                    }}
                    onDiselect={(item: DialogOption) => {
                      let values = {
                        clients: options.clients.map((item) => item._id),
                        categories: options.categories.map((item) => item._id),
                        managers: options.managers.map((item) => item._id),

                        teams: options.teams.map((item) => item._id ?? ""),
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
                    options={allOptions.categories.map((item) => {
                      return { id: item?._id, label: item.category };
                    })}
                    allOption
                    label="Categories : "
                    onSelect={(value: DialogOption) => {
                      let values = {
                        clients: options.clients.map((item) => item._id),
                        teams: options.teams.map((item) => item._id ?? ""),
                        managers: options.managers.map((item) => item._id),

                        categories:
                          value.id === "all"
                            ? allOptions.categories.map((i) => i._id)
                            : [
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
                        categories: options.categories.map((item) => item._id),
                        managers: options.managers.map((item) => item._id),
                      };
                      values.categories =
                        item.id === "all"
                          ? []
                          : values.categories.filter((i) => i !== item.id);
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
                      return {
                        id: item._id ?? "",
                        label: item.clientName ?? "",
                      };
                    })}
                    options={allOptions.clients.map((item) => {
                      return { id: item?._id ?? "", label: item.clientName };
                    })}
                    onSelectAll={(select: boolean) =>
                      onSelectAll(select, "Clients")
                    }
                    label="Clients : "
                    onSelect={(value: DialogOption) => {
                      let values = {
                        categories: options.categories.map((item) => item._id),
                        teams: options.teams.map((item) => item._id ?? ""),
                        managers: options.managers.map((item) => item._id),

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
                        categories: options.categories.map((item) => item._id),
                        teams: options.teams.map((item) => item._id ?? ""),
                        clients: options.clients.map((item) => item._id),
                        managers: options.managers.map((item) => item._id),
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
                name="projectManager"
                control={control}
                render={(props) => (
                  <MulitSelectDialogComponent
                    name="projectManager"
                    allOption
                    selected={options.managers.map((item) => {
                      return { id: item._id ?? "", label: item.name ?? "" };
                    })}
                    options={allOptions.managers.map((item) => {
                      return { id: item?._id ?? "", label: item.name };
                    })}
                    onSelectAll={(select: boolean) =>
                      onSelectAll(select, "Project Managers")
                    }
                    label="Project Managers: "
                    onSelect={(value: DialogOption) => {
                      let values = {
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
        </Grid>
      </Drawer>
    </>
  );
};

export default FilterBar;
