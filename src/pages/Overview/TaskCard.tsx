import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import IMAGES from "../../assets/img/index";
import { Task } from './Overview'
import TaskDrop from './../../components/dropdowns/TaskDrop'
interface Props {
    task: Task
}
const TaskCard: React.FC<Props> = ({ task }) => {

    return (

        <Box className="task-overview-card">
            <Box className="task-card-header-shared">
                <Typography sx={{ fontWeight: 'bold' }}> {task.taskName} </Typography>
                <TaskDrop></TaskDrop>
            </Box>
            <Typography sx={{ color: '#566573' }}>{task.projectManager}</Typography>
            <Box className="task-card-timeline-shared" sx={{ width: '110px' }}>
                <img
                    style={{ width: "20px" }}
                    src={IMAGES.scheduleNotClear}
                    alt="more"
                />
                <Typography sx={{ margin: '2px 0 2px 2px' }}>{task.time}</Typography>
            </Box>

            <Stack
                direction="row"
                marginTop="15px"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Typography className="task-card-footer">TPP project Team</Typography>
                <img src={IMAGES.arrow} style={{ marginLeft: '10px' }} alt="more" />
                <Typography className="task-card-footer" style={{ marginLeft: "10px" }} >
                    Al-shaqran team
                </Typography>
            </Stack>
        </Box>
    );
}

export default TaskCard