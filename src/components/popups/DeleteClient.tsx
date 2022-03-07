import React from "react";
import IMAGES from "../../assets/img";
import SmallPopUp from "../../coreUI/usable-component/SmallPopup";
import { useState } from "react";
import "./popups-style.css";
import axios, { AxiosResponse } from 'axios';
import { Box } from "@mui/material";

type Props = {
  id: string
  show: string
  deletePopup: () => void;

};

const DeleteClient: React.FC<Props> = ({ id, show, deletePopup }) => {
  const [Show, setShow] = useState<string>(show);

  let config = {
    headers: {
      "Content-Type": "application/json",
    }
    ,
    data: {
      "id": id

    }
  }

  const handleDelete = async () => {

    try {
      console.log(id);
      const response: AxiosResponse = await axios.delete('/api/deleteClient', config);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }

  }
  const handleClose = () => {
    setShow('none');
    deletePopup();
  };
  return (
    <>
      <SmallPopUp show={Show}>
        <p className="warning-text">
          Are you sure you want to delete this client?
        </p>
        <hr className="separator" />
        <div className="margin-cover">
          <div className="controllers">
            <button
              className="controllers-cancel"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="controllers-delete" onClick={() => { handleDelete() }}>
              Delete
            </button>
          </div>
        </div>
      </SmallPopUp>
    </>
  );
};
export default DeleteClient;
