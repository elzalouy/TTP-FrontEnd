import React from "react";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import { CircularProgress, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../models/hooks";
import { deleteDepartment } from "../../../models/Departments";
import {
  selectDeleteDepartment,
  selectDepartmentLoading,
} from "../../../models/Departments/departments.selectors";
import "../../popups-style.css";

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
    <SmallPopUp dataTestId="delete-department-popup" show={show}>
      <div className="imageAlert">
        <img src={deleteIcon} />
      </div>
      <p className="warning-text">
        Are you sure you want to delete this department?
      </p>
      <Typography variant="h5" fontWeight={600} padding={1}>
        If you deleted this department, all the tasks and Members in the
        department will be deleted also.
      </Typography>
      <div className="margin-cover">
        <div className="controllers-small-popup">
          <button
            data-test-id="delete-department-cancel"
            className="controllers-cancel"
            onClick={() => {
              setShow("none");
            }}
          >
            Cancel
          </button>
          <button
            data-test-id="delete-department-submit"
            className="controllers-delete"
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white", padding: "10px" }} />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </SmallPopUp>
  );
};
export default DeleteDepartment;
