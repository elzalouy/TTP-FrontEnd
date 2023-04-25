import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { TaskMovement } from "src/types/models/Projects";
import { format } from "date-fns";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import CircleIcon from "@mui/icons-material/Circle";

type TaskStatusTimlineProps = {
  movements: TaskMovement[];
};
const TaskStatusTimline: React.FC<TaskStatusTimlineProps> = (
  props: TaskStatusTimlineProps
) => {
  const [movements, setMovements] = React.useState<TaskMovement[]>();
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    setMovements(props.movements);
  }, [props.movements]);

  React.useEffect(() => {
    if (filter !== "")
      setMovements(props.movements.filter((item) => item.status === filter));
    else setMovements(props.movements);
  }, [filter]);

  const getDiff = (start: string, end: string) => {
    let lastMoves = props.movements.filter((item) => item.status === end);
    let firstMove = props.movements.find((item) => item.status === start);
    let lMove = lastMoves[lastMoves.length - 1];
    if (firstMove && firstMove.movedAt && lMove && lMove.movedAt) {
      console.log({
        inProgress: firstMove?.movedAt ?? null,
        review: lMove.movedAt ?? null,
      });
      return getDifBetweenDates(
        new Date(firstMove.movedAt),
        new Date(lMove.movedAt)
      );
    } else
      return {
        isLate: false,
        difference: {
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
        },
        remainingDays: 0,
        totalHours: 0,
      };
  };
  const getCancelationType = () => {
    let cMoves = props.movements
      .filter((item) => item.status === "Cancled")
      .map((item) => {
        let itemIndex = props.movements.findIndex((m) => m === item);
        return { index: itemIndex, ...item };
      });
    if (cMoves && cMoves.length > 0) {
      let lcMove = cMoves[cMoves.length - 1].index;
      if (props.movements[lcMove - 1].status === "In Progress")
        return "Canceled";
      if (props.movements[lcMove - 1].status === "Cancled") return "Disrupted";
      if (["Review", "Shared"].includes(props.movements[lcMove - 1].status))
        return "Flagged";
    }
    return "";
  };
  return (
    <>
      <Grid display={"inline-flex"} alignItems={"center"}>
        <Typography fontSize={"16px"} pl={4} pt={3} pb={2} fontWeight={600}>
          Recent activity
        </Typography>
        {props.movements.filter((item) => item.status === "Not Clear")
          .length === 0 ? (
          <Typography
            sx={{
              background: "#e1edf4",
              color: "black",
              p: 0.5,
              borderRadius: "5px",
              fontWeight: 500,
              fontSize: 12,
              ml: 1,
              mt: 0.5,
            }}
          >
            Verified
          </Typography>
        ) : (
          <Typography
            sx={{
              background: "#F1CBCC",
              color: "#FF0000",
              p: 0.5,
              borderRadius: "5px",
              fontWeight: 500,
              fontSize: 12,
              ml: 1,
              mt: 0.5,
            }}
          >
            UnHealthy
          </Typography>
        )}
        {getCancelationType() !== "" && (
          <Typography
            sx={{
              background: "#f1cbcc",
              borderRadius: "5px",
              color: "black",
              fontWeight: 500,
              fontSize: "12px",
              ml: "10px",
              p: "4px",
              mt: "4px",
            }}
          >
            {getCancelationType()}
          </Typography>
        )}
      </Grid>
      <Grid container height={"100%"} alignContent={"flex-start"}>
        <Grid
          sx={{
            height: { sm: "90%", xs: "90%", md: "80%", lg: "80%", xl: "80%" },
            overflowY: "scroll",
          }}
          item
          xs={10}
        >
          <Timeline
            sx={{
              p: 0,
              m: 0,
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0,
              },
            }}
          >
            {movements?.map((item, index) => {
              let prevMove = props.movements.find(
                (move, index) =>
                  props.movements.findIndex((move) => item._id === move._id) -
                    1 ===
                  index
              );
              let due = prevMove
                ? getDifBetweenDates(
                    new Date(prevMove?.movedAt),
                    new Date(item?.movedAt)
                  )
                : undefined;
              return (
                <TimelineItem sx={itemStyle}>
                  <TimelineSeparator sx={{ height: "auto" }}>
                    <TimelineDot sx={dotStyle}>
                      <Typography sx={timeLineDotNumStyle}>
                        {props.movements.findIndex(
                          (move) => item._id === move._id
                        ) + 1}
                      </Typography>
                    </TimelineDot>
                    <TimelineConnector
                      sx={{ width: "1px", opacity: 0.5 }}
                      color="#e1e1e1"
                    />
                  </TimelineSeparator>
                  <TimelineContent
                    sx={{
                      mb: 2,
                      mt: 0,
                      mx: 2,
                      padding: "5px",
                      border: "1px solid #e1e1e1",
                      borderRadius: "10px",
                    }}
                  >
                    <Box display={"flex"} flexDirection={"column"}>
                      <Box display={"inline-flex"} alignItems={"center"}>
                        <Typography color={"#94989b"} fontSize={12}>
                          moved to: &nbsp;
                        </Typography>
                        <Typography fontSize={11} fontWeight={"600"}>
                          {item.status} &nbsp;
                        </Typography>
                        <Typography color={"#94989b"} fontSize={12}>
                          Moved at: &nbsp;
                        </Typography>
                        <Typography fontSize={11} fontWeight={"600"}>
                          {item.movedAt
                            ? format(new Date(item.movedAt), "dd MMMM yyyy")
                            : "Not defined"}{" "}
                          &nbsp;
                        </Typography>
                      </Box>
                      <Box display={"inline-flex"} alignItems={"center"}>
                        {filter !== "" && (
                          <>
                            <Typography color={"#94989b"} pr={1} fontSize={12}>
                              Moved from: &nbsp;
                            </Typography>
                            <Typography fontSize={11} fontWeight={"600"}>
                              {prevMove?.status} &nbsp;
                            </Typography>
                          </>
                        )}
                      </Box>

                      {due && (
                        <Box display={"inline-flex"} alignItems={"center"}>
                          <CircleIcon
                            htmlColor="#444452"
                            sx={{ fontSize: "8px", mr: 1 }}
                          />

                          <Typography
                            color={"#94989b"}
                            fontWeight={"bold"}
                            fontSize={"10px"}
                          >
                            {due ? due.difference.days : 0} Days{",  "}
                            {due ? due.difference.hours : 0} Hours{" "}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Grid>
        <Grid item xs={2} height={"fit-content"}>
          <List>
            {[
              "Tasks Board",
              "Not Clear",
              "In Progress",
              "Review",
              "Shared",
              "Done",
              "Cancled",
            ].map((item) => (
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: "pointer" }}
                onClick={() =>
                  filter !== item ? setFilter(item) : setFilter("")
                }
              >
                <Typography
                  fontSize="10px"
                  color={filter === item ? "#ffc500" : "#7c828c"}
                >
                  {item}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          p={"15px"}
          display={"inline-flex"}
          justifyContent={"right"}
        >
          <Typography fontSize={"12px"} fontWeight={"700"} color={"#7c828c"}>
            Fullfillment : &nbsp;
          </Typography>
          <Typography fontSize={"12px"} fontWeight={"700"} color={"black"}>
            {getDiff("In Progress", "Review").difference.days} d,{" "}
            {getDiff("In Progress", "Review").difference.hours} h
          </Typography>
          <Typography
            ml={2}
            fontSize={"12px"}
            fontWeight={"700"}
            color={"#7c828c"}
          >
            Delivery : &nbsp;
          </Typography>
          <Typography fontSize={"12px"} fontWeight={"700"} color={"black"}>
            {getDiff("Review", "Shared").difference.days} d,{" "}
            {getDiff("Review", "Shared").difference.hours} h
          </Typography>
          <Typography
            ml={2}
            fontSize={"12px"}
            fontWeight={"700"}
            color={"#7c828c"}
          >
            Closing : &nbsp;
          </Typography>
          <Typography fontSize={"12px"} fontWeight={"700"} color={"black"}>
            {getDiff("Shared", "Done").difference.days} d,{" "}
            {getDiff("Shared", "Done").difference.hours} h
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
const timeLineDotNumStyle = {
  fontSize: 14,
  color: "#9ea1a7",
};
const itemStyle = { "::before": { flex: 0 } };
const dotStyle = {
  m: 0,
  borderRadius: 10,
  width: 30,
  height: 30,
  background: "#f6f6f6",
  boxShadow: "none",
  border: "1px solid #e1e1e1",
  justifyContent: "center",
};
export default TaskStatusTimline;
