import React from "react";
import IMAGES from "../../../assets/img/Images";
import SmallPopUp from "../../../coreUI/components/Popovers/Popup/SmallPopup";
import { useState } from "react";
// import "../../popups-style.css";
import axios, { AxiosResponse } from "axios";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteClient, selectEditClient } from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import deleteIcon from "../../../assets/img/deleteAlert.png";
import Button from "src/coreUI/components/Buttons/Button";

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
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setShow("none");
  };

  return (
    <>
      <SmallPopUp show={show}>
        <div className="imageAlert">
          <img src={deleteIcon} />
        </div>
        <p className="warning-text">
          Are you sure you want to delete this client?
        </p>
        <div className="margin-cover">
          <div className="controllers-small-popup">
            <Button
              type="cancel"
              size="medium"
              label="cancel"
              onClick={handleClose}
            />
            <Button
              type="delete"
              size="medium"
              label="delete"
              onClick={() => {
                handleDelete();
              }}
            />
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};
export default DeleteClient;
