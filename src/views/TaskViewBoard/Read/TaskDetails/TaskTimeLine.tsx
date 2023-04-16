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

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
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
              return (
                <TimelineItem sx={itemStyle}>
                  <TimelineSeparator>
                    <TimelineDot sx={dotStyle}>
                      <Typography sx={timeLineDotNumStyle}>
                        {index + 1}
                      </Typography>
                    </TimelineDot>
                    <TimelineConnector
                      sx={{ width: "1px", opacity: 0.5 }}
                      color="#e1e1e1"
                    />
                  </TimelineSeparator>
                  <TimelineContent sx={{ pt: 0 }}>
                    <Box display={"flex"} flexDirection={"column"}>
                      <Box display={"inline-flex"}>
                        <Typography color={"#94989b"} pr={1} fontSize={12}>
                          moved to:
                        </Typography>
                        <Typography fontSize={12} fontWeight={"600"}>
                          {item.status}
                        </Typography>
                      </Box>
                      <Box display={"inline-flex"}>
                        <Typography color={"#94989b"} pr={1} fontSize={12}>
                          Moved at:
                        </Typography>
                        <Typography fontSize={12} fontWeight={"600"}>
                          {item.movedAt
                            ? format(new Date(item.movedAt), "dd MMMM yyyy")
                            : "Not defined"}
                        </Typography>
                      </Box>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Grid>
        <Grid item xs={2}>
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
