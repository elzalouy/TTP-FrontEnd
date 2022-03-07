import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import IMAGES from "../../assets/img";
import SearchBox from "../../components/SearchBox";
import "./clients.css";
import CreateNewClient from "./CreateNewClient";
import axios, { AxiosResponse } from 'axios';
// import DeleteClient from './DeleteClient';
import ClientCard from "./clientCard";


type Props = {
  id: string
};

export interface Client {
  clientName: string,
  image: string,
  projectsId: string[],
  createdAt: string,
  _id: string
}

const Clients: React.FC<Props> = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchData = async () => {
    try {
      const response: AxiosResponse = await axios.get('/api/getAllClients');
      setClients(response.data);
    }
    catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    fetchData();
  }, []);
  return (


    <Box className="clients-page" sx={{ width: "100%" }}>
      <Box sx={{ paddingTop: "50px" }}>
        <Typography
          variant="h2"
          style={{
            margin: "10px 0",
            paddingBottom: "20px",
          }}
        >
          Clients
        </Typography>
        <Box className="clients-settings">
          <Box className="filter-icon">
            <img src={IMAGES.sortout} alt="sortout" />
          </Box>
          <Box className="clients-option">
            <label>Sort By:</label>
            <select className="select-filter" name="color">
              <option value="A to Z">A to Z</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
          </Box>
          <Box className="clients-option">
            <label>Date:</label>
            <select
              style={{ paddingRight: "10px" }}
              className="select-filter"
              name="color"
            >
              <option value="Oldest to Newest">Oldest to Newest</option>
              <option value="option 2">Option 2</option>
              <option value="option 3">Option 3</option>
            </select>
          </Box>

          <Box
            style={{
              backgroundColor: "#fafafa",
              marginLeft: "10px",
              width: "280px",
            }}
          >
            <SearchBox></SearchBox>
          </Box>
        </Box>
        <Box className="all-clients">
          {clients.map((clientInfo: Client) => (
            <>
              <ClientCard client={clientInfo} />


            </>
          ))}
          <CreateNewClient />
        </Box>
      </Box>
    </Box>
  );
};
export default Clients;
