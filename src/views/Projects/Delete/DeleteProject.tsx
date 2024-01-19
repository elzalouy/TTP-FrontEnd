import React from "react";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
// import "../../popups-style.css";
import { useAppSelector } from "../../../models/hooks";
import {
  deleteProject,
  selectProjectsState,
  selectDeleteProjectId,
} from "../../../models/Projects";
import { useDispatch } from "react-redux";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import DeleteWarning from "src/coreUI/components/Containers/Warning/DeleteWarning";

type Props = {
  show: string;
  setShow: any;
  id?: string;
};

const DeleteProject: React.FC<Props> = ({ show, setShow, id }) => {
  const projectsState = useAppSelector(selectProjectsState);
  const dispatch = useDispatch();

  const onDeleteProject = async () => {
    if (id) {
      await dispatch(deleteProject({ data: { id: id }, dispatch }));
      setShow("none");
    }
  };

  return (
    <>
      <DeleteWarning
        message="Are you sure you want to delete this project?"
        show={show}
        setShow={setShow}
        onClick={onDeleteProject}
        loading={projectsState.deleteProjectLoading}
      />
    </>
  );
};
export default DeleteProject;
