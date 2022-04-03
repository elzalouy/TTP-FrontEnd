import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import IMAGES from "../../assets/img/index";
import { Task } from "../../redux/Projects";
import "./taskCard.css";
interface DataTypes {
  index: number;
  item: Task;
}

const taskCard: React.FC<DataTypes> = ({ item, index }) => {
  const { _id, name, status, deadline, start } = item;

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
          <Box>Project manager name</Box>
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
          <Stack
            direction="row"
            marginTop="12px"
            justifyContent="flex-start"
            alignItems="center"
            className="aft-red"
          >
            <img src={IMAGES.scheduleRed} alt="more" />
            <Typography style={{ paddingLeft: "5px" }}>
              {new Date(deadline).toDateString()}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            marginTop="15px"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography className={"task-card-footer-not-clear"}>
              TPP project Team
            </Typography>
            <img src={IMAGES.arrow} alt="more" />
            <Typography
              style={{ marginLeft: "10px" }}
              className={"task-card-footer-not-clear"}
            >
              Al-shaqran team
            </Typography>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default taskCard;
