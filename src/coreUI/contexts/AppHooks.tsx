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
import { getAllMembers } from "../../redux/techMember";
import { setHideLoadingState, updateCounter } from "../../redux/notification";

const AppHooks: React.FC = (props) => {
  const dispatch = useDispatch();
  const isAuthed = useAppSelector(selectIsAuth);
  const [updateTaskData, setUpdateTaskData] = React.useState<any>(null);
  const [deleteTaskData, setDeleteTaskData] = React.useState<any>(null);
  const [newDepartment, setNewDepartment] = React.useState<any>(null);
  const [createDepError, setCreateDepError] = React.useState<any>(null);
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
    deleteTeamHook,
    createProjectHook,
    deleteCategoryHook,
    createCategoryHook,
  } = useAppSelector(selectUi);
  // setHideLoadingState doesn't look like an app hook that should be implemented here brother @Zedan
  React.useEffect(() => {
    // create project hook
    if (createProjectHook !== undefined) {
      console.log("create project hook fired");
      dispatch(getAllProjects(null));
      dispatch(getAllTasks(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [createProjectHook]);

  React.useEffect(() => {
    // create category hook
    if (createCategoryHook !== undefined) {
      console.log("create category hook fired");
      dispatch(getAllCategories(null));
      dispatch(getAllDepartments(null));
      dispatch(getAllMembers(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [createCategoryHook]);

  React.useEffect(() => {
    // delete team hook
    if (deleteTeamHook !== undefined) {
      console.log("delete team hook fired");
      dispatch(getAllDepartments(null));
      dispatch(getAllMembers(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [deleteTeamHook]);

  React.useEffect(() => {
    // delete category hook
    if (deleteCategoryHook !== undefined) {
      console.log("delete category hook fired");
      dispatch(getAllCategories(null));
      dispatch(getAllDepartments(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [deleteCategoryHook]);

  React.useEffect(() => {
    // new project hook
    if (newProjectHook !== undefined) {
      console.log("new project hook fired");
      dispatch(getAllClients(null));
      dispatch(getAllTasks(null));
      dispatch(getAllProjects(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [newProjectHook]);

  // update project hook
  React.useEffect(() => {
    if (updateProjectHook !== undefined) {
      console.log("update project hook fired.");
      dispatch(getAllClients(null));
      dispatch(getAllProjects(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [updateProjectHook]);

  // Delete task hook
  React.useEffect(() => {
    if (deleteTasksHook !== undefined) {
      console.log("delete tasks hook fired.");
      dispatch(getAllTasks(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [deleteTasksHook]);

  // Delete project hook
  React.useEffect(() => {
    if (deleteProjectHook !== undefined) {
      console.log("delete project hook fired.");
      dispatch(getAllProjects(null));
      dispatch(getAllClients(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [deleteProjectHook]);

  // new Tech member to department
  React.useEffect(() => {
    if (createTeamHook !== undefined) {
      console.log("new member hook fired.");
      dispatch(getAllDepartments(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [createTeamHook]);

  // update Depertment
  React.useEffect(() => {
    if (updateDepartmentHook !== undefined) {
      console.log("update department hook fired.");
      dispatch(getAllDepartments(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [updateDepartmentHook]);

  // create department hook
  React.useEffect(() => {
    if (createDepartmentHook !== undefined) {
      console.log("create department hook fired.");
      dispatch(getAllDepartments(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [createDepartmentHook]);

  // delete Department hook
  React.useEffect(() => {
    if (deleteDepartmentHook !== undefined) {
      console.log("delete department hook fired.");
      dispatch(getAllDepartments(null));
      dispatch(getAllTasks(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [deleteDepartmentHook]);

  // // Edit Task hook
  // React.useEffect(() => {
  //   if (editTaskHook !== undefined) {
  //     console.log("edit Task hook fired.");
  //     dispatch(getAllTasks(null));
  //     // dispatch(setHideLoadingState(false));
  //   }
  // }, [editTaskHook]);

  // move task
  React.useEffect(() => {
    if (moveTaskHook !== undefined) {
      console.log("move task hook fired");
      dispatch(getAllTasks(null));
      // dispatch(setHideLoadingState(false));
    }
  }, [moveTaskHook]);
  // Update task event from backend
  React.useEffect(() => {
    if (updateTaskData !== null) {
      dispatch(ProjectsActions.updateTaskData(updateTaskData));
      setUpdateTaskData(null);
      // dispatch(setHideLoadingState(false));
    }
  }, [updateTaskData]);
  // delete task event from backend
  React.useEffect(() => {
    if (deleteTaskData !== null) {
      dispatch(ProjectsActions.deleteTask(deleteTaskData));
      // dispatch(setHideLoadingState(false));
    }
  }, [deleteTaskData]);
  // new department
  React.useEffect(() => {
    if (newDepartment?._id) {
      console.log("new department socket fired");
      dispatch(departmentsActions.replaceDepartment(newDepartment));
      dispatch(setHideLoadingState(false));
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
        console.log("update notification");
        dispatch(updateCounter(data));
      });
    }
  }, [user, dispatch]);

  return <>{props.children}</>;
};
export default AppHooks;
