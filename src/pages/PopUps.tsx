import * as React from "react";
import { useDispatch } from "react-redux";
import DeleteProject from "../components/popups/DeleteProject";
import EditProject from "../components/popups/EditProject";
import { useAppSelector } from "../redux/hooks";
import { openDeleteProjectPopup, openEditProjectPopup } from "../redux/Ui";
import { selectUi } from "../redux/Ui/UI.selectors";

const PopUps: React.FC = () => {
  const dispatch = useDispatch();
  const { deleteProjectPopup, editProjectPopup } = useAppSelector(selectUi);
  const showDeleteProjectPopup = (val: string) => {
    dispatch(openDeleteProjectPopup(val));
  };
  const showEditProjectPopup = (val: string) => {
    dispatch(openEditProjectPopup(val));
  };
  return (
    <>
      <DeleteProject
        show={deleteProjectPopup}
        setShow={showDeleteProjectPopup}
      />
      <EditProject setShow={showEditProjectPopup} show={editProjectPopup} />
    </>
  );
};

export default PopUps;
