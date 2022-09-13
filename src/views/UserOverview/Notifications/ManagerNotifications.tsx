import * as React from "react";
import Status from "../../../coreUI/components/Typos/Status";
import ScrollOver from "../../../coreUI/components/Popovers/Popup/ScrollOver";
import _ from "lodash";
import { RouteComponentProps } from "react-router";
import { useAppSelector } from "../../../models/hooks";
import { selectSatistics } from "../../../models/Statistics";
import {
  cssTabContent,
  hasMoreItems,
  setWidth,
} from "../../../helpers/generalUtils";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
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
import { Task } from "../../../types/models/Projects";
import Empty from "./Empy";
import { getTaskNotificationsDate } from "src/helpers/equations";
interface Props {
  history: RouteComponentProps["history"];
}
const ManagerNotifications: React.FC<Props> = (props) => {
  const statistics = useAppSelector(selectSatistics);

  const tabs = ["0", "1", "2"];
  const [tab, setTab] = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const LG = useMediaQuery(theme.breakpoints.up("lg"));
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

  const hasMore = () =>
    hasMoreItems(
      tab === "0"
        ? statistics.OM.taskboard
        : tab === "1"
        ? statistics.OM.review
        : statistics.OM.shared,
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
      sx={{
        boxShadow: "0px 10px 20px #00000005;",
        backgroundColor: "white",
        borderRadius: 2,
      }}
      overflow="hidden"
    >
      <ScrollOver setPopover={setOpen} popover={open}>
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
              label="Taskboard"
              sx={cssTab("0")}
              disableRipple={true}
            />
            <Tab
              value={"1"}
              label="Review Tasks"
              sx={cssTab("1")}
              disableRipple={true}
            />
            <Tab
              value={"2"}
              label="Shared Tasks"
              sx={cssTab("2")}
              disableRipple={true}
            />
          </Tabs>
          <Box paddingBottom={!LG || open ? "30px" : 0}>
            {tabs?.map((tabItem, index) => {
              let tasks: Task[][] | null =
                tabItem === "0"
                  ? statistics.OM.taskboard
                  : tabItem === "1"
                  ? statistics.OM.review
                  : statistics.OM.shared;
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
                  sx={[
                    cssTabContent(
                      open,
                      tabItem === "0"
                        ? statistics.OM.taskboard
                        : tabItem === "1"
                        ? statistics.OM.review
                        : statistics.OM.shared
                    ),
                    { transition: "max-height 0.5s ease-in; !important" },
                  ]}
                >
                  {tasks &&
                    tasks?.map((TArray: Task[], index: number) => {
                      let { day, month, year, currentDay } =
                        getTaskNotificationsDate(TArray);
                      return (
                        <>
                          <Box
                            key={index}
                            sx={{ display: "inline-flex" }}
                            marginTop={2}
                            marginLeft={1.8}
                          >
                            <Typography sx={cssDay}>{currentDay}</Typography>
                            <Typography
                              sx={cssDate}
                            >{`${day}/  ${month}/  ${year}`}</Typography>
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
                                      {_.truncate(item.name, {
                                        omission: "...",
                                        length: 18,
                                      })}
                                    </Typography>
                                    <Typography sx={cssNotiSubTitle}>
                                      {_.truncate(item.name, {
                                        omission: "...  ",
                                        length: 18,
                                      })}{" "}
                                      moved to {item.status}
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
      </ScrollOver>
    </Box>
  );
};

export default ManagerNotifications;

const cssNotiBox = {
  marginTop: 0.5,
  width: "93%",
  height: 60,
  borderRadius: "12px",
  boxShadow: "0px 3px 20px #4B4B4B0D",
  padding: 1.2,
  display: "inline-flex",
  alignItems: "center",
  marginLeft: 1.8,
};
const cssTabs = {
  color: "#303030",
  borderBottom: 1,
  borderColor: "#0000000A",
  marginBottom: 1,
  padding: 0,
  margin: 0,
  textAlign: 0,
  paddingX: 1.8,
};
const cssStack = {
  borderRadius: 2,
  width: "100%",
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
