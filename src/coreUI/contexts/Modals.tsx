import * as React from "react";
import NewProjectPopUp from "../../views/Projects/Create/Create/ProjectPopUp";
import CreateNewTask from "../../views/TaskViewBoard/Create/CreateNewTask";
import DeleteClient from "../../views/Clients/Delete/DeleteClient";
import DeleteProject from "../../views/Projects/Delete/DeleteProject";
import EditClient from "../../views/Clients/Edit/EditClient";
import EditProject from "../../views/Projects/Edit/EditProject";
import EditTask from "../../views/TaskViewBoard/Edit/EditTask";
import { Logout } from "../../views/Auth";
import DeleteTask from "../../views/TaskViewBoard/Delete/DeleteTask";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../models/hooks";
import { selectUi } from "../../models/Ui/UI.selectors";
import { Grid } from "@mui/material";
import { TaskInfoPopUp } from "../../views";
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
} from "../../models/Ui";
import EditDepartment from "../../views/Departments/Edit/EditDepartment";
import DeleteDepartment from "../../views/Departments/Delete/DeleteDepartment";

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
      <TaskInfoPopUp show={viewTaskPopup} setShow={showViewTaskModal} />
      <EditProject setShow={showEditProjectPopup} show={editProjectPopup} />
      <EditClient setShow={showEditClientPopup} show={editClientPopup} />
      <DeleteClient setShow={showDeleteClientPopup} show={deleteClientPopup} />
      <CreateNewTask setShow={showCreateTaskPopup} show={createTaskPopup} />
      <Logout setShow={showLoggoutPopup} show={logoutPopup} />
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
