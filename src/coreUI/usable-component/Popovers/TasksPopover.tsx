import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { popOverStyle } from "../../../themes/Styles";

import IMAGES from "../../../assets/img/Images";
import { RouteComponentProps } from "react-router";
import { useDispatch } from "react-redux";
import { openDeleteTaskPopup, toggleEditTaskPopup } from "../../../redux/Ui";
import { ProjectsActions, Task } from "../../../redux/Projects";
interface Props {
  item: Task;
}
const TasksPopover: React.FC<Props> = ({ item }) => {
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
  
  const onEditTask = async () => {
    await dispatch(ProjectsActions.onEditTask(item._id));
    dispatch(toggleEditTaskPopup("flex"));
    handleClose();
  };

  const onDeleteTask = () => {
    dispatch(ProjectsActions.onDeleteTask(item._id));
    dispatch(openDeleteTaskPopup("flex"));
    handleClose();
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
            onClick={onEditTask}
            className={styles.grayButton}
          >
            <img src={IMAGES.edit} width={18} style={{ marginRight: 10 }}></img>
            Edit Task
          </Button>
          <Button
            onClick={onDeleteTask}
            variant="text"
            className={styles.redButton}
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
