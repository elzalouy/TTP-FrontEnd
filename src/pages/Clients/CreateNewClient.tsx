import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import "./CreateNewClient.css";

type Props = {};

const CreateNewClient: React.FC<Props> = () => {
  const [Show, setShow] = useState("none");
  const [Data, setData] = useState<string>("");
  const [Names, setNames] = useState<string[]>([]);
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
          <Box>
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
          </Box>

          <Typography className="new-client-title">Add new client</Typography>
          <Box style={{ marginBottom: "20px", marginTop: "20px" }}>
            <img src={IMAGES.imgupload} alt="" />
          </Box>
          <label className="label-client">Client Name</label>
          <input
            className="input-client"
            type="text"
            placeholder="Ex: Ahmad Ali"
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
            <button className="blackBtn" onClick={() => {}}>
              Done
            </button>
          </Box>
        </Box>
      </PopUp>
    </>
  );
};

export default CreateNewClient;
