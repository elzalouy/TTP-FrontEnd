import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { popOverStyle } from "../styles";
import IMAGES from "../../../assets/img";
import { RouteComponentProps } from "react-router";
import { useDispatch } from "react-redux";

interface Props {}
const TasksPopover: React.FC<Props> = () => {
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

  return (
    <div>
      <Box onClick={handleOpen} marginBottom={2} sx={{ cursor: "pointer" }}>
        <Typography variant="h3" fontWeight={"bold"}>
          <img src={IMAGES.moreGrey} alt="more" />
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
            sx={{
              width: 180,
              justifyContent: "flex-start",
              textTransform: "none",
              fontFamily: "Cairo",
              color: "#696974",
              fontWeight: "700",
              fontSize: 13,
            }}
          >
            <img src={IMAGES.edit} width={18} style={{ marginRight: 10 }}></img>
            Edit Task
          </Button>
          <Button
            variant="text"
            sx={{
              width: 180,
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
            Delete Task
          </Button>
        </Box>
      </Popover>
    </div>
  );
};
export default TasksPopover;