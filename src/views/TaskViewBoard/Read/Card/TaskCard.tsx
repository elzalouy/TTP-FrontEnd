import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import IMAGES from "../../../../assets/img/Images";
import TasksPopover from "../../../../coreUI/components/Popovers/TasksPopover";
import { selectAllDepartments } from "../../../../models/Departments";
import { useAppSelector } from "../../../../models/hooks";
import {
  ProjectsActions,
  selectTasks,
  selectUploadLoading,
} from "../../../../models/Projects";
import {
  checkStatusAndSetBackground,
  checkStatusAndSetBorder,
} from "../../../../helpers/generalUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { toggleEditTaskPopup } from "../../../../models/Ui";
import { Project, Task, TaskFile } from "../../../../types/models/Projects";
import "swiper/css";
import "swiper/css/navigation";
import "./taskCard.css";
import TaskFiles from "./TaskFiles";
import { useLocation } from "react-router";

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
  const location = useLocation();
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const departments = useAppSelector(selectAllDepartments);
  const allTasks = useAppSelector(selectTasks);
  const uploadingFiles = useAppSelector(selectUploadLoading);
  const { _id, name, deadline, status, boardId } = item;
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
  const [taskImages, setTaskImages] = useState<TaskFile[]>([]);
  const [taskFiles, setTaskFiles] = useState<any[]>([]);

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
    let department = departments.find((dep) => dep.boardId === item.boardId);
    let member = department?.teams.find((mem) => mem._id === item.teamId);
    setData({ department: department?.name, member: member?.name });
  }, [item, departments]);

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
        const remainingDays = Math.round(floatDays + 1);
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
    let dep = departments.find((item) => item.boardId === boardId);
    newData.department = departments.find(
      (item) => item.boardId === boardId
    )?.name;
    newData.member = dep?.teams?.find(
      (member) => member._id === item.teamId
    )?.name;
    setData(newData);
  }, [item]);

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
  const setImageError = (index: any) => {
    let images = [...taskImages];
    let img = { ...images[index] };
    img.error = true;
    images[index] = img;
    setTaskImages([...images]);
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
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={"100%"}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  width: "80%",
                }}
                noWrap={true}
                onClick={onViewTask}
              >
                {name}
              </Typography>
              <TasksPopover item={item} />
            </Stack>
            <Box onClick={onViewTask} sx={{ cursor: "pointer" }}>
              <Typography color={"#696974"}>
                {project?.projectManager?.name}
              </Typography>
            </Box>
            <Grid direction="row">
              {uploadingFiles &&
                uploadingFiles?.id === _id &&
                uploadingFiles?.loading === true && (
                  <Skeleton
                    width={"100%"}
                    height={"120px"}
                    variant="rectangular"
                    sx={{ borderRadius: 2 }}
                  />
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
                          }, 500);
                        }}
                        onBeforeInit={(swiper: any) => {
                          swiper.params.navigation.prevEl = navigationPrevRef;
                          swiper.params.navigation.nextEl = navigationNextRef;
                        }}
                        onInit={(swiper) => {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          // eslint-disable-next-line no-param-reassign
                          swiper.params.navigation.prevEl =
                            navigationPrevRef.current;
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          // eslint-disable-next-line no-param-reassign
                          swiper.params.navigation.nextEl =
                            navigationNextRef.current;
                          swiper.navigation.init();
                          swiper.navigation.update();
                        }}
                        modules={[Autoplay, Navigation]}
                        className="swiper"
                      >
                        <>
                          {taskImages.map((image, index) => {
                            if (image?.error === true)
                              return (
                                <div className="fallback-container">
                                  <a
                                    href={image.url}
                                    className="login-link"
                                    target="_blank"
                                  >
                                    you are not authorized on trelloId to see
                                    this attachment. Click here to sign in first
                                  </a>
                                </div>
                              );
                            return (
                              <SwiperSlide
                                key={index}
                                className={`swiper-slide`}
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    height: 120,
                                    borderRadius: 8,
                                    marginTop: "10px",
                                  }}
                                  referrerPolicy="origin"
                                  onError={(e) => {
                                    setImageError(index);
                                  }}
                                  srcSet={image?.url + "/?"}
                                  src={image?.url + "/?"}
                                  alt="more"
                                />
                              </SwiperSlide>
                            );
                          })}
                        </>

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
                  {/* stack files */}
                  <TaskFiles taskFiles={taskFiles} cardId={item.cardId} />
                </>
              )}
            </Grid>
            {item.status !== "Cancled" ? (
              <>
                {item.status === "Done" ? (
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
