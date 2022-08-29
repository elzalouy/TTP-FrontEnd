import "../../../../App.css";
import * as React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ITableContainerProps } from "../../../../types/components/Containers";
import { tableContainerStyles } from "./styles";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const TableContainer: React.FC<ITableContainerProps> = (props) => {
  const theme = useTheme();
  const styles = tableContainerStyles(props.bgColor, props.outTitled)();
  const onExpand = () => {
    props.setExpanded(props.expanded ? false : true);
  };
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
      <Box id="project-container" className={styles.body_container}>
        {!props.outTitled && (
          <>
            <Box
              onClick={onExpand}
              id="project-header"
              className={styles.header}
            >
              {props.title}
              {props.expanded ? (
                <ArrowDropUpIcon sx={{ cursor: "pointer" }}></ArrowDropUpIcon>
              ) : (
                <ArrowDropDownIcon
                  sx={{ cursor: "pointer" }}
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

export default TableContainer;
