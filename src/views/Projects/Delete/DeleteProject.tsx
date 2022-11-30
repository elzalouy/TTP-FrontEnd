import React from "react";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
// import "../../popups-style.css";
import { useAppSelector } from "../../../models/hooks";
import {
  deleteProject,
  selectAllProjects,
  selectDeleteProjectId,
} from "../../../models/Projects";
import { useDispatch } from "react-redux";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import DeketeWarning from "src/coreUI/components/Containers/Warning/DeleteWarning";

type Props = {
  show: string;
  setShow: any;
};

const DeleteProject: React.FC<Props> = ({ show, setShow }) => {
  const id = useAppSelector(selectDeleteProjectId);
  const projectsState = useAppSelector(selectAllProjects);
  const dispatch = useDispatch();

  const onDeleteProject = async () => {
    await dispatch(deleteProject({ data: { id: id }, dispatch }));
    setShow("none");
  };

  return (
    <>
      <DeketeWarning
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
