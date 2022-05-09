import * as React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box, Typography } from "@mui/material";

interface TableBoxProps {
  title: string;
  outTitled: boolean;
  expanded: boolean;
  setExpanded?: any;
  bgColor: string;
}

const TableBox: React.FC<TableBoxProps> = (props) => {
  return (
    <>
      {props.outTitled && (
        <Typography
          color="#505050"
          fontSize={16}
          sx={{ paddingX: 0.5, marginBottom: 1.5 }}
          fontWeight="bold"
        >
          {props.title}
        </Typography>
      )}
      <Box
        id="project-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: props.bgColor,
          p: 1,
          pt: props.outTitled ? 0 : 2,
          mb: 5,
          font: "normal normal 600 16px/30px Cairo",
          color: "#505050",
          overflow:"scroll"
        }}
      >
        {!props.outTitled && (
          <>
            <Box
              id="project-header"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mb: 1,
                px: 1,
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
          </>
        )}
        {props.children}
      </Box>
    </>
  );
};

export default TableBox;
