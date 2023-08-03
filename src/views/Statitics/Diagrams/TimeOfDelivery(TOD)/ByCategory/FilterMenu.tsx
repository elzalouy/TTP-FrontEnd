import { Box, Drawer, Grid, Typography } from "@mui/material";
import { RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";
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
  const { control } = useForm();
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
            Filter By Projects
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
                    : null
                );
                onSetFilter(
                  "endDate",
                  value[0]?.endDate !== undefined
                    ? value[0]?.endDate?.toDateString()
                    : null
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
