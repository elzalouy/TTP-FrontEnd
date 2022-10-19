import "./overview.css";
import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import UserName from "./UserName/Name";
import UserProjects from "./UserProjects/UserProjects";
import UserStatus from "./Status/StatusCard";
import UserTasks from "./UserTasks/UserTasks";
import UserNotifications from "./Notifications/Notifications";
import ManagerNotifications from "./Notifications/ManagerNotifications";
import IMAGES from "../../assets/img/Images";
import { useAppSelector } from "../../models/hooks";
import { getUserInfo, logout, selectRole, selectUser } from "../../models/Auth";
import { selectSatistics } from "../../models/Statistics";
import { IOverview } from "src/types/views/Overview";

export const OverView: FC<IOverview> = (props) => {
  const role = useAppSelector(selectRole);
  const user = useAppSelector(selectUser);
  const statistics = useAppSelector(selectSatistics);

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"normal"}
        direction={"row"}
        bgcolor={"#FAFAFB"}
      >
        <Grid item justifyContent="flex-start" alignItems="flex-start" xs={12}>
          <Box
            sx={{
              width: "auto",
              display: "inline-flex",
            }}
          >
            <UserName loading={statistics.loading} name={user?.name} />
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
              lg={4.8}
              md={12}
              sm={12}
              xs={12}
              justifyContent="center"
              alignItems="center"
              marginY={{ md: 4, sm: 4, xs: 4, lg: 0 }}
            >
              {role === "PM" ? (
                <UserNotifications {...props} />
              ) : (
                <ManagerNotifications {...props} />
              )}
            </Grid>
          </Grid>
          <UserTasks
            pr={3}
            tasks={
              role === "PM" ? statistics.PM.shared : statistics.OM.inProgress
            }
            title={role === "PM" ? "Shared Tasks" : "Tasks In Progress"}
            img={IMAGES.OverviewInProgressTasksEmpty}
            caption="Stay focused & organized"
          />
          <UserTasks
            pl={3}
            tasks={
              role === "PM"
                ? statistics.PM.tasksCloseToDeadline
                : statistics.OM.tasksCloseToDeadline
            }
            title={"Tasks Close to Deadline"}
            img={IMAGES.OverviewCloseToDeadlineEmpty}
            caption={"Don't be worried, you got this!"}
          />
          <UserProjects
            projects={
              role === "PM"
                ? statistics.PM.projectsCloseToDeadlines
                : statistics.OM.projectsCloseToDeadlines
            }
            {...props}
          />
        </Grid>
      </Grid>
    </>
  );
};
