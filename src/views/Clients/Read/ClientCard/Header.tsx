import { Box, Grid, Stack, Typography } from '@mui/material'
import moment from 'moment'
import IMAGES from 'src/assets/img/Images'
import ClientsPopover from './ClientsPopover'
import { Client as IClient } from "../Clients";
import { FC } from 'react';
import "../clients.css"
import { useAppSelector } from 'src/models/hooks';
import { selectRole } from 'src/models/Auth';

interface Props {
    client: IClient;
    preview:string;
  }

const Header:FC<Props> = ({client,preview}) => {

    const {clientName,createdAt} = client;
    const role = useAppSelector(selectRole);

    return (
            <Grid container justifyContent="space-between" marginBottom={1.5}>
                <Box alignItems={"center"}>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <img
                            src={
                                ["", null, undefined, "null", "undefined"].includes(preview)
                                    ? IMAGES.avatarClients
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
                                sx={{ fontWeight: "bold", fontSize: 16, paddingY: 0.5 }}
                                data-test-id="client-name-header"
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
            )
}

            export default Header