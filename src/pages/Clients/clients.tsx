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
    },
  }));

  return (
    <Box className="clients-page" sx={{ width: "100%" }}>
      <Box sx={{ paddingTop: "50px" }}>
        <Typography
          variant="h2"
          style={{
            margin: "10px 0",
            paddingBottom: "20px",
          }}
        >
          Clients
        </Typography>
        <Box className="clients-settings">
          <Box className="filter-icon">
            <img src={IMAGES.sortout} alt="sortout" />
          </Box>
          <Box className="clients-option">
            <label>Sort By:</label>
            <select className="select-filter" name="color">
              <option value="A to Z">A to Z</option>
              <option value="In progress">In progress</option>
              <option value="To do">To do</option>
            </select>
          </Box>
          <Box className="clients-option">
            <label>Date:</label>
            <select
              style={{ paddingRight: "10px" }}
              className="select-filter"
              name="color"
            >
              <option value="Oldest to Newest">Oldest to Newest</option>
              <option value="option 2">Option 2</option>
              <option value="option 3">Option 3</option>
            </select>
          </Box>

          <Box>
            <Box
              sx={{ width: 280, mb: 0 }}
              style={{ backgroundColor: "#fafafa" }}
            >
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
    </Box>
  );
};
export default clients;
