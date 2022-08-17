import { Typography } from '@mui/material';
import { FC } from 'react'
import "./clients.css"
import { Status } from '../../interfaces/views/BoardView';

type Props = {
    title: string;
    getTasksByClientIdAndStatus: ((__status__: Status) => number);
    param: Status;
}

const ClientTaskNumberCard: FC<Props> = ({ title, getTasksByClientIdAndStatus, param }) => {
    return (
        <div className="task-number-card">
            <Typography
                sx={{ fontSize: 12,fontWeight:"600 !important" }}
                variant="caption"
                style={{ color: "black" }}
                className="counter-title"
            >
                {title}
            </Typography>
            <Typography className="task-number">
                {getTasksByClientIdAndStatus(param)}
            </Typography>
        </div>
    )
}

export default ClientTaskNumberCard