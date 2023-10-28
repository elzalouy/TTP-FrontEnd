import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import { Task, TaskMovement } from "src/types/models/Projects";
import { getDifBetweenDates } from "src/helpers/generalUtils";

interface TaskHeaderProps {
  task: Task;
  setShow: any;
  movements?: TaskMovement[];
}

const TaskHeader: FC<TaskHeaderProps> = ({ task, setShow, movements }) => {
  const [journeyDeadline, setJourneyDeadline] = useState<string | undefined>(
    undefined
  );
  const [isNastyTask, setIsNastyTask] = useState(false);

  useEffect(() => {
    if (movements) {
      let deadlineMoves = movements.filter((i) => i.journeyDeadline);
      let journeyDeadline =
        deadlineMoves?.length > 0 &&
        deadlineMoves[deadlineMoves.length - 1].journeyDeadline
          ? deadlineMoves[deadlineMoves.length - 1].journeyDeadline
          : undefined;
      if (journeyDeadline) {
        setJourneyDeadline(journeyDeadline);
        let dif = getDifBetweenDates(
          new Date(Date.now()),
          new Date(journeyDeadline)
        );
      }
    }
  }, [movements]);

  useEffect(() => {
    if (movements) {
      isNasty();
    }
  }, [task, task.movements]);

  const isNasty = () => {
    const status = ["Not Clear", "Review", "Shared", "Done", "Cancled"];
    let moves = task.movements;
    let Moves = moves.map((i, index) => {
      return { ...i, index: index };
    });
    moves = Moves.filter(
      (item) =>
        status.includes(item?.status) &&
        task.movements[item.index + 1]?.status === "Tasks Board"
    );
    return moves.length;
  };

  return (
    <Grid
      item
      container
      xs={12}
      borderBottom={"1px solid #9fa1ab1a"}
      p={2}
      justifyContent={"space-between"}
      display={"inline-flex"}
    >
      <Grid item display={"inline-flex"} xs={11.5} sx={{ overflowX: "scroll" }}>
        <Box
          sx={{
            display: "inline-flex",
            background: "#f6f6f6",
            border: "1px solid #eaeaea",
            height: 35,
            borderRadius: 2,
            px: 1.5,
            minWidth: 150,
            alignItems: "center",
          }}
        >
          <Typography fontSize={"16px"}>{task.status}</Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="inset"
          flexItem
          sx={{ mx: 2 }}
        />
        <Box
          sx={{
            minWidth: 150,
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <Typography
            color="#9ea1a7"
            mb={0.5}
            fontWeight={"600"}
            fontSize={"12px"}
          >
            Created At:
          </Typography>
          <Typography
            color="black"
            alignItems={"center"}
            display={"inline-flex"}
            fontSize={"12px"}
          >
            <EventIcon htmlColor="#9ea1a7" sx={{ fontSize: "12px", mr: 1 }} />
            {task.cardCreatedAt
              ? format(new Date(task.cardCreatedAt), "dd MMMM yyyy")
              : task.createdAt
              ? format(new Date(task.createdAt), "dd MMMM yyyy")
              : "Not Set"}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="inset"
          flexItem
          sx={{ mx: 2 }}
        />
        <Box
          sx={{
            minWidth: 150,
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          <Typography
            color="#9ea1a7"
            mb={0.5}
            fontWeight={"600"}
            fontSize={"12px"}
          >
            Start Date:
          </Typography>
          <Typography
            color="black"
            alignItems={"center"}
            display={"inline-flex"}
            fontSize={"12px"}
          >
            <EventIcon htmlColor="#9ea1a7" sx={{ fontSize: "12px", mr: 1 }} />
            {task.start
              ? format(new Date(task.start), "dd MMMM yyyy")
              : "Not Set"}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="inset"
          flexItem
          sx={{ mx: 2 }}
        />
        {journeyDeadline && (
          <>
            <Divider
              orientation="vertical"
              variant="inset"
              flexItem
              sx={{ mx: 2 }}
            />
            <Box
              sx={{
                minWidth: 150,
                alignItems: "flex-start",
                textAlign: "left",
              }}
            >
              <Typography
                color="#9ea1a7"
                mb={0.5}
                fontWeight={"600"}
                fontSize={"12px"}
              >
                Journey Due Date:
              </Typography>
              <Typography
                color="black"
                alignItems={"center"}
                display={"inline-flex"}
                fontSize={"12px"}
              >
                <EventIcon
                  htmlColor="#9ea1a7"
                  sx={{ fontSize: "12px", mr: 1 }}
                />
                {journeyDeadline
                  ? format(new Date(journeyDeadline), "dd MMMM yyyy")
                  : "Not Set"}
              </Typography>
            </Box>
          </>
        )}

        {isNastyTask && (
          <>
            <Divider
              orientation="vertical"
              variant="inset"
              flexItem
              sx={{ mx: 2 }}
            />
            <Box
              sx={{
                minWidth: 170,
                alignItems: "center",
                textAlign: "center",
                display: "inline-flex",
              }}
            >
              <Typography
                sx={{
                  color: "#FF0000",
                  background: "#F1CBCC",
                  padding: "8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  height: "auto",
                }}
              >
                Nasty Task
              </Typography>
            </Box>
          </>
        )}
      </Grid>
      <Grid item xs={0.5} xl={0.5} display={"flex"} justifyContent={"flex-end"}>
        <Box
          width={35}
          height={35}
          sx={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShow("none")}
        >
          <CloseIcon
            htmlColor="black"
            sx={{ fontSize: 16, fontWeight: "200" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskHeader;
