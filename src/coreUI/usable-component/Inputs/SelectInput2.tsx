import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Popover,
  Select,
  Typography,
} from "@mui/material";
import { popOverStyle } from "../styles";
import "../style.css";
import { ArrowDropUp } from "@mui/icons-material";
import { ArrowDropDown as ArrowDownIcon } from "@mui/icons-material";
import _ from "lodash";
interface Props {
  handleChange: (e: any) => void;
  options?: {
    id: string;
    value: string;
    text: string;
  }[];
  label?: string;
  selectValue: string;
  selectText: string | undefined;
}

const SelectInput2: React.FC<Props> = ({
  handleChange,
  options = [],
  selectValue,
  label,
  selectText,
}) => {
  const [expanded, setExpanded] = useState(false);
  const styles = popOverStyle()();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  //   useEffect(() => {
  //     if (label && label.length > 10) {
  //       return setValue(_.truncate(selectText, { length: 5, separator: " " }));
  //     }
  //     if (label && label.length <= 9 && selectText && selectText.length > 10) {
  //       return setValue(_.truncate(selectText, { length: 10, separator: " " }));
  //     }
  //     return setValue(selectText);
  //   }, [selectText, selectValue]);
  const open = Boolean(anchorEl);
  const handleOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid
      sx={{
        width: "calc(96% - 11px)",
        height: 43,
        background: "white",
        borderRadius: 1.5,
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #B4B6C4",
        marginTop: "7px",
      }}
      justifyContent="space-between"
      alignItems={"center"}
      direction="row"
      container
    >
      <Grid
        onClick={handleOpen}
        item
        justifyContent={"flex-start"}
        alignItems="center"
        paddingLeft={1}
        display="inline-flex"
        xs={10}
      >
        <Typography
          maxWidth={140}
          overflow={"hidden"}
          color="#696974"
          fontSize={14}
          fontWeight={"400"}
        >
          {label}
        </Typography>
        <Typography
          lineHeight={1}
          textOverflow="hidden"
          overflow={"hidden"}
          variant="h5"
          height={40}
          fontSize={14}
          fontWeight={"700"}
          color="#44444F"
          sx={{
            paddingTop: 1.5,
            overflow: "hidden",
          }}
        >
          {selectText ? selectText : "Select"}
        </Typography>
      </Grid>
      <Grid item>
        <Box display={"inline-flex"} onClick={handleOpen}>
          <Box
            height={40}
            sx={{
              borderLeft: "1px solid #F1F1F5",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 1,
            }}
          >
            {open ? (
              <ArrowDropUp onClick={handleClose} htmlColor="#92929D" />
            ) : (
              <ArrowDownIcon onClick={handleOpen} htmlColor="#92929D" />
            )}
          </Box>
        </Box>
      </Grid>
      <Popover
        className={styles.root}
        open={open}
        sx={{ borderRadius: 0, width: "calc(96% - 11px) !important;" }}
        anchorEl={anchorEl}
        anchorReference="anchorEl"
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box display={"grid"} padding={1} borderRadius={0}>
          {options &&
            options.map((item) => (
              <option
                key={item.id}
                className="Option"
                value={item?.value}
                onClick={(e) => {
                  handleChange(e);
                  handleClose();
                }}
                style={{
                  cursor: "pointer",
                  paddingInline: 10,
                  width: "340px",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontFamily: "Cairo",
                  color: "#696974",
                  fontWeight: "700",
                  fontSize: 13,
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderRadius: 0,
                }}
              >
                {item?.text}
              </option>
            ))}
        </Box>
      </Popover>
    </Grid>
  );
};

export default SelectInput2;
