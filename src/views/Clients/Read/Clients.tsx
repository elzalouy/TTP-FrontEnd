import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchBox from "../../../coreUI/components/Inputs/Search/SearchBox";
import "./clients.css";
import CreateNewClient from "../Create/CreateNewClient";
import ClientCard from "./ClientCard";
import { selectFilteredClients } from "../../../models/Clients/clients.selectors";
import { useAppSelector } from "../../../models/hooks";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { clientsActions } from "../../../models/Clients";
import { selectRole } from "../../../models/Auth";
import { IClient } from "src/types/views/Client";

export const Clients = (props: any) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const role = useAppSelector(selectRole);
  const clientData = useAppSelector(selectFilteredClients);
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(clientsActions.onSearch(e.target.value));
  };

  return (
    <Grid container>
      <Grid container xs={12} marginX={0} px={0}>
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
        {clientData &&
          clientData?.map((clientInfo: IClient) => (
            <React.Fragment key={clientInfo._id}>
              <ClientCard client={clientInfo} />
            </React.Fragment>
          ))}
        {role !== "PM" && <CreateNewClient />}
      </Grid>
    </Grid>
  );
};
