import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Divider from "@mui/material/Divider";

interface Props {
  handleChange: (e: SelectChangeEvent<string>) => void;
  options?: { id: string; value: string; text: string }[];
  labelStyle?: object;
  labelValue?: string | null;
  placeholder?: string | ReactNode;
  selectValue?: string;
  selectStyle?: object;
  selectLabel?: string;
  boxStyle?: object;
  name?: string;
  size?: "small" | "medium" | undefined;
  placeholderStyle?: object;
}

const SelectInput: React.FC<Props> = ({
  handleChange,
  options = [],
  labelStyle = {},
  labelValue = null,
  selectValue = "",
  selectStyle,
  selectLabel,
  boxStyle = {},
  name = "",
  placeholder = "",
  size = "small",
  placeholderStyle = {},
}) => {
  return (
    <Box>
      {labelValue && (
        <InputLabel htmlFor="component-simple" sx={labelStyle}>
          {labelValue}
        </InputLabel>
      )}
      {/* <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          position: "absolute",
          height: "100%",
          right: "2.5em",
          width: "2px",
          background: "#eeeeee",
          zIndex: "2",
          top: "-9px",
        }}
      /> */}
      <FormControl fullWidth>
        <Select
          labelId="simple-select-label"
          id={name}
          value={selectValue}
          label={selectLabel}
          onChange={(e) => handleChange(e)}
          sx={selectStyle}
          name={name}
          inputProps={{ "aria-label": "Without label" }}
          displayEmpty
          size={size}
        >
          <MenuItem value="">
            <em style={placeholderStyle}>{placeholder}</em>
          </MenuItem>
          {options?.map(({ id, value, text }) => (
            <MenuItem key={id} value={value}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectInput;
