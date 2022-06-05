import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { RouteComponentProps } from "react-router";
import PopoverComponent from "../../coreUI/usable-component/Popovers/PopoverComponent";
interface Props {
  history: RouteComponentProps["history"];
}
const ManagerNotifications: React.FC<Props> = (props) => {
  const notifications = ["", "", "", ""];
  const tabs = ["0", "1", "2"];
  const [tab, setTab] = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const cssTab = (tabIndex: string) => {
    return {
      width: "calc(33%)",
      borderRadius: 0,
      textTransform: "none",
      fontWeight: "bold",
      color: tabIndex === tab ? "#303030" : "#9B9EA7",
      padding: 0,
      alignItems: "baseline",
      margin: 0,
      justifyContent: "flex-end",
      paddingBottom: 1.2,
    };
  };
  const cssNotiStatus = (status: string) => {
    return {
      height: "22px",
      paddingX: 1,
      color: "#FF974A",
      backgroundColor: "#FFF4EC",
      borderRadius: "4px",
    };
  };

  return (
    <Box width={"inherit"} overflow="hidden" marginRight={0}>
      <PopoverComponent setPopover={setOpen} popover={open}>
        <Stack sx={cssStack}>
          <Tabs value={tab} onChange={(e, value) => setTab(value)} sx={cssTabs}>
            <Tab value={"0"} label="Taskboard" sx={cssTab("0")} />
            <Tab value={"1"} label="Review Tasks" sx={cssTab("1")} />
            <Tab value={"2"} label="Shared Tasks" sx={cssTab("2")} />
          </Tabs>
          {tabs?.map((tabItem, index) => (
            <Box
              key={index}
              role={"tabpanel"}
              aria-labelledby={`tab-${tabItem}`}
              hidden={tab == tabItem ? false : true}
              id={tabItem}
              tabIndex={index}
              height={open ? "350px" : "auto"}
              sx={{ overflowY: "scroll" }}
            >
              <Box sx={{ display: "inline-flex" }} marginTop={2}>
                <Typography sx={cssDay}>Today</Typography>
                <Typography sx={cssDate}>11 Dec, 2021</Typography>
              </Box>
              {(open ? notifications : notifications.slice(0, 2))?.map(
                (item, index) => (
                  <Box key={index} sx={cssNotiBox}>
                    {/* <Avatar sx={{ bgcolor: "#57B8FF" }}>EE</Avatar> */}
                    <Typography sx={cssNotiStatus("status")}>status</Typography>
                    <Box paddingTop={0.2} paddingLeft={1}>
                      <Typography sx={cssNotiTitle}>
                        Ahmed Ali finished his task in Vcode ... {tabItem}
                      </Typography>
                      <Typography sx={cssNotiSubTitle}>
                        Ahmed Ali finished his task in Vcode ...
                      </Typography>
                    </Box>
                  </Box>
                )
              )}
              <Button
                variant="text"
                sx={cssMoreBtn}
                fullWidth={false}
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <KeyboardArrowUp htmlColor="#9FA1AB" sx={cssMoreIcon} />
                ) : (
                  <KeyboardArrowDown htmlColor="#9FA1AB" sx={cssMoreIcon} />
                )}
                <Typography sx={cssMoreText}>
                  {open ? "See Less" : "See More"}
                </Typography>
              </Button>
            </Box>
          ))}
        </Stack>
      </PopoverComponent>
    </Box>
  );
};

export default ManagerNotifications;

const cssTabs = {
  color: "#303030",
  borderBottom: 1,
  borderColor: "#0000000A",
  marginBottom: 1,
  padding: 0,
  margin: 0,
  textAlign: 0,
};
const cssStack = {
  backgroundColor: "white",
  borderRadius: 2,
  width: "100%",
  paddingX: 1.8,
};
const cssDay = {
  variant: "h5",
  fontWeight: "600",
  paddingRight: 2,
  color: "#303030",
};
const cssDate = {
  variant: "h6",
  fontSize: 10,
  fontWeight: "600",
  color: "#929292",
  paddingTop: 0.4,
};
const cssNotiBox = {
  marginTop: 0.5,
  width: "100%",
  height: 60,
  borderRadius: "12px",
  boxShadow: "0px 5px 15px 5px #FAFAFB;",
  padding: 1.2,
  display: "inline-flex",
  alignItems: "center",
};
const cssNotiTitle = {
  fontFamily: "Cairo",
  fontWeight: "600",
  variant: "subtitle1",
  color: "#303030",
};
const cssNotiSubTitle = {
  color: "#99A0AA",
  fontFamily: "Cairo",
  variant: "subtitle2",
};
const cssMoreBtn = {
  width: "100%",
  justifyContent: "center",
  position: "relative",
  bottom: "0px",
  paddingTop: 1,
  ":hover": {
    backgroundColor: "transparent",
  },
};
const cssMoreText = {
  fontWeight: "700",
  variant: "h5",
  fontSize: 14,
  color: "black",
  marginX: 1,
};
const cssMoreIcon = {
  bgcolor: "#F7F7F7",
  borderRadius: "100%",
  fontSize: 20,
  padding: 0,
  margin: 0,
};
