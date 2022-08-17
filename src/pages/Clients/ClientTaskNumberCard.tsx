import { Grid, Typography } from '@mui/material';
import React, { FC } from 'react'
import { Status } from '../../interfaces/views/BoardView';

type Props = {
    title: string;
    getTasksByClientIdAndStatus: ((__status__: Status) => number);
    param: Status;
}

const ClientTaskNumberCard: FC<Props> = ({ title, getTasksByClientIdAndStatus, param }) => {
    return (
        <Grid item xs={5} style={{ textAlign: "center", flex: "1" }} flex={1}>
            <Typography
                sx={{ fontSize: 11 }}
                variant="caption"
                style={{ color: "#808191" }}
                className="counter-title"
            >
                {title}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
                {getTasksByClientIdAndStatus(param)}
            </Typography>
        </Grid>
    )
}

export default ClientTaskNumberCard