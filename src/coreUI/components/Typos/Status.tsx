import { Typography } from "@mui/material";
import * as React from "react";

interface StatusProps {
  status?: string | null;
  children?: any;
}

const Status: React.FC<StatusProps> = (props) => {
  const color =
    props.status === "In Progress"
      ? "#ffc400"
      : props.status === "Review"
      ? "#40b4f7"
      : props.status === "Shared"
      ? "#967974"
      : props.status === "Done"
      ? "#0f6b74"
      : props.status === "Cancled"
      ? "#fc5a5a"
      : props.status === "Not Clear"
      ? "#ffac38"
      : "#696974";
  const bgColor =
    props.status === "In Progress"
      ? "#fff8dd"
      : props.status === "Review"
      ? "#d1e6f3"
      : props.status === "Shared"
      ? "#eee6e5"
      : props.status === "Done"
      ? "#d9f3f5"
      : props.status === "Cancled"
      ? "#ffeeee"
      : props.status === "Not Clear"
      ? "#F0DDC3"
      : "#9fa1ab33";
  const statusStyle = {
    color: color,
    backgroundColor: bgColor,
    width: "auto",
    margin: "0px",
    fontSize: "14px",
    padding: "2px 10px",
    textAlign: "center",
    borderRadius: "5px",
  };
  return (
    <>
      <Typography sx={statusStyle}>
        {props.status}
        {props.children}
      </Typography>
    </>
  );
};

export default Status;
