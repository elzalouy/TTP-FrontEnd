import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import { timelineClasses } from "@mui/lab/Timeline";

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
    <Grid
      item
      container
      xs={12}
      sm={12}
      md={12}
      lg={6}
      xl={6}
      sx={{
        background: "#fafafa",
        height: "100%",
        alignContent: "flex-start",
      }}
    >
      <Grid
        height={"10%"}
        item
        xs={12}
        container
        direction="row"
        pl={4}
        pt={3}
        pb={2}
      >
        <Grid item xs={12} sm={12} md={12} lg={2.5} xl={2.5}>
          <Typography fontSize={"16px"} fontWeight={600}>
            Recent activity
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={9.5}
          xl={9.5}
          display={"inline-flex"}
          alignItems={"flex-start"}
        >
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
                p: "4px",
                ml: 0.5,
              }}
            >
              {getCancelationType()}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item container xs={10} height={"72%"} alignContent={"flex-start"}>
        <Grid item xs={10} sx={{ overflow: "scroll", height: "100%" }}>
          <Timeline
            sx={{
              p: 0,
              m: 0,
              mb: 2,
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
                    <Box
                      display={"inline-flex"}
                      flexDirection={"column"}
                      alignItems={"flex-start"}
                    >
                      <Box alignItems={"flex-start"} display={"inline-flex"}>
                        <Typography color={"#94989b"} fontSize={12}>
                          moved to: &nbsp;
                        </Typography>
                        <Typography fontSize={11} fontWeight={"600"}>
                          {item.status} &nbsp;
                        </Typography>
                      </Box>
                      <Box alignItems={"flex-start"} display={"inline-flex"}>
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
                      <Box display={"inline-flex"} alignItems={"flex-start"}>
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
      </Grid>
      <Grid
        item
        xs={12}
        height="7%"
        p={"15px"}
        display={"inline-flex"}
        sx={{
          position: { xl: "absolute", lg: "absolute" },
          bottom: { xl: 0, lg: 0 },
          background: "#fafafa",
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        <Box
          display={{
            xl: "inline-flex",
            lg: "inline-flex",
            md: "inline-flex",
            sm: "inline-block",
            xs: "inline-block",
          }}
          textAlign={"center"}
        >
          <Typography fontSize={"12px"} fontWeight={"700"} color={"#7c828c"}>
            Fullfillment : &nbsp;
          </Typography>
          <Typography fontSize={"12px"} fontWeight={"700"} color={"black"}>
            {getDiff("In Progress", "Review").difference.days} d,{" "}
            {getDiff("In Progress", "Review").difference.hours} h
          </Typography>
        </Box>
        <Box
          display={{
            xl: "inline-flex",
            lg: "inline-flex",
            md: "inline-flex",
            sm: "inline-block",
            xs: "inline-block",
          }}
          textAlign={"center"}
          pl={1}
        >
          <Typography fontSize={"12px"} fontWeight={"700"} color={"#7c828c"}>
            Delivery : &nbsp;
          </Typography>
          <Typography fontSize={"12px"} fontWeight={"700"} color={"black"}>
            {getDiff("Review", "Shared").difference.days} d,{" "}
            {getDiff("Review", "Shared").difference.hours} h
          </Typography>
        </Box>
        <Box
          display={{
            xl: "inline-flex",
            lg: "inline-flex",
            md: "inline-flex",
            sm: "inline-block",
            xs: "inline-block",
          }}
          textAlign={"center"}
          pl={1}
        >
          <Typography fontSize={"12px"} fontWeight={"700"} color={"#7c828c"}>
            Closing : &nbsp;
          </Typography>
          <Typography fontSize={"12px"} fontWeight={"700"} color={"black"}>
            {getDiff("Shared", "Done").difference.days} d,{" "}
            {getDiff("Shared", "Done").difference.hours} h
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const timeLineDotNumStyle = {
  fontSize: 14,
  color: "#9ea1a7",
};
const itemStyle = {
  "::before": {
    flex: 0,
    padding: { xs: "5px", sm: "5px", md: "5px", lg: "16px", xl: "16px" },
  },
};
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
