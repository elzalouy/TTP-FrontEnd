import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { popOverStyle } from "../styles";
import IMAGES from "../../../assets/img";
import { useDispatch } from "react-redux";
import { openEditClientPopup, openDeleteClientPopup } from "../../../redux/Ui";
import { Client, clientsActions } from "../../../redux/Clients";
interface Props {
  client: Client;
}
const ClientsPopover: React.FC<Props> = ({ client }) => {
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
  const showEditClientPopup = () => {
    dispatch(openEditClientPopup("flex"));
    dispatch(clientsActions.setEditClient(client));
    handleClose();
  };
  const showDeleteClientPopup = () => {
    dispatch(openDeleteClientPopup("flex"));
    dispatch(clientsActions.setEditClient(client));
    handleClose();
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
            onClick={showEditClientPopup}
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
            <img
              alt=""
              src={IMAGES.edit}
              width={18}
              style={{ marginRight: 10 }}
            ></img>
            Edit Client
          </Button>
          <Button
            variant="text"
            onClick={showDeleteClientPopup}
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
              alt=""
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
