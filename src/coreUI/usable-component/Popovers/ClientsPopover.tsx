import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { popOverStyle } from "../styles";
import IMAGES from "../../../assets/img";
import { RouteComponentProps } from "react-router";
import { useDispatch } from "react-redux";
import {
  openDeleteProjectPopup,
  openEditProjectPopup,
} from "../../../redux/Ui";
interface Props {}
const ClientsPopover: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const styles = popOverStyle()();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const handleOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showDeleteProjectPopup = (val: string) => {
    dispatch(openDeleteProjectPopup(val));
  };
  const showEditProjectPopup = (val: string) => {
    dispatch(openEditProjectPopup(val));
  };
  return (
    <div>
      <Box onClick={handleOpen} marginBottom={2} sx={{ cursor: "pointer" }}>
        <Typography variant="h3" fontWeight={"bold"}>
          <img src={IMAGES.more} alt="more" />
        </Typography>
      </Box>
      <Popover
        className={styles.root}
        open={open}
        anchorEl={anchorEl}
        anchorReference="anchorEl"
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box display={"grid"} padding={1}>
          <Button
            variant="text"
            onClick={() => {
              showEditProjectPopup("flex");
              handleClose();
            }}
            sx={{
              width: 120,
              justifyContent: "flex-start",
              textTransform: "none",
              fontFamily: "Cairo",
              color: "#696974",
              fontWeight: "700",
              fontSize: 13,
            }}
          >
            <img src={IMAGES.edit} width={18} style={{ marginRight: 10 }}></img>
            Edit Client
          </Button>
          <Button
            onClick={() => {
              showDeleteProjectPopup("flex");
              handleClose();
            }}
            variant="text"
            sx={{
              width: 120,
              justifyContent: "flex-start",
              color: "#FF0000",
              textTransform: "none",
              fontFamily: "Cairo",
              fontWeight: "700",
              fontSize: 13,
            }}
          >
            <img
              src={IMAGES.deleteicon2}
              width={18}
              style={{ marginRight: 10 }}
            ></img>
            Delete
          </Button>
        </Box>
      </Popover>
    </div>
  );
};
export default ClientsPopover;
