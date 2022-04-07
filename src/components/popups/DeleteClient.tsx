import React from "react";
import IMAGES from "../../assets/img";
import SmallPopUp from "../../coreUI/usable-component/SmallPopup";
import { useState } from "react";
import "./popups-style.css";
import axios, { AxiosResponse } from "axios";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteClient } from "../../redux/Clients";

type Props = {
  id: string;
  show: string;
  deletePopup: () => void;

  deletePopupValue: string;
  setDeletePopup: React.Dispatch<React.SetStateAction<string>>;
};

const DeleteClient: React.FC<Props> = ({
  id,
  show,
  deletePopup,
  deletePopupValue,
  setDeletePopup,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      console.log(id);
      await dispatch(deleteClient({ id }));
      setDeletePopup("none");
    } catch (e) {
      console.log(e);
    }
  };
  const handleClose = () => {
    setDeletePopup("none");
    deletePopup();
  };
  return (
    <>
      <SmallPopUp show={deletePopupValue}>
        <p className="warning-text">
          Are you sure you want to delete this client?
        </p>
        <hr className="separator" />
        <div className="margin-cover">
          <div className="controllers">
            <button className="controllers-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="controllers-delete"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};
export default DeleteClient;
