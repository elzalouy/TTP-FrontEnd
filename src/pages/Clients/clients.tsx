import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import IMAGES from "../../assets/img/index";
import ClientCard from "./clientCard";
import "./clients.css";
import CreateNewClient from "./CreateNewClient";

type Props = {};
const clients: React.FC<Props> = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
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
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Box className="clients-page">
      <Typography variant="h2" style={{ margin: "10px 0" }}>
        Clients
      </Typography>
      <Box className="clients-settings">
        <Box className="filter-icon">
          <img src={IMAGES.sortout} alt="sortout" />
        </Box>
        <Box className="select-wrap">
          <label>Sort By:</label>
          <select className="select-filter" name="color">
            <option value="Done">A To Z</option>
            <option value="In progress">In progress</option>
            <option value="To do">To do</option>
          </select>
        </Box>
        <Box className="select-wrap">
          <label>Date:</label>
          <select className="select-filter" name="color">
            <option value="All">Oldest To Newest</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
          </select>
        </Box>

        <Box className="select-wrap">
          <Box
            sx={{ width: 300, mb: 0 }}
            style={{ backgroundColor: "#fafafa" }}
          >
            <Search style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
        </Box>
      </Box>
      <Box className="all-clients">
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />

        <CreateNewClient />
      </Box>
    </Box>
  );
};
export default clients;
