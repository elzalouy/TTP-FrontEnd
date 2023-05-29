import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Category, selectAllCategories } from "src/models/Categories";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";
import { selectAllDepartments } from "src/models/Departments";
import UpdateIcon from "@mui/icons-material/Update";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import NorthIcon from "@mui/icons-material/North";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import _ from "lodash";
import { TaskMovement } from "src/types/models/Projects";

interface TaskBasicsProps {}

type state = {
  taskTeam?: ITeam;
  taskBoard?: IDepartmentState;
  taskCategory?: Category;
  taskMovements?: {
    index: number;
    status: string;
    movedAt: Date;
  }[];
  sharedMovements: {
    index: number;
    status: string;
    movedAt: Date;
  }[];
  statitics: {
    taskSchedulingTime: any;
    taskProcessingTime: any;
    taskLeadTime: any;
    unClearTime: { times: number; hours: number };
    turnAroundTime: { times: number; hours: number };
  };
};

const TaskBasics: FC<TaskBasicsProps> = () => {
  const [state, setState] = useState<state>();
  const categories = useAppSelector(selectAllCategories);
  const departments = useAppSelector(selectAllDepartments);
  const { openTaskDetails: task } = useAppSelector(selectAllProjects);
  useEffect(() => {
    const taskBoard = departments.find((item) => item.boardId === task.boardId);
    const taskTeam = taskBoard?.teams.find((item) => item._id === task.teamId);
    const category = categories.find((item) => item._id === task.categoryId);
    const taskMovements = task.movements.map((item, index) => {
      return { ...item, index };
    });

    const sharedMovements =
      taskMovements && taskMovements.filter((item) => item.status === "Shared");
    setState({
      sharedMovements,
      taskTeam,
      taskCategory: category,
      taskMovements,
      taskBoard,
      statitics: {
        taskLeadTime: TaskLeadTime(),
        taskProcessingTime: taskProcessingTime(),
        turnAroundTime: turnAroundTime(),
        unClearTime: unClearTime(),
        taskSchedulingTime: taskSchedulingTime(),
      },
    });
  }, [task]);

  const TaskLeadTime = () => {
    let lastShared = _.findLast(
      task.movements,
      (item) => item.status === "Shared"
    );
    return task.start
      ? getDifBetweenDates(
          new Date(task.start),
          lastShared ? new Date(lastShared.movedAt) : new Date(Date.now())
        )
      : null;
  };

  /**
   * taskProcessingTime
   * 
    * It is necessary to move the task to the "inProgress" stage at least once.
      The processing time of the task can be calculated regardless of whether it has been moved to the "Shared" stage or not.
      However, when calculating the total processing time, only the last time the task was moved to the "Shared" stage should be taken into account
 * @returns  number
 */

  const taskProcessingTime = () => {
    let inProgress = task.movements.find(
      (item: TaskMovement) => item.status === "In Progress"
    );
    let sharedMove = _.findLast(task.movements, (item: TaskMovement) => {
      return item.status === "Shared";
    });

    if (inProgress) {
      return getDifBetweenDates(
        new Date(inProgress.movedAt),
        sharedMove ? new Date(sharedMove.movedAt) : new Date(Date.now())
      );
    }
    return null;
  };

  const taskSchedulingTime = () => {
    let inProgressMove = task.movements.find(
      (item) => item.status === "In Progress"
    );
    return inProgressMove && task.start
      ? getDifBetweenDates(
          new Date(task.start),
          new Date(inProgressMove.movedAt)
        )
      : null;
  };

  const unClearTime = () => {
    // how many times task moved to notClear
    let times = task.movements.filter(
      (item) => item.status === "Not Clear"
    ).length;
    let total = { hours: 0 };
    task.movements.forEach((item, index) => {
      if (item.status === "Not Clear") {
        let nextMove = task.movements[index + 1];
        let dif = getDifBetweenDates(
          new Date(item.movedAt),
          nextMove ? new Date(nextMove.movedAt) : new Date(Date.now())
        );
        total.hours += dif.totalHours;
      }
    });
    console.log({ times, total });
    return { times, ...total };
  };

  const turnAroundTime = () => {
    let taskMovements = task.movements;
    if (task.movements.length > 0) {
      let turnAroundMovements = taskMovements.filter(
        (item, index) =>
          item.status === "Not Clear" &&
          taskMovements[index + 1] &&
          taskMovements[index + 1].status === "In Progress"
      );
      if (turnAroundMovements.length > 0) {
        let indexedMovements = turnAroundMovements.map((item) => {
          let index = taskMovements.findIndex((m) => m._id === item._id);
          return { item, index };
        });
        let diffs = indexedMovements.map((item) => {
          return getDifBetweenDates(
            new Date(item.item.movedAt),
            new Date(taskMovements[item.index + 1].movedAt)
          ).totalHours;
        });
        return { hours: _.sum(diffs), times: turnAroundMovements.length };
      }
    }
    return { times: 0, hours: 0 };
  };

  const TaskState = () => {
    return (
      <>
        {["Done", "Cancled", "Shared"].includes(task.status) ? (
          <Typography
            sx={{
              width: "35px",
              fontSize: "12px",
              borderRadius: 10,
              background: "#ffc500",
              color: "white",
              fontWeight: "700",
              textAlign: "center",
              mb: 0.5,
              ml: 1,
            }}
          >
            100%
          </Typography>
        ) : (
          <NorthIcon
            htmlColor="#fc164f"
            sx={{
              fontSize: "0.8rem",
              mb: 1,
              width: "1em",
              ml: "10px",
              fontWeight: "600",
            }}
          />
        )}
      </>
    );
  };

  return (
    <Grid sx={{ height: "100%", p: 3, overflowY: "scroll" }}>
      {state?.taskCategory && (
        <Typography
          sx={{
            border: "1px solid #8e8f95",
            background: "#f3eefd",
            color: "#444452",
            borderRadius: 10,
            width: "fit-content",
            p: "5px",
            textAlign: "center",
          }}
        >
          <CircleIcon htmlColor="#444452" sx={{ fontSize: 10, mr: 1 }} />
          {state?.taskCategory.category}
        </Typography>
      )}
      <Typography fontWeight={"600"} fontSize={20} pt={1}>
        {task.name}
      </Typography>
      {task.description && task.description !== "undefined" && (
        <Typography fontWeight={400} fontSize={12} color={"#909497"}>
          {task.description}
        </Typography>
      )}
      {state?.taskTeam && (
        <>
          <Typography fontWeight={600} pt={2} fontSize={14} color={"#293241"}>
            Assigned to:
          </Typography>
          <Box
            sx={{
              border: "1px solid #eae9ee",
              background: "transparent",
              borderRadius: 2,
              p: 0.8,
              width: "auto",
              height: 33,
              display: "inline-flex",
              flexDirection: "row",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#ffc500",
                width: "auto",
                height: "auto",
                borderRadius: 0.5,
                fontSize: 12,
                padding: "5px",
                mr: 1,
                fontWeight: "700",
              }}
              variant="square"
            >
              {`${state?.taskTeam?.name[0].toUpperCase()} ${state?.taskTeam?.name[1].toUpperCase()}`}
            </Avatar>
            <Typography fontSize={14} color="#293241">
              {state?.taskTeam?.name}
            </Typography>
          </Box>
        </>
      )}
      <Typography fontWeight={600} pt={2} fontSize={14} color={"#293241"}>
        Task Details:
      </Typography>
      <Grid container display={"flex"}>
        {/* Task lead time */}
        <Grid
          xs={12}
          sm={12}
          md={5.8}
          lg={5.8}
          xl={5.8}
          sx={{
            background: "#f6f6f6",
            borderRadius: 3,
            p: 2,
            mt: 0.5,
            mr: { xl: 1, lg: 0.5, md: 0.5 },
          }}
        >
          <Grid
            container
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                color={"#7c828c"}
                fontSize={14}
                fontWeight={"500"}
                pt={1}
              >
                Task Lead Time
              </Typography>
              <Typography
                sx={{
                  padding: "10px",
                  background: "#ffc500",
                  borderRadius: "100%",
                  width: "46px",
                  textAlign: "center",
                  textAlignLast: "center",
                }}
              >
                <UpdateIcon sx={{ fontSize: 22 }} />
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Box display={"inline-flex"} pt={1.5} alignItems="flex-end">
                <Typography fontSize={26} fontWeight={"700"}>
                  {state?.statitics.taskLeadTime?.difference?.days ?? 0}
                </Typography>
                <Typography
                  ml={1}
                  mb={0.5}
                  fontSize={14}
                  fontWeight={"500"}
                  color={"ActiveBorder"}
                >
                  days , {state?.statitics.taskLeadTime?.difference?.hours ?? 0}{" "}
                  hours,
                  {state?.statitics.taskLeadTime?.difference?.mins ?? 0} mins
                </Typography>
                {TaskState()}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* Task processing Time Card */}
        <Grid
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            background: "#f6f6f6",
            borderRadius: 3,
            p: 2,
            mt: 0.5,
          }}
        >
          <Grid
            container
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                color={"#7c828c"}
                fontSize={14}
                fontWeight={"500"}
                pt={1}
              >
                Task Processing Time
              </Typography>
              <Typography
                sx={{
                  padding: "10px",
                  background: "#ffc500",
                  borderRadius: "100%",
                  width: "46px",
                  textAlign: "center",
                  textAlignLast: "center",
                }}
              >
                <ModelTrainingIcon sx={{ fontSize: 22 }} />
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Box display={"inline-flex"} pt={1.5} alignItems="flex-end">
                <Typography fontSize={26} fontWeight={"700"}>
                  {state?.statitics.taskProcessingTime?.difference?.days ?? 0}
                </Typography>
                <Typography
                  ml={1}
                  mb={0.5}
                  fontSize={14}
                  fontWeight={"500"}
                  color={"ActiveBorder"}
                >
                  days,{" "}
                  {state?.statitics.taskProcessingTime?.difference?.hours ?? 0}{" "}
                  hours,
                  {state?.statitics.taskProcessingTime?.difference?.mins ??
                    0}{" "}
                  mins
                </Typography>
                {TaskState()}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* Task Scheduling Time card */}
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            background: "#f6f6f6",
            borderRadius: 3,
            p: 2,
            mt: 0.5,
          }}
        >
          <Grid
            container
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography color={"#7c828c"} fontSize={14} fontWeight={"500"}>
                Task Scheduling Time
              </Typography>
              <Typography
                sx={{
                  padding: "10px",
                  background: "#ffc500",
                  borderRadius: "100%",
                  width: "46px",
                  textAlign: "center",
                  textAlignLast: "center",
                }}
              >
                <ScheduleSendIcon sx={{ fontSize: 22 }} />
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Box display={"inline-flex"} pt={1.5} alignItems="flex-end">
                <Typography fontSize={26} fontWeight={"700"}>
                  {state?.statitics?.taskSchedulingTime?.difference?.days ?? 0}
                </Typography>
                <Typography
                  ml={1}
                  mb={0.5}
                  fontSize={14}
                  fontWeight={"500"}
                  color={"ActiveBorder"}
                >
                  Days,{" "}
                  {state?.statitics?.taskSchedulingTime?.difference?.hours ?? 0}{" "}
                  hours,
                  {state?.statitics?.taskSchedulingTime?.difference?.mins ??
                    0}{" "}
                  mins
                </Typography>
                {state?.statitics?.taskSchedulingTime?.difference?.days > 0 ? (
                  <Typography
                    sx={{
                      p: "3px",
                      ml: 1,
                      fontSize: "10px",
                      mb: 0.5,
                      borderRadius: 0.5,
                      background: "#F1CBCC",
                      color: "#FF0000",
                    }}
                  >
                    Late
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* Task UnClear time */}
        <Grid
          xs={12}
          sm={12}
          md={7.8}
          lg={7.8}
          xl={7.8}
          pr={1}
          sx={{
            background: "#f6f6f6",
            borderRadius: 3,
            p: 2,
            mt: 0.5,
            mr: { xl: 1, lg: 0.5, md: 0.5 },
          }}
        >
          <Grid
            container
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography color={"#7c828c"} fontSize={14} fontWeight={"500"}>
                Task UnClear time
              </Typography>
              <Typography
                sx={{
                  padding: "10px",
                  background: "#ffc500",
                  borderRadius: "100%",
                  width: "46px",
                  textAlign: "center",
                  textAlignLast: "center",
                }}
              >
                <ManageHistoryIcon sx={{ fontSize: 22 }} />
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Box display={"inline-flex"} pt={1.5} alignItems="flex-end">
                <Typography fontSize={26} fontWeight={"700"}>
                  {state?.statitics.unClearTime.hours}
                </Typography>
                <Typography
                  ml={1}
                  mb={0.5}
                  fontSize={14}
                  fontWeight={"500"}
                  color={"ActiveBorder"}
                >
                  Hours
                </Typography>
                <Typography
                  sx={{
                    p: "3px",
                    ml: 1,
                    fontSize: "10px",
                    mb: 0.5,
                    borderRadius: 0.5,
                    background: "#F1CBCC",
                    color: "#FF0000",
                  }}
                >
                  {state?.statitics?.unClearTime?.times} times
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* Task Turn Around time */}
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          sx={{
            background: "#f6f6f6",
            borderRadius: 3,
            p: 2,
            mt: 0.5,
          }}
        >
          <Grid
            container
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
            height={"100%"}
            alignContent={"space-between"}
          >
            <Grid xs={12}>
              <Typography color={"#7c828c"} fontSize={14} fontWeight={"500"}>
                Turn Around Time
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography fontSize={18} fontWeight={"700"}>
                {state?.statitics.turnAroundTime.hours}
              </Typography>
              <Typography
                ml={1}
                mb={0.5}
                fontSize={14}
                fontWeight={"500"}
                color={"ActiveBorder"}
              >
                Hours
              </Typography>
              {state?.statitics.turnAroundTime.times &&
              state?.statitics.turnAroundTime.times > 1 ? (
                <Typography
                  sx={{
                    p: "3px",
                    ml: 1,
                    fontSize: "10px",
                    mb: 0.5,
                    borderRadius: 0.5,
                    background: "#F1CBCC",
                    color: "#FF0000",
                  }}
                >
                  {turnAroundTime().times} times
                </Typography>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskBasics;
