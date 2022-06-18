import * as React from "react";
import { useDispatch } from "react-redux";
import DeleteClient from "../FormPopups/DeleteClient";
import DeleteProject from "../FormPopups/DeleteProject";
import EditClient from "../FormPopups/EditClient";
import EditProject from "../FormPopups/EditProject";
import EditTask from "../FormPopups/EditTask";
import LogoutPopup from "../FormPopups/LogoutPopup";
import { useAppSelector } from "../../../redux/hooks";
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
} from "../../../redux/Ui";
import { selectUi } from "../../../redux/Ui/UI.selectors";
import DeleteTask from "../FormPopups/DeleteTask";
import { Grid } from "@mui/material";
import NewProjectPopUp from "../Projects/ProjectPopUp";
import CreateNewTask from "../FormPopups/CreateNewTask";

const PopUps: React.FC = () => {
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
  } = useAppSelector(selectUi);
  const showDeleteProjectPopup = (val: string) => {
    dispatch(openDeleteProjectPopup(val));
  };
  const showEditProjectPopup = (val: string) => {
    dispatch(openEditProjectPopup(val));
  };
  const showEditClientPopup = (val: string) => {
    dispatch(openEditClientPopup(val));
  };
  const showDeleteClientPopup = (val: string) => {
    dispatch(openDeleteClientPopup(val));
  };
  const showCreateTaskPopup = (val: string) => {
    dispatch(openCreateTaskPopup(val));
  };
  const showLoggoutPopup = (val: string) => {
    dispatch(toggleLogOutPopup(val));
  };
  const showEditTaskPopup = (val: string) => {
    dispatch(toggleEditTaskPopup(val));
  };
  const showDeleteTaskPopup = (val: string) => {
    dispatch(openDeleteTaskPopup(val));
  };
  const showCreateProject = (val: string) => {
    dispatch(toggleCreateProjectPopup(val));
  };
  return (
    <>
      <DeleteProject
        show={deleteProjectPopup}
        setShow={showDeleteProjectPopup}
      />
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
    </>
  );
};

export default PopUps;
