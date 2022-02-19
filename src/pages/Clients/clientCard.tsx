import { Stack, Typography } from "@mui/material";
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
            marginLeft="20px"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Box>
              <img src={IMAGES.clients} alt="more" />
            </Box>
            <Box
              style={{
                marginLeft: "10px",
                color: "#783DBD",
                fontWeight: "normal",
              }}
            >
              <Typography>Client Name</Typography>
              <Typography variant="h6" style={{ color: "#808191" }}>
                12, Nov 2021
              </Typography>
            </Box>
          </Stack>
          <Typography>
            <img src={IMAGES.more} alt="more" />
          </Typography>
        </Box>

        <Box className="counter-container">
          <Box className="InProgress" style={{ textAlign: "center" }}>
            <Typography
              style={{ color: "#808191", fontWeight: "normal" }}
              className="counter-title"
            >
              In Progress
            </Typography>
            <Typography>02</Typography>
          </Box>

          <hr
            style={{ color: "#B9B9B9", fontWeight: "normal" }}
            className="hrVertical"
          />
          <Box className="InProgress" style={{ textAlign: "center" }}>
            <Typography
              style={{ color: "#808191", fontWeight: "normal" }}
              className="counter-title"
            >
              In Progress
            </Typography>
            <Typography>02</Typography>
          </Box>

          <hr
            style={{ color: "#B9B9B9", fontWeight: "normal" }}
            className="hrVertical"
          />

          <Box className="Done" style={{ textAlign: "center" }}>
            <Typography
              style={{ color: "#808191", fontWeight: "normal" }}
              className="counter-title"
            >
              Done Project
            </Typography>
            <Typography>10</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default clientCard;
