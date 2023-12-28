import { Box, Drawer, Grid, Typography } from "@mui/material";
import { useAppSelector } from "src/models/hooks";
import { Client } from "src/models/Clients";
import { Controller, useForm } from "react-hook-form";
import { Manager, selectPMOptions } from "src/models/Managers";
import { Category, selectCategoriesOptions } from "src/models/Categories";
import { getAllDepartments } from "src/models/Departments";
import { DialogOption } from "src/types/components/SelectDialog";
import { MulitSelectDialogComponent } from "src/coreUI/components/Inputs/SelectDialog/MuliSelectFilterDialog";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { selectStatisticsFilterDefaults } from "src/models/Statistics";

interface FilterBarProps {
  filter: boolean;
  onCloseFilter: any;
  onSetFilterResult: (filter: { boards: string[]; date: Date }) => void;
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
  const { boards, date } = useAppSelector(selectStatisticsFilterDefaults);
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

  const onSelectAll = (select: boolean, filter: string) => {
    onSetFilterResult({
      boards: select ? allOptions.boards.map((i) => i.boardId) : [],
      date: date,
    });
  };

  const onSelectBoard = (value: DialogOption) => {
    let values = {
      boards: _.uniq([...options.boards.map((b) => b.boardId), value.id]),
      date,
    };
    onSetFilterResult(values);
  };

  const onDiselectBoard = (item: DialogOption) => {
    let values = {
      boards: options.boards.map((i) => i.boardId),
      date,
    };
    values.boards = [...values.boards].filter((i) => i !== item.id);
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
          <Box className="tasks-option" mb={0.5}>
            <Controller
              name="boardId"
              control={control}
              render={(props) => (
                <MulitSelectDialogComponent
                  allOption
                  name="boardId"
                  selected={options.boards.map((item) => {
                    return { id: item.boardId, label: item.name };
                  })}
                  options={allOptions.boards.map((item) => {
                    return { id: item.boardId, label: item.name };
                  })}
                  onSelectAll={(select: boolean) => {
                    onSelectAll(select, "Boards");
                  }}
                  label="Board: "
                  onSelect={onSelectBoard}
                  onDiselect={onDiselectBoard}
                />
              )}
            />
          </Box>
          <Box className="tasks-option">
            <Select
              onSelect={(value: any) => {
                onSetFilterResult({
                  boards,
                  date: value,
                });
              }}
              optionsType="date"
              selected={date}
              options={[]}
              name="statistics-filterByDate"
              elementType="filter"
              label="Sort By:"
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
