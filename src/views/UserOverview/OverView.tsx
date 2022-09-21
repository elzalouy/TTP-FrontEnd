import "./overview.css";
import { Box, Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import UserName from "./UserName/Name";
import UserProjects from "./UserProjects/UserProjects";
import UserStatus from "./Status/StatusCard";
import UserTasks from "./UserTasks/UserTasks";
import { useDispatch } from "react-redux";
import UserNotifications from "./Notifications/Notifications";
import { RouteComponentProps, useHistory } from "react-router";
import ManagerNotifications from "./Notifications/ManagerNotifications";
import IMAGES from "../../assets/img/Images";
import { useAppSelector } from "../../models/hooks";
import { getUserInfo, logout, selectRole, selectUser } from "../../models/Auth";
import { selectSatistics } from "../../models/Statistics";
import { checkAuthToken } from "../../services/api";
import {
  ProjectsActions,
  selectAllProjects,
  selectTasks,
} from "src/models/Projects";
import { IOverview } from "src/types/views/Overview";

export const OverView: FC<IOverview> = (props) => {
  const dispatch = useDispatch();
  const role = useAppSelector(selectRole);
  const userName = useAppSelector(selectUser);
  const statistics = useAppSelector(selectSatistics);
  const { projects, loading } = useAppSelector(selectAllProjects);
  const tasks = useAppSelector(selectTasks);
  const user = useAppSelector(selectUser);
  const pathName = useHistory().location.pathname;
  console.log({ statistics });

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (checkAuthToken() && id) {
      dispatch(
        getUserInfo({
          id: id,
        })
      );
    } else dispatch(logout(true));
  }, [dispatch, props.history]);

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"normal"}
        direction={"row"}
        paddingX={{ xs: 2, lg: 5, md: 5, sm: 2 }}
        bgcolor={"#FAFAFB"}
      >
        <Grid
          item
          justifyContent="flex-start"
          alignItems="flex-start"
          paddingTop={{ xs: 10, sm: 10, md: 0, lg: 0 }}
          xs={12}
        >
          <Box
            sx={{
              width: "auto",
              display: "inline-flex",
            }}
          >
            <UserName
              loading={statistics.loading}
              name={
                userName?.user?.name === undefined
                  ? userName?.name
                  : userName?.user?.name
              }
            />
          </Box>
          <Typography
            color="#171725"
            paddingTop={7}
            paddingBottom={{ xs: 3, lg: 0, md: 0, sm: 3 }}
            variant="h5"
            fontSize={"24px"}
            fontWeight={"900"}
          >
            Overview
          </Typography>
        </Grid>
        <Grid
          direction="row"
          justifyContent={"flex-start"}
          alignItems="flex-start"
          container
        >
          <Grid
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            paddingTop={4}
            container
          >
            <>
              {role === "PM" ? (
                <>
                  <UserStatus
                    loading={statistics.loading}
                    user={role}
                    IconBgColor="#ECFDF1"
                    Icon={() => (
                      <img alt="1" src={IMAGES.overViewProjectsIcon} />
                    )}
                    pt={1.7}
                    title={"Number of projects"}
                    count={statistics.PM.projects?.length.toString()}
                  />
                  <UserStatus
                    loading={statistics.loading}
                    user={role}
                    IconBgColor="#EFEFFF"
                    Icon={() => <img src={IMAGES.overviewTasksIcon} alt="3" />}
                    pt={1.6}
                    title="Shared Tasks"
                    count={statistics.PM.sharedLength.toString()}
                  />
                  <UserStatus
                    loading={statistics.loading}
                    user={role}
                    IconBgColor="#FFF3EF"
                    Icon={() => <img src={IMAGES.overViewDeadline} alt="3" />}
                    pt={1.5}
                    title="Review Tasks"
                    count={statistics.PM.reviewLength.toString()}
                  />
                </>
              ) : (
                <>
                  <UserStatus
                    loading={statistics.loading}
                    user={role}
                    IconBgColor="#ECFDF1"
                    Icon={() => (
                      <img src={IMAGES.overViewProjectsIcon} alt="3" />
                    )}
                    pt={1.6}
                    title={"Task Board tasks"}
                    count={statistics.OM.taskBoardLength.toString()}
                  />
                  <UserStatus
                    loading={statistics.loading}
                    user={role}
                    IconBgColor="#FBF5E2"
                    Icon={() => <img alt="2" src={IMAGES.overviewProjects} />}
                    title="In Progress Tasks"
                    pt={1.9}
                    count={statistics.OM.inProgressLength.toString()}
                  />
                  <UserStatus
                    loading={statistics.loading}
                    user={role}
                    IconBgColor="#FFF3EF"
                    Icon={() => <img src={IMAGES.overViewDeadline} alt="3" />}
                    title="Review Tasks"
                    count={statistics.OM.reviewLength.toString()}
                    pt={1.8}
                    pb={5}
                  />
                </>
              )}
            </>
            <Grid
              item
              lg={4.5}
              md={12}
              sm={12}
              xs={12}
              justifyContent="center"
              alignItems="center"
              marginY={{ md: 4, sm: 4, xs: 4, lg: 0 }}
            >
              {role === "OM" ? (
                <ManagerNotifications {...props} />
              ) : (
                role === "PM" && <UserNotifications {...props} />
              )}
            </Grid>
          </Grid>
          <UserTasks
            pr={3}
            tasks={
              role === "OM" ? statistics.OM.inProgress : statistics.PM.shared
            }
            title={role === "OM" ? "Tasks In Progress" : "Shared Tasks"}
            img={IMAGES.OverviewInProgressTasksEmpty}
            caption="Stay focused and organized"
          />
          <UserTasks
            pl={3}
            tasks={
              role === "OM"
                ? statistics.OM.tasksCloseToDeadline
                : statistics.PM.tasksCloseToDeadline
            }
            title={"Tasks Close to Deadline"}
            img={IMAGES.OverviewCloseToDeadlineEmpty}
            caption={"Don't worry , You got this!"}
          />
          <UserProjects
            projects={
              role === "OM"
                ? statistics.OM.projectsCloseToDeadlines
                : statistics.PM.projectsCloseToDeadlines
            }
            {...props}
          />
        </Grid>
      </Grid>
    </>
  );
};
