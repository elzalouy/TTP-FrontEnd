import { ArrowDropDown } from "@mui/icons-material";
import { MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import "./style.css";
interface Props {
  handleChange: (e: any) => void;
  options: {
    id: string | undefined;
    value: string | undefined;
    text: string | undefined;
  }[];
  labelStyle?: object;
  labelValue?: string | null;
  placeholder?: string | React.ReactNode;
  selectValue?: string;
  selectStyle?: object;
  selectLabel?: string;
  boxStyle?: object;
  name?: string;
  size?: "small" | "medium" | undefined;
  placeholderStyle?: object;
}
const Select: React.FC<Props> = ({
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
    <Box
      display={"inline-flex"}
      width={"100%"}
      height="auto"
      justifyContent="flex-start"
      alignItems={"center"}
    >
      <Box
        bgcolor={"white"}
        height={42}
        sx={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
        display={"inline-flex"}
        justifyContent="flex-start"
        padding={1}
        alignItems={"center"}
      >
        <Typography
          variant="h5"
          paddingRight={0.3}
          fontWeight={"700"}
          color="#696974"
        >
          {labelValue}
        </Typography>
        <select className="select" value={selectValue}>
          {options &&
            options?.map(({ id, text, value }) => (
              <option value={value}>{text} </option>
            ))}
        </select>
      </Box>
      <Box
        bgcolor={"white"}
        sx={{ borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
        padding={0.8}
        marginLeft={0.2}
      >
        <ArrowDropDown sx={{ width: 22, cursor: "pointer" }} />
      </Box>
    </Box>
  );
};
export default Select;
