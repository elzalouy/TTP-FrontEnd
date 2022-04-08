import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import IMAGES from "../../assets/img";
import { Client } from "./clients";
import ClientDrop from "./../../components/dropdowns/ClientDrop";
import moment from "moment";

interface IProps {
  client: Client;
}

const ClientCard: React.FC<IProps> = ({ client }) => {
  // console.log({ clientTest: client });
  const {
    clientName,
    createdAt,
    doneProject,
    inProgressProject,
    inProgressTask,
  } = client;
  return (
    <Box>
      <Box className="client-card">
        <Box className="cl-card-header">
          <Stack
            direction="row"
            marginLeft="2em"
            marginTop="12px"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
              <img
                src={!client.image ? IMAGES.avatarClients : client.image}
                alt="avatar"
                style={{
                  width: "4em",
                  height: "4em",
                  borderRadius: ".5em",
                }}
              />
            </Box>
            <Box
              style={{
                marginLeft: "10px",
                color: "#783DBD",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>{clientName}</Typography>
              <Typography
                variant="body2"
                style={{ color: "#808191", fontSize: "12px" }}
              >
                {moment(createdAt).format("d MMMM yyyy")}
              </Typography>
            </Box>
          </Stack>
          <Typography style={{ padding: "12px" }}>
            <ClientDrop client={client} />
          </Typography>
        </Box>

        <Grid container className="counter-container">
          <Grid
            item
            xs={4}
            className="InProgress"
            style={{ textAlign: "center" }}
          >
            <Typography
              sx={{ fontSize: 11 }}
              variant="caption"
              style={{ color: "#808191" }}
              className="counter-title"
            >
              In Progress Task
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {inProgressTask?.length}
            </Typography>
          </Grid>

          <hr
            style={{ color: "#B9B9B9", fontWeight: "normal" }}
            className="hrVertical"
          />
          <Grid
            item
            xs={4.5}
            className="InProgress"
            style={{ textAlign: "center" }}
          >
            <Typography
              sx={{ fontSize: 11 }}
              variant="caption"
              style={{ color: "#808191" }}
              className="counter-title"
            >
              In Progress Project
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {inProgressProject?.length}
            </Typography>
          </Grid>

          <hr
            style={{ color: "#B9B9B9", fontWeight: "normal" }}
            className="hrVertical"
          />

          <Grid item xs={3.5} className="Done" style={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: 11 }}
              variant="caption"
              style={{ color: "#808191" }}
              className="counter-title"
            >
              Done Project
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {doneProject?.length}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ClientCard;
