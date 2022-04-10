import React, { ReactNode, useState } from "react";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import { SelectInputStyle } from "../styles";
import "../style.css";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
interface Props {
  handleChange: (e: any) => void;
  options?: {
    id: string | undefined;
    value: string | undefined;
    text: string | undefined;
  }[];
  labelStyle?: object;
  labelValue?: string;
  placeholder: string;
  selectValue: string;
  selectStyle?: object;
  selectLabel?: string;
  boxStyle?: object;
  name: string;
  size?: "small" | "medium" | undefined;
  placeholderStyle?: object;
}

const SelectInput: React.FC<Props> = ({
  handleChange,
  options = [],
  selectValue,
  selectStyle,
  name,
  placeholder,
  size = "small",
  placeholderStyle,
  labelValue,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Grid
      sx={{
        width: "auto",
        height: 40,
        background: "white",
        borderRadius: 3,
        display: "inline-flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 1.5,
      }}
    >
      <Typography
        color="#696974"
        fontSize={14}
        width={"auto"}
        fontWeight={"700"}
      >
        {labelValue}
      </Typography>
      <select
        name={name}
        className="selectFilter"
        aria-placeholder={placeholder}
        style={{ color: "#44444F", fontWeight: "700" }}
      >
        {options.map((item) => (
          <option
            style={{ color: "#44444F", fontWeight: "700" }}
            value={item.value}
            key={item.id}
          >
            {item.text}
          </option>
        ))}
      </select>
      <ArrowDropDown
        onClick={() => setExpanded(false)}
        sx={{
          pointer: "curser",
          height: 40,
          border: "2px solid #FAFAFB",
          borderWidth: "0px 0px 0px 1px",
        }}
      />
    </Grid>
  );
};

export default SelectInput;
