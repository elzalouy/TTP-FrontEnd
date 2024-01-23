import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import PopUp from "src/coreUI/components/Popovers/Popup/PopUp";
import { selectAllProjects, selectProjectsState } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import TaskHeader from "./TaskHeader";
import TaskTimeLine from "./TaskTimeLine";
import TaskBasics from "./TaskBasics";
import TaskFooter from "./TaskFooter";
import { selectSideMenuToggle } from "src/models/Ui";
import { getTaskJournies } from "src/helpers/generalUtils";
import { TaskMovement } from "src/types/models/Projects";
import _ from "lodash";
import { ITaskInfo, Journey, Journies } from "src/types/views/Statistics";
import { selectAllCategories } from "src/models/Categories";
import { selectPMs } from "src/models/Managers";
import { selectAllDepartments } from "src/models/Departments";

interface TaskDetailsProps {
  show: string;
  setShow: any;
}

type stateType = {
  taskInfo?: ITaskInfo;
  taskJournies?: { id: string; name: string; journies: Journies };
  journies?: Journies;
  selectedJourney?: Journey;
  selectedIndex?: number;
};
const initialState: stateType = {
  taskInfo: undefined,
  journies: undefined,
  selectedIndex: undefined,
  taskJournies: undefined,
  selectedJourney: undefined,
};

const TaskDetails: FC<TaskDetailsProps> = ({ show, setShow }) => {
  const projects = useAppSelector(selectAllProjects);
  const categories = useAppSelector(selectAllCategories);
  const managers = useAppSelector(selectPMs);
  const departments = useAppSelector(selectAllDepartments);
  const { openTaskDetails: task } = useAppSelector(selectProjectsState);
  const [state, setState] = useState<stateType>(initialState);

  const onClose = (value: string) => {
    setState(initialState);
    setShow(value);
  };

  React.useEffect(() => {
    let State = { ...state };
    let client = projects.find((i) => i._id === task.projectId)?.name;
    let category = categories.find((c) => c._id === task.categoryId);
    let subCategory = category?.subCategoriesId.find(
      (s) => s._id === task.subCategoryId
    );
    let project = projects.find((p) => p._id === task.projectId);
    let manager = managers.find((m) => m._id === project?.projectManager);
    let department = departments.find((d) => d.boardId === task.boardId);
    let team = department?.teams.find((t) => t._id === task.teamId);
    let taskInfo: ITaskInfo = {
      ...task,
      teamName: team?.name,
      clientName: client,
      projectName: project?.name,
      categoryName: category?.category,
      subCategoryName: subCategory?.subCategory,
      projectManagerName: manager?.name,
    };
    let taskJournies = getTaskJournies(taskInfo);
    State.taskInfo = taskInfo;
    State.taskJournies = taskJournies;
    State.journies = taskJournies.journies;
    State.selectedJourney = taskJournies.journies[0];
    State.selectedIndex = 0;
    setState(State);
  }, [task, show]);

  const onSelectJourney = (index: number) => {
    setState({
      ...state,
      selectedJourney: state.journies ? state.journies[index] : undefined,
      selectedIndex: index,
    });
  };

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
        <TaskHeader
          setShow={onClose}
          taskInfo={state.taskInfo}
          Journey={state.selectedJourney}
        />
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
            journiesLength={state?.journies?.length ?? 0}
            task={state.taskInfo}
            journey={state.selectedJourney}
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
            journey={state.selectedJourney}
            taskInfo={state.taskInfo}
            journies={state.taskJournies}
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
            journies={state.journies?.length ?? 0}
            onSelectJourney={onSelectJourney}
            movements={task.movements}
          />
        </Grid>
      </Grid>
    </PopUp>
  );
};

export default TaskDetails;
