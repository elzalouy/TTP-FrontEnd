import * as React from "react";
import { useDispatch } from "react-redux";
import CreateTask from "../components/popups/CreateTask";
import DeleteClient from "../components/popups/DeleteClient";
import DeleteProject from "../components/popups/DeleteProject";
import EditClient from "../components/popups/EditClient";
import EditProject from "../components/popups/EditProject";
import { useAppSelector } from "../redux/hooks";
import {
  openDeleteProjectPopup,
  openEditProjectPopup,
  openEditClientPopup,
  openDeleteClientPopup,
  openCreateTaskPopup,
} from "../redux/Ui";
import { selectUi } from "../redux/Ui/UI.selectors";

const PopUps: React.FC = () => {
  const dispatch = useDispatch();
  const {
    deleteProjectPopup,
    editProjectPopup,
    editClientPopup,
    deleteClientPopup,
    createTaskPopup,
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
    dispatch(openCreateTaskPopup("flex"));
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
    </>
  );
};

export default PopUps;
