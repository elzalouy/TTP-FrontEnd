import { Grid, Stack, Typography } from "@mui/material";
import { Box, style } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import IMAGES from "../../assets/img/index";
import TasksPopover from "../../coreUI/usable-component/Popovers/TasksPopover";
import { selectAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import { downloadAttachment, Project, Task } from "../../redux/Projects";
import {
  checkStatusAndSetBackground,
  checkStatusAndSetBorder,
} from "../../helpers/generalUtils";
import { selectAllMembers } from "../../redux/techMember";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import "swiper/css";
import "swiper/css/navigation";

import "./taskCard.css";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
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
  const [taskFiles, setTaskFiles] = useState<any[]>();

  /// set files
  useEffect(() => {
    let mimeTypes = ["image/png", "image/png", "image/jpeg", "image/svg"];
    if (item?.attachedFiles && item?.attachedFiles?.length > 0) {
      let images = item.attachedFiles.filter((item) =>
        mimeTypes.includes(item.mimeType)
      );
      setTaskImages(images);
      let others = item?.attachedFiles.filter(
        (item) => !mimeTypes.includes(item.mimeType)
      );
      setTaskFiles(others);
    }
  }, [item]);
  useEffect(() => {
    if (status !== "Not Started") {
      if (deadline === null || deadline === "") {
        setRemaningDays("Deadline is required");
        setDaysBgColor("#E4DADC");
        setDaysColor("#2C2C2C");
      } else {
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
      }
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

  const getRemainingDays = (day: number) => {
    if (day > 0) {
      return `${day} Days Left`;
    }
    if (day === 0) {
      return "Today";
    } else {
      return `${Math.abs(day)} Days ago`;
    }
  };
  const onDownload = (file: any) => {
    dispatch(
      downloadAttachment({ cardId: item.cardId, attachmentId: file?.trelloId })
    );
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
            <Grid direction="row">
              {item?.attachedFiles?.length > 0 && (
                <>
                  {taskImages && taskImages.length > 0 && (
                    <>
                      <Swiper
                        spaceBetween={5}
                        centeredSlides={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        navigation={{
                          prevEl: navigationPrevRef.current,
                          nextEl: navigationNextRef.current,
                        }}
                        onSwiper={(swiper: any) => {
                          setTimeout(() => {
                            swiper.params.navigation.prevEl =
                              navigationPrevRef.current;
                            swiper.params.navigation.nextEl =
                              navigationNextRef.current;
                          });
                        }}
                        onBeforeInit={(swiper: any) => {
                          swiper.params.navigation.prevEl = navigationPrevRef;
                          swiper.params.navigation.nextEl = navigationNextRef;
                        }}
                        modules={[Autoplay, Navigation]}
                        className="swiper"
                      >
                        {taskImages.map((item) => (
                          <SwiperSlide className="swiper-slide">
                            <img
                              style={{
                                width: "100%",
                                height: 120,
                                borderRadius: 8,
                                marginTop: "10px",
                              }}
                              src={item?.url}
                              alt="more"
                            />
                          </SwiperSlide>
                        ))}
                        <div ref={navigationPrevRef}>
                          <ArrowBackIosNewIcon
                            className="prev"
                            htmlColor="black"
                          />
                        </div>
                        <div ref={navigationNextRef}>
                          <ArrowForwardIosIcon className="next" />
                        </div>
                      </Swiper>
                    </>
                  )}
                  <Stack
                    direction="row"
                    marginTop="12px"
                    justifyContent="flex-start"
                    alignItems="center"
                    overflow={"hidden"}
                    width="100%"
                  >
                    <img src={IMAGES.attachment} alt="more" />
                    <Typography
                      style={{ paddingLeft: "5px", color: "#92929D" }}
                    >
                      {item?.attachedFiles.length}
                    </Typography>
                    <Box
                      flexDirection={"row"}
                      sx={{
                        display: "inline-flex",
                        width: "100%",
                        overflowX: "scroll",
                      }}
                    >
                      {taskFiles &&
                        taskFiles.length > 0 &&
                        taskFiles.map((item) => (
                          <>
                            <Typography
                              variant={"body2"}
                              onClick={() => onDownload(item)}
                              className="fileUpload"
                            >
                              {item?.name}
                            </Typography>
                          </>
                        ))}
                    </Box>
                  </Stack>
                </>
              )}
            </Grid>
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
                            typeof remainingDays === "string"
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
                          style={
                            typeof remainingDays === "string"
                              ? {
                                  paddingLeft: "5px",
                                  fontSize: 14,
                                  color: "#FF2E35",
                                }
                              : { paddingLeft: "5px", fontSize: 14 }
                          }
                        >
                          {typeof remainingDays === "string"
                            ? remainingDays
                            : getRemainingDays(remainingDays)}
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
