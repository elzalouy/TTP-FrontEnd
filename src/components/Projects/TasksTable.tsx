import * as React from "react";
import IMAGES from "../../assets/img";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ProjectsActions, selectNewProject, Task } from "../../redux/Projects";

interface TasksProps {}

const Tasks: React.FC<TasksProps> = () => {
  const newProject = useAppSelector(selectNewProject);
  const dispatch = useAppDispatch();
  const onDeleteTask = (task: Task) => {
    dispatch(ProjectsActions.onDeleteNewProjectTask(task));
  };
  return (
    <div>
      <h4>All tasks</h4>
      <table
        className="allTask-table"
        style={{
          borderWidth: "1px",
          borderColor: "#aaaaaa",
          borderStyle: "solid",
        }}
      >
        <thead>
          <tr>
            <th>Task name</th>
            <th>Team name</th>
            <th>Category</th>
            <th>Deadline date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {newProject &&
            newProject.tasks &&
            newProject?.tasks?.map((task, index: any) => {
              return (
                <tr key={index}>
                  <td width={"30%"}>{task && task?.name.toString()}</td>
                  <td width={"20%"}>{task && task?.teamId.toString()}</td>
                  <td width={"20%"}>{task && task?.categoryId.toString()}</td>
                  <td width={"20%"}>
                    {task && new Date(task?.deadline).toDateString()}
                  </td>
                  <td
                    className="deleteTd"
                    width={"10%"}
                    onClick={() => onDeleteTask(task)}
                  >
                    <img src={IMAGES.deleteicon} alt="delete" />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
