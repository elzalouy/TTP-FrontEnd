import { Typography } from "@mui/material";
import { FC } from "react";
import "../../clients.css";
import { ITaskNumber } from "src/types/views/Client";

const ClientTasksCounter: FC<ITaskNumber> = ({ title, param, count }) => {
  return (
    <div className="task-number-card">
      <Typography
        sx={{ fontSize: 12 }}
        variant="caption"
        className="counter-title-task"
      >
        {title}
      </Typography>
      <Typography className="task-number">{count}</Typography>
    </div>
  );
};

export default ClientTasksCounter;
