import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { Task } from "src/types/models/Projects";
import Notification from "./Notification";

type TablListProps = {
  index: number;
  date: { day: string; month: number; year: string; currentDay: string };
  list: Task[];
  open: boolean;
};

const TablList = ({ index, date, list, open }: TablListProps) => {
  const { day, month, year, currentDay } = date;
  const theme = useTheme();
  const LG = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Box
        key={index + day + month + year + currentDay}
        sx={{ display: "inline-flex" }}
        marginLeft={1.8}
        marginTop={2}
      >
        <Typography sx={cssDay}>{currentDay}</Typography>
        <Typography sx={cssDate}>{`${day}/  ${
          month + 1
        }/  ${year}`}</Typography>
      </Box>
      {list?.length > 0 &&
        (!LG ? list : open === true ? list : list.slice(0, 2)).map(
          (item, index) => {
            return (
              <React.Fragment key={item._id}>
                <Notification
                  item={item}
                  index={index}
                  arrayLength={list.length}
                />
              </React.Fragment>
            );
          }
        )}
    </>
  );
};

const cssDay = {
  fontWeight: "600",
  paddingRight: 2,
  color: "#303030",
  fontSize: "14px",
  fontFamily: "Cairo, Regular",
};

const cssDate = {
  fontSize: 10,
  fontWeight: "600",
  color: "#929292",
  paddingTop: 0.4,
  fontFamily: "Cairo, Regular",
};

export default TablList;
