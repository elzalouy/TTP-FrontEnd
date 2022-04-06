import { Box, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./CreateNewClient.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { creatClient } from "../../redux/Clients";

type Props = {};
interface client {
  // id: string;
  // image: string;
  clientName: string;
  projectsId: [];
}

interface headers {}
const CreateNewClient: React.FC<Props> = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const [Data, setData] = useState<client>({
    // id: "",
    // image: "",
    clientName: "",
    projectsId: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ Data });
    await dispatch(creatClient(Data));
  };

  const fileUpload = () => {
    fileInput.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Box
        className="add-new-cli"
        onClick={() => {
          setShow("flex");
        }}
      >
        <img src={IMAGES.plus} alt="add" />
        <Typography>Create new client</Typography>
      </Box>

      <PopUp show={Show} widthSize="30vw">
        <Box sx={{ paddingLeft: "15px" }}>
          {/* <Box>
            <img
              className="closeIcon"
              width="9"
              height="9"
              src={IMAGES.closeicon}
              alt="closeIcon"
              onClick={() => {
                setShow("none");
              }}
            />
          </Box> */}
          <form onSubmit={handleSubmit}>
            <Typography className="new-client-title">Add new client</Typography>
            {/* <Box
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
              <img src={IMAGES.imgupload} alt="" />
            </Box> */}
            {/* <p className="file-name">{Data.image}</p> */}
            <label className="label-client">Client Name</label>
            <input
              className="input-client"
              type="text"
              placeholder="Ex: Ahmad Ali"
              name="clientName"
              value={Data.clientName}
              onChange={onChange}
              required
            />

            <br />

            <Box className="controllers">
              <button
                className="cancelBtn"
                onClick={() => {
                  setShow("none");
                }}
              >
                Cancel
              </button>
              <button className="blackBtn">Done</button>
            </Box>
          </form>
        </Box>
      </PopUp>
    </>
  );
};

export default CreateNewClient;
