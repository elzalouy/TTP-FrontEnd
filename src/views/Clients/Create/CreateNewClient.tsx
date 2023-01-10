import { Box, Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "src/coreUI/components/Buttons/Button";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import { IClientState } from "src/types/views/Client";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { generateID } from "../../../helpers/IdGenerator";
import {
  selectAllClients,
  creatClient,
  selectLoadingClient,
} from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import "./CreateNewClient.css";
import { ToastError } from "src/coreUI/components/Typos/Alert";

const CreateNewClient: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const allClients = useAppSelector(selectAllClients);
  const loadingClient = useAppSelector(selectLoadingClient);
  const [error, setError] = useState<boolean>(false);
  const [clientData, setClientData] = useState<IClientState>({
    image: null,
    clientName: "",
  });

  const [ImageView, setImageView] = useState<string | null>(null);

  const onClearAndClose = () => {
    setShow("none");
    setImageView(null);
    setClientData({
      image: null,
      clientName: "",
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("clientName", clientData.clientName);
    formData.append("image", clientData.image);
    let checkName = allClients.find(
      (client) => client.clientName === clientData.clientName
    );
    if (!checkName) {
      //Initial guard for name duplication
      if (clientData.clientName.length !== 0) {
        dispatch(creatClient({ data: formData, onClearAndClose }));
      } else {
        setError(true);
      }
    } else {
      ToastError("Client name already exist");
    }
  };

  const fileUpload = () => {
    fileInput.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      let file: any = e.target.files;
      setClientData({ ...clientData, image: file[0] });
      setImageView(URL.createObjectURL(file[0]));
    } else {
      setClientData({ ...clientData, [e.target.name]: e.target.value });
      if (e.target.value.length > 0) {
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  return (
    <Grid item mt={2} xl={3.9} lg={3.9} md={5.9} sm={5.9} xs={12}>
      <Box
        className="add-new-cli"
        onClick={() => {
          setShow("flex");
        }}
        data-test-id="create-client-button"
      >
        <img src={IMAGES.plus} alt="add" />
        <Typography>Create new client</Typography>
      </Box>
      <PopUp show={Show} maxWidthSize="491px">
        <Box>
          <Box position={"relative"}>
            <div
              className="closeIconContainer"
              onClick={() => {
                setShow("none");
                setImageView(null);
                setClientData({
                  image: null,
                  clientName: "",
                });
                setShow("none");
                setError(false);
              }}
            >
              <img
                className="closeIcon"
                width="9"
                height="9"
                src={IMAGES.closeicon}
                alt="closeIcon"
              />
            </div>
          </Box>
          <form id="client" onSubmit={handleSubmit}>
            <Typography className="new-client-title">Add new client</Typography>
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
                src={ImageView ? ImageView : IMAGES.imgupload}
                style={{
                  width: "9em",
                  height: "9em",
                }}
                alt=""
              />
            </Box>
            <Input
              label="Client Name"
              placeholder="Ex : Ahmed Ali"
              inputName="clientName"
              dataTestId="create-client-name"
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
                loading={loadingClient}
                dataTestId="create-client-submit-button"
                form={{
                  name: "client",
                  type: "submit",
                }}
              />
            </Box>
          </form>
        </Box>
      </PopUp>
    </Grid>
  );
};

export default CreateNewClient;
