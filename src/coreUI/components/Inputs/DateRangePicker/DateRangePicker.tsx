import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "../../Buttons/Button";
import { Dialog, DialogContent, Grid } from "@mui/material";
import { DateRange, RangeKeyDict } from "react-date-range";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DateRange.css";

export type DateRangeType = {
  startDate?: Date;
  endDate?: Date;
  key?: string;
};

const DateInput = (props: { open: boolean; onClose: any }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [state, setState] = useState<DateRangeType[]>([
    { startDate: undefined, endDate: undefined, key: "selection" },
  ]);

  const onChange = (item: RangeKeyDict) => {
    setState([item.selection]);
  };

  const onClose = () => {
    props.onClose(state);
  };

  const onClear = () => {
    props.onClose({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
  };

  return (
    <Dialog onClose={onClear} open={props.open}>
      <DialogContent>
        <DateRange
          rangeColors={["#ffc500"]}
          onChange={onChange}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
        <Grid width={"100%"} container>
          <Grid item xs={6} paddingX={1}>
            <Button
              label="Clear"
              size="small"
              onClick={onClear}
              type=""
              style={{
                backgroundColor: "#f4f4f4",
                color: "#000000",
                width: "100% !important",
                border: "6px",
              }}
            />
          </Grid>
          <Grid item xs={6} paddingX={1}>
            <Button
              label="Filter"
              size="small"
              onClick={onClose}
              type="add"
              style={{ width: "100%", textAlign: "center" }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DateInput;
