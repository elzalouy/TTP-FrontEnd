import * as React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import SmallPopUp from "../Popup/SmallPopup";
import { logout } from "../../../redux/Auth";
import { deleteTask, ProjectsActions, Task } from "../../../redux/Projects";
import { toggleLogOutPopup } from "../../../redux/Ui";

interface LogoutPopupProps {
  show: string;
  setShow: (val: string) => void;
  task:Task;
}

const ConfirmDeleteTask: React.FC<LogoutPopupProps> = ({ show, setShow,task}) => {
  
  const dispatch = useDispatch();
  
  return (
    <SmallPopUp show={show} zIndex={9999}>
      <p className="warning-text">Are you sure you want to delete this task?</p>
      <hr className="separator" />
      <div className="margin-cover">
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
      </div>
    </SmallPopUp>
  );
};

export default ConfirmDeleteTask;
