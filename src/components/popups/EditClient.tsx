import React, { useState, useRef, useEffect } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./popups-style.css";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectEditClient, updateClient } from "../../redux/Clients";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  show: string;
  setShow: (val: string) => void;
}

const EditClient: React.FC<Props> = ({ show, setShow }) => {
  const client = useAppSelector(selectEditClient);
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);
  const [Data, setData] = useState<any>();

  const [ImageView, setImageView] = useState<string | null>(null);
  useEffect(() => {
    setData(client);
  }, [client]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatch(updateClient(Data));
      setData({
        _id: "",
        clientName: "",
        createdAt: "",
        image: "",
      });
      setImageView(null);
      setShow("none");
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
      setData({ image: file[0], ...Data });
      setImageView(URL.createObjectURL(file[0]));
    } else {
      setData({ ...Data, [e.target.name]: e.target.value });
    }
  };
  const handleClose = () => {
    setShow("none");
  };
  return (
    <>
      <PopUp show={show} widthSize="30vw">
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
                src={ImageView ? ImageView : Data?.image}
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
              value={Data?.clientName ? Data.clientName : ""}
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
