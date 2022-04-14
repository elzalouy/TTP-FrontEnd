import { Box, Grid, Typography, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  AssignmentOutlined as AssignmentIcon,
  Done as DoneIcon,
  Circle as DotIcon,
  DashboardOutlined as DashboardIcon,
} from "@mui/icons-material";
import UserName from "../../components/Overview/Name";
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
interface Props {
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
  match: RouteComponentProps["match"];
}
const OverView: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("project manager");
  useEffect(() => {
    dispatch(getAllClients(null));
    dispatch(getPMs(null));
    dispatch(getAllDepartments(null));
    dispatch(getAllCategories(null));
    dispatch(getAllProjects(null));
    dispatch(getAllMembers(null));
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
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingTop={{ xs: 10, sm: 10, md: 4, lg: 4 }}
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
              variant="h4"
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
                      IconBgColor="#EFEFFF"
                      Icon={() => (
                        <DoneIcon fontSize={"small"} htmlColor="#260EFF" />
                      )}
                      title={"Tasks Completed"}
                      count={"28"}
                      percent="- 8%"
                      percentColor="#260EFF"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#ECFDF1"
                      Icon={() => (
                        <AssignmentIcon
                          fontSize={"small"}
                          htmlColor="#30CF47"
                        />
                      )}
                      title="New Tasks"
                      count="12"
                      percent="- 8%"
                      percentColor="#30CF47"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#FFF3EF"
                      Icon={() => (
                        <DashboardIcon fontSize={"small"} htmlColor="#FF2E35" />
                      )}
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
                      IconBgColor="#EFEFFF"
                      Icon={() => (
                        <DoneIcon fontSize={"small"} htmlColor="#260EFF" />
                      )}
                      title={"Tasks Completed"}
                      count={"28"}
                      percent="- 8%"
                      percentColor="#260EFF"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#ECFDF1"
                      Icon={() => (
                        <AssignmentIcon
                          fontSize={"small"}
                          htmlColor="#30CF47"
                        />
                      )}
                      title="New Tasks"
                      count="12"
                      percent="- 8%"
                      percentColor="#30CF47"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#FFF3EF"
                      Icon={() => (
                        <DashboardIcon fontSize={"small"} htmlColor="#FF2E35" />
                      )}
                      title="Projects Completed"
                      count="12"
                      percent="- 8%"
                      percentColor="#FF2E35"
                    />
                    <UserStatus
                      user={user}
                      IconBgColor="#FFF3EF"
                      Icon={() => (
                        <DashboardIcon fontSize={"small"} htmlColor="#FF2E35" />
                      )}
                      title="Projects Completed"
                      count="12"
                      percent="- 8%"
                      percentColor="#FF2E35"
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
              <UserNotifications />
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
