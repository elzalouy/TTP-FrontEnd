import { Box, Drawer, Grid, IconButton, Typography } from "@mui/material";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { useAppSelector } from "src/models/hooks";
import { selectClientOptions } from "src/models/Clients";
import { selectAllProjects, selectProjectOptions } from "src/models/Projects";
import { ProjectsInterface, Task } from "src/types/models/Projects";
import { Options } from "src/types/views/Projects";
import { Controller, useForm } from "react-hook-form";
import { selectPMOptions } from "src/models/Managers";
import IMAGES from "src/assets/img/Images";
import { selectCategoriesOptions } from "src/models/Categories";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import {
  selectAllDepartments,
  selectDepartmentOptions,
} from "src/models/Departments";

type filterTypes =
  | "clientId"
  | "projectManager"
  | "category"
  | "boardId"
  | "teamId";

interface IState {
  filter: boolean;
  showEditTasks: string;
  tasks: Task[];
  projectsOptions: Options;
  projectManagersOptions: Options;
}
interface FiltersBarProps {
  filter: boolean;
  onCloseFilter: any;
  onSetFilterResult: any;
}

const FiltersBar = ({
  filter,
  onCloseFilter,
  onSetFilterResult,
}: FiltersBarProps) => {
  const { control, watch, setValue, reset } = useForm<{
    clientId: string;
    projectManager: string;
    category: string;
    boardId: string;
    teamId: string;
  }>({
    defaultValues: {
      clientId: "",
      projectManager: "",
      category: "",
      boardId: "",
    },
  });

  const clientsOptions = useAppSelector(selectClientOptions);
  const projectOptions = useAppSelector(selectProjectOptions);
  const PmsOptions = useAppSelector(selectPMOptions);
  const categoriesOptions = useAppSelector(selectCategoriesOptions);
  const projects: ProjectsInterface = useAppSelector(selectAllProjects);
  const boardOptions = useAppSelector(selectDepartmentOptions);
  const departments = useAppSelector(selectAllDepartments);

  const onSetFilter = (name: filterTypes, value: string) => {
    setValue(name, value);
    let filter = watch();
    let projectsIds: string[] = projects.projects.map((item) => item?._id);
    let fprojects = projects.projects;
    let tasks = projects.allTasks;
    if (filter.clientId !== "") {
      fprojects = fprojects.filter((item) => item.clientId === filter.clientId);
      projectsIds = fprojects.map((item) => item?._id);
      tasks = tasks.filter((item) => projectsIds.includes(item.projectId));
    }
    if (filter.category !== "")
      tasks = tasks.filter((item) => item.categoryId === filter.category);

    if (filter.projectManager !== "") {
      fprojects = fprojects.filter(
        (item) => item.projectManager === filter.projectManager
      );
      projectsIds = fprojects.map((item) => item?._id);
      tasks = tasks.filter((item) => projectsIds.includes(item.projectId));
    }
    if (filter.boardId !== "") {
      let dep = departments.find((d) => d._id === filter.boardId);
      tasks = tasks.filter((i) => i.boardId === dep?.boardId);
    }
    // if (filter.teamId !== "") {
    //   let dep=
    // }
    onSetFilterResult(tasks);
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
          <Box
            mr={1}
            style={{ height: "32px", width: "32px", padding: "0 10px" }}
            className="filter-icon"
          >
            <IconButton
              disableRipple
              onClick={() => {
                reset();
                onSetFilterResult(projects.allTasks);
              }}
            >
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
        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="category"
              control={control}
              selected={watch().category}
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
        <Grid paddingX={0.5} item xs={6} sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="boardId"
              control={control}
              selected={watch().boardId}
              label="Board: "
              elementType="filter"
              textTruncate={10}
              onSelect={(e: any) => onSetFilter("boardId", e?.id)}
              options={[{ id: "", value: "", text: "All" }, ...boardOptions]}
              optionsType="dialog"
            />
          </Box>
        </Grid>
        {/* 
       
      
        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="date"
              control={control}
              selected={watch().start}
              label="Deadline :"
              elementType="filter"
              optionsType="date-picker"
              options={[]}
              // onSelect={(value: RangeKeyDict) => {
              //   onSetFilter(
              //     "start",
              //     value[0]?.startDate !== undefined
              //       ? value[0]?.startDate?.toDateString()
              //       : ""
              //   );
              //   onSetFilter(
              //     "end",
              //     value[0]?.endDate !== undefined
              //       ? value[0]?.endDate?.toDateString()
              //       : ""
              //   );
              // }}
            />
          </Box>
        </Grid>
     
        <Grid paddingX={0.5} item sm={12} mt={5} marginY={1}>
          <Box className="tasks-option">
            <Button
              size="x-small"
              type="add"
              style={{ textTransform: "lowercase" }}
              label="Un Assigned Tasks"
              // onClick={() => onSetFilter("projectId", undefined)}
            ></Button>
          </Box>
        </Grid> */}
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
