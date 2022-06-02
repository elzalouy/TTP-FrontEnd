import { Stack, Typography } from "@mui/material";
import { Box, style } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import IMAGES from "../../assets/img/index";
import TasksPopover from "../../coreUI/usable-component/Popovers/TasksPopover";
import { selectAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import { Project, Task } from "../../redux/Projects";
import { selectAllMembers } from "../../redux/techMember";

import "./taskCard.css";
interface DataTypes {
  index: number;
  item: Task;
  project: Project | null | undefined;
  footerStyle: string;
  column?: any;
}

const TaskCard: React.FC<DataTypes> = ({
  item,
  index,
  project,
  column,
  footerStyle,
}) => {
  const techMembers = useAppSelector(selectAllMembers);
  const departments = useAppSelector(selectAllDepartments);
  const { _id, name, deadline, status, boardId, teamId } = item;
  const [data, setData] = useState<
    | {
        department?: string | undefined;
        member?: string | undefined;
      }
    | undefined
  >();
  const [remainingDays, setRemaningDays] = useState<any>(0);
  const [daysColor, setDaysColor] = useState("");
  const [daysBgColor, setDaysBgColor] = useState("");
  const [taskImages, setTaskImages] = useState<any[]>();

  useEffect(() => {
    let mimeTypes = ["image/png", "image/png", "image/jpeg", "image/svg"];
    let images = item.attachedFiles.filter((item) =>
      mimeTypes.includes(item.mimeType)
    );
    setTaskImages(images);
  }, []);

  useEffect(() => {
    if (status !== "Not Started") {
      if (deadline === null) {
        setRemaningDays("Deadline is required");
        setDaysBgColor("#E4DADC");
        setDaysColor("#2C2C2C");
      }
      const floatDays =
        (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24);
      const remainingDays = Math.round(floatDays);
      setRemaningDays(remainingDays);
      const daysColor =
        remainingDays <= 2
          ? "#FF0000"
          : remainingDays > 2 && remainingDays <= 5
          ? "#FF974A"
          : "#0079BF";
      setDaysColor(daysColor);
      const daysBgColor =
        remainingDays <= 2
          ? "#F1CBCC"
          : remainingDays > 2 && remainingDays <= 5
          ? "#FF974A1A"
          : "#DAE6EF";
      setDaysBgColor(daysBgColor);
    } else {
      setRemaningDays("Deadline is required");
      setDaysBgColor("#E4DADC");
      setDaysColor("#2C2C2C");
    }
    let newData = { ...data };
    newData.member = techMembers.techMembers.find(
      (member) => member._id === item.teamId
    )?.name;
    newData.department = departments.find(
      (item) => item.boardId === boardId
    )?.name;
    setData(newData);
  }, []);
  const checkStatusAndSetBorder = (status: string) => {
    if (status === "Not Started") {
      return "#9fa1ab1a solid 2px";
    } else if (status === "Not Clear") {
      return "#d2903456 solid 1px";
    } else if (status === "Review") {
      return "#0079bf solid 1px";
    } else if (status === "Done") {
      return "#00aaba4b solid 1px";
    } else if (status === "inProgress") {
      return "#ffc500 solid 1px";
    } else if (status === "Cancled") {
      return "#d2343441 solid 1px";
    } else if (status === "Shared") {
      return "#9fa1ab1a solid 2px";
    }
  };
  const checkStatusAndSetBackground = (status: string) => {
    if (status === "Not Started") {
      return "#F1F1F2";
    } else if (status === "Not Clear") {
      return "#f7f0e7";
    } else if (status === "Review") {
      return "#E1F3F5";
    } else if (status === "Done") {
      return "#E1F3F5";
    } else if (status === "inProgress") {
      return "#FBF5E2";
    } else if (status === "Cancled") {
      return "#F7E6E7";
    } else if (status === "Shared") {
      return "#F7E6E7";
    }
  };

  return (
    <Draggable index={index} draggableId={`${_id}`}>
      {(provided, snapshot) => {
        const afterDropStyle = {
          backgroundColor: checkStatusAndSetBackground(column?.value),
          border: checkStatusAndSetBorder(column?.value),
          ...provided.draggableProps.style,
        };
        return (
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="task-card"
            style={snapshot.isDragging ? afterDropStyle : {}}
          >
            <Stack
              className="task-card-header-not-clear"
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
              {item.status !== "not clear" && item.status !== "cancled" && (
                <TasksPopover item={item} />
              )}
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
                  src={taskImages ? taskImages[0]?.url : ""}
                  alt="more"
                />
                <Stack
                  direction="row"
                  marginTop="12px"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <img src={IMAGES.attachment} alt="more" />
                  <Typography style={{ paddingLeft: "5px" }}>
                    {item?.attachedFiles.length}
                  </Typography>{" "}
                  <Typography className="fileUpload">
                    {/* {item?.attachedFiles} */}
                  </Typography>
                </Stack>
              </>
            )}
            {item.status !== "cancled" ? (
              <>
                {item.status === "done" ? (
                  <>
                    <Stack
                      direction="row"
                      marginTop="12px"
                      justifyContent="flex-start"
                      alignItems="center"
                      className="aft-red"
                      sx={{
                        color: "#0079BF",
                        bgcolor: "#B4D6EB",
                      }}
                    >
                      <img src={IMAGES.scheduleOn} alt="more" />
                      <Typography style={{ paddingLeft: "5px" }}>
                        Done
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <>
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
                      {status !== "Not Started" && (
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
                      )}
                      {status !== "Not Started" ? (
                        <Typography
                          style={{ paddingLeft: "5px", fontSize: 14 }}
                        >
                          {remainingDays > 0
                            ? `${remainingDays} Days left`
                            : `${Math.abs(remainingDays)} Days ago`}
                        </Typography>
                      ) : (
                        <>
                          <img src={IMAGES.scheduleRed} alt="more" />
                          <Typography
                            style={{
                              paddingLeft: "5px",
                              fontSize: 14,
                              color: "#FF2E35",
                            }}
                          >
                            {remainingDays}
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </>
                )}
              </>
            ) : (
              <>
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
                  <Typography style={{ paddingLeft: "5px" }}>
                    Canceled
                  </Typography>
                </Stack>
              </>
            )}
            <Stack
              direction="row"
              height={"25px"}
              paddingTop="10px"
              marginY="10px"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              {data?.department && (
                <>
                  <Typography className={footerStyle} sx={{ fontSize: 14 }}>
                    {data.department}
                  </Typography>
                </>
              )}
              {data?.member && (
                <>
                  <img src={IMAGES.arrow} alt="more" />
                  <Typography
                    style={{ marginLeft: "10px", fontSize: 14 }}
                    className={footerStyle}
                  >
                    {data.member}
                  </Typography>
                </>
              )}
            </Stack>
          </Box>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
