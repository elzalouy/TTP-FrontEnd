import * as React from "react";
import { useDispatch } from "react-redux";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import { useAppSelector } from "../../../models/hooks";
import {
  deleteTask,
  selectProjectsState,
  selectedDeleteTaskId,
} from "../../../models/Projects";
import { openDeleteTaskPopup } from "../../../models/Ui";
import DeleteWarning from "src/coreUI/components/Containers/Warning/DeleteWarning";

interface DeleteTaskProps {
  show: string;
  setShow: (val: string) => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ show, setShow }) => {
  const id = useAppSelector(selectedDeleteTaskId);
  const projectsState = useAppSelector(selectProjectsState);

  const disptach = useDispatch();
  const onDeleteTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    disptach(deleteTask({ data: { id: id }, disptach }));
    disptach(openDeleteTaskPopup("none"));
  };
  return (
    <>
      <DeleteWarning
        show={show}
        setShow={setShow}
        onClick={onDeleteTask}
        message="Are you sure you want to delete this Task?"
        loading={projectsState.deleteTaskLoading}
      />
    </>
  );
};

export default DeleteTask;
