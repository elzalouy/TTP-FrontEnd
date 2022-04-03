import { Box, Grid, Typography, Stack } from "@mui/material";
import { FC, useEffect } from "react";
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
const OverView: FC = (props) => {
  const dispatch = useDispatch();
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
            paddingTop={5}
            paddingLeft={5}
            xs={12}
          >
            <Box
              sx={{
                width: "auto",
                height: 20,
                display: "inline-flex",
              }}
            >
              <UserName loading={false} name="Ezat Elzalouy" />
            </Box>
            <Typography
              color="#171725"
              paddingTop={7}
              variant="h4"
              component="h4"
            >
              Overview
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            direction="row"
            justifyContent={"flex-start"}
            alignItems="flex-start"
            container
          >
            <Grid item direction="column" xs={8}>
              <Grid
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                paddingTop={5}
                paddingLeft={5}
                container
              >
                <Grid xs={3.9} item marginRight={1}>
                  <UserStatus
                    IconBgColor="#EFEFFF"
                    Icon={() => (
                      <DoneIcon fontSize={"small"} htmlColor="#260EFF" />
                    )}
                    title={"Tasks Completed"}
                    count={"28"}
                    percent="- 8%"
                    percentColor="#260EFF"
                  />
                </Grid>
                <Grid xs={3.9} item marginRight={1}>
                  <UserStatus
                    IconBgColor="#ECFDF1"
                    Icon={() => (
                      <AssignmentIcon fontSize={"small"} htmlColor="#30CF47" />
                    )}
                    title="New Tasks"
                    count="12"
                    percent="- 8%"
                    percentColor="#30CF47"
                  />
                </Grid>
                <Grid xs={3.9} item>
                  <UserStatus
                    IconBgColor="#FFF3EF"
                    Icon={() => (
                      <DashboardIcon fontSize={"small"} htmlColor="#FF2E35" />
                    )}
                    title="Projects Completed"
                    count="12"
                    percent="- 8%"
                    percentColor="#FF2E35"
                  />
                </Grid>
              </Grid>
              <Grid
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                paddingTop={5}
                paddingLeft={5}
                marginRight={1.2}
              >
                <UserProjects />
              </Grid>
            </Grid>
            <Grid marginTop={5} item xs={3.8}>
              <UserNotifications />
            </Grid>
          </Grid>
          <Grid
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingLeft={5}
            marginRight={5}
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
