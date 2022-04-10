import { Box, SelectChangeEvent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import IMAGES from "../../assets/img";
import SearchBox from "../../components/SearchBox";
import "./clients.css";
import CreateNewClient from "./CreateNewClient";
import axios, { AxiosResponse } from "axios";
// import DeleteClient from './DeleteClient';
import ClientCard from "./clientCard";

import { clientsDataSelector } from "../../redux/Clients/clients.selectors";
import { useAppSelector } from "../../redux/hooks";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { clientsActions } from "../../redux/Clients";

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
    value: "asc",
    text: "Ascending",
  },
  {
    id: "2",
    value: "des",
    text: "Descending",
  },
];

const Clients: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [clients, setClients] = useState<Client[]>([]);
  const clientData = useAppSelector(clientsDataSelector);
  const [filter, setFilter] = useState<{
    sortDate: string;
  }>({
    sortDate: "",
  });
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log({ value: e.target.value });
    setSearch(e.target.value);
    dispatch(clientsActions.onSearch(e.target.value));
  };

  const handleChangeFilter = (e: SelectChangeEvent<string>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    console.log({ value: e.target.value });
    dispatch(clientsActions.onSort(e.target.value));
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
      sx={{ height: "fit-content", bgcolor: "#fafafb", ml: "2em" }}
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
        {/* <Grid item xs={2} sx={{ ml: "1em" }}>
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
        </Grid> */}
        <Grid item xs={2} sx={{ ml: "2em" }}>
          <SelectInput
            options={options}
            handleChange={handleChangeFilter}
            name="sortDate"
            selectValue={filter.sortDate}
            placeholder=""
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
            <SearchBox
              search={search}
              handleSearchChange={handleSearchChange}
            ></SearchBox>
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
