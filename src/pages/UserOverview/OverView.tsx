import { Box, Grid, Typography, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  AssignmentOutlined as AssignmentIcon,
  Done as DoneIcon,
  Circle as DotIcon,
  DashboardOutlined as DashboardIcon,
} from "@mui/icons-material";
import UserName from "./Name";
import "./overview.css";
import UserProjects from "./UserProjects";
import UserStatus from "./StatusCard";
import UserTasks from "./UserTasks";
import { getAllClients } from "../../redux/Clients";
import { getPMs } from "../../redux/PM";
import { getAllDepartments } from "../../redux/Departments";
import { getAllCategories } from "../../redux/Categories";
import { getAllProjects, getAllTasks } from "../../redux/Projects";
import { getAllMembers } from "../../redux/techMember";
import { useDispatch } from "react-redux";
import UserNotifications from "./Notifications";
import { RouteComponentProps } from "react-router";
import ManagerNotifications from "./ManagerNotifications";
import IMAGES from "../../assets/img";
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
const OverView: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("operation manager");
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
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingTop={{ xs: 10, sm: 10, md: 0, lg: 0 }}
            paddingLeft={4}
            xs={12}
          >
            <Box
              sx={{
                width: "auto",
                display: "inline-flex",
              }}
            >
              <UserName loading={false} name="Ezat Elzalouy" />
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
            direction="row"
            justifyContent={"flex-start"}
            alignItems="flex-start"
            container
            paddingLeft={4}
          >
            <Grid item direction="column" xs={12} sm={12} lg={7.5} md={7.5}>
              <Grid
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                paddingTop={5}
                paddingRight={user === "project manager" ? 0 : "3%"}
                container
              >
                {user === "project manager" ? (
                  <>
                    <UserStatus
                      user={user}
                      IconBgColor="#ECFDF1"
                      Icon={() => <img alt="1" src={IMAGES.overviewCheck} />}
                      pt={1.7}
                      title={"Tasks Completed"}
                      count={"28"}
                      percent="- 8%"
                      percentColor="#260EFF"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#EFEFFF"
                      Icon={() => <img alt="2" src={IMAGES.overViewRevision} />}
                      pt={1.6}
                      title="New Tasks"
                      count="12"
                      percent="- 8%"
                      percentColor="#30CF47"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#FFF3EF"
                      Icon={() => <img src={IMAGES.overViewDeadline} alt="3" />}
                      pt={1.5}
                      title="Projects Completed"
                      count="12"
                      percent="- 8%"
                      percentColor="#FF2E35"
                    />
                  </>
                ) : (
                  <>
                    <UserStatus
                      user={user}
                      IconBgColor="#ECFDF1"
                      Icon={() => <img src={IMAGES.overViewDone} alt="3" />}
                      pt={1.5}
                      title={"Organization Capacity"}
                      count={"28"}
                      percent="- 8%"
                      percentColor="#260EFF"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#ECFDF1"
                      Icon={() => <img src={IMAGES.overViewRevision} alt="3" />}
                      pt={1.5}
                      title="Revision Tasks"
                      count="12"
                      percent="- 8%"
                      percentColor="#30CF47"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#FFF3EF"
                      Icon={() => <img src={IMAGES.overViewDeadline} alt="3" />}
                      pt={1.5}
                      title="Meeting deadlines"
                      count="12"
                      percent="- 8%"
                      percentColor="#FF2E35"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#FBF5E2"
                      Icon={() => <img src={IMAGES.overviewProjects} alt="3" />}
                      pt={1.7}
                      title="Current Active Projects"
                      count="12"
                      percent="- 8%"
                      percentColor="#FFC500"
                    />
                  </>
                )}
              </Grid>
              <Grid
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                paddingTop={2.5}
                paddingRight={3.5}
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
              {user === "operation manager" ? (
                <ManagerNotifications {...props} />
              ) : (
                <UserNotifications {...props} />
              )}
            </Grid>
          </Grid>
          <Grid
            xs={11.5}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingLeft={4}
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
