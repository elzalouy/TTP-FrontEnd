import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import IMAGES from "../../assets/img/index";
import { useAppSelector } from "../../redux/hooks";
import { Project, Task } from "../../redux/Projects";
import { selectAllMembers } from "../../redux/techMember";

import "./taskCard.css";
interface DataTypes {
  index: number;
  item: Task;
  project: Project | null | undefined;
  footerStyle: string;
}

const TaskCard: React.FC<DataTypes> = ({
  item,
  index,
  project,
  footerStyle,
}) => {
  const techMembers = useAppSelector(selectAllMembers);
  const { _id, name, deadline } = item;
  const floatDays =
    (new Date(deadline).getTime() - new Date().getTime()) /
    (1000 * 60 * 60 * 24);

  const remainingDays = Math.round(floatDays);
  const daysColor =
    remainingDays <= 2
      ? "#FF0000"
      : remainingDays > 2 && remainingDays <= 5
      ? "#FF974A"
      : "#0079BF";
  const daysBgColor =
    remainingDays <= 2
      ? "#F1CBCC"
      : remainingDays > 2 && remainingDays <= 5
      ? "#FF974A1A"
      : "#DAE6EF";
  return (
    <Draggable index={index} draggableId={`${_id}`}>
      {(provided, snapshot) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task-card"
        >
          <Stack
            className="task-card-header-not-clear"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
            <Typography style={{ padding: "12px" }}>
              <img src={IMAGES.moreGrey} alt="more" />
            </Typography>
          </Stack>
          <Box>
            <Typography color={"#696974"}>
              {project?.projectManager?.name}
            </Typography>
          </Box>
          {item.attachedFiles && (
            <>
              <img
                style={{ width: "100%", marginTop: "10px" }}
                src={IMAGES.picTask}
                alt="more"
              />
              <Stack
                direction="row"
                marginTop="12px"
                justifyContent="flex-start"
                alignItems="center"
              >
                <img src={IMAGES.attachment} alt="more" />
                <Typography style={{ paddingLeft: "5px" }}>1</Typography>{" "}
                <Typography className="fileUpload">
                  {item?.attachedFiles}
                </Typography>
              </Stack>
            </>
          )}
          {/* {picUrl ? (
            <>
              <img
                style={{ width: "100%", marginTop: "10px" }}
                src={IMAGES.picTask}
                alt="more"
              />{" "}
              <Stack
                direction="row"
                marginTop="12px"
                justifyContent="flex-start"
                alignItems="center"
              >
                <img src={IMAGES.attachment} alt="more" />
                <Typography style={{ paddingLeft: "5px" }}>1</Typography>{" "}
                <Typography className="fileUpload">TTP Project.pdf</Typography>{" "}
              </Stack>
              <Stack
                direction="row"
                marginTop="12px"
                justifyContent="flex-start"
                alignItems="center"
                className="onTime"
              >
                <img src={IMAGES.scheduleOn} alt="more" />
                <Typography style={{ paddingLeft: "5px" }}>
                  On time
                </Typography>{" "}
              </Stack>
            </>
          )  */}
          {/* {status === "cancled" ? (
            <Typography
              className={"task-card-timeline-not-clear"}
              style={{ paddingLeft: "5px" }}
            >
              {status}
            </Typography>
          ) : status === "inProgress" ? (
            <Stack
              direction="row"
              marginTop="12px"
              justifyContent="flex-start"
              alignItems="center"
              className="aft-red "
            >
              <img src={IMAGES.scheduleRed} alt="more" />
              <Typography style={{ paddingLeft: "5px" }}>{status}</Typography>
            </Stack>
          ) : (
            <Stack
              direction="row"
              width="100px"
              marginTop="12px"
              justifyContent="flex-start"
              alignItems="center"
              className={"task-card-timeline-not-clear"}
            >
              <img src={IMAGES.scheduleNotClear} alt="more" />
              <Typography style={{ paddingLeft: "5px" }}>{status}</Typography>
            </Stack>
          )} */}
          {item.status !== "cancled" ? (
            <Stack
              direction="row"
              marginTop="12px"
              justifyContent="flex-start"
              alignItems="center"
              className="aft-red"
              sx={{
                color: daysColor,
                bgcolor: daysBgColor,
              }}
            >
              <img
                src={
                  remainingDays <= 2
                    ? IMAGES.scheduleRed
                    : remainingDays > 2 && remainingDays <= 5
                    ? IMAGES.scheduleOrange
                    : IMAGES.scheduleNotClear
                }
                alt="more"
              />
              <Typography style={{ paddingLeft: "5px", fontSize: 14 }}>
                {remainingDays > 0 ? `${remainingDays} Days left` : "Late"}
              </Typography>
            </Stack>
          ) : (
            <Stack
              direction="row"
              marginTop="12px"
              justifyContent="flex-start"
              alignItems="center"
              className="aft-red"
              sx={{
                color: "#B04632",
                bgcolor: "#ECDAD7",
              }}
            >
              <img src={IMAGES.scheduleRed} alt="more" />
              <Typography style={{ paddingLeft: "5px" }}>Canceled</Typography>
            </Stack>
          )}
          <Stack
            direction="row"
            marginTop="15px"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography className={footerStyle} sx={{ fontSize: 14 }}>
              Assigned To
            </Typography>
            <img src={IMAGES.arrow} alt="more" />
            <Typography
              style={{ marginLeft: "10px", fontSize: 14 }}
              className={footerStyle}
            >
              {
                techMembers.techMembers.find(
                  (member) => member._id === item.memberId
                )?.name
              }
            </Typography>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default TaskCard;
