import * as React from "react";
import NewProjectPopUp from "src/views/Projects/Create/CreateProjectForm/CreatePopUp";
import CreateNewTask from "src/views/TaskViewBoard/Create/CreateNewTask";
import DeleteClient from "src/views/Clients/Delete/DeleteClient";
import DeleteProject from "src/views/Projects/Delete/DeleteProject";
import EditClient from "src/views/Clients/Edit/EditClient";
import EditProject from "src/views/Projects/Edit/EditProject";
import EditTask from "src/views/TaskViewBoard/Edit/EditTask";
import { Logout } from "src/views/Auth";
import DeleteTask from "src/views/TaskViewBoard/Delete/DeleteTask";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/models/hooks";
import { selectUi } from "src/models/Ui/UI.selectors";
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
  initAppUiState,
} from "src/models/Ui";
import EditDepartment from "src/views/Departments/Edit/EditDepartment";
import DeleteDepartment from "src/views/Departments/Delete/DeleteDepartment";
import { useLocation } from "react-router";

const Modals: React.FC = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
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

  React.useEffect(() => {
    dispatch(initAppUiState(null));
  }, [pathname]);

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
      <EditProject setShow={showEditProjectPopup} show={editProjectPopup} />
      <EditClient setShow={showEditClientPopup} show={editClientPopup} />
      <DeleteClient setShow={showDeleteClientPopup} show={deleteClientPopup} />
      <CreateNewTask
        setShow={showCreateTaskPopup}
        show={createTaskPopup}
        edit={true}
      />
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
