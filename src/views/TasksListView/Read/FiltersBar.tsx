import {
  Badge,
  Box,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { useAppSelector } from "src/models/hooks";
import { selectClientOptions } from "src/models/Clients";
import { selectProjectOptions } from "src/models/Projects";
import { Task } from "src/types/models/Projects";
import { Options } from "src/types/views/Projects";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { Range, RangeKeyDict } from "react-date-range";
import { Controller, UseFormWatch } from "react-hook-form";
import { selectPMOptions } from "src/models/Managers";
import IMAGES from "src/assets/img/Images";
import { selectCategoriesOptions } from "src/models/Categories";
import Button from "src/coreUI/components/Buttons/Button";

type filterTypes =
  | "name"
  | "clientId"
  | "projectManager"
  | "projectId"
  | "clientId"
  | "status"
  | "start"
  | "end"
  | "category"
  | "createdAt";

interface IState {
  filter: boolean;
  showEditTasks: string;
  tasks: Task[];
  projectsOptions: Options;
  projectManagersOptions: Options;
}
interface FiltersBarProps {
  selects: string[];
  control: any;
  onSetFilter: (name: filterTypes, value: string | undefined) => any;
  state: IState;
  setState: any;
  watch: UseFormWatch<{
    projectId?: string;
    name: string;
    projectManager: string;
    status: string;
    clientId: string;
    start: string;
    end: string;
    category: string;
    createdAt: string;
  }>;
  setAllSelected: any;
  clearFilters: any;
}

const FiltersBar = ({
  control,
  onSetFilter,
  state,
  setState,
  watch,
  clearFilters,
}: FiltersBarProps) => {
  const clientsOptions = useAppSelector(selectClientOptions);
  const projectOptions = useAppSelector(selectProjectOptions);
  const PmsOptions = useAppSelector(selectPMOptions);
  const categoriesOptions = useAppSelector(selectCategoriesOptions);
  return (
    <Drawer
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          background: "#FAFAFB",
          width: "400px",
          transition: "all 0.5s ease !important",
        },
      }}
      open={state.filter}
      variant="temporary"
      onClose={() => setState({ ...state, filter: false })}
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
            <IconButton disableRipple onClick={clearFilters}>
              <img src={IMAGES.deleteicon} alt="sortout" />
            </IconButton>
          </Box>
        </Grid>
        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="clientId"
              selected={watch().clientId}
              optionsType="dialog"
              control={control}
              label="Client: "
              elementType="filter"
              textTruncate={10}
              onSelect={(value: any) => onSetFilter("clientId", value?.id)}
              options={[
                { id: "", value: "", text: "All", image: "avatar" },
                ...clientsOptions,
              ]}
            />
          </Box>
        </Grid>
        <Grid paddingX={0.5} item sm={12} marginY={1} flex={1}>
          <Controller
            name="projectManager"
            control={control}
            render={(props) => (
              <Select
                selected={watch().projectManager}
                name="projectManager"
                optionsType="dialog"
                label="Manager: "
                elementType="filter"
                textTruncate={6}
                onSelect={(value: any) =>
                  onSetFilter("projectManager", value?.id)
                }
                options={[{ id: "", value: "", text: "All" }, ...PmsOptions]}
              />
            )}
          />
        </Grid>
        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="projectId"
              selected={watch().projectId}
              control={control}
              label="Project: "
              elementType="filter"
              optionsType="dialog"
              textTruncate={10}
              onSelect={(e: any) => onSetFilter("projectId", e?.id)}
              options={[{ id: "", value: "", text: "All" }, ...projectOptions]}
            />
          </Box>
        </Grid>
        <Grid paddingX={0.5} item xs={6} sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="status"
              control={control}
              selected={watch().status}
              label="Status: "
              elementType="filter"
              textTruncate={10}
              onSelect={(e: any) => onSetFilter("status", e.target.id)}
              options={options[1]}
              optionsType="list"
            />
          </Box>
        </Grid>
        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="date"
              control={control}
              selected={
                `${
                  watch().start ? new Date(watch().start).toDateString() : ""
                }` +
                `${watch().end ? " : " : " "}` +
                `${watch().end ? new Date(watch().end).toDateString() : ""}`
              }
              label="Deadline :"
              elementType="filter"
              optionsType="date-picker"
              options={[]}
              onSelect={(value: Range) => {
                onSetFilter("start", value?.startDate?.toDateString() ?? "");
                onSetFilter("end", value?.endDate?.toDateString() ?? "");
              }}
            />
          </Box>
        </Grid>
        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="category"
              control={control}
              selected={watch().start}
              label="Category :"
              elementType="filter"
              optionsType="dialog"
              options={[
                { id: "", value: "", text: "All" },
                ...categoriesOptions,
              ]}
              onSelect={(e: any) => {
                onSetFilter("category", e?.id);
              }}
            />
          </Box>
        </Grid>
        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              optionsType="date"
              selected={watch().createdAt}
              options={[]}
              control={control}
              name="statistics-filterByDate"
              elementType="filter"
              label="Start Date :"
              onSelect={(value: any) => onSetFilter("createdAt", value)}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid paddingX={0.5} item sm={12} mt={5} marginY={1}>
        <Box className="tasks-option">
          <Button
            size="x-small"
            type="add"
            style={{ textTransform: "lowercase" }}
            label="Un Assigned Tasks"
            onClick={() => onSetFilter("projectId", undefined)}
          ></Button>
        </Box>
      </Grid>
    </Drawer>
  );
};

export default FiltersBar;

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
