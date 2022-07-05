import { Grid, Stack, Typography } from "@mui/material";
import { Box, style } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import IMAGES from "../../../../assets/img/Images";
import TasksPopover from "../../../../coreUI/usable-component/Popovers/TasksPopover";
import { selectAllDepartments } from "../../../../redux/Departments";
import { useAppSelector } from "../../../../redux/hooks";
import {
  downloadAttachment,
  ProjectsActions,
} from "../../../../redux/Projects";
import {
  checkStatusAndSetBackground,
  checkStatusAndSetBorder,
} from "../../../../helpers/generalUtils";
import { selectAllMembers } from "../../../../redux/TechMember";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { toggleEditTaskPopup } from "../../../../redux/Ui";
import {
  Project,
  Task,
  TaskFile,
} from "../../../../interfaces/models/Projects";
import "swiper/css";
import "swiper/css/navigation";
import "./taskCard.css";
import TaskFiles from "./TaskFiles";
import { toast } from "react-toastify";
interface TaskCartProps {
  index: number;
  item: Task;
  project: Project | null | undefined;
  footerStyle: string;
  column?: any;
}

const TaskCard: React.FC<TaskCartProps> = ({
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
  const [error, setError] = useState({
    flag: false,
    url: "",
    trelloId: "",
  });
  const [taskImages, setTaskImages] = useState<any[]>();
  const [taskFiles, setTaskFiles] = useState<any[]>();

  /// set files
  useEffect(() => {
    let mimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
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
    //This useEffect runs when there is a flag for unauthorized image request and makes checks attachment status by calling the download action
    if (error.flag) {
      toast.clearWaitingQueue();
      dispatch(
        downloadAttachment({
          cardId: item?.cardId,
          attachmentId: error?.trelloId,
          //This property below disabled opening the attachment after validation
          openUrl: false,
        })
      );
    }
  }, [error.flag]);

  useEffect(() => {
    if (status !== "Not Started") {
      if (deadline === null || deadline === "") {
        setRemaningDays("Deadline is required");
        setDaysBgColor("#F1CBCC");
        setDaysColor("#FF0000");
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

  /* const handleImageError = (index: number) => {
    let fallback: Fallback = { flag: false, index: null };
    fallback.flag = true;
    fallback.index = index;
    return fallback;
  }; */

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

  const onViewTask = async () => {
    dispatch(ProjectsActions.onEditTask(item._id));
    dispatch(toggleEditTaskPopup("flex"));
    dispatch(ProjectsActions.onOpenTask(item));
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
              <Typography
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
                onClick={onViewTask}
              >
                {name}
              </Typography>
              {item.status !== "not clear" && item.status !== "cancled" && (
                <TasksPopover item={item} />
              )}
            </Stack>
            <Box onClick={onViewTask} sx={{ cursor: "pointer" }}>
              <Typography color={"#696974"}>
                {project?.projectManager?.name}
              </Typography>
            </Box>
            <Grid direction="row">
              {error.flag && (
                <div className="fallback-container">
                  <a href={error.url} className="login-link" target="_blank">
                    You need to be authorized to view this image. Click here to
                    Login.
                  </a>
                </div>
              )}
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
                        {taskImages.map((image, index) => {
                          if (!error.flag) {
                            return (
                              <SwiperSlide className="swiper-slide">
                                <img
                                  style={{
                                    width: "100%",
                                    height: 120,
                                    borderRadius: 8,
                                    marginTop: "10px",
                                  }}
                                  onLoad={() => {
                                    dispatch(
                                      downloadAttachment({
                                        cardId: item?.cardId,
                                        attachmentId: image?.trelloId,
                                        //This property below disabled opening the attachment after validation
                                        openUrl: false,
                                      })
                                    );
                                  }}
                                  onError={() => {
                                    setError({
                                      flag: true,
                                      url: image?.url,
                                      trelloId: image?.trelloId,
                                    });
                                  }}
                                  src={image?.url}
                                  alt="more"
                                />
                              </SwiperSlide>
                            );
                          }
                        })}
                        {taskImages.length > 1 && (
                          <>
                            <div ref={navigationPrevRef}>
                              <ArrowBackIosNewIcon
                                className="prev"
                                htmlColor="black"
                              />
                            </div>
                            <div ref={navigationNextRef}>
                              <ArrowForwardIosIcon className="next" />
                            </div>
                          </>
                        )}
                      </Swiper>
                    </>
                  )}
                  {/* stack files */}
                  <TaskFiles taskFiles={taskFiles} cardId={item.cardId} />
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
                            typeof remainingDays === "string" ||
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