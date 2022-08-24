import { FC } from "react";
import { Status } from "../../../types/views/BoardView";
import ClientTaskNumberCard from "./ClientTaskNumberCard";
import "./clients.css";

type Props = {
  getTasksByClientIdAndStatus: (__status__: Status) => number;
};

const CounterContainer: FC<Props> = ({ getTasksByClientIdAndStatus }) => {

  return (
    <div className="counter-container-tasks bounce clientScrollbar"
    >
      <div className='counter-container-scroll-wrapper'>
        <ClientTaskNumberCard
          title="Shared Tasks"
          getTasksByClientIdAndStatus={getTasksByClientIdAndStatus}
          param={"Shared"}
        />
        <ClientTaskNumberCard
          title="In Progress Tasks"
          getTasksByClientIdAndStatus={getTasksByClientIdAndStatus}
          param={"inProgress"}
        />
        <ClientTaskNumberCard
          title="Done Tasks"
          getTasksByClientIdAndStatus={getTasksByClientIdAndStatus}
          param={"Done"}
        />
      </div>
    </div>
  );
};

export default CounterContainer;
