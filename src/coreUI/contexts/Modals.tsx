import * as React from "react";
import NewProjectPopUp from "../usable-component/Projects/ProjectPopUp";
import CreateNewTask from "../../pages/TaskViewBoard/CreateTask/CreateNewTask";
import DeleteClient from "../usable-component/Popups/DeleteClient";
import DeleteProject from "../usable-component/Popups/DeleteProject";
import EditClient from "../usable-component/Popups/EditClient";
import EditProject from "../usable-component/Popups/EditProject";
import EditTask from "../../pages/TaskViewBoard/EditTask/EditTask";
import LogoutPopup from "../usable-component/Popups/LogoutPopup";
import DeleteTask from "../usable-component/Popups/DeleteTask";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectUi } from "../../redux/Ui/UI.selectors";
import { Grid } from "@mui/material";
import {
  openDeleteProjectPopup,
  openEditProjectPopup,
  openEditClientPopup,
  openDeleteClientPopup,
  openCreateTaskPopup,
  toggleLogOutPopup,
  toggleEditTaskPopup,
  openDeleteTaskPopup,
  toggleCreateProjectPopup,
  toggleViewTaskPopup,
  toggleEditDepartment,
  toggleDeleteDepartment,
} from "../../redux/Ui";
import TaskInfo from "../../pages/TaskViewBoard/TaskInfo/TaskInfo";
import EditDepartment from "../../pages/Departments/Edit/EditDepartment";
import DeleteDepartment from "../../pages/Departments/Delete/DeleteDepartment";

const Modals: React.FC = (props) => {
  const dispatch = useDispatch();
  const {
    deleteProjectPopup,
    editProjectPopup,
    editClientPopup,
    deleteClientPopup,
    createTaskPopup,
    logoutPopup,
    editTaskPopup,
    deleteTaskPopup,
    viewTaskPopup,
    editDepartmentPopup,
    deleteDepartmentPopup,
  } = useAppSelector(selectUi);

  const showDeleteProjectPopup = (val: string) =>
    dispatch(openDeleteProjectPopup(val));

  const showEditProjectPopup = (val: string) =>
    dispatch(openEditProjectPopup(val));

  const showEditClientPopup = (val: string) =>
    dispatch(openEditClientPopup(val));

  const showDeleteClientPopup = (val: string) =>
    dispatch(openDeleteClientPopup(val));

  const showCreateTaskPopup = (val: string) =>
    dispatch(openCreateTaskPopup(val));

  const showLoggoutPopup = (val: string) => dispatch(toggleLogOutPopup(val));

  const showEditTaskPopup = (val: string) => dispatch(toggleEditTaskPopup(val));

  const showDeleteTaskPopup = (val: string) =>
    dispatch(openDeleteTaskPopup(val));

  const showCreateProject = (val: string) =>
    dispatch(toggleCreateProjectPopup(val));

  const showViewTaskModal = (value: string) =>
    dispatch(toggleViewTaskPopup(value));

  const showEditDepartment = (value: string) =>
    dispatch(toggleEditDepartment(value));

  const showDeleteDepartmentPopup = (value: string) =>
    dispatch(toggleDeleteDepartment(value));

  return (
    <>
      <DeleteProject
        show={deleteProjectPopup}
        setShow={showDeleteProjectPopup}
      />
      <TaskInfo show={viewTaskPopup} setShow={showViewTaskModal} />
      <EditProject setShow={showEditProjectPopup} show={editProjectPopup} />
      <EditClient setShow={showEditClientPopup} show={editClientPopup} />
      <DeleteClient setShow={showDeleteClientPopup} show={deleteClientPopup} />
      <CreateNewTask setShow={showCreateTaskPopup} show={createTaskPopup} />
      <LogoutPopup setShow={showLoggoutPopup} show={logoutPopup} />
      <EditTask show={editTaskPopup} setShow={showEditTaskPopup} />
      <DeleteTask show={deleteTaskPopup} setShow={showDeleteTaskPopup} />
      <Grid marginLeft={50}>
        <NewProjectPopUp setShow={showCreateProject} />
      </Grid>
      <EditDepartment Show={editDepartmentPopup} setShow={showEditDepartment} />
      <DeleteDepartment
        show={deleteDepartmentPopup}
        setShow={showDeleteDepartmentPopup}
      />

      {props.children}
    </>
  );
};

export default Modals;
