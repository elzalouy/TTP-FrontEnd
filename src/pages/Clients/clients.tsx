import { Box, SelectChangeEvent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import IMAGES from "../../assets/img";
import SearchBox from "../../coreUI/usable-component/Inputs/SearchBox";
import "./clients.css";
import CreateNewClient from "./CreateNewClient";
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
    setSearch(e.target.value);
    dispatch(clientsActions.onSearch(e.target.value));
  };

  const handleChangeFilter = (e: SelectChangeEvent<string>) => {
    setFilter({
      sortDate: e.target.value,
    });
    dispatch(clientsActions.onSort(e.target.value));
  };
  useEffect(() => {
    if (clientData) {
      setClients(clientData);
    }
  }, [clientData]);
  return (
    <Grid container paddingX={4}>
      <Grid container xs={12} mt="2em">
        <Typography variant="h2">Clients</Typography>
      </Grid>
      <Grid
        justifyItems={"flex-start"}
        alignItems="flex-start"
        marginTop={4}
        marginBottom={1}
        container
      >
        <Grid item xs={1} sm={1} md={0.3} lg={0.3}>
          <Box
            sx={{
              borderRadius: "10px",
              display: "flex",
            }}
          >
            <img src={IMAGES.sortout} alt="sortout" />
          </Box>
        </Grid>
        <Grid
          item
          marginBottom={1}
          sx={{ bgcolor: "transparent" }}
          marginLeft={4}
          marginRight={2.8}
        >
          <SelectInput
            options={options}
            handleChange={handleChangeFilter}
            selectValue={filter.sortDate}
            label="Sort : "
            selectText={filter.sortDate}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={2} lg={2}>
          <SearchBox search={search} handleSearchChange={handleSearchChange} />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        item
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
