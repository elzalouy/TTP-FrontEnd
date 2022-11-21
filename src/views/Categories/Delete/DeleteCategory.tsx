import { Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import DeketeWarning from "src/coreUI/components/Containers/Warning/DeleteWarning";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import {
  deleteCategory,
  selectSelectedCategory,
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
    <>
      <DeketeWarning
        message="Are you sure you want to delete this category?"
        show={showDelete}
        setShow={handleSetShowDelete}
        onClick={handleSubmit}
      />
    </>
  );
};
export default DeleteCategory;
