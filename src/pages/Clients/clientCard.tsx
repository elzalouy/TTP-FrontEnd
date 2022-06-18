import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import IMAGES from "../../assets/img/Images";
import { Client } from "./clients";
import moment from "moment";
import ClientsPopover from "../../coreUI/usable-component/Popovers/ClientsPopover";
import { selectRole } from "../../redux/Auth";
import { useAppSelector } from "../../redux/hooks";
import { selectNotStartedProjects } from "../../redux/Projects";
interface IProps {
  client: Client;
}

const ClientCard: React.FC<IProps> = ({ client }) => {
  const { clientName, createdAt, doneProject, inProgressProject, image } =
    client;

  const role = useAppSelector(selectRole);
  const notStartedProject = useAppSelector(selectNotStartedProjects);

  const getAllActiveProjects = () => {
    let notStartedArray = notStartedProject?.filter(
      (project) => project.clientId === client._id
    );

    if (
      typeof notStartedArray !== "undefined" &&
      typeof inProgressProject === "number"
    ) {
      return notStartedArray.length + inProgressProject;
    }
    return 0;
  };

  return (
    <Box>
      <Grid container direction="column" className="client-card">
        <Grid container justifyContent="space-between" marginBottom={1.5}>
          <Box alignItems={"center"}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <img
                src={image === "null" ? IMAGES.avatarClients : image}
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
                  sx={{ fontWeight: "bold", fontSize: 16, paddingY: 0.5 }}
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
          <Box>{role !== "PM" && <ClientsPopover client={client} />}</Box>
        </Grid>
        <Grid
          container
          className="counter-container"
          justifyContent={"space-between"}
          alignItems="center"
        >
          {/* <Grid item style={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: 11 }}
              variant="caption"
              style={{ color: "#808191" }}
              className="counter-title"
            >
              In Progress Task
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {inProgressTask}
            </Typography>
          </Grid> */}
          {/* <Grid
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
          </Grid> */}
          <Grid item xs={5} style={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: 11 }}
              variant="caption"
              style={{ color: "#808191" }}
              className="counter-title"
            >
              Active Projects
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {getAllActiveProjects()}
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

          <Grid item xs={5} style={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: 11 }}
              variant="caption"
              style={{ color: "#808191" }}
              className="counter-title"
            >
              Done Projects
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>{doneProject}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientCard;
