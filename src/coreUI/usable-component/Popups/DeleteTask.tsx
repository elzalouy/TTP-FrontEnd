import * as React from "react";
import { useDispatch } from "react-redux";
import SmallPopUp from "../Popup/SmallPopup";
import { useAppSelector } from "../../../redux/hooks";
import { deleteTask, selectedDeleteTaskId } from "../../../redux/Projects";
import { openDeleteTaskPopup } from "../../../redux/Ui";
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
          <button onClick={onDeleteTask} className="controllers-delete">
            Delete
          </button>
        </div>
      </div>
    </SmallPopUp>
  );
};

export default DeleteTask;
