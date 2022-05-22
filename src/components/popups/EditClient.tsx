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
  }, [dispatch, client]);

  const handleSubmit = async (e: any) => {
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
    } catch (error: any) {}
  };

  const fileUpload = () => {
    fileInput.current?.click();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var data = { ...Data };
    if (e.target.name === "image") {
      let file: any = e.target.files;
      data.image = file[0];
      setImageView(URL.createObjectURL(file[0]));
    } else {
      data[e.target.name] = e.target.value;
    }
    setData(data);
  };
  const handleClose = () => {
    setShow("none");
  };
  return (
    <>
      <PopUp show={show} widthSize="30vw">
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
            required
            className="input-client"
            type="text"
            name="clientName"
            value={Data?.clientName ? Data.clientName : ""}
            onChange={onChange}
          />
          <br />
          <Box className="controllers">
            <button className="cancelBtn" onClick={handleClose}>
              Cancel
            </button>
            <button className="blackBtn" onClick={handleSubmit}>
              Done
            </button>
          </Box>
        </Box>
      </PopUp>
    </>
  );
};

export default EditClient;
