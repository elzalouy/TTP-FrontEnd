import React, { useState, useRef, useEffect } from 'react';
import IMAGES from '../../assets/img';
import PopUp from '../../coreUI/usable-component/popUp';
import './popups-style.css';
import axios from 'axios';
import { Client } from './../../pages/Clients/Clients';
import { Box, Typography } from '@mui/material';

type Props = {};
interface IProps {
  client: Client;
  updatePopup: () => void;
  show: string;
}

interface updateInfo {
  id: string;
  image: string;
  clientName: string;
  projectsId: string[];
  createdAt: string;
}

const EditClient: React.FC<IProps> = ({ client, updatePopup, show }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [Show, setShow] = useState(show);
  const [Data, setData] = useState<updateInfo>({
    id: '',
    image: '',
    clientName: '',
    projectsId: [],
    createdAt: '',
  });

  useEffect(() => {
    Data.image = client.image;
    Data.clientName = client.clientName;
  }, []);
  const handleSubmit = async () => {
    try {
      Data.id = client._id;
      Data.projectsId = client.projectsId;
      Data.createdAt = client.createdAt;
      const res = await axios.put('/api/updateClient', Data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fileUpload = () => {
    fileInput.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setShow('none');
    updatePopup();
  };
  return (
    <>
      <PopUp show={Show} widthSize='30vw'>
        <form>
          <Box sx={{ paddingLeft: '15px' }}>
            <Box>
              <img
                className='closeIcon'
                width='9'
                height='9'
                src={IMAGES.closeicon}
                alt='closeIcon'
                onClick={handleClose}


              />
            </Box>

            <Typography className='new-client-title'>Edit Client</Typography>
            <Box
              style={{
                marginBottom: '20px',
                marginTop: '20px',
                cursor: 'pointer',
              }}
              onClick={fileUpload}
            >
              <input
                type='file'
                ref={fileInput}
                name='image'
                id='file'
                onChange={onChange}
                hidden
              />
              <img src={IMAGES.imgupload} alt='' />
            </Box>
            <p className='file-name'>{Data.image}</p>
            <Typography className='new-client-title'>Edit Client</Typography>
            <input
              className='input-client'
              type='text'
              placeholder={client.clientName}
              name='clientName'
              value={Data.clientName}
              onChange={onChange}
              required
            />

            <br />

            <Box className='controllers'>
              <button
                className='cancelBtn'
                onClick={handleClose}
              >
                Cancel
              </button>
              <button className='blackBtn' onClick={handleSubmit}>
                Done
              </button>
            </Box>

          </Box>
        </form>
      </PopUp>
    </>
  );
};

export default EditClient;
