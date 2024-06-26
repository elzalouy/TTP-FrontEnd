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
import { Box, DialogContent, ListItemIcon, Typography } from "@mui/material";
import IMAGES from "src/assets/img/Images";
import { DialogOption } from "src/types/components/SelectDialog";
import CheckIcon from "@mui/icons-material/CheckCircle";
export type SelectComponentProps = {
  options: DialogOption[];
  selected?: DialogOption[];
  label: string;
  name: string;
  onSelect: (item: DialogOption) => any;
  onDiselect: (item: DialogOption) => any;
  allOption: boolean;
  onSelectAll: any;
};

export interface DialogProps {
  open: boolean;
  selected?: DialogOption[];
  onClose: any;
  options: DialogOption[];
  onSelect: any;
  onDiselect: (item: DialogOption) => void;
  onSelectedAll: (selectAll: boolean) => void;
  allOption: boolean;
}

export const SimpleDialog = ({
  open,
  selected,
  options,
  onSelect,
  onClose,
  onDiselect,
  onSelectedAll,
  allOption,
}: DialogProps) => {
  const theme = useTheme();
  const [selectedAll, setSelectedAll] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [searchVal, setSearchVal] = React.useState("");
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  React.useEffect(() => {
    setSelectedAll(options.length === selected?.length);
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

  React.useEffect(() => {
    if (selected?.length === 0 || selected?.length !== options.length)
      setSelectedAll(false);
    else setSelectedAll(true);
  }, [selected]);

  const handleListItemClick = (value: DialogOption) => {
    let index = selected ? selected.findIndex((i) => i.id === value.id) : -1;
    if (index >= 0) onDiselect(value);
    else onSelect(value);
  };

  const handleSelectAll = () => {
    onSelectedAll(selectedAll ? false : true);
    setSelectedAll(selectedAll ? false : true);
  };

  const onSearch = (e: any) => setSearchVal(e.target.value);
  return (
    <Dialog
      onClose={() => onClose(false)}
      open={open}
      maxWidth={"xs"}
      fullWidth={true}
      fullScreen={fullScreen}
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
          {allOption && (
            <ListItem
              onClick={handleSelectAll}
              sx={{
                cursor: "pointer",
                marginBottom: "3px",
                borderRadius: "5px",
                ":hover": {
                  backgroundColor: "#fafafb",
                },
              }}
            >
              <ListItemText primary={"All"} sx={{ color: "gray" }} />
              {selectedAll && (
                <ListItemIcon>
                  <CheckIcon htmlColor="#5fda71"></CheckIcon>
                </ListItemIcon>
              )}
            </ListItem>
          )}
          {(searchVal.length > 0 ? filteredOptions : options)?.map((item) => {
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
                onClick={(e) => handleListItemClick(item)}
                key={item.id}
                id={item.id}
                sx={{
                  cursor: "pointer",
                  marginBottom: "3px",
                  borderRadius: "5px",
                  ":hover": {
                    backgroundColor: "#fafafb",
                  },
                }}
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
                <ListItemText
                  primary={item.label}
                  sx={{ color: item.id === null ? "red" : "gray" }}
                />
                {selected?.find((i) => i.id === item.id) && (
                  <ListItemIcon>
                    <CheckIcon htmlColor="#5fda71"></CheckIcon>
                  </ListItemIcon>
                )}
                {selected?.length === options.length &&
                  options.length > 0 &&
                  item.id === "all" && (
                    <ListItemIcon>
                      <CheckIcon htmlColor="#5fda71"></CheckIcon>
                    </ListItemIcon>
                  )}
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export const MulitSelectDialogComponent = ({
  options,
  selected,
  label,
  name,
  onSelect,
  onDiselect,
  allOption,
  onSelectAll,
}: SelectComponentProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const filterInputStyle = {
    fontSize: "14px",
    backgroundColor: "white",
    borderRadius: "10px 0px 0px 10px",
    display: "inline-flex",
    border: 0,
    paddingLeft: "15px",
    cursor: "pointer",
    paddingBlock: "10px",
    height: "38px !important",
    overflow: "hidden",
    color: "#696974",
    float: "left",
    justifyContent: "flex-start",
    ":hover": {
      backgroundColor: "white",
    },
  };

  return (
    <div>
      <Box width={"100%"} display={"inline-flex"}>
        <Button
          variant={"text"}
          fullWidth
          sx={filterInputStyle}
          disableRipple={true}
          onClick={handleClickOpen}
        >
          {label}
          <Typography color={"#303030"} fontWeight={"600"}>
            {"  " + selected?.length}
          </Typography>
        </Button>
        <img
          onClick={handleClickOpen}
          src={IMAGES.filterDropdown}
          className="filter-leftIcon"
          alt=""
        />
      </Box>
      <SimpleDialog
        open={open}
        options={options}
        selected={selected}
        onClose={setOpen}
        onSelect={onSelect}
        onDiselect={onDiselect}
        allOption={allOption}
        onSelectedAll={onSelectAll}
      />
    </div>
  );
};
