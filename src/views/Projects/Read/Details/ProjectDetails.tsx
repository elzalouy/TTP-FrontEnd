import { Box, Card, Grid, Tab, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import IMAGES from "src/assets/img/Images";
import PopUp from "src/coreUI/components/Popovers/Popup/PopUp";
import { Project, Task } from "src/types/models/Projects";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useAppSelector } from "src/models/hooks";
import { selectProjectsState } from "src/models/Projects";
import VerifiedIcon from "@mui/icons-material/Verified";
import { selectAllClients } from "src/models/Clients";
import { selectManagers } from "src/models/Managers";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { getDifBetweenDates } from "src/helpers/generalUtils";
import StarIcon from "@mui/icons-material/Star";
import ProjectTasksChart from "./ProjectTasksChart";

interface ProjectDetailsProps {
  show: string;
  project?: Project;
  setShow: any;
}
type ProjectState = "UnHealthy" | "Verified" | "Not Verified";
type State = {
  project?: Project;
  tasks?: Task[];
  unHealthyTasks?: Task[];
  healthyTasks?: Task[];
  projectState?: ProjectState;
  PLT?: string;
};

const ProjectDetails: FC<ProjectDetailsProps> = (props) => {
  const { allTasks } = useAppSelector(selectProjectsState);
  const clients = useAppSelector(selectAllClients);
  const PMs = useAppSelector(selectManagers);
  const [value, setValue] = React.useState("1");

  const [state, setState] = useState<State>();

  useEffect(() => {
    if (props.project && allTasks) {
      const projectTasks = allTasks?.filter(
        (item) => item.projectId === props?.project?._id
      );
      if (projectTasks && projectTasks.length > 0) {
        const unHealthyTasks = projectTasks?.filter(
          (item) =>
            item?.movements?.filter((item) => item.status === "Not Clear")
              .length > 0
        );
        const healthyTasks = projectTasks?.filter((item) =>
          item?.movements?.filter((move) => move.status === "Not Clear")
        );
        let isUnHealthy = (unHealthyTasks.length / projectTasks.length) * 100;
        let projectState: ProjectState =
          projectTasks.length === 0
            ? "Not Verified"
            : isUnHealthy >= 40
            ? "UnHealthy"
            : "Verified";

        let PLT = props?.project?.startDate
          ? getDifBetweenDates(
              new Date(props?.project?.startDate),
              new Date(new Date(Date.now()))
            )
          : null;
        setState({
          ...state,
          healthyTasks: healthyTasks,
          unHealthyTasks: unHealthyTasks,
          tasks: projectTasks,
          projectState: projectState,
          project: props.project,
          PLT: PLT?.remainingDays ? `${PLT?.remainingDays} days` : "0",
        });
      }
    }
  }, [allTasks, props.project]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const cssTab = (tabIndex: string) => {
    return {
      width: "auto",
      borderRadius: 0,
      textTransform: "none",
      fontWeight: "bold",
      color: tabIndex === value ? "#303030" : "#9B9EA7",
      padding: 0,
      alignItems: "baseline",
      margin: 0,
      justifyContent: "flex-end",
      paddingBottom: 1.2,
      fontSize: "14px",
    };
  };
  return (
    <PopUp show={props.show} width="75vw" height="90vh">
      <Grid container direction={"row"} width={"100%"}>
        <Grid item xs={12} direction={"row"} justifyContent={"space-between"}>
          <div style={{ position: "relative" }}>
            <div
              className="closeIconContainer"
              onClick={() => {
                setValue("1");
                setState({});
                props.setShow("none");
              }}
            >
              <img
                className="closeIcon"
                width="9"
                height="9"
                src={IMAGES.closeicon}
                alt="closeIcon"
              />
            </div>
          </div>
          <Typography fontWeight={"Bold"} fontSize={18} color={"#303030"}>
            {props?.project?.name}
          </Typography>
        </Grid>
        <Box display={"-webkit-inline-box"} pt={0.5}>
          {state?.projectState === "Verified" && (
            <VerifiedIcon
              htmlColor="#00ACBA"
              sx={{ pr: 1, fontSize: "24px" }}
            />
          )}
          {state?.projectState === "Not Verified" && (
            <DangerousIcon
              htmlColor="#667085"
              sx={{ pr: 1, fontSize: "24px" }}
            />
          )}
          {state?.projectState === "UnHealthy" && (
            <DangerousIcon htmlColor="red" sx={{ pr: 1, fontSize: "24px" }} />
          )}
          <Typography
            fontSize={14}
            textAlign={"justify"}
            mt={0.5}
            color={
              state?.projectState === "Not Verified"
                ? "#667085"
                : state?.projectState === "UnHealthy"
                ? "red"
                : "#00ACBA"
            }
          >
            {state?.projectState}
          </Typography>
        </Box>
        <Grid item xs={12}>
          <TabContext value={value.toString()}>
            <Box>
              <TabList
                sx={cssTabs}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Summary" value="1" sx={cssTab("1")} />
                <Tab label="Insights" value="2" sx={cssTab("2")} />
              </TabList>
            </Box>
            <TabPanel sx={{ px: 0 }} value="1">
              <Grid container p={0} bgcolor={"#F1F1F4"} borderRadius={2}>
                <Grid item xs={12} borderBottom={"1px solid #e0e0e0"} p={2}>
                  <Typography fontWeight={"bold"} fontSize={"16px"}>
                    General Details
                  </Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"}>ID</Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"} color="#667085">
                    {props?.project?._id}
                  </Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"}>Name</Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"} color="#667085">
                    {props?.project?.name}
                  </Typography>
                </Grid>{" "}
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"}>Client Name</Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"} color="#667085">
                    {
                      clients.find(
                        (item) => item._id === props?.project?.clientId
                      )?.clientName
                    }
                  </Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"}>Project Manager</Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"} color="#667085">
                    {
                      PMs.find(
                        (item) => item._id === props?.project?.projectManager
                      )?.name
                    }
                  </Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"}>Deadline</Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"} color="#667085">
                    {props?.project?.projectDeadline
                      ? new Date(props?.project?.projectDeadline).toDateString()
                      : "Not Set"}
                  </Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"}>Start Date</Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"} color="#667085">
                    {props?.project?.startDate
                      ? new Date(props?.project?.startDate).toDateString()
                      : "Not Set"}
                  </Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"}>
                    Associate Project Manager
                  </Typography>
                </Grid>
                <Grid item xs={6} p={2} justifyContent={"flex-start"}>
                  <Typography fontSize={"14px"} color="#667085">
                    {
                      PMs.find(
                        (item) =>
                          item._id === props?.project?.associateProjectManager
                      )?.name
                    }
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0 }}>
              <Grid container py={1}>
                <Grid container xs={12} sm={12} md={6} lg={4} xl={4} mt={2}>
                  <Grid item xs={12} mb={1}>
                    <Card sx={smallCardSx}>
                      <Typography
                        fontSize="14px"
                        color={"#667085"}
                        fontWeight={"bold"}
                        mb={2}
                      >
                        Project Lead Time
                      </Typography>
                      <Typography fontSize="16px" fontWeight={"bold"}>
                        {state?.PLT}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} mb={1}>
                    <Card sx={smallCardSx}>
                      <Typography
                        fontSize="14px"
                        color={"#667085"}
                        fontWeight={"bold"}
                        mb={2}
                      >
                        UnClear Tasks
                      </Typography>
                      <Typography fontSize="16px" sx={{ fontWeight: "bold" }}>
                        {`${
                          state?.tasks?.filter(
                            (item) => item.status === "Not Clear"
                          ).length
                        } Tasks` || `0 Tasks`}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={8} xl={8} mt={2}>
                  <Card sx={smallCardSx}>
                    <Grid
                      container
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={5}
                        xl={5}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%",
                        }}
                      >
                        <Box display={"inline-flex"}>
                          <StarIcon fontSize="large" htmlColor="#f1c40f" />
                          <Typography
                            fontSize="20px"
                            color={"black"}
                            fontWeight={"bold"}
                            ml={2}
                            mt={1}
                            justifyContent={"center"}
                          >
                            {state?.tasks?.length ?? 0} Tasks
                          </Typography>
                        </Box>
                        <Typography
                          fontSize={"14px"}
                          color="#667085"
                          fontWeight={"bold"}
                          mt={2}
                        >
                          Total tasks on this project in each status
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
                        <ProjectTasksChart
                          project={props.project}
                          tasks={state?.tasks}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </PopUp>
  );
};

export default ProjectDetails;

const smallCardSx = {
  bgcolor: "#F1F1F4",
  padding: 2,
  borderRadius: 2,
  mr: 2,
  boxShadow: "#eaecf0 0px 0px 1px, #1d293914 0px 1px 2px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const cssTabs = {
  color: "#303030",
  borderBottom: 1,
  borderColor: "#0000000A",
};
