import React, { useState, useRef, useEffect } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./popups-style.css";
import axios from "axios";
import { Client } from "./../../pages/Clients/clients";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateClient } from "../../redux/Clients";

interface Props {
  client: Client;
  updatePopup: () => void;
  show: string;
  updatePopupValue?: string;
  setUpdatePopup: React.Dispatch<React.SetStateAction<string>>;
}

interface updateInfo {
  _id: string;
  clientName: string;
  createdAt: string;
  image: string;
}

const EditClient: React.FC<Props> = ({
  client,
  updatePopup,
  show,
  updatePopupValue = "none",
  setUpdatePopup,
}) => {
  console.log({ updatePopupValue });
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);
  const [display, setShow] = useState(updatePopupValue);
  const [Data, setData] = useState<updateInfo>({
    _id: "",
    clientName: "",
    createdAt: "",
    image: "",
  });

  const [ImageView, setImageView] = useState<string | null>(null);
  useEffect(() => {
    setData(client);
  }, [client]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      let formData = new FormData();
      formData.append("clientName", Data.clientName);
      formData.append("image", Data.image);
      formData.append("_id", Data._id);
      await dispatch(updateClient(formData));
      setData({
        _id: "",
        clientName: "",
        createdAt: "",
        image: "",
      });
      setImageView(null);
      setUpdatePopup("none");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fileUpload = () => {
    fileInput.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      let file: any = e.target.files;
      setData({ ...Data, image: file[0] });
      setImageView(URL.createObjectURL(file[0]));
    } else {
      setData({ ...Data, [e.target.name]: e.target.value });
    }
  };
  const handleClose = () => {
    setUpdatePopup("none");
    updatePopup();
  };
  return (
    <>
      <PopUp show={updatePopupValue} widthSize="30vw">
        <form onSubmit={handleSubmit}>
          <Box sx={{ paddingLeft: "15px" }}>
            <Box>
              <img
                className="closeIcon"
                width="9"
                height="9"
                src={IMAGES.closeicon}
                alt="closeIcon"
                onClick={handleClose}
              />
            </Box>

            <Typography className="new-client-title">Edit Client</Typography>
            <Box
              style={{
                marginBottom: "20px",
                marginTop: "20px",
                cursor: "pointer",
              }}
              onClick={fileUpload}
            >
              <input
                type="file"
                ref={fileInput}
                name="image"
                id="file"
                onChange={onChange}
                hidden
              />
              <img
                src={ImageView ? ImageView : Data.image}
                style={{
                  width: "9em",
                  height: "9em",
                }}
                alt=""
              />
            </Box>

            <input
              className="input-client"
              type="text"
              name="clientName"
              value={Data.clientName}
              onChange={onChange}
              required
            />

            <br />

            <Box className="controllers">
              <button className="cancelBtn" onClick={handleClose}>
                Cancel
              </button>
              <button className="blackBtn">Done</button>
            </Box>
          </Box>
        </form>
      </PopUp>
    </>
  );
};

export default EditClient;
