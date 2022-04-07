import React from "react";
import { useState } from "react";
import IMAGES from "../../assets/img";
import "./dropdowns-style.css";
import { Client } from "./../../pages/Clients/clients";
import DeleteClient from "./../popups/DeleteClient";
import EditClient from "./../popups/EditClient";

type Props = {
  id: string;
  show: string;
  deletePopup: () => void;
  updatePopup: () => void;
};

interface IProps {
  client: Client;
}
const ClientDrop: React.FC<IProps> = ({ client }) => {
  const [Show, setShow] = useState<string>("none");
  const [deletePopup, setDeletePopup] = useState<string>("none");
  const [updatePopup, setUpdatePopup] = useState<string>("none");

  const handleDelete = () => {
    setShow("none");
    setDeletePopup("flex");
  };
  const handleUpdate = () => {
    setShow("none");
    setUpdatePopup("flex");
  };
  const closeDeletePopup = () => {
    setDeletePopup("none");
  };
  const closeUpdatePopup = () => {
    setUpdatePopup("none");
  };
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
            <span className="dropdown-btn-titleRed">Delete</span>
          </button>
        </div>
      </div>
      {deletePopup === "flex" && (
        <DeleteClient
          id={client._id}
          show={"flex"}
          deletePopup={() => closeDeletePopup()}
          deletePopupValue={deletePopup}
          setDeletePopup={setDeletePopup}
        />
      )}
      {updatePopup == "flex" && (
        <EditClient
          client={client}
          updatePopupValue={updatePopup}
          setUpdatePopup={setUpdatePopup}
          show={"flex"}
          updatePopup={() => closeUpdatePopup()}
        />
      )}
    </>
  );
};
export default ClientDrop;
