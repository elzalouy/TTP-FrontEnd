import { Box, Typography, CircularProgress, LinearProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import IMAGES from "../../assets/img";
import ProjectCard from './ProjectCard'
import TaskCard from "./TaskCard";
import "./Overview.css";
import ProjectStatics from "./ProjectStatics";
import TaskStatics from "./TaskStatics";

type Props = {
    id: string

};
export interface Project {
    id?: string,
    name: string,
    tasks: number,
    finishedTasks: number
}
export interface Projects {
    id?: string,
    allProjects: number,
    notStarted: number,
    inProgress: number,
    completed: number
}
export interface Task {
    id?: string,
    taskName: string,
    projectManager: string,
    time: string,
    team: string,
}
const Overview: React.FC<Props> = () => {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: "1",
            name: "Project name",
            tasks: 5,
            finishedTasks: 4
        }
    ]);
    const [allProjects, setAllProjects] = useState<Projects>({ allProjects: 100, inProgress: 20, completed: 50, notStarted: 30 });
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "2",
            taskName: "Task Name",
            projectManager: "Project Manager Name",
            time: "14 days left",
            team: "Al-shaqran team"
        }
    ]);
    return (
        <Box className="overview-page" sx={{ width: "100%" }}>
            <Box className="projects" >
                <Typography
                    variant="h2"
                    style={{
                        margin: "10px 0",
                        paddingBottom: "20px",
                    }}
                >
                    Current Projects
                </Typography>

                <Box className="project-cards">
                    {projects.map(projectInfo => (
                        <>
                            <ProjectCard project={projectInfo} />
                            <ProjectCard project={projectInfo} />
                            <ProjectCard project={projectInfo} />
                            <ProjectCard project={projectInfo} />
                        </>
                    ))}
                </Box>
            </Box>
            <Box className="tasks">
                <Typography
                    variant="h2"
                    style={{
                        margin: "10px 0",
                        paddingBottom: "20px",
                    }}
                >
                    Recently Shared Tasks
                </Typography>
                <Box className="task-cards">
                    {tasks.map(taskInfo => (
                        <>
                            <TaskCard task={taskInfo} />
                            <TaskCard task={taskInfo} />
                            <TaskCard task={taskInfo} />
                            <TaskCard task={taskInfo} />
                        </>
                    ))}
                </Box>
            </Box>
            <Box className="statics">
                <ProjectStatics projects={allProjects} />
                <TaskStatics projects={allProjects} />
            </Box>

        </Box>
    );
};
export default Overview;
