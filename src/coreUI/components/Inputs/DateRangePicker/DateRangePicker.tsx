import { Dialog, DialogContent, Grid } from "@mui/material";
import { DateRange, RangeKeyDict } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "../../Buttons/Button";

export type DateRangeType = {
  startDate?: Date;
  endDate?: Date;
  key?: string;
};

const DateInput = (props: { open: boolean; onClose: any }) => {
  const [state, setState] = useState<DateRangeType[]>([
    { startDate: new Date(), endDate: undefined, key: "selection" },
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
    <Dialog sx={{ width: "150px" }} onClose={onClear} open={props.open}>
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
              style={{ width: "auto", textAlign: "center" }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DateInput;
