import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IMAGES from "../../../../assets/img/Images";
import { generateID } from "../../../../helpers/IdGenerator";
import { Task } from "../../../../types/models/Projects";
import { selectAllCategories } from "../../../../models/Categories";
import { selectAllDepartments } from "../../../../models/Departments";
import { useAppSelector } from "../../../../models/hooks";
import { selectNewProject } from "../../../../models/Projects";
import { UiActions } from "../../../../models/Ui";
import ConfirmDeleteTask from "../../../../views/TaskViewBoard/Delete/ConfirmDeleteTask";

interface TasksProps {
  setCurrentStep: any;
  setShow: any;
}

const Tasks: React.FC<TasksProps> = ({ setCurrentStep, setShow }) => {
  const newProject = useAppSelector(selectNewProject);
  const deps = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const [show, setShowToggle] = React.useState<string>("none");
  const [currentTask, setCurrentTask] = React.useState<Task>({
    _id: "",
    name: "",
    projectId: "",
    categoryId: "",
    subCategoryId: "",
    teamId: "",
    countNotClear: "",
    countShared: "",
    status: "",
    start: "",
    deadline: "",
    deliveryDate: "",
    done: "",
    turnoverTime: "",
    attachedFiles: [],
    attachedCard: "",
    listId: "",
    cardId: "",
    boardId: "",
    file: "",
    description: "",
  });
  // const [taskTrigger, setTaskTrigger] = React.useState(false);
  const dispatch = useDispatch();

  const onDeleteTask = (task: Task) => {
    setCurrentTask(task);
    setShowToggle("flex");
  };

  const onCancel = () => {
    /*   dispatch(
      deleteProjectTasks({ data: { id: newProject.project._id }, dispatch })
    );
    dispatch(deleteProject({ data: { id: newProject.project._id }, dispatch })); */
    setShow("none");
    setCurrentStep(0);
  };

  const onSaveProject = () => {
    dispatch(UiActions.fireNewProjectHook(""));
    toast.success("Project and Its Tasks have been saved", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: generateID(),
    });
    setShow("none");
    setCurrentStep(0);
  };

  return (
    <Grid container>
      <ConfirmDeleteTask
        show={show}
        setShow={setShowToggle}
        task={currentTask}
      />
      <Grid xs={12} margin={2} item>
        <h4 style={{ textTransform: "capitalize", fontWeight: "500" }}>
          All tasks
        </h4>
      </Grid>
      <Grid xs={12} item>
        <TableContainer className="table-container-task-form" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="#334D6E" fontSize={14}>
                    Task name
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="#334D6E" fontSize={14}>
                    Team name
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="#334D6E" fontSize={14}>
                    Category
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="#334D6E" fontSize={14}>
                    Deadline date
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="#334D6E" fontSize={14}></Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newProject &&
                newProject.tasks &&
                newProject?.tasks?.map((task, index: any) => (
                  <TableRow
                    key={task?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography color="#323C47" fontSize={15}>
                        {task?.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="#707683" fontSize={14}>
                        {task &&
                          deps
                            .find((item) => item.boardId === task.boardId)
                            ?.teams?.find((item) => item._id === task.teamId)
                            ?.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="#707683" fontSize={14}>
                        {task &&
                          categories.find(
                            (item) => item._id === task?.categoryId
                          )?.category}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color="#707683" fontSize={14}>
                        {task.deadline === null
                          ? "-"
                          : new Date(task?.deadline).toDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        onDeleteTask(task);
                      }}
                    >
                      <img src={IMAGES.deleteicon} alt="delete" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <div className="controllers">
          <button className="blackBtn" onClick={() => onSaveProject()}>
            Done
          </button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Tasks;