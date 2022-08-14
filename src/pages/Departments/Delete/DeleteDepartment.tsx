import React from "react";
import SmallPopUp from "../../../coreUI/usable-component/Popup/SmallPopup";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import { CircularProgress, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { deleteDepartment } from "../../../redux/Departments";
import {
  selectDeleteDepartment,
  selectDepartmentLoading,
} from "../../../redux/Departments/departments.selectors";
import "../../../coreUI/usable-component/Popups/popups-style.css";

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
    <SmallPopUp show={show}>
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
            className="controllers-cancel"
            onClick={() => {
              setShow("none");
            }}
          >
            Cancel
          </button>
          <button className="controllers-delete" onClick={handleSubmit}>
            {loading ? (
              <CircularProgress sx={{ color: "white", padding: "0px" }} />
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
