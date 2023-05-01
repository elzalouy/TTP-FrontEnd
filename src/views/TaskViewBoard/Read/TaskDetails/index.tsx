import { Grid } from "@mui/material";
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
      show={show}
      color="#ffffff"
      styles={{ padding: 0 }}
      sx={{
        height: "90vh",
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
      containerSx={{
        height: "100vh",
      }}
    >
      <Grid container height={{ lg: "100%", xl: "100%" }}>
        <TaskHeader setShow={setShow} task={task} />
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          sx={{
            height: "100%",
          }}
        >
          <TaskBasics />
        </Grid>
        <TaskTimeLine movements={task.movements} />
      </Grid>
    </PopUp>
  );
};

export default TaskDetails;
