import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import TasksPopover from "src/coreUI/components/Popovers/TasksPopover";
import IMAGES from "../../../../assets/img/Images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import TaskFiles from "./TaskFiles";
import { ProjectsActions, selectUploadLoading } from "src/models/Projects";
import { toggleEditTaskPopup } from "src/models/Ui";
import { useAppSelector } from "src/models/hooks";
import { useDispatch } from "react-redux";
import { Task, TaskFile } from "src/types/models/Projects";
import { selectAllDepartments } from "src/models/Departments";

const TaskInfo = memo(
  (props: {
    task: Task;
    projectManagerName: string | null | undefined;
    footerStyle: string;
    department?: string;
    member?: string;
  }) => {
    const dispatch = useDispatch();

    const { task, projectManagerName, footerStyle } = props;
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

    const [remainingDays, setRemaningDays] = useState<any>(0);
    const [daysColor, setDaysColor] = useState("");
    const [daysBgColor, setDaysBgColor] = useState("");
    const [taskImages, setTaskImages] = useState<TaskFile[]>([]);
    const [taskFiles, setTaskFiles] = useState<any[]>([]);
    const uploadingFiles = useAppSelector(selectUploadLoading);

    useEffect(() => {
      let mimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
      if (task?.attachedFiles && task?.attachedFiles?.length > 0) {
        let images = task.attachedFiles.filter((task) =>
          mimeTypes.includes(task.mimeType)
        );
        setTaskImages(images);
        let others = task?.attachedFiles.filter(
          (item) => !mimeTypes.includes(item.mimeType)
        );
        setTaskFiles(others);
      }
    }, [task.attachedFiles]);

    useEffect(() => {
      if (task.status !== "Not Started") {
        if (task.deadline === null || task.deadline === "") {
          setRemaningDays("Deadline is required");
          setDaysBgColor("#F1CBCC");
          setDaysColor("#FF0000");
        } else {
          const floatDays =
            (new Date(task.deadline).getTime() - new Date().getTime()) /
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
    }, [task]);

    const onViewTask = async () => {
      dispatch(ProjectsActions.onEditTask(task._id));
      dispatch(toggleEditTaskPopup("flex"));
      dispatch(ProjectsActions.onOpenTask(task));
    };
    const setImageError = (index: any) => {
      let images = [...taskImages];
      let img = { ...images[index] };
      img.error = true;
      images[index] = img;
      setTaskImages([...images]);
    };

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

    return (
      <>
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
            {task.name}
          </Typography>
          <TasksPopover item={task} />
        </Stack>
        <Box onClick={onViewTask} sx={{ cursor: "pointer" }}>
          <Typography color={"#696974"}>{projectManagerName}</Typography>
        </Box>
        <Grid direction="row">
          {uploadingFiles &&
            uploadingFiles?.id === task._id &&
            uploadingFiles?.loading === true && (
              <Skeleton
                width={"100%"}
                height={"120px"}
                variant="rectangular"
                sx={{ borderRadius: 2 }}
              />
            )}
          {task?.attachedFiles?.length > 0 && (
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
                                you are not authorized on trelloId to see this
                                attachment. Click here to sign in first
                              </a>
                            </div>
                          );
                        return (
                          <SwiperSlide key={index} className={`swiper-slide`}>
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
                      <ArrowBackIosNewIcon className="prev" htmlColor="black" />
                    </div>
                    <div ref={navigationNextRef}>
                      <ArrowForwardIosIcon className="next" />
                    </div>
                  </Swiper>
                </>
              )}
              {/* stack files */}
              <TaskFiles taskFiles={taskFiles} cardId={task.cardId} />
            </>
          )}
        </Grid>
        {task.status !== "Cancled" ? (
          <>
            {task.status === "Done" ? (
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
                  <Typography style={{ paddingLeft: "5px" }}>Done</Typography>
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
                  {task.status !== "Not Started" && (
                    <img
                      src={
                        typeof remainingDays === "string" || remainingDays <= 2
                          ? IMAGES.scheduleRed
                          : remainingDays > 2 && remainingDays <= 5
                          ? IMAGES.scheduleOrange
                          : IMAGES.scheduleNotClear
                      }
                      alt="more"
                    />
                  )}
                  {task.status !== "Not Started" ? (
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
              <Typography style={{ paddingLeft: "5px" }}>Canceled</Typography>
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
          {props.department && (
            <>
              <Typography className={footerStyle} sx={{ fontSize: 14 }}>
                {props.department}
              </Typography>
            </>
          )}
          {props.member && (
            <>
              <img src={IMAGES.arrow} alt="more" />
              <Typography
                style={{ marginLeft: "10px", fontSize: 14 }}
                className={footerStyle}
              >
                {props.member}
              </Typography>
            </>
          )}
        </Stack>
      </>
    );
  }
);

export default TaskInfo;
