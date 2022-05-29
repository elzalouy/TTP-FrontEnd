import * as React from "react";
import { useDispatch } from "react-redux";
import { socket } from "../config/socket/actions";
import { selectIsAuth, selectUser } from "../redux/Auth";
import { getAllClients } from "../redux/Clients";
import { getAllDepartments } from "../redux/Departments";
import { useAppSelector } from "../redux/hooks";
import {
  getAllProjects,
  getAllTasks,
  ProjectsActions,
} from "../redux/Projects";
import { fireMoveTaskOnTrello } from "../redux/Ui";
import { selectUi } from "../redux/Ui/UI.selectors";
import { checkAuthToken } from "../services/api";
const AppHooks: React.FC = (props) => {
  const dispatch = useDispatch();
  const isAuthed = useAppSelector(selectIsAuth);
  const [moveTaskData, setMoveTaskData] = React.useState<any>(null);
  const [connected, setConnnected] = React.useState(false);
  const user = useAppSelector(selectUser);
  const {
    newProjectHook,
    updateProjectHook,
    deleteTasksHook,
    deleteProjectHook,
    createTeamHook,
    updateDepartmentHook,
    createDepartmentHook,
    editTaskHook,
    moveTaskHook,
    deleteDepartmentHook,
  } = useAppSelector(selectUi);
  /*
  1- Create an app hook
  2- test all casses 
  3- Remove loading
  4- set all endpoints that needs to be called
  */
  React.useEffect(() => {
    // new project hook
    if (newProjectHook !== undefined) {
      console.log("new project hook fired");
      dispatch(getAllClients(null));
      dispatch(getAllTasks(null));
      dispatch(getAllProjects(null));
    }
  }, [newProjectHook]);
  // update project hook
  React.useEffect(() => {
    if (updateProjectHook !== undefined) {
      console.log("update project hook fired.");
      dispatch(getAllClients(null));
      dispatch(getAllProjects(null));
    }
  }, [updateProjectHook]);
  // Delete task hook
  React.useEffect(() => {
    if (deleteTasksHook !== undefined) {
      console.log("delete tasks hook fired.");
      dispatch(getAllTasks(null));
    }
  }, [deleteTasksHook]);
  // Delete project hook
  React.useEffect(() => {
    if (deleteProjectHook !== undefined) {
      console.log("delete project hook fired.");
      dispatch(getAllProjects(null));
      // dispatch(getAllClients(null));
    }
  }, [deleteProjectHook]);
  // new Tech member to department
  React.useEffect(() => {
    if (createTeamHook !== undefined) {
      console.log("new member hook fired.");
      dispatch(getAllDepartments(null));
    }
  }, [createTeamHook]);
  // update Depertment
  React.useEffect(() => {
    if (updateDepartmentHook !== undefined) {
      console.log("update department hook fired.");
      dispatch(getAllDepartments(null));
    }
  }, [updateDepartmentHook]);
  // create department hook
  React.useEffect(() => {
    if (createDepartmentHook !== undefined) {
      console.log("create department hook fired.");
      dispatch(getAllDepartments(null));
    }
  }, [createDepartmentHook]);
  React.useEffect(() => {
    if (deleteDepartmentHook !== undefined) {
      console.log("delete department hook fired.");
      dispatch(getAllDepartments(null));
      dispatch(getAllTasks(null));
    }
  }, [deleteDepartmentHook]);
  // Edit Task hook
  React.useEffect(() => {
    if (editTaskHook !== undefined) {
      console.log("edit Task hook fired.");
      dispatch(getAllTasks(null));
    }
  }, [editTaskHook]);
  React.useEffect(() => {
    if (moveTaskHook !== undefined) {
      console.log("move task hook fired");
      dispatch(getAllTasks(null));
    }
  }, [moveTaskHook]);
  React.useEffect(() => {
    if (moveTaskData !== null) {
      console.log("entered condition");
      dispatch(ProjectsActions.moveTaskInTrello(moveTaskData));
      setMoveTaskData(null);
    }
  }, [moveTaskData]);
  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("client is connected");
      //todo check user auth
      if (user?.type === "admin") {
        // this for admins role only
        socket.emit("joined admin");
      }
      if (user?.role === "PM") {
        // this for project managers role only
        socket.emit("joined manager");
      }
      // this is for specific user
      socket.emit("joined user", { id: user?._id });
      // on event for lestening if task moved on trello (__webhookUpdate)
      socket.on("Move Task", (data) => {
        console.log("handled event");
        setMoveTaskData(data);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{props.children}</>;
};

export default AppHooks;
