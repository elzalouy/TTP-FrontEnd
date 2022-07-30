import React from "react";
import IMAGES from "../../../assets/img/Images";
import SmallPopUp from "../../../coreUI/usable-component/Popup/SmallPopup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteDepartment,
  getAllDepartments,
} from "../../../redux/Departments";
import { useAppSelector } from "../../../redux/hooks";
import { selectedDepart } from "../../../redux/Departments/departments.selectors";
import { Typography } from "@mui/material";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import "../../../coreUI/usable-component/Popups/popups-style.css";

type Props = {
  show: string;
  setShow: (value: string) => void;
};

const DeleteDepartment: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const depData = useAppSelector(selectedDepart);

  const handleSubmit = () => {
    dispatch(deleteDepartment({ data: { _id: depData?._id }, dispatch }));
    setShow("none");
  };

  return (
    <SmallPopUp show={show}>
      <div className="imageAlert">
        <img src={deleteIcon} />
      </div>
      <p className="warning-text">
        Are you sure you want to delete this department?
      </p>
      <Typography variant="h5" fontWeight={600} padding={1}>
        If you delete this department, all the tasks and Members in this
        department will be delete also.
      </Typography>
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
          <button className="controllers-delete" onClick={handleSubmit}>
            Delete
          </button>
        </div>
      </div>
    </SmallPopUp>
  );
};
export default DeleteDepartment;
