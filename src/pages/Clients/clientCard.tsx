import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import IMAGES from "../../assets/img/index";

type Props = {};
const clientCard: React.FC<Props> = () => {
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
              <img src={IMAGES.avatarClients} alt="avatar" />
            </Box>
            <Box
              style={{
                marginLeft: "10px",
                color: "#783DBD",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Client Name</Typography>
              <Typography
                variant="body2"
                style={{ color: "#808191", fontSize: "12px" }}
              >
                12, Nov 2021
              </Typography>
            </Box>
          </Stack>
          <Typography style={{ padding: "12px" }}>
            <img src={IMAGES.moreClient} alt="more" />
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
            <Typography sx={{ fontWeight: "bold" }}>02</Typography>
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
            <Typography sx={{ fontWeight: "bold" }}>02</Typography>
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
            <Typography sx={{ fontWeight: "bold" }}>10</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default clientCard;
