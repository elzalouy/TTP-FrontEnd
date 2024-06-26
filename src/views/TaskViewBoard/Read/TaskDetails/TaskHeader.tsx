import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import {
  Project,
  ProjectsInterface,
  Task,
  TaskMovement,
} from "src/types/models/Projects";
import {
  convertToCSV,
  getCancelationType,
  getDifBetweenDates,
  getTotalDifferenceFromTo,
  getTaskJournies,
  getTaskLeadTime,
  isMissedDelivery,
  totalUnClearTime,
} from "src/helpers/generalUtils";
import DownloadIcon from "@mui/icons-material/Download";
import { useAppSelector } from "src/models/hooks";
import { selectProjectsState, selectProjectOptions } from "src/models/Projects";
import { Client, selectAllClients } from "src/models/Clients";
import { Manager, selectManagers, selectPMOptions } from "src/models/Managers";
import {
  Category,
  SubCategory,
  selectAllCategories,
} from "src/models/Categories";
import {
  ITaskInfo,
  Journey,
  TaskJourniesDetails,
} from "src/types/views/Statistics";

interface TaskHeaderProps {
  taskInfo?: ITaskInfo;
  setShow: any;
  Journey?: Journey;
}

const TaskHeader: FC<TaskHeaderProps> = ({ taskInfo, setShow, Journey }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const projects: ProjectsInterface = useAppSelector(selectProjectsState);
  const clients = useAppSelector(selectAllClients);
  const managers = useAppSelector(selectManagers);
  const categories = useAppSelector(selectAllCategories);

  const [isNastyTask, setIsNastyTask] = useState(false);

  useEffect(() => {
    if (Journey) {
      let numberOfNastyActions = isNasty();
      setIsNastyTask(numberOfNastyActions >= 2 ? true : false);
    }
  }, [taskInfo, taskInfo?.movements]);

  const isNasty = () => {
    if (Journey) {
      const status = ["Not Clear", "Review", "Shared", "Done", "Cancled"];
      let moves = Journey?.movements ?? [];
      let Moves = moves.map((i, index) => {
        return { ...i, index: index };
      });
      moves = Moves.filter(
        (item) =>
          status.includes(item?.status) &&
          Journey?.movements[item.index + 1]?.status === "Tasks Board"
      );
      return moves.length;
    } else return 0;
  };

  const onDownloadTaskFile = () => {
    if (taskInfo) {
      let tasksJournies = getTaskJournies(taskInfo);
      let journies = getTaskJournies(taskInfo).journies;
      let taskJourniesDetails = journies.map((journey, index) => {
        let leadTime = getTaskLeadTime(journey.movements);
        let schedulingTime = getTotalDifferenceFromTo(
          "Tasks Board",
          "In Progress",
          journey.movements
        );
        let processingTime = getTotalDifferenceFromTo(
          "In Progress",
          "Shared",
          journey.movements
        );
        let unClear = totalUnClearTime(journey.movements);
        let turnAround = getTotalDifferenceFromTo(
          "Not Clear",
          "In Progress",
          journey.movements
        );
        let fulfillment = getTotalDifferenceFromTo(
          "In Progress",
          "Review",
          journey.movements
        );
        let delivery = getTotalDifferenceFromTo(
          "Review",
          "Shared",
          journey.movements
        );
        let closing = getTotalDifferenceFromTo(
          "Shared",
          "Done",
          journey.movements
        );
        let clearBack = getTotalDifferenceFromTo(
          "Not Clear",
          "Tasks Board",
          journey.movements
        );
        let cancelMoves = getCancelationType(journey.movements);
        let missedDelivery = isMissedDelivery(journey);
        let wrongOrMissingFulfillment = getTotalDifferenceFromTo(
          "Review",
          "Tasks Board",
          journey.movements
        );
        let commentsTime = getTotalDifferenceFromTo(
          "Shared",
          "Tasks Board",
          journey.movements
        );
        let revisitingTime = getTotalDifferenceFromTo(
          "Done",
          "Tasks Board",
          journey.movements
        );
        let revivedTime = getTotalDifferenceFromTo(
          "Cancled",
          "Tasks Board",
          journey.movements
        );

        let journeyDetails: TaskJourniesDetails = {
          taskId: taskInfo._id,
          name: taskInfo.name,
          journeyIndex: index + 1,
          projectId: taskInfo.projectId ?? "",
          projectName: taskInfo?.projectManagerName ?? "",
          clientName: taskInfo.clientName ?? "",
          categoryName: taskInfo.categoryName ?? "",
          subCategoryName: taskInfo.subCategoryName ?? "",
          teamName: taskInfo.teamName ?? "",
          taskJourniesCount: tasksJournies.journies.length.toString(),
          status: taskInfo.status ?? "",
          projectManager: taskInfo.projectManagerName ?? "",
          startDate: taskInfo.start
            ? format(new Date(taskInfo.start), "dd MMMM yyyy HH:SS")
            : "",
          dueDate: journey.journeyDeadline
            ? format(new Date(journey.journeyDeadline), "dd MMMM yyyy HH:SS")
            : "",
          journeyFinishedAt: journey.journeyFinishedAtDate
            ? format(journey.journeyFinishedAtDate, "dd MMMM yyyy HH:MM")
            : "",
          deliveryStatus: missedDelivery ? "Missed" : "On Time",
          movementsCount: journey.movements.length,
          journeyLeadTime: `${leadTime.difference.days}D / ${leadTime.difference.hours}H / ${leadTime.difference.mins}M`,
          journeyProcessingTime: `${processingTime.dif.difference.days}D / ${processingTime.dif.difference.hours}H / ${processingTime.dif.difference.mins}M`,
          journeySchedulingTime: `${schedulingTime.dif.difference.days}D / ${schedulingTime.dif.difference.hours}H / ${schedulingTime.dif.difference.mins}M`,
          journeyUnClearTime: `${unClear.difference.days}D / ${unClear.difference.hours}H / ${unClear.difference.hours}H / ${unClear.difference.mins}`,
          journeyUnClearCounts: unClear.times,
          journeyTurnAroundTime: `${turnAround.dif.difference.days}D / ${turnAround.dif.difference.hours}H /  ${turnAround.dif.difference.mins}M`,
          journeyFullfilmentTime: `${fulfillment.dif.difference.days}D / ${fulfillment.dif.difference.hours} / ${fulfillment.dif.difference.mins}M`,
          journeyDeliveryTime: `${delivery.dif.difference.days}D / ${delivery.dif.difference.hours}H / ${delivery.dif.difference.mins}M`,
          journeyClosingTime: `${closing.dif.difference.days}D / ${closing.dif.difference.hours}H /  ${closing.dif.difference.mins}M`,
          journeyCanceled: cancelMoves.includes("Canceled"),
          journeyDisturbed: cancelMoves.includes("Disturbed"),
          journeyFlagged: cancelMoves.includes("Flagged"),
          journeyLateScheduling:
            schedulingTime.dif.difference.days > 0 ? true : false,
          missedDelivery: missedDelivery,
          journeyVerified: unClear.times === 0 && turnAround.times === 0,
          journeyUnHealthy: unClear.times > 0 && turnAround.times > 0,
          journeyClearBackTime: `${clearBack.dif.difference.days}D / ${clearBack.dif.difference.hours}H  / ${clearBack.dif.difference.mins}M`,
          wrongOrMissingFulfillmentTime: `${wrongOrMissingFulfillment.dif.difference.days}D  / ${wrongOrMissingFulfillment.dif.difference.hours}H / ${wrongOrMissingFulfillment.dif.difference.mins}M`,
          commentsOrChangesTime: `${commentsTime.dif.difference.days}D / ${commentsTime.dif.difference.hours}H  / ${commentsTime.dif.difference.mins}M`,
          revisitingTime: `${revisitingTime.dif.difference.days}D / ${revisitingTime.dif.difference.hours}H  / ${revisitingTime.dif.difference.mins}M`,
          revivedTime: `${revivedTime.dif.difference.days}D / ${revivedTime.dif.difference.hours}H / ${revivedTime.dif.difference.mins}M`,
          wrongOrMissingFulfillmentTimes:
            wrongOrMissingFulfillment.times.toString(),
          commentsOrChangesTimes: commentsTime.times.toString(),
          revisitingTimes: revisitingTime.times.toString(),
          revivedTimes: revivedTime.times.toString(),
        };
        return journeyDetails;
      });
      if (
        taskJourniesDetails &&
        taskJourniesDetails.length > 0 &&
        formRef.current
      ) {
        let data = convertToCSV([...taskJourniesDetails]);
        let dataBlob = new Blob([data], { type: "text/csv" });
        const url = window.URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.style.display = "none";
        link.download = "Task Details Report";
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      }
    }
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
          <Typography fontSize={"16px"}>{taskInfo?.status}</Typography>
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
            {taskInfo?.cardCreatedAt
              ? format(new Date(taskInfo?.cardCreatedAt), "dd MMMM yyyy")
              : taskInfo?.createdAt
              ? format(new Date(taskInfo?.createdAt), "dd MMMM yyyy")
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
            {taskInfo?.start
              ? format(new Date(taskInfo?.start), "dd MMMM yyyy")
              : "Not Set"}
          </Typography>
        </Box>
        {Journey?.journeyDeadline && (
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
                {Journey?.journeyDeadline
                  ? format(new Date(Journey?.journeyDeadline), "dd MMMM yyyy")
                  : "Not Set"}
              </Typography>
            </Box>
          </>
        )}
        {taskInfo?.deadline && !Journey?.journeyDeadline && (
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
                Task Due Date:
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
                {taskInfo.deadline
                  ? format(new Date(taskInfo.deadline), "dd MMMM yyyy")
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
        <form ref={formRef}>
          <IconButton
            type="button"
            onClick={onDownloadTaskFile}
            sx={{
              bgcolor: "#f6f6f6",
              borderRadius: 3,
              float: "right",
              cursor: "pointer",
              width: "38px",
              height: "38px",
            }}
            disableRipple
          >
            <DownloadIcon htmlColor="black"></DownloadIcon>
          </IconButton>
        </form>
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
