import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { FC } from "react";

import { Done as DoneIcon, Circle as DotIcon } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
interface UserStatusProps {
  loading: boolean;
  Icon: any;
  IconBgColor: string;
  title: string;
  count: string | undefined;
  percent: string | undefined;
  percentColor: string;
  user: string;
  pt: number;
}

const UserStatus: FC<UserStatusProps> = ({ Icon, ...props }) => {

  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      xs={12}
      sm={props.user === "PM" ? 4 : 3}
      md={props.user === "PM" ? 4 : 3}
      lg={props.user === "PM" ? 4 : 3}
      flexBasis={"50%"}
      marginTop={"15px"}
      paddingRight={props.user === "PM" ? "4%" : "2%"}
      paddingLeft={SM ? "2%" : "0%"}
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
          {props.loading === true ? (
            <Skeleton
              variant="text"
              width={100}
              height={35}
              sx={{ marginLeft: 1, marginTop: 3.5 }}
            />
          ) : (
            <Typography
              color={"InfoText"}
              variant="h1"
              fontWeight={"500"}
              paddingTop={3.5}
            >
              {props.count}
            </Typography>
          )}
          {props.loading === true ? (
            <Skeleton
              variant="text"
              width={100}
              height={35}
              sx={{ marginLeft: 1, marginTop: 2.5 }}
            />
          ) : (
            <Typography
              color={props.percentColor}
              paddingTop={2.5}
              variant="h5"
            >
              <DotIcon
                sx={{ fontSize: 8, marginRight: 0.7 }}
                htmlColor={props.percentColor}
              />
              {props.percent}%
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserStatus;
