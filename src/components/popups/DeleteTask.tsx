import * as React from "react";
import { useDispatch } from "react-redux";
import SmallPopUp from "../../coreUI/usable-component/SmallPopup";
import { useAppSelector } from "../../redux/hooks";
import { deleteTask, selectedDeleteTaskId } from "../../redux/Projects";
import { openDeleteTaskPopup } from "../../redux/Ui";

interface DeleteTaskProps {
  show: string;
  setShow: (val: string) => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ show, setShow }) => {
  const id = useAppSelector(selectedDeleteTaskId);
  const disptach = useDispatch();
  const onDeleteTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    disptach(deleteTask({ id: id }));
    disptach(openDeleteTaskPopup("none"));
  };
  return (
    <SmallPopUp show={show}>
      <p className="warning-text">Are you sure you want to delete this Task?</p>
      <hr className="separator" />
      <div className="margin-cover">
        <div className="controllers">
          <button
            className="controllers-cancel"
            onClick={() => setShow("none")}
          >
            Cancel
          </button>
          <button onClick={onDeleteTask} className="controllers-delete">
            Delete
          </button>
        </div>
      </div>
    </SmallPopUp>
  );
};

export default DeleteTask;
