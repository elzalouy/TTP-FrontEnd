import React from "react";
import { useState } from "react";
import IMAGES from "../../assets/img";
import "./dropdowns-style.css";
import { Client } from './../../pages/Clients/clients';
import DeleteClient from './../popups/DeleteClient'
import EditClient from './../popups/EditClient'

type Props = {
  id: string
  show: string
  deletePopup: () => void;
  updatePopup: () => void;

};

interface IProps {
  client: Client
}
const ClientDrop: React.FC<IProps> = ({ client }) => {
  const [Show, setShow] = useState<string>("none");
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [updatePopup, setUpdatePopup] = useState<boolean>(false);

  const handleDelete = () => {
    setShow('none');
    setDeletePopup(!false);
  }
  const handleUpdate = () => {
    setShow('none');
    setUpdatePopup(!false);
  }
  const closeDeletePopup = () => {
    setDeletePopup(false);
  }
  const closeUpdatePopup = () => {
    setUpdatePopup(false);
  }
  return (
    <>
      <div className="dropdown-cover">
        <button
          className="dropdown-moreBtn"
          onClick={() => {
            if (Show === "none") setShow("flex");
            else setShow("none");
          }}
        >
          <img src={IMAGES.more} alt="more" />
        </button>

        <div className="dropdown-container" style={{ display: Show }}>
          <button className="dropdown-btn" onClick={() => handleUpdate()}>
            <img
              className="dropdown-btn-icon grey-icon"
              src={IMAGES.edit}
              alt="icon"
            />
            <span className="dropdown-btn-titleGrey">Edit client</span>
          </button>

          <button className="dropdown-btn" onClick={() => handleDelete()}>
            <img
              className="dropdown-btn-icon"
              src={IMAGES.deleteicon2}
              alt="icon"
              width="20px"
              height="20px"
            />
            <span className="dropdown-btn-titleRed" >Delete</span>
          </button>
        </div>

      </div>
      {deletePopup && <DeleteClient id={client._id} show={"flex"} deletePopup={() => closeDeletePopup()} />}
      {updatePopup && <EditClient client={client} show={"flex"} updatePopup={() => closeUpdatePopup()} />}
    </>
  );
};
export default ClientDrop;
