import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

export default function Search(props: any) {
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
      <IconButton
        type="button"
        onClick={props.onHandleChange}
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        {...props}
        sx={{ ml: 1, flex: 1 }}
        value={props.value}
        onChange={props.onChange}
        inputProps={{ "aria-label": "" }}
      />
    </Paper>
  );
}