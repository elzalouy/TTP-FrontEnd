import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchBox from "../../../coreUI/components/Inputs/Search/SearchBox";
import "./clients.css";
import CreateNewClient from "../Create/CreateNewClient";
import ClientCard from "./ClientCard";
import { clientsDataSelector } from "../../../models/Clients/clients.selectors";
import { useAppSelector } from "../../../models/hooks";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { clientsActions } from "../../../models/Clients";
import { selectRole } from "../../../models/Auth";
import { IClient } from "src/types/views/Client";

export const Clients = (props: any) => {
  const dispatch = useDispatch();
  const [clients, setClients] = useState<IClient[]>([]);
  const [search, setSearch] = useState<string>("");
  const role = useAppSelector(selectRole);
  const clientData = useAppSelector(clientsDataSelector);
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(clientsActions.onSearch(e.target.value));
  };

  useEffect(() => {
    if (clientData) {
      setClients(clientData);
    }
  }, [clientData]);

  return (
    <Grid container pb={SM ? 5 : 4}>
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
            size={"medium"}
          />
        </Grid>
      </Grid>
      <Grid container className="all-clients" gap={"1%"}>
        {clients &&
          clients?.map((clientInfo: IClient) => (
            <>
              <ClientCard key={clientInfo._id} client={clientInfo} />
            </>
          ))}
        {role !== "PM" && <CreateNewClient />}
      </Grid>
    </Grid>
  );
};
