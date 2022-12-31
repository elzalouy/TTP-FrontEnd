import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Search from "../Search/SearchBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "./selectDialog.css";
import { DialogContent } from "@mui/material";
import IMAGES from "src/assets/img/Images";
import {
  DialogOption,
  DialogProps,
  SelectDialogProps,
} from "src/types/components/SelectDialog";

export const SimpleDialog = ({
  open,
  selectedValue,
  onClose,
  options,
}: DialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [searchVal, setSearchVal] = React.useState("");
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  React.useEffect(() => {
    let filtered =
      searchVal.length > 0
        ? options.filter((item) =>
            item.label
              .toLocaleLowerCase()
              .includes(searchVal.toLocaleLowerCase())
          )
        : options;
    setFilteredOptions(filtered);
  }, [searchVal]);

  const handleClose = () => {
    onClose(selectedValue ? selectedValue : { label: "", id: "" });
  };

  const handleListItemClick = (e: any, value: DialogOption) => {
    onClose(value);
  };

  const onSearch = (e: any) => setSearchVal(e.target.value);

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleClose}
      open={open}
      maxWidth={"xs"}
      fullWidth={true}
    >
      <DialogTitle className="dialogTitle">
        <Search
          placeholder="Search by name"
          value={searchVal}
          onChange={onSearch}
          size="custom"
        />
      </DialogTitle>
      <DialogContent>
        <List
          className="dialogList"
          sx={{
            height: {
              sm: "100%",
              xs: "100%",
              md: "350px",
              lg: "350px",
              xl: "350px",
            },
          }}
        >
          {(searchVal.length > 0 ? filteredOptions : options).map((item) => {
            const image: any = [
              "",
              null,
              undefined,
              "null",
              "undefined",
            ].includes(item.image)
              ? IMAGES.ttp_log
              : item.image?.size
              ? URL.createObjectURL(item.image)
              : item.image;
            return (
              <ListItem
                onClick={(e) => handleListItemClick(e, item)}
                key={item.id}
                id={item.id}
                sx={{ cursor: "pointer" }}
              >
                {item.image && (
                  <ListItemAvatar>
                    <Avatar>
                      <img
                        src={item.image === "avatar" ? IMAGES.ttp_log : image}
                        alt="option"
                        width={"100%"}
                        height="100%"
                      />
                    </Avatar>
                  </ListItemAvatar>
                )}
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export const SelectDialog = ({
  options,
  selected,
  setSelectedValue,
  placeholder,
  label,
  name,
}: SelectDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: DialogOption) => {
    setOpen(false);
    setSelectedValue(name, value.id);
  };

  const inputStyle = {
    border: "1px solid #b4b6c4;",
    borderRadius: "6px",
    justifyContent: "flex-start",
    fontSize: "14px",
    color: selected ? "#303030" : "#b4b6c4 !important",
    ":hover": {
      border: "1px solid #b4b6c4;",
      backgroundColor: "transparent",
    },
  };
  return (
    <div>
      <label className="popup-label">{label}</label>
      <Button
        variant="outlined"
        fullWidth
        sx={inputStyle}
        disableRipple={true}
        onClick={handleClickOpen}
      >
        {selected ? selected.label : placeholder}
      </Button>
      <SimpleDialog
        options={options}
        selectedValue={selected}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};
