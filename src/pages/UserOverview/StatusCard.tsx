import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";

import { Done as DoneIcon, Circle as DotIcon } from "@mui/icons-material";
interface UserStatusProps {
  Icon: any;
  IconBgColor: string;
  title: string;
  count: string;
  percent: string;
  percentColor: string;
  user: string;
  pt: number;
}

const UserStatus: FC<UserStatusProps> = ({ Icon, ...props }) => {
  return (
    <Grid
      xs={12}
      sm={props.user === "project manager" ? 4 : 3}
      md={props.user === "project manager" ? 4 : 3}
      lg={props.user === "project manager" ? 4 : 3}
      paddingRight={props.user === "project manager" ? "4%" : "1%"}
      item
    >
      <Card
        color="white"
        sx={{
          width: "100%",
          borderRadius: 3,
          height: "100%",
        }}
      >
        <CardContent
          sx={{
            paddingX: props.user === "project manager" ? "10%" : "6%",
            paddingY: "10%",
          }}
        >
          <Box
            width={45}
            height={45}
            borderRadius={10}
            paddingTop={props.pt}
            textAlign={"center"}
            bgcolor={props.IconBgColor}
          >
            <Icon></Icon>
          </Box>
          <Typography
            color={"#B2B3BD"}
            variant="h5"
            width={"100%"}
            paddingTop={3.5}
          >
            {props.title}
          </Typography>
          <Typography
            color={"InfoText"}
            variant="h1"
            fontWeight={"500"}
            paddingTop={3.5}
          >
            {props.count}
          </Typography>
          <Typography color={props.percentColor} paddingTop={2.5} variant="h5">
            <DotIcon
              sx={{ fontSize: 8, marginRight: 0.7 }}
              htmlColor={props.percentColor}
            />
            {props.percent}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserStatus;
