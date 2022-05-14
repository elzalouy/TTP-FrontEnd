import "./overview.css";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import UserName from "./Name";
import UserProjects from "./UserProjects";
import UserStatus from "./StatusCard";
import UserTasks from "./UserTasks";
import { useDispatch } from "react-redux";
import UserNotifications from "./Notifications";
import { RouteComponentProps } from "react-router";
import ManagerNotifications from "./ManagerNotifications";
import IMAGES from "../../assets/img";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppSelector } from "../../redux/hooks";
import { selectRole, selectUser } from "../../redux/Auth";
import { getPMs } from "../../redux/PM";
import { getAllProjects, getAllTasks } from "../../redux/Projects";
import { selectAllSatistics } from "../../redux/Statistics";
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
  const statistics = useAppSelector(selectAllSatistics);
  const SM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(getPMs(null));
    dispatch(getAllProjects(null));
    dispatch(getAllTasks(null));
  }, []);

  return (
    <>
      <Box width={"100%"} height={"100%"} bgcolor={"#FAFAFB"}>
        <Grid
          justifyContent={"space-between"}
          alignItems={"normal"}
          direction="row"
          container
        >
          <Grid
            item
            // direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingTop={{ xs: 10, sm: 10, md: 0, lg: 0 }}
            paddingLeft={SM ? 2 : 4}
            xs={12}
          >
            <Box
              sx={{
                width: "auto",
                display: "inline-flex",
              }}
            >
              <UserName loading={false} name={userName?.user?.name === undefined ? userName?.name : userName?.user?.name} />
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
            xs={12}
            item
            direction="row"
            justifyContent={"flex-start"}
            alignItems="flex-start"
            container
            paddingLeft={SM ? 0 : 4}
          >
            <Grid item xs={12} sm={12} lg={7.5} md={7.5}>
              <Grid
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                paddingTop={5}
                paddingRight={SM ? 0 : (role === "PM" ? 0 : "3%")}
                container
              >
                {role === "PM" ? (
                  <>
                    <Grid
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      paddingRight={"3%"}
                      container
                    >
                      <Grid item xs={3} sm={2} lg={3} md={3} marginRight={"5%"}>
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={200}
                          sx={{ borderRadius: 2 }}
                        />
                      </Grid>
                      <Grid item xs={3} sm={2} lg={3} md={3} marginRight={"5%"}>
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={200}
                          sx={{ borderRadius: 2 }}
                        />
                      </Grid>
                      <Grid item xs={3} sm={2} lg={3} md={3} marginRight={"5%"}>
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={200}
                          sx={{ borderRadius: 2 }}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    {role === "PM" && (
                      <>
                        <UserStatus
                          loading={statistics.loading}
                          user={role}
                          IconBgColor="#ECFDF1"
                          Icon={() => (
                            <img alt="1" src={IMAGES.overviewCheck} />
                          )}
                          pt={1.7}
                          title={"Tasks Completed"}
                          count={statistics?.NoCompletedTasks?.toString()}
                          percent={statistics?.PercentCompletedTasks?.toString()}
                          percentColor="#260EFF"
                        />
                        <UserStatus
                          loading={statistics.loading}
                          user={role}
                          IconBgColor="#EFEFFF"
                          Icon={() => (
                            <img alt="2" src={IMAGES.overViewRevision} />
                          )}
                          pt={1.6}
                          title="New Tasks"
                          count={statistics?.PercentNoNewTasks?.toString()}
                          percent={statistics?.PercentNoNewTasks?.toString()}
                          percentColor="#30CF47"
                        />
                        <UserStatus
                          loading={statistics.loading}
                          user={role}
                          IconBgColor="#FFF3EF"
                          Icon={() => (
                            <img src={IMAGES.overViewDeadline} alt="3" />
                          )}
                          pt={1.5}
                          title="Projects Completed"
                          count={statistics?.PercentCompletedProjects?.toString()}
                          percent={statistics?.PercentCompletedProjects?.toString()}
                          percentColor="#FF2E35"
                        />
                      </>
                    )}
                    {role === "OM" && (
                      <>
                        <UserStatus
                          loading={statistics.loading}
                          user={role}
                          IconBgColor="#ECFDF1"
                          Icon={() => <img src={IMAGES.overViewDone} alt="3" />}
                          pt={1.5}
                          title={"Organization Capacity"}
                          count={"0"}
                          percent="0"
                          percentColor="#260EFF"
                        />
                        <UserStatus
                          loading={statistics.loading}
                          user={role}
                          IconBgColor="#EFF1FF"
                          Icon={() => (
                            <img src={IMAGES.overViewRevision} alt="3" />
                          )}
                          pt={1.5}
                          title="Revision Tasks"
                          count="0"
                          percent="0"
                          percentColor="#30CF47"
                        />
                        <UserStatus
                          loading={statistics.loading}
                          user={role}
                          IconBgColor="#FFF3EF"
                          Icon={() => (
                            <img src={IMAGES.overViewDeadline} alt="3" />
                          )}
                          pt={1.5}
                          title="Meeting deadlines"
                          count="0"
                          percent="0"
                          percentColor="#FF2E35"
                        />
                        <UserStatus
                          loading={statistics.loading}
                          user={role}
                          IconBgColor="#FBF5E2"
                          Icon={() => (
                            <img src={IMAGES.overviewProjects} alt="3" />
                          )}
                          pt={1.7}
                          title="Current Active Projects"
                          count={statistics.NoCurruntProjects?.toString()}
                          percent={statistics.PercentCurrentProjects?.toString()}
                          percentColor="#FFC500"
                        />
                      </>
                    )}
                  </>
                )}
              </Grid>
              <Grid
                // direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                paddingTop={2.5}
                overflow="scroll"
                paddingRight={SM ? 0 : 3.5}
              >
                <UserProjects {...props} />
              </Grid>
            </Grid>
            <Grid
              marginTop={5}
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
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
            xs={11.5}
            // direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingLeft={SM ? 0 : 4}
            marginBottom={5}
          >
            <UserTasks />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OverView;
