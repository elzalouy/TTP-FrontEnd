import * as React from "react";
import { useDispatch } from "react-redux";
import IMAGES from "../../assets/img";
import { selectAllCategories } from "../../redux/Categories";
import { selectAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import {
  deleteTask,
  ProjectsActions,
  selectNewProject,
  selectSelectedDepartment,
  Task,
} from "../../redux/Projects";
import { selectAllMembers } from "../../redux/techMember";

interface TasksProps {}

const Tasks: React.FC<TasksProps> = () => {
  const newProject = useAppSelector(selectNewProject);
  const deps = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const dispatch = useDispatch();
  const onDeleteTask = (task: Task) => {
    dispatch(deleteTask({ id: task._id }));
  };
  console.log(newProject.tasks);
  return (
    <div>
      <h4 style={{margin:"10px 0px" , textTransform:"capitalize"}}>All tasks</h4>
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
            <th>member name</th>
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
                <tr key={task._id}>
                  <td width={"30%"}>{task && task?.name}</td>
                  <td width={"20%"}>
                    {task &&
                      deps
                        .find((item) =>
                          item.teamsId.findIndex((i) => i._id === task._id)
                        )
                        ?.teamsId?.find((item) => item._id === task.memberId)
                        ?.name}
                  </td>
                  <td width={"20%"}>
                    {task &&
                      categories.find((item) => item._id === task?.categoryId)
                        ?.category}
                  </td>
                  <td width={"20%"}>
                    {task && new Date(task?.deadline).toDateString()}
                  </td>
                  <td
                    className="deleteTd"
                    width={"10%"}
                    onClick={() => onDeleteTask(task)}
                    style={{ cursor: "pointer" }}
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
