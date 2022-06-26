import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import IMAGES from "../../../assets/img/Images";
import PopUp from "../../../coreUI/usable-component/Popup/PopUp";
import "./CreateNewClient.css";
import { useDispatch } from "react-redux";
import {
  clientsDataSelector,
  creatClient,
  selectLoadingClient,
} from "../../../redux/Clients";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "react-toastify";
import { generateID } from "../../../helpers/IdGenerator";

type Props = {};
interface client {
  image: File | null | any;
  clientName: string;
}

interface headers {}
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
      >
        <img src={IMAGES.plus} alt="add" />
        <Typography>Create new client</Typography>
      </Box>

      <PopUp overflowY={true} show={Show} widthSize="491px">
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
              <button className="blackBtn-client">
                {loadingClient ? (
                  <CircularProgress
                    sx={{
                      color: "white",
                      padding: "0px",
                      height: "25px !important",
                      width: "25px !important",
                    }}
                  />
                ) : (
                  "Done"
                )}
              </button>
            </Box>
          </form>
        </Box>
      </PopUp>
    </>
  );
};

export default CreateNewClient;
