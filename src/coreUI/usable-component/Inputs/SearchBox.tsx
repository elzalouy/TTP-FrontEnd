import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import IMAGES from "../../../assets/img/Images";

interface Props {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
}

//SX Styles Objects

const paperStyles = {
  p: "2px 4px",
  display: "flex",
  borderRadius: "10px",
  alignItems: "center",
  width: "100%",
  height: 42,
}

const Search: React.FC<Props> = (props) => {
  return (
    <Paper
      component="form"
      sx={paperStyles}
    >
      <IconButton
        type="button"
        onClick={props.onChange}
        disableRipple={true}
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <img src={IMAGES.search} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={props?.value ? props?.value : ""}
        onChange={props.onChange}
        inputProps={{ "aria-label": "" }}
        placeholder={props?.placeholder ? props.placeholder : ""}
      />
    </Paper>
  );
};

export default Search;
