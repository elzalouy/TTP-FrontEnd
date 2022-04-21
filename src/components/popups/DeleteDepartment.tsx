import React from "react";
import IMAGES from "../../assets/img";
import SmallPopUp from "../../coreUI/usable-component/SmallPopup";
import { useState } from "react";
import "./popups-style.css";
import { useDispatch } from "react-redux";
import { deleteDepartment, getAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import { selectedDepart } from "../../redux/Departments/departments.selectors";

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

  const handleSubmit = async () => {
    await dispatch(deleteDepartment({ _id: depData?._id }));
    await dispatch(getAllDepartments(null));
    handleSetShowDelete("none");
  };

  return (
    <SmallPopUp show={showDelete}>
      <p className="warning-text">
        Are you sure you want to delete this department?
      </p>
      <hr className="separator" />
      <div className="margin-cover">
        <div className="controllers">
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
