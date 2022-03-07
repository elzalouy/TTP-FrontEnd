import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import IMAGES from "../../assets/img";
import { Client } from './Clients';
import ClientDrop from './../../components/dropdowns/ClientDrop'

interface IProps {
  client: Client
}

const ClientCard: React.FC<IProps> = ({ client }) => {
  const [tasksNumber, setTasksNumber] = useState(0);
  const [inProgressProjects, setInProgressProjects] = useState(0);
  const [doneProjects, setDoneProjects] = useState(0);

  var t = new Date(client.createdAt);


  var formatted =
    (t.toString().split(' ')[0])
    + ', ' + ('0' + t.getDate()).slice(-2)
    + '/' + ('0' + (t.getMonth() + 1)).slice(-2)
    + '/' + (t.getFullYear());

  return (

    <Box>
      <Box className="client-card">
        <Box className="cl-card-header">
          <Stack
            direction="row"
            marginLeft="12px"
            marginTop="12px"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
              {client.image.includes('') ? < img src={IMAGES.avatarClients} alt="avatar" /> : <img src={client.image} alt="avatar" />
              }

            </Box>
            <Box
              style={{
                marginLeft: "10px",
                color: "#783DBD",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>{client.clientName}</Typography>
              <Typography
                variant="body2"
                style={{ color: "#808191", fontSize: "12px" }}
              >

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
            <Typography sx={{ fontWeight: "bold" }}>{tasksNumber}</Typography>
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
            <Typography sx={{ fontWeight: "bold" }}>{inProgressProjects}</Typography>
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
            <Typography sx={{ fontWeight: "bold" }}>{doneProjects}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ClientCard;
