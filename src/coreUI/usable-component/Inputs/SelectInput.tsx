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
    id: string | undefined;
    value: string | undefined;
    text: string | undefined;
  }[];
  label?: string | undefined;
  selectValue: string | undefined;
  customValue?: string;
  selectText: string | undefined;
  placeholder?: string;
}

const getTextfromValue = (string: any) => {
  let text = _.truncate(string, { length: 15, separator: " " });
  return text;
};

const selectInputGridStyles = {
  width: "100%",
  height: 40,
  background: "#FFFFFF",
  borderRadius: "10px",
  overflow: "hidden",
  cursor: "pointer",
};

const SelectInput: React.FC<Props> = ({
  handleChange,
  options = [],
  selectValue,
  customValue,
  label,
  selectText,
  placeholder,
}) => {
  const [expanded, setExpanded] = useState(false);
  const styles = popOverStyle()();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [Label, setLabel] = useState(label);
  const [Value, setValue] = useState(selectText);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (selectText && selectText.length > 15) {
      return setValue(_.truncate(selectText, { length: 15, separator: " " }));
    }
    return setValue(selectText);
  }, [selectText, selectValue]);

  const handleOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      sx={selectInputGridStyles}
      justifyContent="space-between"
      alignItems={"center"}
      direction="row"
      onClick={anchorEl === null ? handleOpen : handleClose}
      container
    >
      {/* <Grid
        onClick={handleOpen}
        item
        justifyContent={"flex-start"}
        alignItems="center"
        paddingLeft={1}
        display="inline-flex"
        width={"80%"}
      > */}
      <Box
        minWidth={"calc(100%-28px)"}
        display={"inline-flex"}
        flex={5}
        justifyContent="flex-start"
        alignItems={"center"}
        paddingLeft={1}
      >
        <Typography
          maxWidth={140}
          overflow={"hidden"}
          color="#696974"
          fontSize={14}
          textTransform="capitalize"
          fontWeight={"400"}
          paddingRight={1}
        >
          {Label}
        </Typography>
        <Typography
          lineHeight={1}
          textOverflow="hidden"
          overflow={"hidden"}
          textTransform="capitalize"
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
          {Value
            ? Value === "inProgress"
              ? "In Progress"
              : Value
            : placeholder || "All"}
        </Typography>
      </Box>
      <Box display={"inline-flex"} maxWidth="28px">
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
            <ArrowDropUp htmlColor="#92929D" />
          ) : (
            <ArrowDownIcon htmlColor="#92929D" />
          )}
        </Box>
      </Box>
      <Popover
        className={styles.root}
        open={open}
        sx={{ borderRadius: "10px", width: "100%" }}
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
        <Box display={"grid"} padding={1} borderRadius={"10px"} width="100%">
          {options &&
            options.map((item) => {
              return (
                <>
                  <label
                    htmlFor={item.id}
                    className="Option"
                    style={{
                      cursor: "pointer",
                      paddingInline: 10,
                      width: "200px",
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
                    {item.text}
                  </label>
                  <input
                    name={item.id}
                    id={item.id}
                    key={item.id}
                    className="Option"
                    style={{
                      cursor: "pointer",
                      paddingInline: 10,
                      width: "200px",
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
                    onClick={(e) => {
                      handleChange(e);
                    }}
                    readOnly
                    hidden
                    value={item?.value}
                  />
                </>
              );
            })}
        </Box>
      </Popover>
    </Grid>
  );
};

export default SelectInput;
