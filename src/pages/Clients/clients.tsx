import {
  Box,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import IMAGES from "../../assets/img/Images";
import SearchBox from "../../coreUI/usable-component/Inputs/SearchBox";
import "./clients.css";
import CreateNewClient from "../../coreUI/usable-component/FormPopups/CreateNewClient";
import ClientCard from "./clientCard";

import { clientsDataSelector } from "../../redux/Clients/clients.selectors";
import { useAppSelector } from "../../redux/hooks";
import SelectInput from "../../coreUI/usable-component/Inputs/SelectInput";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { clientsActions, getAllClients } from "../../redux/Clients";
import { selectRole } from "../../redux/Auth";

type Props = {
  id: string;
};

export interface Client {
  _id: string;
  clientName: string;
  doneProject: string[];
  inProgressProject: string[] | number;
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
  const role = useAppSelector(selectRole);
  const clientData = useAppSelector(clientsDataSelector);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

  /*   useEffect(() => {
    dispatch(getAllClients(null));
  }, [dispatch]); */

  const [filter, setFilter] = useState<{
    sortDate: string;
  }>({
    sortDate: "",
  });
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
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
    <Grid container paddingX={4} paddingY={SM ? 8 : 4}>
      <Grid container xs={12} my={1} marginX={0} px={0}>
        <Typography variant="h2">Clients</Typography>
      </Grid>
      <Grid
        justifyItems={"flex-start"}
        alignItems="flex-start"
        marginTop={4}
        marginBottom={1}
        container
      >
        <Grid item xs={12} sm={4} md={2} lg={2} marginLeft={1}>
          <SearchBox
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>
      <Grid
        xs={12}
        item
        sx={{ height: "-webkit-fill-available", maxHeight: "100vh" }}
      >
        <Box className="all-clients">
          {clients &&
            clients?.map((clientInfo: Client) => (
              <>
                <ClientCard key={clientInfo._id} client={clientInfo} />
              </>
            ))}
          {role !== "PM" && <CreateNewClient />}
        </Box>
      </Grid>
    </Grid>
  );
};
export default Clients;
