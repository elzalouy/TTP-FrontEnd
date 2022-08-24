import { Typography } from "@mui/material";
import { FC } from "react";
import "../../clients.css";
import { Status } from "../../../../../types/views/BoardView";
import { useAppSelector } from "src/models/hooks";
import { selectAllProjects, selectTasks } from "src/models/Projects";
import { getTasksByClientIdAndStatus } from "src/helpers/generalUtils";

type Props = {
  title: string;
  param: Status;
  _id: string
};

const ClientTaskNumberCard: FC<Props> = ({
  title,
  param,
  _id
}) => {

  const projects = useAppSelector(selectAllProjects);
  const tasks = useAppSelector(selectTasks);
  const taskNumber = getTasksByClientIdAndStatus(param, projects, tasks, _id)

  return (
    <div className="task-number-card">
      <Typography
        sx={{ fontSize: 12 }}
        variant="caption"
        className="counter-title-task"
      >
        {title}
      </Typography>
      <Typography className="task-number">
        {taskNumber}
      </Typography>
    </div>
  );
};

export default ClientTaskNumberCard;
