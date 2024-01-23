import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Category, selectAllCategories } from "src/models/Categories";
import { useAppSelector } from "src/models/hooks";
import { selectProjectsState } from "src/models/Projects";
import { selectAllDepartments } from "src/models/Departments";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getTaskLeadTime,
  getDifBetweenDates,
  taskProcessingTime,
  taskSchedulingTime,
  turnAroundTime,
  totalUnClearTime,
  getTotalDifferenceFromTo,
  daysAndHours,
} from "src/helpers/generalUtils";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import NorthIcon from "@mui/icons-material/North";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { IDepartmentState, ITeam } from "src/types/models/Departments";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import _ from "lodash";
import { Task, TaskMovement } from "src/types/models/Projects";
import { ITaskInfo, Journey } from "src/types/views/Statistics";

interface TaskBasicsProps {
  task?: ITaskInfo;
  journey?: Journey;
  journeyIndex: number;
  journiesLength: number;
}

type stateType = {
  processingTime: number;
  schedulingTime: number;
  unClearTime: { hours: number; times: number };
  turnAround: { hours: number; times: number };
};

const TaskBasics: FC<TaskBasicsProps> = ({
  journey,
  task,
  journeyIndex,
  journiesLength,
}) => {
  const [state, setState] = useState<stateType>({
    processingTime: 0,
    schedulingTime: 0,
    unClearTime: { hours: 0, times: 0 },
    turnAround: { hours: 0, times: 0 },
  });

  useEffect(() => {
    if (journey) {
      let unclear = totalUnClearTime(journey.movements);
      let turnAround = getTotalDifferenceFromTo(
        "Not Clear",
        "In Progress",
        journey.movements
      );
      setState({
        turnAround: {
          hours: turnAround.dif.totalHours,
          times: turnAround.times,
        },
        unClearTime: { hours: unclear.hours, times: unclear.times },
        processingTime: getTotalDifferenceFromTo(
          "In Progress",
          "Shared",
          journey?.movements
        ).dif.totalHours,
        schedulingTime: getTotalDifferenceFromTo(
          "Tasks Board",
          "In Progress",
          journey.movements
        ).dif.totalHours,
      });
    }
  }, [journey]);

  return (
    <Grid sx={{ height: "100%", p: 3, overflowY: "scroll" }}>
      {journey?.categoryName && (
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
          {journey.categoryName}
        </Typography>
      )}
      <Typography fontWeight={"600"} fontSize={20} pt={1}>
        {task?.name}
      </Typography>
      {task?.description && task.description !== "undefined" && (
        <Typography fontWeight={400} fontSize={12} color={"#909497"}>
          {task.description}
        </Typography>
      )}
      {task?.teamName && (
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
              height: "auto",
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
              {`${task.teamName[0].toUpperCase()} ${task.teamName[1].toUpperCase()}`}
            </Avatar>
            <Typography fontSize={14} color="#293241">
              {task.name}
            </Typography>
          </Box>
        </>
      )}
      <Typography fontWeight={600} pt={2} fontSize={14} color={"#293241"}>
        Task Details:
      </Typography>
      <Grid container display={"flex"}>
        {/* Task lead time */}
        {journey?.leadTime ? (
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
                    {daysAndHours(journey.leadTime).days}
                  </Typography>
                  <Typography
                    ml={1}
                    mb={0.5}
                    fontSize={14}
                    fontWeight={"500"}
                    color={"#767676"}
                  >
                    days , {daysAndHours(journey.leadTime).hours}
                    hours,
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        {/* Task processing Time Card */}
        {state.processingTime ? (
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
                    {daysAndHours(state.processingTime).days}
                  </Typography>
                  <Typography
                    ml={1}
                    mb={0.5}
                    fontSize={14}
                    fontWeight={"500"}
                    color={"#767676"}
                  >
                    days, {daysAndHours(state.processingTime).hours}
                    hours
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        {/* Task Scheduling Time card */}
        {state.schedulingTime ? (
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
                    {daysAndHours(state.schedulingTime).days}
                  </Typography>
                  <Typography
                    ml={1}
                    mb={0.5}
                    fontSize={14}
                    fontWeight={"500"}
                    color={"#767676"}
                  >
                    Days, {daysAndHours(state.schedulingTime).hours}
                    hours,
                  </Typography>
                  {daysAndHours(state.schedulingTime).days > 0 ? (
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
        ) : (
          <></>
        )}
        {/* Task UnClear time */}
        {state.unClearTime ? (
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
                    {state.unClearTime.hours}
                  </Typography>
                  <Typography
                    ml={1}
                    mb={0.5}
                    fontSize={14}
                    fontWeight={"500"}
                    color={"#767676"}
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
                    {state.unClearTime?.times} times
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        {/* Task Turn Around time */}
        {state.turnAround ? (
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
                  {state.turnAround.hours}
                </Typography>
                <Typography
                  ml={1}
                  mb={0.5}
                  fontSize={14}
                  fontWeight={"500"}
                  color={"#767676"}
                >
                  Hours
                </Typography>
                {state?.turnAround.times > 0 && (
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
                    {state.turnAround.times} times
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default TaskBasics;
