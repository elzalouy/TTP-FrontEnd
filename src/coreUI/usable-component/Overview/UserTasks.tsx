import * as React from "react";
import { Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { selectAllProjects } from "../../../redux/Projects";
import TasksTable from "../../../coreUI/usable-component/Tables/OverviewTasksTable";
import { Task } from "../../../interfaces/models/Projects";
interface UserTasksProps {
  title: string;
  tasks?: Task[] | null;
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
      {props.tasks?.length === 0 ? (
        <p
          style={{
            textTransform: "capitalize",
            margin: "10px",
            color: "rgb(154,154,152)",
          }}
        >
          There are currently no {props.title}
        </p>
      ) : (
        <TasksTable
          selects={selects}
          setAllSelected={setAllSelected}
          projects={projects.projects}
          tasks={props?.tasks}
        />
      )}
    </>
  );
};

export default UserTasks;
