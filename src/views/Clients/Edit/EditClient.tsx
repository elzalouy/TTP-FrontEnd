import React, { useEffect, useRef, useState } from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import { IClient } from "src/types/views/Client";
import { useAppSelector } from "../../../models/hooks";
import {
  selectAllClients,
  selectEditClient,
  selectLoadingClient,
  updateClient,
  UpdateClientInterface,
} from "src/models/Clients";
import { toast } from "react-toastify";
import { generateID } from "src/helpers/IdGenerator";

interface Props {
  show: string;
  setShow: (val: string) => void;
}

const EditClient: React.FC<Props> = ({ show, setShow }) => {
  const editClient: UpdateClientInterface = useAppSelector(selectEditClient);
  const allClients = useAppSelector(selectAllClients);
  const loadingClient = useAppSelector(selectLoadingClient);
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [clientData, setClientData] = useState<IClient>({
    image: null,
    clientName: "",
  });
  let checkName = allClients.find((client) => {
    if (editClient.clientName === clientData.clientName) return;
    return client.clientName === clientData.clientName;
  });
  const [ImageView, setImageView] = useState<string | null>(null);

  useEffect(() => {
    if (editClient.image.name && editClient.image.size) {
      let image = setImageView(URL.createObjectURL(editClient.image));
      setClientData({ ...editClient, image: image });
    } else {
      setClientData(editClient);
    }
  }, [dispatch, editClient]);

  const handleSubmit = async (e: any) => {
    if (!checkName) {
      try {
        e.preventDefault();
        dispatch(updateClient(clientData));
        setClientData({
          _id: "",
          clientName: "",
          createdAt: "",
          image: "",
        });
        setImageView(null);
        setShow("none");
      } catch (error: any) {}
    } else {
      toast.error("Client name already exist", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
    }
  };

  const fileUpload = () => {
    fileInput.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var data: any = { ...clientData };
    if (e.target.name === "image") {
      let file: any = e.target.files;
      data.image = file[0];
      setImageView(URL.createObjectURL(file[0]));
    } else {
      data[e.target.name] = e.target.value;
      if (e.target.value.length > 0) {
        setError(false);
      } else {
        setError(true);
      }
    }
    setClientData(data);
  };

  const handleClose = () => {
    setImageView(null);
    setClientData(editClient);
    setShow("none");
    setError(false);
  };

  return (
    <>
      <PopUp show={show}>
        <Box>
          <Box position={"relative"}>
            <div className="closeIconContainer" onClick={handleClose}>
              <img
                className="closeIcon"
                width="9"
                height="9"
                src={IMAGES.closeicon}
                alt="closeIcon"
              />
            </div>
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
                clientData?.image === "null"
                  ? IMAGES.imgupload
                  : !ImageView
                  ? clientData?.image
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
            dataTestId="edit-client-name"
            value={clientData.clientName}
            type="text"
            onChange={(e: any) => {
              onChange(e);
            }}
            error={error ? "true" : undefined}
          />
          {error && (
            <p className="popup-error">Please enter a name for the client</p>
          )}
          <Box className="controllers">
            <Button
              type="main"
              size="large"
              label="done"
              onClick={handleSubmit}
              loading={loadingClient}
              dataTestId="edit-client-submit-button"
            />
          </Box>
        </Box>
      </PopUp>
    </>
  );
};

export default EditClient;
