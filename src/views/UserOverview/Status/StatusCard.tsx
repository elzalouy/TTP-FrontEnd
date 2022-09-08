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
  user: string | undefined;
  pt?: number;
  pb?: number;
}

const UserStatus: FC<UserStatusProps> = ({ Icon, ...props }) => {
  const theme = useTheme();
  const SM = useMediaQuery(theme.breakpoints.down("sm"));
  const LG = useMediaQuery(theme.breakpoints.down("lg"));
  const breakpoints = [SM, LG];

  return (
    <Grid
      xs={12}
      sm={3.6}
      md={3.6}
      lg={2.2}
      height={{ lg: "250px", md: "250px", sm: "250px", xs: "280px" }}
      marginBottom={{ sm: 0, lg: 0, md: 0, xs: 1 }}
      item
    >
      <Card
        color="white"
        sx={{
          width: "100%",
          borderRadius: 2.5,
          height: "100%",
          userSelect: "none",
          "&:hover": {
            boxShadow: "0px 2px 10px #0000001A",
          },
        }}
      >
        <CardContent
          sx={{
            paddingX: "12%",
            paddingY: "12%",
            paddingBottom: "42px !important",
          }}
        >
          <Box
            width={50}
            height={50}
            borderRadius={10}
            paddingTop={props.pt ? props.pt : 1.7}
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
            fontSize={16}
          >
            {props.title}
          </Typography>
          {props.loading === true ? (
            <Skeleton
              variant="text"
              width={100}
              height={35}
              sx={{ marginTop: 4.5 }}
            />
          ) : (
            <Typography
              color={"InfoText"}
              variant="h1"
              fontWeight={"500"}
              paddingTop={4.5}
              paddingBottom={2.5}
            >
              {props.count}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserStatus;
