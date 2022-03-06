import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import IMAGES from "../../assets/img/index";
import "./taskCard.css";
interface DataTypes {
  index: number;
  item: {
    id: string;
    taskName: string;
    projectManager: string;
    time: string;
    ttpTeam: string;
    team: string;
    header: string;
    timeline: string;
    footer: string;
    scheduleIcon: string;
    picUrl?: string;
  };
}

const taskCard: React.FC<DataTypes> = ({ item, index }) => {
  const {
    id,
    taskName,
    projectManager,
    ttpTeam,
    team,
    time,
    header,
    footer,
    timeline,
    scheduleIcon,
    picUrl,
  } = item;
  return (
    <Draggable index={index} draggableId={id}>
      {(provided, snapshot) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task-card"
        >
          <Stack
            className={header}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: "bold" }}>Task Name</Typography>
            <Typography style={{ padding: "12px" }}>
              <img src={IMAGES.moreGrey} alt="more" />
            </Typography>
          </Stack>
          <Box>Project manager name</Box>
          {picUrl ? (
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
          ) : time === "Canceled" ? (
            <Typography className={timeline} style={{ paddingLeft: "5px" }}>
              {time}
            </Typography>
          ) : time === "After 2 day" ? (
            <Stack
              direction="row"
              marginTop="12px"
              justifyContent="flex-start"
              alignItems="center"
              className="aft-red "
            >
              <img src={IMAGES.scheduleRed} alt="more" />
              <Typography style={{ paddingLeft: "5px" }}>{time}</Typography>
            </Stack>
          ) : (
            <Stack
              direction="row"
              width="100px"
              marginTop="12px"
              justifyContent="flex-start"
              alignItems="center"
              className={timeline}
            >
              <img src={scheduleIcon} alt="more" />
              <Typography style={{ paddingLeft: "5px" }}>{time}</Typography>
            </Stack>
          )}

          <Stack
            direction="row"
            marginTop="15px"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography className={footer}>TPP project Team</Typography>
            <img src={IMAGES.arrow} alt="more" />
            <Typography style={{ marginLeft: "10px" }} className={footer}>
              Al-shaqran team
            </Typography>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default taskCard;
