import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { popOverStyle } from "../../../coreUI/themes/Styles";
import IMAGES from "../../../assets/img/Images";
import { RouteComponentProps } from "react-router";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";

interface Props {
  history?: RouteComponentProps["history"];
  handleSetShow: (value: string) => void;
  handleSetShowDelete: (value: string) => void;
  color?: string;
}

//SX Styles Object

const DepartmentPopover: React.FC<Props> = ({
  handleSetShow,
  handleSetShowDelete,
  color,
}) => {
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
  const showDeleteDepartmentPopup = () => {
    handleClose();
    handleSetShowDelete("flex");
  };
  const showEditProjectPopup = () => {
    handleClose();
    handleSetShow("flex");
  };

  return (
    <div>
      <Box
        onClick={handleOpen}
        data-test-id="open-department-toggler"
        marginBottom={2}
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="h3" fontWeight={"bold"}>
          <MoreHorizIcon style={{ color: color }} />
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
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box display={"grid"} padding={1}>
          <Button
            variant="text"
            onClick={showEditProjectPopup}
            className={styles.grayButton}
          >
            <img src={IMAGES.edit} width={18} style={{ marginRight: 10 }}></img>
            Edit Department
          </Button>
          <Button
            onClick={showDeleteDepartmentPopup}
            variant="text"
            className={styles.redButton}
            data-test-id="delete-department-btn"
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
export default DepartmentPopover;
