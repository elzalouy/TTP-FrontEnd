import { AddBox } from "@mui/icons-material";
import { Box, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { Controller, useForm } from "react-hook-form";
import IMAGES from "src/assets/img/Images";
import Button from "src/coreUI/components/Buttons/Button";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { selectCategoriesOptions } from "src/models/Categories";
import { selectClientOptions } from "src/models/Clients";
import { selectPMOptions } from "src/models/Managers";
import { selectProjectOptions } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";

const FiltersBar = () => {
  const clientsOptions = useAppSelector(selectClientOptions);
  const projectOptions = useAppSelector(selectProjectOptions);
  const PmsOptions = useAppSelector(selectPMOptions);
  const categoriesOptions = useAppSelector(selectCategoriesOptions);
  const { control, reset, watch } = useForm();
  const [state, setState] = useState();
  const onSetFilter = () => {};
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
      //   open={state.filter}
      variant="temporary"
      //   onClose={() => setState({ ...state, filter: false })}
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
            <IconButton disableRipple>
              <img src={IMAGES.deleteicon} alt="sortout" />
            </IconButton>
          </Box>
        </Grid>

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
              onSelect={(value: RangeKeyDict) => {}}
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
              //   onClick={() => onSetFilter("projectId", undefined)}
            ></Button>
          </Box>
        </Grid>
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
