import { Box, Drawer, Grid, Typography } from "@mui/material";
import { Range, RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";
import { MulitSelectDialogComponent } from "src/coreUI/components/Inputs/SelectDialog/MuliSelectFilterDialog";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import { Client } from "src/models/Clients";
import { Manager } from "src/models/Managers";
import { DialogOption } from "src/types/components/SelectDialog";
import { ITeam } from "src/types/models/Departments";

type filterBarProps = {
  filterPopup: boolean;
  closeFilterPopup: any;
  onSetFilter: any;
  start: string | null;
  end: string | null;
  comparison: {
    options: DialogOption[];
    selected: DialogOption[];
    onSelectAll: (selected: boolean) => void;
    label: string;
    name: string;
    onSelect: (value: DialogOption) => void;
    onDiselect: (value: DialogOption) => void;
  };
};
const FiltersBar = ({
  filterPopup,
  closeFilterPopup,
  onSetFilter,
  start,
  end,
  comparison,
}: filterBarProps) => {
  const { control } = useForm();
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
              control={control}
              selected={
                `${start ? new Date(start).toDateString() : ""}` +
                `${end ? " : " : " "}` +
                `${end ? new Date(end).toDateString() : ""}`
              }
              label="TimeFrame :"
              elementType="filter"
              optionsType="date-picker"
              options={[]}
              onSelect={(value: Range) => {
                onSetFilter(
                  "startDate",
                  value?.startDate?.toLocaleDateString() ?? null
                );
                onSetFilter(
                  "endDate",
                  value?.endDate?.toLocaleDateString() ?? null
                );
              }}
            />
          </Box>
          <Box className="tasks-option">
            <MulitSelectDialogComponent
              allOption
              onSelectAll={(value: boolean) => comparison.onSelectAll(value)}
              label={comparison.label}
              name={comparison.name}
              options={comparison.options}
              onSelect={comparison.onSelect}
              onDiselect={comparison.onDiselect}
              selected={comparison.selected}
            />
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default FiltersBar;
