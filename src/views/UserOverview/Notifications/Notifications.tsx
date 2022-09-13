import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { RouteComponentProps } from "react-router";
import PopoverComponent from "../../../coreUI/components/Popovers/Popup/ScrollOver";
import { useAppSelector } from "../../../models/hooks";
import { selectSatistics } from "../../../models/Statistics";
import Status from "../../../coreUI/components/Typos/Status";
import _ from "lodash";
import { Task } from "../../../types/models/Projects";
import { cssTabContent, hasMoreItems } from "src/helpers/generalUtils";
import Empty from "./Empy";
import { getTaskNotificationsDate } from "src/helpers/equations";
interface Props {
  history: RouteComponentProps["history"];
}
const Notifications: React.FC<Props> = (props) => {
  const statistics = useAppSelector(selectSatistics);
  const tabs = ["0", "1"];
  const [tab, setTab] = React.useState("0");
  const theme = useTheme();
  const LG = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = React.useState(false);

  const cssTab = (tabIndex: string) => {
    return {
      width: "calc(50%)",
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
  const hasMore = () =>
    hasMoreItems(
      tab === "0" ? statistics.PM.inProgress : statistics.PM.review,
      2,
      3
    );

  const cssMoreBtn = {
    backgroundColor: "white",
    width: "95%",
    height: "30px !important",
    display: {
      lg: hasMore() ? "inline-flex" : "none",
      xs: "none",
      sm: "none",
      md: "none",
    },
    position: "absolute",
    bottom: "0px",
    ":hover": {
      backgroundColor: "white",
    },
  };

  return (
    <Box
      width={"100%"}
      overflow="hidden"
      sx={{
        boxShadow: "0px 10px 20px #00000005;",
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <PopoverComponent setPopover={setOpen} popover={open}>
        <Stack sx={cssStack}>
          <Tabs
            value={tab}
            onChange={(e, value) => {
              setTab(value);
              setOpen(false);
            }}
            sx={cssTabs}
            TabIndicatorProps={{
              sx: {
                height: "1px !important",
              },
            }}
          >
            <Tab
              value={"0"}
              label="In Progress Tasks"
              sx={cssTab("0")}
              disableRipple={true}
            />
            <Tab
              value={"1"}
              label="Review Tasks"
              sx={cssTab("1")}
              disableRipple={true}
            />
          </Tabs>
          <Box paddingBottom={!LG || open ? "30px" : 0}>
            {tabs?.map((tabItem, index) => {
              let tasks: Task[][] | null =
                tabItem === "0"
                  ? statistics.PM.inProgress
                  : statistics.PM.review;
              if (tasks && tasks.length > 0 && LG !== false && open === false) {
                tasks = [tasks[0]];
              }
              return (
                <Box
                  key={index}
                  role={"tabpanel"}
                  aria-labelledby={`tab-${tabItem}`}
                  hidden={tab == tabItem ? false : true}
                  id={tabItem}
                  tabIndex={index}
                  sx={cssTabContent(
                    open,
                    tabItem === "0"
                      ? statistics.PM.inProgress
                      : statistics.PM.review
                  )}
                >
                  {tasks &&
                    tasks?.map((TArray: Task[], index: number) => {
                      let { day, month, year, currentDay } =
                        getTaskNotificationsDate(TArray);
                      return (
                        <>
                          <Box
                            key={index + day + month + year + currentDay}
                            sx={{ display: "inline-flex" }}
                            marginLeft={1.8}
                            marginTop={2}
                          >
                            <Typography sx={cssDay}>{currentDay}</Typography>
                            <Typography sx={cssDate}>{`${day}/  ${
                              month + 1
                            }/  ${year}`}</Typography>
                          </Box>
                          {TArray?.length > 0 &&
                            (!LG
                              ? TArray
                              : open === true
                              ? TArray
                              : TArray.slice(0, 2)
                            ).map((item, index) => {
                              return (
                                <Box
                                  key={item._id}
                                  sx={cssNotiBox}
                                  marginBottom={
                                    index === TArray.length - 1 ? 1.5 : 0.4
                                  }
                                >
                                  <Status status={item?.status} />
                                  <Box paddingTop={0.2} paddingLeft={1}>
                                    <Typography sx={cssNotiTitle}>
                                      {item.name}
                                    </Typography>
                                    <Typography sx={cssNotiSubTitle}>
                                      {item.name} moved to {item.status}
                                    </Typography>
                                  </Box>
                                </Box>
                              );
                            })}
                        </>
                      );
                    })}
                  {(!tasks || tasks.length === 0) && <Empty />}
                </Box>
              );
            })}
          </Box>
          <Button
            variant="text"
            sx={cssMoreBtn}
            fullWidth={false}
            onClick={() => setOpen(!open)}
            disableRipple={true}
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
        </Stack>
      </PopoverComponent>
    </Box>
  );
};

export default Notifications;

const cssTabs = {
  color: "#303030",
  borderBottom: 0.5,
  borderColor: "#0000000A",
  marginBottom: 1,
  padding: 0,
  margin: 0,
  textAlign: 0,
};
const cssStack = {
  borderRadius: 2,
  width: "100% !important",
  paddingX: 1.8,
  position: "relative",
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
