import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../models/hooks";
import { selectAllProjects } from "../../../models/Projects";
import TasksTable from "./OverviewTasksTable";
import { Task } from "../../../types/models/Projects";
interface UserTasksProps {
  title: string;
  tasks?: Task[] | null;
  img?: any;
  caption?: string;
}

const UserTasks: React.FC<UserTasksProps> = (props) => {
  const projects = useAppSelector(selectAllProjects);
  return (
    <>
      <Typography
        id="project-header"
        fontSize={18}
        fontWeight={"900"}
        color="#505050"
        paddingBottom={2}
        marginTop={5}
      >
        {props.title}
      </Typography>
      <TasksTable
        projects={projects.projects}
        tasks={props?.tasks}
        img={props?.img}
        caption={props.caption}
      />
    </>
  );
};

export default UserTasks;