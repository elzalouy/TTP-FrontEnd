import React from "react";
import IMAGES from "../../../assets/img";
import SmallPopUp from "../Popup/SmallPopup";
import { useState } from "react";
import "./popups-style.css";
import axios, { AxiosResponse } from "axios";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteClient, selectEditClient } from "../../../redux/Clients";
import { useAppSelector } from "../../../redux/hooks";

type Props = {
  show: string;
  setShow: (val: string) => void;
};

const DeleteClient: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const editClient = useAppSelector(selectEditClient);
  const handleDelete = async () => {
    try {
      dispatch(deleteClient({ id: editClient._id }));
      setShow("none");
    } catch (e) {}
  };
  const handleClose = () => {
    setShow("none");
  };
  return (
    <>
      <SmallPopUp show={show}>
        <p className="warning-text">
          Are you sure you want to delete this client?
        </p>
        <hr className="separator" />
        <div className="margin-cover">
          <div className="controllers-small-popup">
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
