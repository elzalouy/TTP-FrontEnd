import { Box, Typography, CircularProgress, Divider, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Projects } from './Overview'
import CircleIcon from '@mui/icons-material/Circle';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
);

interface IProps {
    projects: Projects
}

const TaskStatics: React.FC<IProps> = ({ projects }) => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const options = {

        responsive: true,
        scales: {
            y: {
                beginAtZero: true,

                ticks: {
                    max: 200,
                    min: 0,
                    stepSize: 50
                },
                gridLines: {
                    display: false,
                },
            },

        }
    };
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'At deadline',
                data: [30, 80, 73, 100, 200, 50],
                backgroundColor: '#00ACBA',
                borderRadius: 10,
                barPercentage: 0.5,
                categoryPercentage: 0.4,
            },
            {
                label: 'In progress',
                data: [80, 20, 130, 200, 100, 70],
                backgroundColor: '#00B7E1',
                borderRadius: 10,
                barPercentage: 0.5,
                categoryPercentage: 0.4,
            },
        ]
    };


    return (
        <Box className="task-statics" >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h4"
                    style={{
                        paddingBottom: "10px",
                        fontWeight: '550'
                    }}
                >Tasks</Typography>
                <Box sx={{ display: 'flex' }}>

                    <CircleIcon fontSize="small" sx={{ color: '#00ACBA', mr: 1 }}></CircleIcon>
                    <Typography sx={{ mr: 4 }}>
                        At deadline
                    </Typography>
                    <CircleIcon fontSize="small" sx={{ color: '#00B7E1', mr: 1 }}></CircleIcon>
                    <Typography sx={{ mr: 1 }}>
                        In progress
                    </Typography>
                </Box>
            </Box>
            <Box className="task-chart">
                <Bar data={data} options={options} />

            </Box>
        </Box >
    )
}
export default TaskStatics;
