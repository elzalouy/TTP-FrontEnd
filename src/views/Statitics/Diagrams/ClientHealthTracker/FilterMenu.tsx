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

type filterBarProps = {
  filterPopup: boolean;
  closeFilterPopup: any;
  onSetFilter: any;
  start: string;
  end: string;
};
const FiltersBar = ({
  filterPopup,
  closeFilterPopup,
  onSetFilter,
  start,
  end,
}: filterBarProps) => {
  const clientsOptions = useAppSelector(selectClientOptions);
  const projectOptions = useAppSelector(selectProjectOptions);
  const PmsOptions = useAppSelector(selectPMOptions);
  const categoriesOptions = useAppSelector(selectCategoriesOptions);
  const { control, reset, watch } = useForm();
  const [state, setState] = useState();

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
      open={filterPopup}
      variant="temporary"
      onClose={closeFilterPopup}
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

        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="date"
              control={control}
              selected={start}
              label="TimeFrame :"
              elementType="filter"
              optionsType="date-picker"
              options={[]}
              onSelect={(value: RangeKeyDict) => {
                onSetFilter(
                  "startDate",
                  value[0]?.startDate !== undefined
                    ? value[0]?.startDate?.toDateString()
                    : ""
                );
                onSetFilter(
                  "endDate",
                  value[0]?.endDate !== undefined
                    ? value[0]?.endDate?.toDateString()
                    : ""
                );
              }}
            />
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
