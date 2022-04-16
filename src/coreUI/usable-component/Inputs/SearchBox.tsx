import { IconButton, Paper } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
interface Props {
  search: string;
  handleSearchChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const SearchBox: React.FC<Props> = ({ search, handleSearchChange }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        borderRadius: 4,
        alignItems: "center",
        height: 42,
      }}
    >
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase sx={{ ml: 1, flex: 1 }} inputProps={{ "aria-label": "" }} />
    </Paper>
  );
};

export default SearchBox;
