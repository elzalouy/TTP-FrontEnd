import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import IMAGES from "../assets/img";

interface Props {
  search: string;
  handleSearchChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    boxShadow: "0px 1px 4px 1px #0000000d",
    borderRadius: "0.5em",
  },
}));

const SearchBox: React.FC<Props> = ({ search, handleSearchChange }) => {
  return (
    <Search
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      <SearchIconWrapper>
        <img src={IMAGES.search} alt="" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        onChange={handleSearchChange}
        // value={search}
      />
    </Search>
  );
};

export default SearchBox;
