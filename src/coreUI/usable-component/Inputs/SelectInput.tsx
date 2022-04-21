import React, { ReactNode, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Popover,
  Select,
  Typography,
} from "@mui/material";
import { popOverStyle, SelectInputStyle } from "../styles";
import "../style.css";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import IMAGES from "../../../assets/img";
import {
  ArrowDropDown as ArrowDownIcon,
  ArrowDropUp as ArrowUpIcon,
} from "@mui/icons-material";
interface Props {
  handleChange: (e: any) => void;
  options?: {
    id: string | undefined;
    value: string | undefined;
    text: string | undefined;
  }[];
  label?: string | undefined;
  selectValue: string | undefined;
  selectText: string | undefined;
}

const SelectInput: React.FC<Props> = ({
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
        width: "inherit",
        height: 40,
        background: "white",
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
      }}
      justifyContent="space-between"
      alignItems={"center"}
      direction="row"
      container
    >
      <Grid
        width="inherit"
        item
        justifyContent={"flex-start"}
        alignItems="center"
        paddingX={1}
      >
        <Typography
          color="#696974"
          fontSize={12}
          fontWeight={"600"}
          width="100%"
        >
          {label}
        </Typography>
      </Grid>
      <Grid width="inherit" item>
        <Box display={"inline-flex"} onClick={handleOpen}>
          <Typography
            variant="h5"
            height={40}
            fontSize={13}
            fontWeight={"500"}
            color="#44444F"
            sx={{ paddingTop: 1.3, paddingRight: 1 }}
          >
            {selectText ? selectText : "Select"}
          </Typography>
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
        anchorEl={anchorEl}
        anchorReference="anchorEl"
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box display={"grid"} padding={1}>
          {options &&
            options.map((item) => (
              <option
                key={item.id}
                className="Option"
                value={item.value}
                onClick={(e) => {
                  handleChange(e);
                  handleClose();
                }}
                style={{
                  cursor: "pointer",
                  paddingInline: 10,
                  width: "auto",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontFamily: "Cairo",
                  color: "#696974",
                  fontWeight: "700",
                  fontSize: 13,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                {item.text}
              </option>
            ))}
        </Box>
      </Popover>
    </Grid>
  );
};

export default SelectInput;
