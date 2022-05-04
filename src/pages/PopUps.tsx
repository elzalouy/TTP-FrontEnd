import * as React from "react";
import { useDispatch } from "react-redux";
import CreateTask from "../components/popups/CreateTask";
import DeleteClient from "../components/popups/DeleteClient";
import DeleteProject from "../components/popups/DeleteProject";
import EditClient from "../components/popups/EditClient";
import EditProject from "../components/popups/EditProject";
import EditTask from "../components/popups/EditTask";
import LogoutPopup from "../components/popups/LogoutPopup";
import { useAppSelector } from "../redux/hooks";
import {
  openDeleteProjectPopup,
  openEditProjectPopup,
  openEditClientPopup,
  openDeleteClientPopup,
  openCreateTaskPopup,
  toggleLogOutPopup,
  toggleEditTaskPopup,
  openDeleteTaskPopup,
} from "../redux/Ui";
import { selectUi } from "../redux/Ui/UI.selectors";
import DeleteTask from "../components/popups/DeleteTask";

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
  return (
    <>
      <DeleteProject
        show={deleteProjectPopup}
        setShow={showDeleteProjectPopup}
      />
      <EditProject setShow={showEditProjectPopup} show={editProjectPopup} />
      <EditClient setShow={showEditClientPopup} show={editClientPopup} />
      <DeleteClient setShow={showDeleteClientPopup} show={deleteClientPopup} />
      <CreateTask setShow={showCreateTaskPopup} show={createTaskPopup} />
      <LogoutPopup setShow={showLoggoutPopup} show={logoutPopup} />
      <EditTask Show={editTaskPopup} setShow={showEditTaskPopup} />
      <DeleteTask show={deleteTaskPopup} setShow={showDeleteTaskPopup} />
    </>
  );
};

export default PopUps;
