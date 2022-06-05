import * as React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Checkbox,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectAllProjects } from "../../redux/Projects";
import TasksTable from "../../coreUI/usable-component/Tables/OverviewTasksTable";
interface UserTasksProps {
  title: string;
}

const UserTasks: React.FC<UserTasksProps> = (props) => {
  const projects = useAppSelector(selectAllProjects);
  const [selects, setAllSelected] = React.useState<string[]>([]);

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
        selects={selects}
        setAllSelected={setAllSelected}
        projects={projects.projects}
        tasks={projects.allTasks}
      />
    </>
  );
};

export default UserTasks;
