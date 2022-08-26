import React, { useState, useRef, useEffect } from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
// import "../../popups-style.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  selectEditClient,
  selectLoadingClient,
  updateClient,
} from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import Button from "src/coreUI/components/Buttons/Button";
import Input from "src/coreUI/components/Inputs/Textfield/Input";

interface Props {
  show: string;
  setShow: (val: string) => void;
}

//SX Styles Objects

const editClientLoadingStyles = {
  color: "white",
  padding: "0px",
  height: "25px !important",
  width: "25px !important",
};

const EditClient: React.FC<Props> = ({ show, setShow }) => {
  const client = useAppSelector(selectEditClient);
  const loadingClient = useAppSelector(selectLoadingClient);
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
    } catch (error: any) { }
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
              src={
                Data?.image === "null"
                  ? IMAGES.imgupload
                  : !ImageView
                    ? Data?.image
                    : ImageView
              }
              style={{
                width: "9em",
                height: "9em",
              }}
              alt="Avatar"
            />
          </Box>
          <Input
            label="Client Name"
            placeholder="Ex : Ahmed Ali"
            inputName="clientName"
            custom={{
              value: Data?.clientName ? Data.clientName : "",
              onChangeEvent: (e: any) => onChange(e)
            }}
            required
            wrapper
          />
          <Box className="controllers">
            <Button
              type="main"
              size="large"
              label="done"
              onClick={handleSubmit}
              loading={loadingClient}
              dataTestId="client-submit-button"
            />
          </Box>
        </Box>
      </PopUp>
    </>
  );
};

export default EditClient;
