import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button } from "@mui/material";
import { popOverStyle } from "../../../../coreUI/themes/Styles";
import IMAGES from "../../../../assets/img/Images";
import { useDispatch } from "react-redux";
import { openEditClientPopup, openDeleteClientPopup } from "../../../../models/Ui";
import { clientsActions } from "../../../../models/Clients";
import MoreIcon from "../../../../assets/icons/moreIcon";
import { IClientPopover } from "src/types/views/Client";

const ClientsPopover: React.FC<IClientPopover> = ({ client }) => {
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
      <Box onClick={handleOpen} marginBottom={2} sx={{ cursor: "pointer" }} data-test-id="client-actions">
        <MoreIcon color="#783DBD" />
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
            className={styles.grayButton}
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
            className={styles.redButton}
            data-test-id="client-delete-button"
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
