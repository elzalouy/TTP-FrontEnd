import "./overview.css";
import { Box, Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import UserName from "../../coreUI/usable-component/Overview/Name";
import UserProjects from "../../coreUI/usable-component/Overview/UserProjects";
import UserStatus from "../../coreUI/usable-component/Overview/StatusCard";
import UserTasks from "../../coreUI/usable-component/Overview/UserTasks";
import { useDispatch } from "react-redux";
import UserNotifications from "./Notifications/Notifications";
import { RouteComponentProps } from "react-router";
import ManagerNotifications from "./Notifications/ManagerNotifications";
import IMAGES from "../../assets/img/Images";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppSelector } from "../../redux/hooks";
import { getUserInfo, selectRole, selectUser } from "../../redux/Auth";
import { selectSatistics } from "../../redux/Statistics";
import { checkAuthToken } from "../../services/api";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
const OverView: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const role = useAppSelector(selectRole);
  const userName = useAppSelector(selectUser);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const statistics = useAppSelector(selectSatistics);

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (checkAuthToken() && id) {
      dispatch(
        getUserInfo({
          id: id,
        })
      );
    } else props.history.push("/login");
  }, [dispatch, props.history]);
  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"normal"}
        direction={"row"}
        marginX={SM ? 2 : 5}
        bgcolor={"#FAFAFB"}
      >
        <Grid
          item
          // direction="row"
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
              loading={false}
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
            justifyContent={MD ? "space-between" : "flex-start"}
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
                    count={statistics.OM.inProgress?.length.toString()}
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
              md={4.5}
              sm={12}
              xs={12}
              marginY={2}
              justifyContent="center"
              alignItems="center"
            >
              {role === "OM" ? (
                <ManagerNotifications {...props} />
              ) : (
                <UserNotifications {...props} />
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            paddingRight={2}
            justifyContent="flex-start"
            alignItems="flex-start"
            marginBottom={5}
          >
            {role === "OM" ? (
              <UserTasks
                tasks={statistics.OM.inProgress}
                title={"Tasks In Progress"}
              />
            ) : (
              <UserTasks tasks={statistics.PM.shared} title={"Shared Tasks"} />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            paddingLeft={SM ? 0 : 2}
            // direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            marginBottom={5}
          >
            {role === "OM" && (
              <UserTasks
                tasks={statistics.OM.tasksCloseToDeadline}
                title={"Tasks Close to Deadline"}
              />
            )}
            {role == "PM" && (
              <UserTasks
                tasks={statistics.PM.tasksCloseToDeadline}
                title={"Tasks Close to Deadline"}
              />
            )}
          </Grid>
          <Grid
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingTop={2.5}
            overflow="scroll"
            xs={12}
          >
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
      </Grid>
    </>
  );
};

export default OverView;
