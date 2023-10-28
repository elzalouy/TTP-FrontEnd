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
import { getDifBetweenDates, getDiff } from "src/helpers/generalUtils";
import CircleIcon from "@mui/icons-material/Circle";

type TaskStatusTimlineProps = {
  movements: TaskMovement[];
  journeyIndex: number;
  journiesLength: number;
  allMovementsOfTask: TaskMovement[];
};
type cancelTypes = "Canceled" | "Disturbed" | "Flagged" | "";

const JourneyDuration = (
  start: string,
  end: string,
  movements: TaskMovement[]
) => {
  let {
    difference: { hours, days, mins },
  } = getDiff(start, end, movements);
  return (
    <Typography fontSize={"12px"} fontWeight={"700"} color={"#7c828c"}>
      {days} d, {hours} h,
      {mins} mins,
    </Typography>
  );
};

const TaskStatusTimline: React.FC<TaskStatusTimlineProps> = (
  props: TaskStatusTimlineProps
) => {
  const [movements, setMovements] = React.useState<TaskMovement[]>();
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const [cancelType, setCancelType] = React.useState<string[]>([]);
  const [isMissedDelivery, setIsMissedDelivery] = React.useState(false);

  React.useEffect(() => {
    if (movements) {
      let deadlineMoves = movements.filter((i) => i.journeyDeadline);
      let journeyDeadline =
        deadlineMoves?.length > 0 &&
        deadlineMoves[deadlineMoves.length - 1].journeyDeadline
          ? deadlineMoves[deadlineMoves.length - 1].journeyDeadline
          : undefined;
      if (journeyDeadline) {
        let dif = getDifBetweenDates(
          new Date(Date.now()),
          new Date(journeyDeadline)
        );
        setIsMissedDelivery(dif.isLate && dif.totalHours > 6);
      } else setIsMissedDelivery(false);
    }
  }, [props.movements]);

  React.useEffect(() => {
    setFrom("");
    setTo("");
  }, [props.movements, props.journeyIndex]);
  React.useEffect(() => {
    setMovements(props?.movements);
    getCancelationType();
  }, [props.movements]);

  React.useEffect(() => {
    let firstMoveIndex = props.allMovementsOfTask.findIndex(
      (i, index) => props.movements[0] && i._id === props.movements[0]._id
    );
    let prevMove =
      firstMoveIndex > 0 ? props.allMovementsOfTask[firstMoveIndex - 1] : null;
    let movementsData = [...props.movements].map((i, index) => {
      return { ...i, index };
    });
    if (from !== "" && to === "")
      movementsData = movementsData.filter(
        (i) =>
          (i.index > 0 && props.movements[i.index - 1].status === from) ||
          (i.index === 0 && prevMove?.status === from)
      );
    else if (from === "" && to !== "")
      movementsData = movementsData.filter((i) => i.status === to);
    else if (from !== "" && to !== "")
      movementsData = movementsData.filter(
        (i) =>
          (i.status === to &&
            i.index > 0 &&
            props.movements[i.index - 1].status === from) ||
          (i.index === 0 && prevMove?.status === from && i.status === to)
      );
    setMovements(movementsData);
  }, [from, to]);

  const getCancelationType = () => {
    let cMoves = props?.movements.map((item, index) => {
      if (
        item.status === "Cancled" &&
        props?.movements[index - 1].status === "Tasks Board"
      )
        return "Canceled";
      else if (
        item.status === "Cancled" &&
        props?.movements[index - 1].status === "In Progress"
      )
        return "Disturbed";
      else if (
        item.status === "Cancled" &&
        ["Review", "Shared"].includes(props?.movements[index - 1]?.status)
      )
        return "Flagged";
      else return "";
    });
    setCancelType(cMoves);
  };

  const isNasty = () => {
    const status = ["Not Clear", "Review", "Shared", "Done", "Cancled"];
    let moves = props.allMovementsOfTask;
    let Moves = moves.map((i, index) => {
      return { ...i, index: index };
    });
    moves = Moves.filter(
      (item) =>
        status.includes(item?.status) &&
        props.movements[item.index + 1]?.status === "Tasks Board"
    );
    return moves.length;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Box sx={{ py: 1 }}>
        <Box sx={{ float: "left", m: 0.5 }}>
          <Typography fontSize={"16px"} fontWeight={600}>
            Task Journey
          </Typography>
        </Box>
        {props?.movements?.filter((item) => item?.status === "Not Clear")
          ?.length === 0 ? (
          <Box sx={{ float: "left", m: 0.5 }}>
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
          </Box>
        ) : (
          <Box sx={{ float: "left", m: 0.5 }}>
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
          </Box>
        )}
        {cancelType.includes("Canceled") && (
          <Box sx={{ float: "left", m: 0.5 }}>
            <Typography
              sx={{
                background: "#f1cbcc",
                borderRadius: "5px",
                color: "black",
                fontWeight: 500,
                fontSize: "12px",
                p: "4px",
              }}
            >
              Canceled
            </Typography>
          </Box>
        )}
        {cancelType.includes("Disturbed") && (
          <Box sx={{ float: "left", m: 0.5 }}>
            <Typography
              sx={{
                background: "#f1cbcc",
                borderRadius: "5px",
                color: "black",
                fontWeight: 500,
                fontSize: "12px",
                p: "4px",
              }}
            >
              Disturbed
            </Typography>
          </Box>
        )}
        {isMissedDelivery && (
          <Box sx={{ float: "left", m: 0.5 }}>
            <Typography
              sx={{
                background: "#f1cbcc",
                borderRadius: "5px",
                color: "black",
                fontWeight: 500,
                fontSize: "12px",
                p: "4px",
              }}
            >
              Missed Delivery
            </Typography>
          </Box>
        )}
        {cancelType.includes("Flagged") && (
          <Box sx={{ float: "left", m: 0.5 }}>
            <Typography
              sx={{
                background: "#f1cbcc",
                borderRadius: "5px",
                color: "black",
                fontWeight: 500,
                fontSize: "12px",
                p: "4px",
              }}
            >
              Flagged
            </Typography>
          </Box>
        )}
        {isNasty() >= 2 && (
          <Box sx={{ float: "left", m: 0.5 }}>
            <Typography
              sx={{
                background: "#f1cbcc",
                borderRadius: "5px",
                color: "black",
                fontWeight: 500,
                fontSize: "12px",
                p: "4px",
              }}
            >
              Nasty
            </Typography>
          </Box>
        )}
      </Box>
      <Grid
        item
        container
        xs={12}
        height={"100%"}
        pt={1}
        alignContent={"flex-start"}
      >
        <Grid item xs={10} sx={{ overflow: "scroll", height: "90%" }}>
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
            {movements &&
              movements?.map((item, index) => {
                let nextMoveIndex =
                  props.allMovementsOfTask?.findIndex(
                    (nm) => nm._id === item._id
                  ) + 1;
                let prevMoveIndex =
                  props.allMovementsOfTask?.findIndex(
                    (pm) => pm._id === item._id
                  ) - 1;
                let nextMove = props.allMovementsOfTask[nextMoveIndex];
                let prevMove = props.allMovementsOfTask[prevMoveIndex];
                let due = undefined;
                due = prevMove
                  ? getDifBetweenDates(
                      new Date(prevMove?.movedAt),
                      new Date(item?.movedAt)
                    )
                  : null;

                return (
                  <TimelineItem key={item._id} sx={itemStyle}>
                    <TimelineSeparator sx={{ height: "auto" }}>
                      <TimelineDot sx={dotStyle}>
                        <Typography sx={timeLineDotNumStyle}>
                          {props.allMovementsOfTask?.findIndex(
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
                            {item?.status} &nbsp;
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
                          {prevMove && (
                            <>
                              <Typography
                                color={"#94989b"}
                                pr={1}
                                fontSize={12}
                              >
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
                            <Typography color={"#94989b"} pr={1} fontSize={12}>
                              Moved after: &nbsp;
                            </Typography>
                            <Typography fontWeight={"bold"} fontSize={"10px"}>
                              {due?.difference?.days ?? 0} Days{",  "}
                              {due?.difference?.hours ?? 0} Hours{", "}
                              {due?.difference?.mins ?? 0} mins{" "}
                              {nextMove &&
                                props.journeyIndex === props.journiesLength &&
                                "(Till Now)"}
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
        <Grid item xs={2} height={"87%"}>
          <Typography fontWeight={"bold"} fontSize={12}>
            From
          </Typography>
          <List>
            {[
              "Tasks Board",
              "Not Clear",
              "In Progress",
              "Review",
              "Shared",
              "Done",
              "Cancled",
            ].map((item) => {
              return (
                <ListItem
                  key={item}
                  sx={{
                    px: 1,
                    py: 0.5,
                    cursor: "pointer",
                    justifyContent: "space-between",
                  }}
                  onClick={() => (from !== item ? setFrom(item) : setFrom(""))}
                >
                  <Typography
                    fontSize="10px"
                    color={from === item ? "#ffc500" : "#7c828c"}
                  >
                    {item}
                  </Typography>
                </ListItem>
              );
            })}
          </List>

          <Typography fontWeight={"bold"} fontSize={12}>
            To
          </Typography>

          <List>
            {[
              "Tasks Board",
              "Not Clear",
              "In Progress",
              "Review",
              "Shared",
              "Done",
              "Cancled",
            ].map((item) => {
              let count = movements && item === to ? movements?.length : 0;

              return (
                <ListItem
                  key={item}
                  sx={{
                    px: 1,
                    py: 0.5,
                    cursor: "pointer",
                    justifyContent: "space-between",
                  }}
                  onClick={() => (to !== item ? setTo(item) : setTo(""))}
                >
                  <Typography
                    fontSize="10px"
                    color={to === item ? "#ffc500" : "#7c828c"}
                  >
                    {item}
                  </Typography>
                  {item === to && (
                    <Typography
                      textAlign={"center"}
                      bgcolor={"#9ea1a7"}
                      color="black"
                      fontSize="11px"
                      borderRadius={"5px"}
                      px={"5px"}
                      py={"1px"}
                    >
                      {count}
                    </Typography>
                  )}
                </ListItem>
              );
            })}
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
          <Typography fontSize={"12px"} fontWeight={"700"} color="black">
            Fullfillment : &nbsp;
          </Typography>
          {JourneyDuration("In Progress", "Review", props.movements)}
        </Box>
        <Box textAlign={"center"} display={"inline-flex"} pl={1}>
          <Typography fontSize={"12px"} fontWeight={"700"} color={"black"}>
            Delivery : &nbsp;
          </Typography>
          {JourneyDuration("Review", "Shared", props.movements)}
        </Box>
        <Box textAlign={"center"} display={"inline-flex"} pl={1}>
          <Typography fontSize={"12px"} fontWeight={"700"} color={"black"}>
            Closing : &nbsp;
          </Typography>
          {JourneyDuration("Shared", "Done", props.movements)}
        </Box>
      </Grid>
    </div>
  );
};

const timeLineDotNumStyle = {
  fontSize: 14,
  color: "#9ea1a7",
};
const itemStyle = {
  "::before": {
    flex: 0,
    padding: { xs: "5px", sm: "5px", md: "5px", lg: "0px", xl: "0px" },
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
