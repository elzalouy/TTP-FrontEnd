import { Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import {
  deleteCategory,
  selectSelectedCategory
} from "../../../models/Categories";
import { useAppSelector } from "../../../models/hooks";
import "../../popups-style.css";

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
        },
        dispatch,
      })
    );
    handleSetShowDelete("none");
  };

  return (
    <SmallPopUp show={showDelete}>
      <div className="imageAlert">
        <img src={deleteIcon} />
      </div>
      <p className="warning-text">
        Are you sure you want to delete this category?
      </p>
      <Typography variant="h5" fontWeight={600} padding={1}>
        If you delete this Category, all the Sub-categories in this department
        will also be deleted.
      </Typography>
      <div className="margin-cover">
        <div className="controllers-small-popup">
          <Button
            type="cancel"
            size="large"
            label="cancel"
            onClick={() => handleSetShowDelete("none")}
          />
          <Button
            type="delete"
            size="large"
            label="delete"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </SmallPopUp>
  );
};
export default DeleteCategory;
