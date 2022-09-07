import React from "react";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { deleteDepartment } from "../../../models/Departments";
import {
  selectDeleteDepartment,
  selectDepartmentLoading,
} from "../../../models/Departments/departments.selectors";
import "../../popups-style.css";
import Button from "src/coreUI/components/Buttons/Button";

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
    <SmallPopUp dataTestId="delete-department-popup" widthSize="400px" show={show}>
      <div className="imageAlert">
        <img src={deleteIcon} />
      </div>
      <p className="warning-text">
        Are you sure you want to delete this department?
      </p>
      <Grid lg={12} md={12} container justifyContent={"center"} alignItems="center">
        <Grid item lg={12} md={12}>
          <Typography textAlign={"center"} variant="h5" fontWeight={600} padding={1}>
            If you delete this department, all the tasks and Members in the
            department will be deleted also.
          </Typography>
        </Grid>
      </Grid>
      <div className="margin-cover">
        <div className="controllers-small-popup">
          <Button
            type="cancel"
            size="large"
            label="cancel"
            onClick={() => setShow("none")}
          />
          <Button
            type="delete"
            size="large"
            label="delete"
            onClick={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </SmallPopUp>
  );
};
export default DeleteDepartment;
