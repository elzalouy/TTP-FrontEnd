import * as React from "react";
import Status from "../../../coreUI/components/Typos/Status";
import ScrollOver from "../../../coreUI/components/Popovers/Popup/ScrollOver";
import _ from "lodash";
import { RouteComponentProps } from "react-router";
import { useAppSelector } from "../../../models/hooks";
import { selectSatistics } from "../../../models/Statistics";
import { setWidth } from "../../../helpers/generalUtils";
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
import IMAGES from "src/assets/img/Images";
interface Props {
  history: RouteComponentProps["history"];
}
const ManagerNotifications: React.FC<Props> = (props) => {
  const statistics = useAppSelector(selectSatistics);
  const tabs = ["0", "1", "2"];
  const [tab, setTab] = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));

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
  const cssTabContent = (tabItem: string) => {
    let tasks =
      tabItem === "0"
        ? statistics.OM.taskboard
        : tabItem === "1"
        ? statistics.OM.review
        : statistics.OM.shared;
    let flat = _.flattenDeep(tasks);
    return {
      position: "relative",
      height: open ? `500px` : `200px`,
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        display: open ? "block !important" : "none",
        width: "3px !important",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#ECECEC",
        borderRadius: 5,
      },
      "&::-webkit-scrollbar-button": {
        color: "#9FA1AB",
        width: "3px !important",
        borderRadius: 5,
      },
    };
  };

  return (
    <Box
      width={setWidth(MD, open)}
      sx={{
        boxShadow: "0px 10px 20px #00000005;",
      }}
      overflow="hidden"
    >
      <ScrollOver setPopover={setOpen} popover={open} notification={MD}>
        <Stack sx={cssStack}>
          <Tabs value={tab} onChange={(e, value) => setTab(value)} sx={cssTabs}>
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
          {tabs?.map((tabItem, index) => {
            let tasks: Task[][] | null =
              tabItem === "0"
                ? statistics.OM.taskboard
                : tabItem === "1"
                ? statistics.OM.review
                : statistics.OM.shared;
            if (tasks && tasks.length > 0 && open === false) {
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
                sx={cssTabContent(tabItem)}
              >
                {tasks &&
                  tasks?.map((TArray: Task[], index: number) => {
                    let day = "",
                      year = "",
                      month = "",
                      currentDay = "";
                    if (
                      TArray?.length > 0 &&
                      TArray[0].status !== "Tasks Board" &&
                      TArray &&
                      TArray[0]?.lastMoveDate
                    ) {
                      let date = new Date(TArray[0].lastMoveDate);
                      day = date?.getDate().toString();
                      month = date?.getMonth().toString();
                      year = date?.getFullYear().toString();
                    }
                    if (
                      TArray?.length > 0 &&
                      TArray[0].status === "Tasks Board" &&
                      TArray[0]?.createdAt
                    ) {
                      let date = new Date(TArray[0].createdAt);
                      day = date?.getDate().toString();
                      month = date?.getMonth().toString();
                      year = date?.getFullYear().toString();
                      currentDay = [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ][date?.getDay()];
                    }
                    return (
                      <>
                        <Box
                          key={index}
                          sx={{ display: "inline-flex" }}
                          marginTop={2}
                        >
                          <Typography sx={cssDay}>{currentDay}</Typography>
                          <Typography
                            sx={cssDate}
                          >{`${day},  ${month}  ${year}`}</Typography>
                        </Box>
                        {TArray?.length > 0 &&
                          (open === true ? TArray : TArray.slice(0, 2)).map(
                            (item) => {
                              return (
                                <Box key={index} sx={cssNotiBox}>
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
                            }
                          )}
                      </>
                    );
                  })}

                <>
                  {tasks && tasks.length > 0 ? (
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
                        <KeyboardArrowDown
                          htmlColor="#9FA1AB"
                          sx={cssMoreIcon}
                        />
                      )}
                      <Typography sx={cssMoreText}>
                        {open ? "See Less" : "See More"}
                      </Typography>
                    </Button>
                  ) : (
                    <>
                      <Box textAlign={"center"} width="100%">
                        <img
                          src={IMAGES.OverviewNotificationsEmpty}
                          width="170px"
                          height={"170px"}
                          alt=""
                        />
                        <Typography fontSize={"16px"} color="#505050">
                          Nothing have been moved !!
                        </Typography>
                      </Box>
                    </>
                  )}
                </>
              </Box>
            );
          })}
        </Stack>
      </ScrollOver>
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
  width: "98%",
  height: 60,
  borderRadius: "12px",
  boxShadow: "0px 3px 20px #4B4B4B0D",
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
  position: "absolute",
  bottom: "0px",
  left: "0px",
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
