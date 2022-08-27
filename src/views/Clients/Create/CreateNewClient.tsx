import { Box, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "src/coreUI/components/Buttons/Button";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { generateID } from "../../../helpers/IdGenerator";
import {
  clientsDataSelector,
  creatClient,
  selectLoadingClient
} from "../../../models/Clients";
import { useAppSelector } from "../../../models/hooks";
import "./CreateNewClient.css";

type Props = {};
interface client {
  image: File | null | any;
  clientName: string;
}

interface headers { }
const CreateNewClient: React.FC<Props> = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [Show, setShow] = useState("none");
  const allClients = useAppSelector(clientsDataSelector);
  const loadingClient = useAppSelector(selectLoadingClient);
  const [Data, setData] = useState<client>({
    image: null,
    clientName: "",
  });

  const [ImageView, setImageView] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("clientName", Data.clientName);
    formData.append("image", Data.image);
    let checkName = allClients.find(
      (client) => client.clientName === Data.clientName
    );
    if (!checkName) {
      dispatch(creatClient(formData));
      setImageView(null);
      setData({
        image: null,
        clientName: "",
      });
      setShow("none");
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
    if (e.target.name === "image") {
      let file: any = e.target.files;
      setData({ ...Data, image: file[0] });
      setImageView(URL.createObjectURL(file[0]));
    } else {
      setData({ ...Data, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
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

      <PopUp show={Show} widthSize="491px">
        <Box>
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
          <form onSubmit={handleSubmit}>
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
              dataTestId="client-name"
              inputName="clientName"
              custom={{
                value: Data.clientName,
                onChangeEvent: (e: any) => {
                  onChange(e);
                }
              }}
              required
              wrapper
            />
            <Box className="controllers">
              <Button
                type="main"
                size="large"
                label="done"
                loading={loadingClient}
                dataTestId="client-submit-button"
              />
            </Box>
          </form>
        </Box>
      </PopUp>
    </>
  );
};

export default CreateNewClient;
