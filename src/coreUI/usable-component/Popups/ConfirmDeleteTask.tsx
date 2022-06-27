import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import SmallPopUp from "../Popup/SmallPopup";
import { logout } from "../../../redux/Auth";
import { deleteTask, ProjectsActions } from "../../../redux/Projects";
import { toggleLogOutPopup } from "../../../redux/Ui";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import { Task } from "../../../interfaces/models/Projects";

interface LogoutPopupProps {
  show: string;
  setShow: (val: string) => void;
  task: Task;
}

const ConfirmDeleteTask: React.FC<LogoutPopupProps> = ({
  show,
  setShow,
  task,
}) => {
  const dispatch = useDispatch();

  return (
    <SmallPopUp show={show} zIndex={9999}>
      <div className="imageAlert">
        <img src={deleteIcon} />
      </div>
      <p className="warning-text">Are you sure you want to delete this task?</p>
      <div className="controllers">
        <button
          className="controllers-cancel"
          onClick={() => {
            setShow("none");
          }}
        >
          Cancel
        </button>
        <button
          className="controllers-delete"
          onClick={() => {
            setShow("none");
            dispatch(deleteTask({ data: { id: task._id }, dispatch }));
            dispatch(ProjectsActions.onDeleteNewProjectTask(task));
          }}
        >
          Delete
        </button>
      </div>
    </SmallPopUp>
  );
};

export default ConfirmDeleteTask;
