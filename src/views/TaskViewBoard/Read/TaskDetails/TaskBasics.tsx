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
    });
  }, [task]);

  const TaskLeadTime = () => {
    if (state?.sharedMovements && state?.sharedMovements?.length > 0) {
      let tlt = getDifBetweenDates(
        new Date(task.start),
        new Date(
          state?.sharedMovements[state?.sharedMovements.length - 1].movedAt
        )
      );
      return tlt.remainingDays;
    } else
      return getDifBetweenDates(new Date(task.start), new Date(Date.now()))
        .remainingDays;
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
    let inProgressMove = state?.taskMovements?.filter(
      (item) => item.status === "In Progress"
    );
    let sharedMoveIndex = state?.sharedMovements
      ? state?.sharedMovements?.length - 1
      : -1;
    if (inProgressMove && inProgressMove?.length > 0) {
      let afterShared = state?.taskMovements?.filter(
        (item, index) =>
          state?.sharedMovements.length &&
          index > state?.sharedMovements[sharedMoveIndex]?.index
      );
      let isShiftedBack =
        afterShared &&
        afterShared.find((item) =>
          ["In Progress", "Shared", "Not Clear", "Review"].includes(item.status)
        ) === undefined
          ? false
          : true;
      if (state?.sharedMovements && sharedMoveIndex >= 0 && !isShiftedBack) {
        return getDifBetweenDates(
          new Date(inProgressMove[0].movedAt),
          new Date(state?.sharedMovements[sharedMoveIndex].movedAt)
        ).remainingDays;
      } else
        return getDifBetweenDates(
          new Date(inProgressMove[0].movedAt),
          new Date(Date.now())
        ).remainingDays;
    } else return 0;
  };

  const taskSchedulingTime = () => {
    let inProgressMovements = task.movements.filter(
      (item) => item.status === "In Progress"
    );
    if (task.start) {
      if (inProgressMovements.length > 0)
        return getDifBetweenDates(
          new Date(task.start),
          new Date(inProgressMovements[0].movedAt)
        ).totalHours;
      else if (task.assignedAt) {
        return getDifBetweenDates(
          new Date(task.start),
          new Date(task.assignedAt)
        ).totalHours;
      } else
        return getDifBetweenDates(new Date(task.start), new Date(Date.now()))
          .totalHours;
    } else return 0;
  };

  const unClearTime = () => {};
  const TaskState = () => {
    return (
      <>
        {state?.sharedMovements.length === 0 ||
        ["Done", "Cancled"].includes(task.status) ? (
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
        ) : (
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
        )}
      </>
    );
  };

  return (
    <>
      {state?.taskCategory && (
        <Box
          sx={{
            border: "1px solid #8e8f95",
            background: "#f3eefd",
            color: "#444452",
            borderRadius: 10,
            maxWidth: 120,
            width: 120,
            height: 25,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "flex-start",
            pl: 1,
          }}
        >
          <CircleIcon htmlColor="#444452" sx={{ fontSize: 10, mr: 1 }} />
          {state?.taskCategory.category}
        </Box>
      )}
      <Typography fontWeight={"600"} fontSize={20} pt={1}>
        {task.name}
      </Typography>
      <Typography fontWeight={400} fontSize={12} color={"#909497"}>
        {task.description}
      </Typography>
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
                width: 20,
                height: 30,
                borderRadius: 0.5,
                fontSize: 12,
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
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} pr={1}>
          <Box
            sx={{
              background: "#f6f6f6",
              borderRadius: 3,
              minWidth: 200,
              p: 2,
              mt: 2,
              mr: 1,
            }}
          >
            <Grid
              container
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Grid item xs={9}>
                <Typography color={"#7c828c"} fontSize={14} fontWeight={"500"}>
                  Task Lead Time
                </Typography>
                <Box display={"inline-flex"} pt={1.5} alignItems="flex-end">
                  <Typography fontSize={26} fontWeight={"700"}>
                    {TaskLeadTime()}
                  </Typography>
                  <Typography
                    ml={1}
                    mb={0.5}
                    fontSize={14}
                    fontWeight={"500"}
                    color={"ActiveBorder"}
                  >
                    days
                  </Typography>
                  {TaskState()}
                </Box>
              </Grid>
              <Grid xs={3}>
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#ffc500",
                    borderRadius: 10,
                    width: 45,
                    height: 45,
                  }}
                >
                  <UpdateIcon sx={{ fontSize: 22 }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* Task processing Time Card */}
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} pr={1}>
          <Box
            sx={{
              background: "#f6f6f6",
              borderRadius: 3,
              minWidth: 200,
              p: 2,
              mt: 2,
              mr: 1,
            }}
          >
            <Grid
              container
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Grid item xs={9}>
                <Typography color={"#7c828c"} fontSize={14} fontWeight={"500"}>
                  Task Processing Time
                </Typography>
                <Box display={"inline-flex"} pt={1.5} alignItems="flex-end">
                  <Typography fontSize={26} fontWeight={"700"}>
                    {taskProcessingTime()}
                  </Typography>
                  <Typography
                    ml={1}
                    mb={0.5}
                    fontSize={14}
                    fontWeight={"500"}
                    color={"ActiveBorder"}
                  >
                    days
                  </Typography>
                  {TaskState()}
                </Box>
              </Grid>
              <Grid xs={3}>
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#ffc500",
                    borderRadius: 10,
                    width: 45,
                    height: 45,
                  }}
                >
                  <ModelTrainingIcon sx={{ fontSize: 22 }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* Task Scheduling Time card */}
        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box
            sx={{
              background: "#f6f6f6",
              borderRadius: 3,
              minWidth: 200,
              p: 2,
              mt: 2,
              mr: 1,
            }}
          >
            <Grid
              container
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Grid item xs={10}>
                <Typography color={"#7c828c"} fontSize={14} fontWeight={"500"}>
                  Task Scheduling Time
                </Typography>
                <Box display={"inline-flex"} pt={1.5} alignItems="flex-end">
                  <Typography fontSize={26} fontWeight={"700"}>
                    {taskSchedulingTime()}
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
                  {taskSchedulingTime() > 24 && (
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
                  )}
                </Box>
              </Grid>
              <Grid xs={2}>
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#ffc500",
                    borderRadius: 10,
                    width: 45,
                    height: 45,
                  }}
                >
                  <ScheduleSendIcon sx={{ fontSize: 22 }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TaskBasics;
