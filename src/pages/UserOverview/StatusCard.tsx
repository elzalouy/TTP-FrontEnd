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
}

const UserStatus: FC<UserStatusProps> = ({ Icon, ...props }) => {
  return (
    <Grid
      xs={12}
      sm={4}
      md={4}
      lg={4}
      paddingRight={3.5}
      paddingBottom={2}
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
        <CardContent>
          <Box
            width={40}
            height={40}
            borderRadius={5}
            paddingTop={1.3}
            textAlign={"center"}
            bgcolor={props.IconBgColor}
          >
            <Icon></Icon>
          </Box>
          <Typography color={"#B2B3BD"} variant="h5" paddingTop={3.5}>
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
