import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import * as React from "react";
import { ArrowForwardIos as ArrowIcon } from "@mui/icons-material";
import { RouteComponentProps } from "react-router";
interface Props {
  history: RouteComponentProps["history"];
}
const ManagerNotifications: React.FC<Props> = (props) => {
  const notifications = ["", "", "", ""];
  const [tab, setTab] = React.useState(0);
  return (
    <Stack
      bgcolor={"white"}
      borderRadius={2}
      width={{ xs: "100%", sm: "100%", md: "100%", lg: "100%" }}
      padding={1.8}
      paddingTop={2.5}
    >
      <Typography
        variant="h4"
        fontSize={18}
        fontWeight={"bold"}
        color="#131523"
        fontFamily={"Cairo"}
        marginBottom={2}
      >
        Last Notifications
      </Typography>
      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
        sx={{
          color: "#303030",
          borderBottom: 1,
          borderColor: "#0000000A",
          marginBottom: 1,
        }}
      >
        <Tab
          label="All Notifications"
          sx={{
            width: "calc(50%)",
            color: tab === 0 ? "#303030" : "#9B9EA7",
            borderRadius: 0,
            textTransform: "none",
            fontWeight: "bold",
          }}
          id="1"
          aria-controls="tab-0"
        />
        <Tab
          label="Shared Tasks"
          id="2"
          aria-controls="tab-1"
          sx={{
            width: "calc(50%)",
            color: tab === 1 ? "#303030" : "#9B9EA7",
            borderRadius: 0,
            textTransform: "none",
            fontWeight: "bold",
          }}
        />
      </Tabs>
      <Box
        role={"tabpanel"}
        aria-labelledby={"tab-0"}
        hidden={tab == 0 ? false : true}
        id={"0"}
        tabIndex={0}
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
        {notifications?.map((item, index) => (
          <Box
            key={index}
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
      </Box>
      <Box
        role={"tabpanel"}
        aria-labelledby={"tab-1"}
        hidden={tab == 1 ? false : true}
        id={"1"}
        tabIndex={1}
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
        {notifications.map((item, index) => (
          <Box
            key={index}
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
      </Box>
    </Stack>
  );
};

export default ManagerNotifications;
