import React from "react";
import IMAGES from "../../../assets/img";
import SmallPopUp from "../Popup/SmallPopup";
import { useState } from "react";
import "./popups-style.css";
import { useAppSelector } from "../../../redux/hooks";
import {
  deleteProject,
  deleteProjectTasks,
  selectDeleteProjectId,
} from "../../../redux/Projects";
import { useDispatch } from "react-redux";

type Props = {
  show: string;
  setShow: any;
};

const DeleteProject: React.FC<Props> = ({ show, setShow }) => {
  const id = useAppSelector(selectDeleteProjectId);
  const dispatch = useDispatch();
  
  const onDeleteProject = async () => {
    await dispatch(deleteProject({ data: { id: id }, dispatch }));
    setShow("none");
  };

  return (
    <>
      <SmallPopUp show={show}>
        <p className="warning-text">
          Are you sure you want to delete this project?
        </p>
        <hr className="separator" />
        <div className="margin-cover">
          <div className="controllers-small-popup">
            <button
              className="controllers-cancel"
              onClick={() => {
                setShow("none");
              }}
            >
              Cancel
            </button>
            <button className="controllers-delete" onClick={onDeleteProject}>
              Delete
            </button>
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};
export default DeleteProject;
