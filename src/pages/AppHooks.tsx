import * as React from "react";
import { useDispatch } from "react-redux";
import { clientsActions, getAllClients } from "../redux/Clients";
import { getAllDepartments } from "../redux/Departments";
import { useAppSelector } from "../redux/hooks";
import { getPMs } from "../redux/PM";
import {
  getAllProjects,
  getAllTasks,
  ProjectsActions,
  selectAllProjects,
  selectNewProject,
} from "../redux/Projects";
import { setStatistics } from "../redux/Statistics";
import { fireDeleteTaskHook } from "../redux/Ui";
import { selectUi } from "../redux/Ui/UI.selectors";
const AppHooks: React.FC = (props) => {
  const dispatch = useDispatch();
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
  return <>{props.children}</>;
};

export default AppHooks;
