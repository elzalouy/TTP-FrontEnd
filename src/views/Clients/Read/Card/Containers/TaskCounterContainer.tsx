import { FC, useEffect, useState } from "react";
import ClientTasksCounter from "../Data/TaskNumber";
import "../../clients.css";
import { ITaskCounterContainer } from "src/types/views/Client";
import ScrollContainer from "react-indiana-drag-scroll";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects } from "src/models/Projects";

const TaskCounterContainer: FC<ITaskCounterContainer> = ({
  id,
  shared,
  inProgress,
  done,
}) => {
  return (
    <ScrollContainer
      className="scroll-container counter-container-tasks"
      horizontal
      nativeMobileScroll
      vertical={false}
    >
      <div className="counter-container-scroll-wrapper">
        <ClientTasksCounter
          title="Shared Tasks"
          param={"Shared"}
          count={shared}
        />
        <ClientTasksCounter
          title="In Progress Tasks"
          param={"In Progress"}
          count={inProgress}
        />
        <ClientTasksCounter title="Done Tasks" param={"Done"} count={done} />
      </div>
    </ScrollContainer>
  );
};

export default TaskCounterContainer;
