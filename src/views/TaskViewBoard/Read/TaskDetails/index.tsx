import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import PopUp from "src/coreUI/components/Popovers/Popup/PopUp";
import { selectAllProjects } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import TaskHeader from "./TaskHeader";
import TaskTimeLine from "./TaskTimeLine";
import TaskBasics from "./TaskBasics";
import TaskFooter from "./TaskFooter";
import { selectSideMenuToggle } from "src/models/Ui";
import { getTaskJournies } from "src/helpers/generalUtils";
import { TaskMovement } from "src/types/models/Projects";
import _ from "lodash";

interface TaskDetailsProps {
  show: string;
  setShow: any;
}

type TaskJournies = TaskMovement[][];

const TaskDetails: FC<TaskDetailsProps> = ({ show, setShow }) => {
  const { openTaskDetails: task } = useAppSelector(selectAllProjects);
  const isOpen = useAppSelector(selectSideMenuToggle);

  const [state, setState] = useState<{
    journies: TaskJournies;
    selected?: TaskMovement[];
    selectedIndex?: number;
  }>({
    journies: [],
  });
  // build a use effect to calculate the journies once the component is rendered once.

  React.useEffect(() => {
    let State = { ...state };
    let journies = getTaskJournies(task).journies.map((item) => item.movements);
    State.journies = journies;
    State.selected = State.journies[0];
    State.selectedIndex = 0;
    setState(State);
  }, [task]);

  const onSelectJourney = (value: number) => {
    setState({
      ...state,
      selected: state.journies[value - 1],
      selectedIndex: value - 1,
    });
  };

  console.log({ state });

  return (
    <PopUp
      show={show}
      color="#ffffff"
      styles={{ padding: 0, position: "relative" }}
      maxWidthSize="80vw"
      width="80vw"
      sx={{
        height: "95vh",
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
        height: "95vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        height={{ lg: "100%", xl: "100%" }}
        overflow={"hidden"}
        position={"relative"}
      >
        <TaskHeader setShow={setShow} task={task} />
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          sx={{
            height: "90%",
            overflowY: "scroll",
            paddingBottom: "5%",
          }}
        >
          <TaskBasics
            journeyIndex={state.selectedIndex ?? 0}
            journiesLength={state.journies.length}
            task={task}
            movements={state.selected ?? []}
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          sx={{
            background: "#fafafa",
            height: "90%",
            alignContent: "flex-start",
            paddingBottom: "7%",
            pl: 3,
          }}
        >
          <TaskTimeLine
            journeyIndex={state.selectedIndex ?? 0}
            journiesLength={state.journies.length}
            movements={state.selected ?? []}
            allMovementsOfTask={task.movements}
          />
        </Grid>
        <Grid
          sx={{
            position: "fixed",
            bottom: "2%",
            width: "80vw",
            p: 2,
            borderTop: "1px solid #9fa1ab1a",
            background: "white",
            borderRadius: "0px 0px 20px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          item
        >
          <TaskFooter
            journies={state.journies.length}
            onSelectJourney={onSelectJourney}
          />
        </Grid>
      </Grid>
    </PopUp>
  );
};

export default TaskDetails;
