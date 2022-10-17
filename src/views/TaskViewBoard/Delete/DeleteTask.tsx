import * as React from "react";
import { useDispatch } from "react-redux";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import { useAppSelector } from "../../../models/hooks";
import { deleteTask, selectedDeleteTaskId } from "../../../models/Projects";
import { openDeleteTaskPopup } from "../../../models/Ui";
import deleteIcon from "../../../assets/img/deleteAlert.png";

interface DeleteTaskProps {
  show: string;
  setShow: (val: string) => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ show, setShow }) => {
  const id = useAppSelector(selectedDeleteTaskId);
  const disptach = useDispatch();
  const onDeleteTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    disptach(deleteTask({ data: { id: id }, disptach }));
    disptach(openDeleteTaskPopup("none"));
  };
  return (
    <SmallPopUp show={show}>
      <div className="imageAlert">
        <img src={deleteIcon} />
      </div>
      <p className="warning-text">Are you sure you want to delete this Task?</p>
      <div className="margin-cover">
        <div className="controllers-small-popup">
          <button
            className="controllers-cancel"
            onClick={() => setShow("none")}
          >
            Cancel
          </button>
          <button
            onClick={onDeleteTask}
            className="controllers-delete"
            data-test-id="delete-task-button-confirm"
          >
            Delete
          </button>
        </div>
      </div>
    </SmallPopUp>
  );
};

export default DeleteTask;
