import { Box, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import PopUp from "src/coreUI/components/Popovers/Popup/PopUp";
import { selectAllProjects } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import TaskHeader from "./TaskHeader";
import TaskTimeLine from "./TaskTimeLine";
import TaskBasics from "./TaskBasics";

interface TaskDetailsProps {
  show: string;
  setShow: any;
}

const TaskDetails: FC<TaskDetailsProps> = ({ show, setShow }) => {
  const { openTaskDetails: task } = useAppSelector(selectAllProjects);

  return (
    <PopUp
      width="80vw"
      height="90vh"
      show={show}
      color="#ffffff"
      styles={{ padding: 0 }}
      sx={{
        padding: 0,
        borderRadius: 5,
        overflow: {
          xs: "scroll !important",
          sm: "scorll !important",
          md: "scroll !important",
          lg: "hidden !important",
          xl: "hidden !important",
        },
      }}
    >
      <Grid container height={"100%"}>
        <TaskHeader setShow={setShow} task={task} />
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          sx={{
            height: "100%",
            pb: 10,
          }}
        >
          <TaskBasics />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          sx={{
            background: "#fafafa",
            height: "100%",
            pb: 10,
          }}
        >
          <TaskTimeLine movements={task.movements} />
        </Grid>
      </Grid>
    </PopUp>
  );
};

export default TaskDetails;
