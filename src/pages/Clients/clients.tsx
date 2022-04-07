import { Box, SelectChangeEvent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import IMAGES from "../../assets/img";
import SearchBox from "../../components/SearchBox";
import "./clients.css";
import CreateNewClient from "./CreateNewClient";
import axios, { AxiosResponse } from "axios";
// import DeleteClient from './DeleteClient';
import ClientCard from "./clientCard";

import { clientsActions } from "../../redux/Clients";
import { clientsDataSelector } from "../../redux/Clients/clients.selectors";
import { useAppSelector } from "../../redux/hooks";
import SelectInput from "../../coreUI/usable-component/SelectInput";
import Grid from "@mui/material/Grid";

type Props = {
  id: string;
};

export interface Client {
  _id: string;
  clientName: string;
  doneProject: string[];
  inProgressProject: string[];
  inProgressTask: string[];
  createdAt: string;
  image: string;
}

const options: { id: string; value: string; text: string }[] = [
  {
    id: "1",
    value: "option 1",
    text: "Option 1",
  },
  {
    id: "2",
    value: "option 2",
    text: "Option 2",
  },
  {
    id: "3",
    value: "option 3",
    text: "Option 3",
  },
  {
    id: "4",
    value: "option 4",
    text: "Option 4",
  },
  {
    id: "5",
    value: "option 5",
    text: "Option 5",
  },
  {
    id: "6",
    value: "option 6",
    text: "Option 6",
  },
];

const Clients: React.FC<Props> = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const clientData = useAppSelector(clientsDataSelector);
  const [filter, setFilter] = useState<{
    sortBy: string;
    sortDate: string;
  }>({
    sortBy: "",
    sortDate: "",
  });

  const handleChangeFilter = (e: SelectChangeEvent<string>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (clientData) {
      setClients(clientData);
    }
  }, [clientData]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "fit-content", bgcolor: "#fafafb" }}
    >
      {/* <Box className="clients-page" sx={{ width: "100%" }}> */}
      {/* <Box sx={{ paddingTop: "30px" }}> */}
      <Grid item xs={12} mt="2em">
        <Typography
          variant="h2"
          style={{
            margin: "10px 0",
            // paddingBottom: "20px",
          }}
        >
          Clients
        </Typography>
      </Grid>
      <Grid item container>
        <Grid item xs={"auto"}>
          <Box
            sx={{
              borderRadius: "10px",
              display: "flex",
              border: "1px solid #ccc",
            }}
          >
            <img src={IMAGES.sortout} alt="sortout" />
          </Box>
        </Grid>
        <Grid item xs={2} sx={{ ml: "1em" }}>
          <SelectInput
            options={options}
            handleChange={handleChangeFilter}
            name="sortBy"
            selectValue={filter.sortBy}
            placeholder={
              <>
                <span style={{ color: "#827e7e" }}>Sort by:</span>{" "}
                <strong>A to Z</strong>
              </>
            }
            boxStyle={{
              display: "flex",
              justifyContent: "space-between",
            }}
            selectStyle={{
              borderRadius: ".6em",
              borderColor: "#eeeeee",
              "& .MuiInputBase-input": {
                bgcolor: "#fff",
                boxShadow: "0px 1px 4px 1px #0000000d",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#eeeeee",
              },
              "&.Mui-focused ": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#eeeeee",
                  "&:hover": {
                    borderColor: "#eeeeee",
                  },
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={2} sx={{ ml: "2em" }}>
          <SelectInput
            options={options}
            handleChange={handleChangeFilter}
            name="sortDate"
            selectValue={filter.sortDate}
            placeholder={
              <>
                <span style={{ color: "#827e7e" }}>Date:</span>{" "}
                <strong>Oldest to Newest</strong>
              </>
            }
            boxStyle={{
              display: "flex",
              justifyContent: "space-between",
            }}
            selectStyle={{
              borderRadius: ".6em",
              borderColor: "#eeeeee",
              "& .MuiInputBase-input": {
                bgcolor: "#fff",
                boxShadow: "0px 1px 4px 1px #0000000d",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#eeeeee",
              },
              "&.Mui-focused ": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#eeeeee",
                  "&:hover": {
                    borderColor: "#eeeeee",
                  },
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Box
            style={{
              backgroundColor: "#fff",
              marginLeft: "10px",
              width: "280px",
            }}
          >
            <SearchBox></SearchBox>
          </Box>
        </Grid>
        {/* </Box> */}
      </Grid>
      <Grid
        item
        xs={11}
        sx={{ height: "-webkit-fill-available", maxHeight: "100vh" }}
      >
        <Box className="all-clients">
          {clients?.map((clientInfo: Client) => (
            <>
              <ClientCard key={clientInfo._id} client={clientInfo} />
            </>
          ))}
          <CreateNewClient />
        </Box>
      </Grid>
      {/* </Box> */}
      {/* </Box> */}
    </Grid>
  );
};
export default Clients;
