import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import * as React from "react";
import { ArrowForwardIos as ArrowIcon } from "@mui/icons-material";
import { RouteComponentProps } from "react-router";
interface Props {
  history: RouteComponentProps["history"];
}
const UserNotifications: React.FC<Props> = (props) => {
  const notifications = ["", "", "", ""];
  return (
    <Stack
      bgcolor={"white"}
      borderRadius={2}
      width={{ xs: "90%", sm: "90%", md: "100%", lg: "100%" }}
      padding={1.8}
      paddingTop={2.5}
    >
      <Typography
        variant="h4"
        fontSize={18}
        fontWeight={"bold"}
        color="#131523"
        fontFamily={"Cairo"}
      >
        Last Notifications
      </Typography>
      <Box sx={{ display: "inline-flex" }} marginTop={2}>
        <Typography
          variant={"h5"}
          fontWeight={"600"}
          paddingRight={2}
          color="#303030"
        >
          Today
        </Typography>
        <Typography
          variant={"h6"}
          fontSize={10}
          fontWeight={"600"}
          color="#929292"
          paddingTop={0.4}
        >
          11 Dec, 2021
        </Typography>
      </Box>
      {notifications.map((item) => (
        <Box
          marginTop={2}
          width={"100%"}
          height={60}
          borderRadius={2}
          sx={{
            boxShadow: "0px 5px 15px 5px #FAFAFB;",
            padding: 1.2,
            display: "inline-flex",
          }}
        >
          <Avatar sx={{ bgcolor: "#57B8FF" }}>EE</Avatar>
          <Box paddingTop={0.2} paddingLeft={1}>
            <Typography
              fontFamily={"Cairo"}
              fontWeight={"600"}
              variant={"subtitle1"}
              color={"#303030"}
            >
              Ahmed Ali finished his task in Vcode ...
            </Typography>
            <Typography
              color={"#99A0AA"}
              fontFamily={"Cairo"}
              variant={"subtitle2"}
            >
              Ahmed Ali finished his task in Vcode ...
            </Typography>
          </Box>
        </Box>
      ))}
      <Button
        variant="text"
        sx={{
          justifyContent: "flex-start",
          width: "30%",
          paddingTop: 1,
          marginTop: 2,
          marginLeft: 32,
        }}
        fullWidth={false}
        onClick={() => props.history.push("/notifications")}
      >
        <Typography
          fontWeight={"700"}
          variant="h5"
          fontSize={14}
          color="#00ACBA"
        >
          See More
          <ArrowIcon
            fontSize={"small"}
            sx={{ fontSize: 14, paddingTop: 0.4, fontWeight: "bold" }}
          />
        </Typography>
      </Button>
    </Stack>
  );
};

export default UserNotifications;
