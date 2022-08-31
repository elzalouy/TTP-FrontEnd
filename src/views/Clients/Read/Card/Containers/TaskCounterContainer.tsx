import { FC } from "react";
import ClientTaskNumberCard from "../Data/TaskNumber";
import "../../clients.css";
import { ITaskCounterContainer } from "src/types/views/Client";
import ScrollContainer from 'react-indiana-drag-scroll'

const TaskCounterContainer: FC<ITaskCounterContainer> = ({ id }) => {
  return (
    <ScrollContainer
      className="scroll-container counter-container-tasks"
      horizontal
      nativeMobileScroll
      vertical={false}
    >
      <div className="counter-container-scroll-wrapper">
        <ClientTaskNumberCard title="Shared Tasks" param={"Shared"} _id={id} />
        <ClientTaskNumberCard
          title="In Progress Tasks"
          param={"inProgress"}
          _id={id}
        />
        <ClientTaskNumberCard title="Done Tasks" param={"Done"} _id={id} />
      </div>
    </ScrollContainer>
  );
};

export default TaskCounterContainer;
