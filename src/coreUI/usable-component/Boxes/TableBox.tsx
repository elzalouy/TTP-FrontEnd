import * as React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box } from "@mui/material";

interface TableBoxProps {
  title: string;
  outTitled: boolean;
  expanded: boolean;
  setExpanded: any;
  bgColor: string;
}

const TableBox: React.FC<TableBoxProps> = (props) => {
  return (
    <>
      <Box
        id="project-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: props.bgColor,
          p: 3,
          mb: 5,
          font: "normal normal 600 16px/30px Cairo",
          color: "#505050",
        }}
      >
        <Box
          id="project-header"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mb: 2,
          }}
        >
          {props.title}
          {props.expanded ? (
            <ArrowDropUpIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                props.setExpanded(false);
              }}
            ></ArrowDropUpIcon>
          ) : (
            <ArrowDropDownIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                props.setExpanded(true);
              }}
            ></ArrowDropDownIcon>
          )}
        </Box>
        {props.children}
      </Box>
    </>
  );
};

export default TableBox;
