import React from "react";
import IMAGES from "../../../assets/img";
import SmallPopUp from "../Popup/SmallPopup";
import { useState } from "react";
import "./popups-style.css";
import { useDispatch } from "react-redux";
import { deleteDepartment, getAllDepartments } from "../../../redux/Departments";
import { useAppSelector } from "../../../redux/hooks";
import { selectedDepart } from "../../../redux/Departments/departments.selectors";
import { Typography } from "@mui/material";

type Props = {
  showDelete: string;
  handleSetShowDelete: (value: string) => void;
};

const DeleteDepartment: React.FC<Props> = ({
  showDelete,
  handleSetShowDelete,
}) => {
  const dispatch = useDispatch();
  const depData = useAppSelector(selectedDepart);

  const handleSubmit = () => {
    dispatch(deleteDepartment({ data: { _id: depData?._id }, dispatch }));
    handleSetShowDelete("none");
  };

  return (
    <SmallPopUp show={showDelete}>
      <p className="warning-text">
        Are you sure you want to delete this department?
      </p>
      <Typography variant="h5" fontWeight={600} padding={1}>
        If you delete this department, all the tasks and Members in this
        department will be delete also.
      </Typography>
      <hr className="separator" />
      <div className="margin-cover">
        <div className="controllers-small-popup">
          <button
            className="controllers-cancel"
            onClick={() => {
              handleSetShowDelete("none");
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
