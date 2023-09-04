import { Box, Drawer, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Range, RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";

type filterBarProps = {
  filterPopup: boolean;
  closeFilterPopup: any;
  onSetFilter: any;
  start: string | null;
  end: string | null;
};

const FiltersBar = ({
  filterPopup,
  closeFilterPopup,
  onSetFilter,
  start,
  end,
}: filterBarProps) => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      date: {
        startDate: start ? new Date(start) : undefined,
        endDate: end ? new Date(end) : undefined,
      },
    },
  });

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
            Filter By Projects
          </Typography>
        </Grid>

        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="date"
              selected={
                `${start ? new Date(start).toDateString() : ""}` +
                `${end ? " : " : " "}` +
                `${end ? new Date(end).toDateString() : ""}`
              }
              label="TimeFrame :"
              elementType="filter"
              optionsType="date-picker"
              control={control}
              options={[]}
              onSelect={(value: Range) => {
                setValue("date", {
                  startDate: value.startDate,
                  endDate: value.endDate,
                });
                onSetFilter("startDate", value.startDate);
                onSetFilter("endDate", value.endDate);
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default FiltersBar;
