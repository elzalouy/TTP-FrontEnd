import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import IMAGES from "../../assets/img";
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
    </>
  );
};

export default CreateNewClient;
