import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { popOverStyle } from "../../../coreUI/themes/Styles";
import IMAGES from "../../../assets/img/Images";
import OfflineShareIcon from "@mui/icons-material/OfflineShare";
import { RouteComponentProps } from "react-router";
import { useDispatch } from "react-redux";
import { openDeleteTaskPopup, toggleEditTaskPopup } from "../../../models/Ui";
import { ProjectsActions, selectTaskDetails } from "../../../models/Projects";
import { useAppSelector } from "../../../models/hooks";
import { selectAllDepartments } from "../../../models/Departments";
import { Task } from "../../../types/models/Projects";
interface Props {
  item: Task;
}
const TasksPopover: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  const viewTask = useAppSelector(selectTaskDetails);
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
  const generateURL = () => {
    let boardURL = departments.find((dep) => dep.boardId === item?.boardId);
    return boardURL?.boardURL;
  };
  const url = generateURL();

  const onDeleteTask = () => {
    dispatch(ProjectsActions.onDeleteTask(item._id));
    dispatch(openDeleteTaskPopup("flex"));
    handleClose();
  };

  return (
    <div>
      <Box
        onClick={handleOpen}
        marginBottom={2}
        sx={{ cursor: "pointer" }}
        className="task-actions"
      >
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
            disableRipple={true}
            className={styles.grayButton}
          >
            <a
              href={url}
              target="_blank"
              className={styles.grayButton}
              style={{
                textDecoration: "none",
                color: "#505050",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={IMAGES.trelloIcon}
                width={18}
                style={{ marginRight: 2, marginLeft: 1 }}
              ></img>
              <span style={{ marginLeft: 7 }}>Open in trello</span>
            </a>
          </Button>
          <Button
            onClick={onDeleteTask}
            variant="text"
            className={styles.redButton}
            id="delete-task-button"
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
