import * as React from "react";
import { useDispatch } from "react-redux";
import { openConnection } from "../../services/socket.io";
import { selectIsAuth, selectUser } from "../../redux/Auth";
import { getAllClients } from "../../redux/Clients";
import { departmentsActions, getAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import {
  getAllProjects,
  getAllTasks,
  ProjectsActions,
} from "../../redux/Projects";
import { selectUi } from "../../redux/Ui/UI.selectors";
import { getAllCategories } from "../../redux/Categories";
import { getAllMembers } from "../../redux/TechMember";
import { getNotifications, getUnNotified } from "../../redux/Notification";

const AppHooks: React.FC = (props) => {
  const dispatch = useDispatch();
  const isAuthed = useAppSelector(selectIsAuth);
  const [updateTaskData, setUpdateTaskData] = React.useState<any>(null);
  const [deleteTaskData, setDeleteTaskData] = React.useState<any>(null);
  const [newDepartment, setNewDepartment] = React.useState<any>(null);
  const user = useAppSelector(selectUser);
  const {
    newProjectHook,
    updateProjectHook,
    deleteTasksHook,
    deleteProjectHook,
    createTeamHook,
    updateDepartmentHook,
    createDepartmentHook,
    moveTaskHook,
    deleteDepartmentHook,
    deleteTeamHook,
    createProjectHook,
    deleteCategoryHook,
    createCategoryHook,
  } = useAppSelector(selectUi);
  React.useEffect(() => {
    if (createProjectHook !== undefined) {
      console.log("create project hook fired");
      dispatch(getAllProjects(null));
      dispatch(getAllTasks(null));
    }
  }, [createProjectHook]);

  React.useEffect(() => {
    // create category hook
    if (createCategoryHook !== undefined) {
      console.log("create category hook fired");
      dispatch(getAllCategories(null));
      dispatch(getAllDepartments(null));
      dispatch(getAllMembers(null));
    }
  }, [createCategoryHook]);

  React.useEffect(() => {
    // delete team hook
    if (deleteTeamHook !== undefined) {
      console.log("delete team hook fired");
      dispatch(getAllDepartments(null));
      dispatch(getAllMembers(null));
    }
  }, [deleteTeamHook]);

  React.useEffect(() => {
    // delete category hook
    if (deleteCategoryHook !== undefined) {
      console.log("delete category hook fired");
      dispatch(getAllCategories(null));
      dispatch(getAllDepartments(null));
    }
  }, [deleteCategoryHook]);

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
      dispatch(getAllClients(null));
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

  // delete Department hook
  React.useEffect(() => {
    if (deleteDepartmentHook !== undefined) {
      console.log("delete department hook fired.");
      dispatch(getAllDepartments(null));
      dispatch(getAllTasks(null));
    }
  }, [deleteDepartmentHook]);

  // // Edit Task hook
  // React.useEffect(() => {
  //   if (editTaskHook !== undefined) {
  //     console.log("edit Task hook fired.");
  //     dispatch(getAllTasks(null));
  //   }
  // }, [editTaskHook]);

  // move task
  React.useEffect(() => {
    if (moveTaskHook !== undefined) {
      console.log("move task hook fired");
      dispatch(getAllTasks(null));
    }
  }, [moveTaskHook]);
  // Update task event from backend
  React.useEffect(() => {
    if (updateTaskData !== null) {
      dispatch(ProjectsActions.updateTaskData(updateTaskData));
      setUpdateTaskData(null);
    }
  }, [updateTaskData]);
  // delete task event from backend
  React.useEffect(() => {
    if (deleteTaskData !== null) {
      dispatch(ProjectsActions.deleteTask(deleteTaskData));
    }
  }, [deleteTaskData]);
  // new department
  React.useEffect(() => {
    if (newDepartment?._id) {
      console.log("new department socket fired");
      dispatch(departmentsActions.replaceDepartment(newDepartment));
    }
  }, [newDepartment]);

  React.useEffect(() => {
    if (user?._id) {
      let socket = openConnection(user);
      socket.on("create-task", (data: any) => {
        console.log("create task,", data);
        setUpdateTaskData(data);
      });
      socket.on("update-task", (data: any) => {
        console.log("update task,", data);
        setUpdateTaskData(data);
      });
      socket.on("delete-task", (data: any) => {
        console.log("delete task", data);
        setDeleteTaskData(data);
      });
      // it should delete the department from the store
      socket.on("new-department-error", (data) => console.log(data));
      socket.on("new-department", (data) => {
        setNewDepartment(data);
      });
      socket.on("notification-update", (data: any) => {
        console.log("update notification", data);
        dispatch(getUnNotified(null));
        dispatch(getNotifications(`/0/10`));
      });
    }
  }, [user, dispatch]);

  return <>{props.children}</>;
};
export default AppHooks;
