import React, { useEffect, useRef, useState } from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import Button from "src/coreUI/components/Buttons/Button";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import { useAppSelector } from "../../../models/hooks";
import {
  selectAllClients,
  selectEditClient,
  updateClient,
  UpdateClientInterface,
} from "src/models/Clients";
import { EditCleintSchema } from "src/services/validations/clients.schema";
import { ToastError } from "src/coreUI/components/Typos/Alert";

interface Props {
  show: string;
  setShow: (val: string) => void;
}

const EditClient: React.FC<Props> = ({ show, setShow }) => {
  const editClient: UpdateClientInterface = useAppSelector(selectEditClient);
  const allClients = useAppSelector(selectAllClients);
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<{
    clientData: {
      clientName: string;
      _id: string;
      image: any;
      createdAt: string;
    };
    loading: boolean;
    errorAt: string;
  }>({
    clientData: {
      _id: "",
      image: null,
      createdAt: "",
      clientName: "",
    },
    loading: false,
    errorAt: "",
  });

  const [ImageView, setImageView] = useState<string | null>(null);

  useEffect(() => {
    let State = { ...state };
    if (editClient.image.name && editClient.image.size) {
      let image = setImageView(URL.createObjectURL(editClient.image));
      setState({ ...state, clientData: { ...editClient, image: image } });
    } else {
      setState({ ...state, clientData: editClient });
    }
  }, [dispatch, editClient]);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setState({ ...state, loading: true });
      let names = allClients.map((i) => i.clientName);
      let validationResult = EditCleintSchema(names).validate(state.clientData);
      if (validationResult.error) {
        console.log({ error: validationResult.error });
        setState({ ...state, loading: false });
        ToastError(validationResult.error.message);
      } else {
        console.log({ client: state.clientData });
        dispatch(updateClient(state.clientData));
        setState({
          ...state,
          clientData: {
            _id: "",
            clientName: "",
            createdAt: "",
            image: "",
          },
        });
        setImageView(null);
        setState({ ...state, loading: false });
        setShow("none");
      }
    } catch (error: any) {
      console.log({ error: error });
    }
  };

  const fileUpload = () => {
    fileInput.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var data: any = { ...state.clientData };
    if (e.target.name === "image") {
      let file: any = e.target.files;
      data.image = file[0];
      setImageView(URL.createObjectURL(file[0]));
    } else {
      data[e.target.name] = e.target.value;
    }
    setState({ ...state, clientData: data });
  };

  const handleClose = () => {
    setImageView(null);
    setState({ ...state, clientData: editClient });
    setShow("none");
  };

  return (
    <>
      <PopUp show={show} maxHeight="90%">
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
                state.clientData?.image === "null"
                  ? IMAGES.imgupload
                  : !ImageView
                  ? state.clientData?.image
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
            value={state.clientData.clientName}
            type="text"
            onChange={(e: any) => {
              onChange(e);
            }}
            // error={}
          />
          <Box className="controllers">
            <Button
              type="main"
              size="large"
              label="done"
              onClick={handleSubmit}
              // loading={}
              dataTestId="edit-client-submit-button"
            />
          </Box>
        </Box>
      </PopUp>
    </>
  );
};

export default EditClient;
