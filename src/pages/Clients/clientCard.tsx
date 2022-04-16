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
  const {
    clientName,
    createdAt,
    doneProject,
    inProgressProject,
    inProgressTask,
  } = client;
  return (
    <Box>
      <Box paddingX="18px" paddingTop="18px" className="client-card">
        <Box className="cl-card-header">
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
              <img
                src={!client.image ? IMAGES.avatarClients : client.image}
                alt="avatar"
                style={{
                  width: "52px",
                  height: "52pxp",
                  borderRadius: "10px",
                }}
              />
            </Box>
            <Box
              style={{
                marginLeft: "10px",
                color: "#783DBD",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
                {clientName}
              </Typography>
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
        <Grid
          container
          className="counter-container"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Grid item style={{ textAlign: "center" }}>
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
          <Grid
            item
            width="1px !important"
            paddingTop={0.5}
            overflow={"hidden"}
            sx={{ opacity: 0.5 }}
          >
            <hr
              color="#88888885"
              style={{ width: "1px !important" }}
              className="hrVertical"
            />
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
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
          <Grid
            item
            width="1px !important"
            paddingTop={0.5}
            overflow={"hidden"}
            sx={{ opacity: 0.5 }}
          >
            <hr
              color="#88888885"
              style={{ width: "1px !important" }}
              className="hrVertical"
            />
          </Grid>

          <Grid item style={{ textAlign: "center" }}>
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
