import { Grid, Stack, Typography, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Project } from './Overview';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import style from './overviewStyle';
interface IProps {
    project: Project
}

const ProjectCard: React.FC<IProps> = ({ project }) => {
    const finishedTasks = project.finishedTasks;
    const allTasks = project.tasks;
    const classes = style()();
    return (

        <Box>
            <Grid className="project-card">
                <Typography sx={{ fontWeight: "550" }}> {project.name} </Typography>
                <Box sx={{ color: "#00ACBA", mt: '1.8em', display: 'flex' }}>
                    <CheckBoxOutlinedIcon></CheckBoxOutlinedIcon>
                    <Typography sx={{ mt: '0.3em', ml: '5px', mr: '30px' }}>{finishedTasks}/{allTasks}</Typography>
                    <Box className={classes.root}>
                        <LinearProgress variant="determinate"
                            style={{ width: '10em', marginTop: 10 }} value={(project.finishedTasks / project.tasks) * 100} />
                    </Box>
                    <Typography sx={{ color: '#4B4B4B', ml: 1 }}> {(project.finishedTasks / project.tasks) * 100}%</Typography>
                </Box>


            </Grid >

        </Box >
    );
};

export default ProjectCard;
