import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";
import Status from "src/coreUI/components/Typos/Status";
import { useAppSelector } from "src/models/hooks";
import { selectProjectsState } from "src/models/Projects";
import { Task } from "src/types/models/Projects";

type NotificationProps = {
  item: Task;
  index: number;
  arrayLength: number;
};
type LinkProps = {
  id: String | null;
};
const LinkContainer = (props: React.PropsWithChildren<LinkProps>) => {
  return (
    <>
      {props.id ? (
        <Link style={{ textDecoration: "none" }} to={`/TasksBoard/${props.id}`}>
          {props.children}
        </Link>
      ) : (
        props.children
      )}
    </>
  );
};
const Notification = ({ item, index, arrayLength }: NotificationProps) => {
  const projects = useAppSelector(selectProjectsState);
  return (
    <>
      <LinkContainer id={item.projectId}>
        <Box
          key={item._id}
          sx={cssNotiBox}
          marginBottom={index === arrayLength - 1 ? 1.5 : 0.4}
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
              {
                projects?.projects?.find(
                  (project) => project._id === item.projectId
                )?.name
              }
            </Typography>
          </Box>
        </Box>
      </LinkContainer>
    </>
  );
};

const cssNotiBox = {
  marginTop: 0.5,
  width: "93%",
  height: 60,
  borderRadius: "12px",
  boxShadow: "0px 5px 15px 5px #FAFAFB;",
  padding: 1.2,
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  marginLeft: 1.8,
  ":hover": {
    boxShadow: "0px 10px 20px #0000001A",
    transition: "all 0.5s ease-out !important",
  },
};

const cssNotiTitle = {
  fontFamily: "Cairo, SemiBold",
  fontWeight: "600",
  variant: "subtitle1",
  color: "#303030",
};

const cssNotiSubTitle = {
  color: "#99A0AA",
  fontFamily: "Cairo, SemiBold",
  variant: "subtitle2",
};

export default Notification;
