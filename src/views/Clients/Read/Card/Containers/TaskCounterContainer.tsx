import { FC } from "react";
import ClientTaskNumberCard from "../Data/TaskNumber";
import "../../clients.css";

type Props = {
  id: string;
};

const TaskCounterContainer: FC<Props> = ({ id }) => {
  return (
    <div className="counter-container-tasks bounce clientScrollbar">
      <div className="counter-container-scroll-wrapper">
        <ClientTaskNumberCard title="Shared Tasks" param={"Shared"} _id={id} />
        <ClientTaskNumberCard
          title="In Progress Tasks"
          param={"inProgress"}
          _id={id}
        />
        <ClientTaskNumberCard title="Done Tasks" param={"Done"} _id={id} />
      </div>
    </div>
  );
};

export default TaskCounterContainer;