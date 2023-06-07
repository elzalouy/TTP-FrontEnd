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
type cancelTypes = "Canceled" | "Disrupted" | "Flagged" | "";

const TaskStatusTimline: React.FC<TaskStatusTimlineProps> = (
  props: TaskStatusTimlineProps
) => {
  const [movements, setMovements] = React.useState<TaskMovement[]>();
  const [filter, setFilter] = React.useState("");
  const [cancelType, setCancelType] = React.useState<Map<string, cancelTypes>>(
    new Map()
  );

  React.useEffect(() => {
    setMovements(props.movements);
    getCancelationType();
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
          mins: 0,
          hours: 0,
        },
        remainingDays: 0,
        totalHours: 0,
      };
  };

  const getCancelationType = () => {
    let map = cancelType;
    let cMoves = props.movements
      .filter((item) => item.status === "Cancled")
      .map((item) => {
        let itemIndex = props.movements.findIndex((m) => m === item);
        return { index: itemIndex, ...item };
      });
    if (cMoves && cMoves.length > 0) {
      cMoves.map((lcMove) => {
        if (props.movements[lcMove.index - 1].status === "In Progress")
          map.set("Canceled", "Canceled");
        if (props.movements[lcMove.index - 1].status === "Tasks Board")
          map.set("Disrupted", "Disrupted");
        if (
          ["Review", "Shared"].includes(
            props.movements[lcMove.index - 1].status
          )
        )
          map.set("Flagged", "Flagged");
      });
    }
    setCancelType(map);
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
        pl: 3,
      }}
    >
      <Box sx={{ my: 1 }}>
        <Box sx={{ float: "left", m: 0.5 }}>
          <Typography fontSize={"16px"} fontWeight={600}>
            Task Journey
          </Typography>
        </Box>
        {filter !== "" && (
          <Box sx={{ float: "left", m: 0.5 }}>
            <Typography
              sx={{
                background: "#9EA19B",
                color: "black",
                p: 0.5,
                borderRadius: "5px",
                fontWeight: 500,
                fontSize: 12,
                height: "24px",
              }}
            >
              {movements?.length}
            </Typography>
          </Box>
        )}
        {props.movements.filter((item) => item.status === "Not Clear")
          .length === 0 ? (
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
        {cancelType.has("Canceled") && (
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
        {cancelType.has("Disrupted") && (
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
              Disrupted
            </Typography>
          </Box>
        )}
        {cancelType.has("Flagged") && (
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
      </Box>
      <Grid item container xs={12} height={"72%"} alignContent={"flex-start"}>
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
              let nextMoveIndex =
                props.movements.findIndex((nm) => nm._id === item._id) + 1;
              let prevMoveIndex =
                props.movements.findIndex((pm) => pm._id === item._id) - 1;
              let nextMove = props.movements[nextMoveIndex];
              let prevMove = props.movements[prevMoveIndex];
              let due = undefined;
              due = nextMove
                ? getDifBetweenDates(
                    new Date(nextMove?.movedAt),
                    new Date(item?.movedAt)
                  )
                : getDifBetweenDates(
                    new Date(new Date(Date.now())),
                    new Date(item?.movedAt)
                  );

              return (
                <TimelineItem key={item._id} sx={itemStyle}>
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
                        {prevMove && (
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
                            {due?.difference?.days ?? 0} Days{",  "}
                            {due?.difference?.hours ?? 0} Hours{", "}
                            {due?.difference?.mins ?? 0} mins{" "}
                            {movements[index]._id ===
                              props.movements[props.movements.length - 1]._id &&
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
            ].map((item) => {
              let count =
                filter !== ""
                  ? props.movements.filter(
                      (move, index) =>
                        props.movements[index + 1] &&
                        props.movements[index + 1]?.status === filter &&
                        move.status === item
                    ).length
                  : 0;
              return (
                <ListItem
                  key={item}
                  sx={{
                    px: 1,
                    py: 0.5,
                    cursor: "pointer",
                    justifyContent: "space-between",
                  }}
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
                  {count !== 0 && (
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
          <Typography fontSize={"12px"} fontWeight={"700"} color={"#7c828c"}>
            Fullfillment : &nbsp;
          </Typography>
          <Typography fontSize={"12px"} fontWeight={"700"} color={"black"}>
            {getDiff("In Progress", "Review")?.difference?.days ?? 0} d,{" "}
            {getDiff("In Progress", "Review")?.difference?.hours ?? 0} h,
            {getDiff("In Progress", "Review")?.difference?.mins ?? 0} mins,
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
            {getDiff("Review", "Shared")?.difference?.days ?? 0} d,{" "}
            {getDiff("Review", "Shared")?.difference?.hours ?? 0} h,
            {getDiff("Review", "Shared")?.difference?.mins ?? 0} mins,
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
            {getDiff("Shared", "Done")?.difference?.days ?? 0} d,{" "}
            {getDiff("Shared", "Done")?.difference?.hours ?? 0} h,
            {getDiff("Shared", "Done")?.difference?.mins ?? 0} mins,
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
const labelStyle = {};
export default TaskStatusTimline;
