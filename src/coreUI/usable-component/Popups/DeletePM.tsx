import React from "react";
import IMAGES from "../../../assets/img/Images";
import SmallPopUp from "../Popup/SmallPopup";
import "./popups-style.css";
import { useAppSelector } from "../../../redux/hooks";
import { selectDeletePMPopup } from "../../../redux/Ui/UI.selectors";
import { select_Id } from "../../../redux/PM/pm.selectors";
import { useDispatch } from "react-redux";
import { toggleDeleteProjectManagerPopup } from "../../../redux/Ui";
import { deletePM } from "../../../redux/PM";
import deleteIcon from "../../../assets/img/deleteAlert.png";

type Props = {
  hideButton: boolean;
};

const DeletePM: React.FC<Props> = (props: Props) => {
  const toggler = useAppSelector(selectDeletePMPopup);
  const _id = useAppSelector(select_Id);
  const dispatch = useDispatch();

  return (
    <>
      {!props.hideButton && (
        <button
          className="black-btn"
          onClick={() => {
            dispatch(toggleDeleteProjectManagerPopup("flex"));
          }}
        >
          Delete PM
        </button>
      )}
      <SmallPopUp show={toggler}>
        <div className="imageAlert">
          <img src={deleteIcon} />
        </div>
        <p className="warning-text">
          Are you sure you want to delete this project manager?
        </p>
        <div className="margin-cover">
          <div className="controllers-small-popup">
            <button
              className="controllers-cancel"
              onClick={() => {
                dispatch(toggleDeleteProjectManagerPopup("none"));
              }}
            >
              Cancel
            </button>
            <button
              className="controllers-delete"
              onClick={() => {
                dispatch(deletePM(_id));
                dispatch(toggleDeleteProjectManagerPopup("none"));
              }}
              data-test-id="delete-pm-button"
            >
              Delete
            </button>
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};
export default DeletePM;
