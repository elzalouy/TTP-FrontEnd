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
import TasksTable from "../../coreUI/usable-component/Tables/TasksTable";
interface UserTasksProps {}

const UserTasks: React.FC<UserTasksProps> = (props) => {
  const projects = useAppSelector(selectAllProjects);
  const [selects, setAllSelected] = React.useState<string[]>([]);

  return (
    <>
      <Typography
        id="project-header"
        variant="h5"
        fontWeight={"800"}
        color="#505050"
        paddingBottom={2}
        paddingX={2}
        marginTop={2}
      >
        Tasks Closed to deadline
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
