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
import { popOverStyle } from "../../../themes/Styles";
import "../../../themes/style.css";
import { ArrowDropUp } from "@mui/icons-material";
import { ArrowDropDown as ArrowDownIcon } from "@mui/icons-material";
import _ from "lodash";
import { isOptionsEmpty } from "../../../helpers/generalUtils";
interface Props {
  handleChange: (e: any) => void;
  handleOnClick?: (e: any) => void;
  options?: {
    id?: string;
    value?: string;
    text?: string;
  }[];
  label?: string;
  default?: string;
  placeholder?: string;
  selectValue: string | undefined;
  selectText: string | undefined;
  error?: Boolean | undefined;
}

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
  label,
  placeholder,
  selectText,
  handleOnClick,
  error,
}) => {
  const [Label, setLabel] = useState(label);
  const [Value, setValue] = useState(selectText);

  const styles = popOverStyle()();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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
      className="select"
      container
      onClick={handleOnClick}
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
          textTransform="capitalize"
          fontWeight={"400"}
          paddingRight={1}
        >
          {Label}
        </Typography>
        {selectText ? (
          <Typography
            lineHeight={1}
            textOverflow="hidden"
            overflow={"hidden"}
            variant="h5"
            height={40}
            fontSize={14}
            textTransform="capitalize"
            fontWeight={"700"}
            color="#44444F"
            sx={{
              paddingTop: 1.5,
              overflow: "hidden",
            }}
          >
            {selectText}
          </Typography>
        ) : (
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
        )}
      </Grid>
      <Grid item>
        <Box display={"inline-flex"} onClick={handleOpen}>
          <Box
            height={40}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 1,
              paddingRight: 1,
            }}
          >
            {open && options.length > 1 ? (
              <ArrowDropUp onClick={handleClose} htmlColor="#92929D" />
            ) : (
              <ArrowDownIcon onClick={handleOpen} htmlColor="#92929D" />
            )}
          </Box>
        </Box>
      </Grid>
      <Popover
        className={styles.root}
        open={options.length > 0 ? open : false}
        sx={
          isOptionsEmpty(options)
            ? {
                borderRadius: "10px",
                width: "calc(96% - 11px) !important;",
                zIndex: 2001,
                opacity: "0",
              }
            : {
                borderRadius: "10px",
                width: "calc(96% - 11px) !important;",
                zIndex: 2001,
              }
        }
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
        <Box display={"grid"} padding={1} borderRadius={"10px"}>
          {options &&
            options.map((item) => {
              if (item.id?.length === 0) {
                return false;
              }
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
                      handleClose();
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
