import { Typography } from '@mui/material'
import React, { FC } from 'react'
import { Grid } from '@mui/material'
import { Status } from '../../interfaces/views/BoardView'
import ClientTaskNumberCard from './ClientTaskNumberCard'

type Props = {
    getTasksByClientIdAndStatus: ((__status__: Status) => number)
}

const CounterContainer: FC<Props> = ({ getTasksByClientIdAndStatus }) => {
    return (
        <Grid
            container
            className="counter-container"
            justifyContent={"space-between"}
            alignItems="center"
            marginTop={1}
        >
            <ClientTaskNumberCard title="Shared Tasks" getTasksByClientIdAndStatus={getTasksByClientIdAndStatus} param={"Shared"} />
            <ClientTaskNumberCard title="Done Tasks" getTasksByClientIdAndStatus={getTasksByClientIdAndStatus} param={"Done"} />
            <ClientTaskNumberCard title="In Progress Tasks" getTasksByClientIdAndStatus={getTasksByClientIdAndStatus} param={"inProgress"} />
        </Grid>
    )
}

export default CounterContainer