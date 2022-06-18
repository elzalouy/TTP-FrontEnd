import * as React from "react";
import { useDispatch } from "react-redux";
import SmallPopUp from "../../coreUI/usable-component/Popup/SmallPopup";
import { departmentsActions } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import { deleteTask, selectedDeleteTaskId } from "../../redux/Projects";
import { deleteTeam, TechMemberInterface } from "../../redux/techMember";
import { openDeleteTaskPopup } from "../../redux/Ui";

interface DeleteTaskProps {
  show: string;
  setShow: (val: string) => void;
  team: TechMemberInterface | undefined;
}

const DeleteTeam: React.FC<DeleteTaskProps> = ({ show, setShow, team }) => {
  const id = useAppSelector(selectedDeleteTaskId);
  const dispatch = useDispatch();

  const onDeleteTeam = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //Here we dispatch one action to the DB updating boolean flag and one action to redux to change UI
    dispatch(
      deleteTeam({
        data: { id: team?._id, isDeleted: "true" },
        dispatch,
      })
    );
    dispatch(departmentsActions.updateDepartmentTeams(team?._id));
    setShow("none");
  };

  return (
    <SmallPopUp show={show} zIndex={99999}>
      <p className="warning-text">This is an existing team, Are you sure you want to delete this team ?</p>
      <hr className="separator" />
      <div className="margin-cover">
        <div className="controllers">
          <button
            className="controllers-cancel"
            onClick={() => setShow("none")}
          >
            Cancel
          </button>
          <button onClick={onDeleteTeam} className="controllers-delete">
            Delete
          </button>
        </div>
      </div>
    </SmallPopUp>
  );
};

export default DeleteTeam;
