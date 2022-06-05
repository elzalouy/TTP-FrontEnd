import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import * as React from "react";
import { ArrowForwardIos as ArrowIcon } from "@mui/icons-material";
import { RouteComponentProps } from "react-router";
interface Props {
  history: RouteComponentProps["history"];
}
const UserNotifications: React.FC<Props> = (props) => {
  const notifications = [""];
  return (
    <Stack
      bgcolor={"white"}
      borderRadius={2}
      width={{ xs: "100%", sm: "100%", md: "100%", lg: "100%" }}
      padding={1.8}
    >
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
      {notifications.map((item, i) => (
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
          key={i}
        >
          <Box
            width="100%"
            justifyContent={"space-between"}
            sx={{ display: "inline-flex" }}
          >
            <Box display={"inline-flex"}>
              <Typography
                fontSize={"13px"}
                color="#FF974A"
                bgcolor={"#FFF4EC"}
                margin={1}
                paddingTop={0.5}
                paddingX={1}
                borderRadius={1}
              >
                Shared
              </Typography>
              <Box paddingTop={0.2} paddingLeft={1}>
                <Typography
                  fontFamily={"Cairo"}
                  fontWeight={"600"}
                  variant={"subtitle1"}
                  color={"#303030"}
                >
                  Task Title Here
                </Typography>
                <Typography
                  padding={0}
                  margin={0}
                  color={"#505050"}
                  fontFamily={"Cairo"}
                  variant={"subtitle2"}
                >
                  Project Name
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography fontSize={"12px"} color="#9FA1AB" paddingTop={0.5}>
                10:24 AM
              </Typography>
            </Box>
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
        onClick={() => props.history.push("/TasksList")}
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
