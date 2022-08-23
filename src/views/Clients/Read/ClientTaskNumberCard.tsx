import { Typography } from "@mui/material";
import { FC } from "react";
import "./clients.css";
import { Status } from "../../../types/views/BoardView";

type Props = {
  title: string;
  getTasksByClientIdAndStatus: (__status__: Status) => number;
  param: Status;
};

const ClientTaskNumberCard: FC<Props> = ({
  title,
  getTasksByClientIdAndStatus,
  param,
}) => {
  return (
    <div className="task-number-card">
      <Typography
        sx={{ fontSize: 12}}
        variant="caption"
        className="counter-title-task"
      >
        {title}
      </Typography>
      <Typography className="task-number">
        {getTasksByClientIdAndStatus(param)}
      </Typography>
    </div>
  );
};

export default ClientTaskNumberCard;
