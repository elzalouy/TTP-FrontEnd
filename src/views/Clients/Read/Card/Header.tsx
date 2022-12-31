import { Box, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import IMAGES from "src/assets/img/Images";
import ClientsPopover from "./ClientsPopover";
import { FC } from "react";
import "../clients.css";
import { useAppSelector } from "src/models/hooks";
import { selectRole } from "src/models/Auth";
import { IClientHeader } from "src/types/views/Client";

const Header: FC<IClientHeader> = ({ client, preview }) => {
  const { clientName, createdAt } = client;
  const role = useAppSelector(selectRole);

  return (
    <Grid container justifyContent="space-between" marginBottom={1.5}>
      <Box alignItems={"center"}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <img
            src={
              ["", null, undefined, "null", "undefined"].includes(preview)
                ? IMAGES.ttp_log
                : preview
            }
            alt="avatar"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "8px",
            }}
          />
          <Box
            style={{
              marginLeft: "12px",
              color: "#783DBD",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 16,
                paddingY: 0.5,
                width: "90px",
              }}
              data-test-id="client-name-header"
              textOverflow={"ellipsis"}
            >
              {clientName}
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#808191", fontSize: "12px" }}
            >
              {moment(createdAt).format("DD MMMM yyyy")}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box ml={1}>{role !== "PM" && <ClientsPopover client={client} />}</Box>
    </Grid>
  );
};

export default Header;
