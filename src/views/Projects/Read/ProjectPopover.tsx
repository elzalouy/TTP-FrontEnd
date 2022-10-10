import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { popOverStyle } from "../../../coreUI/themes/Styles";
import IMAGES from "../../../assets/img/Images";
import { RouteComponentProps } from "react-router";
import { useDispatch } from "react-redux";
import {
  openDeleteProjectPopup,
  openEditProjectPopup,
} from "../../../models/Ui";
import { ProjectsActions } from "../../../models/Projects";
import { useAppSelector } from "src/models/hooks";
import { selectRole } from "src/models/Auth";

interface Props {
  id: string;
  history: RouteComponentProps["history"];
}

//SX Styles Object

const ProjectPopover: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const role = useAppSelector(selectRole);

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
  const showDeleteProjectPopup = () => {
    dispatch(ProjectsActions.onSetDeleteProjectId(props.id));
    dispatch(openDeleteProjectPopup("flex"));
    handleClose();
  };
  const showEditProjectPopup = () => {
    dispatch(ProjectsActions.onSetEditProjectId(props.id));
    dispatch(openEditProjectPopup("flex"));
    handleClose();
  };

  return (
    <div className="project-actions-wrapper">
      <Box
        data-test-id={`projects-row-dot-icon-${props.id}`}
        onClick={handleOpen}
        marginBottom={2}
        sx={{ cursor: "pointer" }}
        className="project-actions"
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
            onClick={() => props.history.push(`/TasksBoard/${props.id}`)}
            variant="text"
            className={styles.grayButton}
          >
            <img
              src={IMAGES.projectsicon}
              width={22}
              style={{ marginRight: 6 }}
            ></img>
            Open Tasks
          </Button>
          <Button
            data-test-id={`projects-edit-project-btn-${props.id}`}
            variant="text"
            onClick={showEditProjectPopup}
            className={styles.grayButton}
          >
            <img src={IMAGES.edit} width={18} style={{ marginRight: 10 }}></img>
            Edit Project
          </Button>
          {role !== "PM" && (
            <Button
              onClick={showDeleteProjectPopup}
              variant="text"
              className={styles.redButton}
              id="delete-project-button"
            >
              <img
                src={IMAGES.deleteicon2}
                width={18}
                style={{ marginRight: 10 }}
              ></img>
              Delete
            </Button>
          )}
        </Box>
      </Popover>
    </div>
  );
};
export default ProjectPopover;
