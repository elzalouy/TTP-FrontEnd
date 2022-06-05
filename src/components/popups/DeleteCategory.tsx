import React from "react";
import IMAGES from "../../assets/img";
import SmallPopUp from "../../coreUI/usable-component/SmallPopup";
import { useState } from "react";
import "./popups-style.css";
import { useDispatch } from "react-redux";
import { deleteDepartment, getAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import { selectedDepart } from "../../redux/Departments/departments.selectors";
import { Typography } from "@mui/material";
import { deleteCategory, selectSelectedCategory } from "../../redux/Categories";

type Props = {
  showDelete: string;
  handleSetShowDelete: (value: string) => void;
};

const DeleteCategory: React.FC<Props> = ({
  showDelete,
  handleSetShowDelete,
}) => {
  const dispatch = useDispatch();
  const category = useAppSelector(selectSelectedCategory);

  const handleSubmit = () => {
    dispatch(
      deleteCategory({
        data: {
          _id: category?._id,
          isDeleted: true,
        },dispatch
      })
    );
    handleSetShowDelete("none");
  };

  return (
    <SmallPopUp show={showDelete}>
      <p className="warning-text">
        Are you sure you want to delete this category?
      </p>
      <Typography variant="h5" fontWeight={600} padding={1}>
        If you delete this Category, all the Sub-categories in this department
        will also be deleted.
      </Typography>
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
export default DeleteCategory;
