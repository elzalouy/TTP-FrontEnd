import React from "react";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import { Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { deleteDepartment } from "../../../models/Departments";
import {
  selectDeleteDepartment,
  selectDepartmentLoading,
} from "../../../models/Departments/departments.selectors";
import "../../popups-style.css";
import Button from "src/coreUI/components/Buttons/Button";
import DeketeWarning from "src/coreUI/components/Containers/Warning/DeleteWarning";

type Props = {
  show: string;
  setShow: (value: string) => void;
};

const DeleteDepartment: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const department = useAppSelector(selectDeleteDepartment);
  const loading = useAppSelector(selectDepartmentLoading);

  const handleSubmit = () => {
    dispatch(deleteDepartment({ id: department?._id, dispatch, setShow }));
  };

  return (
    <>
      <DeketeWarning
        show={show}
        setShow={setShow}
        onClick={handleSubmit}
        message={"Are you sure you want to delete this department?"}
        alert={
          "If you delete this department, all the tasks and Members in the department will be deleted also."
        }
      />
    </>
  );
};
export default DeleteDepartment;
