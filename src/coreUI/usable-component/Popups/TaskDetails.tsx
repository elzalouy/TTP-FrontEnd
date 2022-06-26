import {
  Button,
  Grid,
  ImageListItemBar,
  Popover,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { Task, taskDetails } from "../../../redux/Projects";
import PopUp from "../Popup/PopUp";
import Status from "../Typos/Status";
import { Close } from "@mui/icons-material";
import { toggleTask } from "../../../redux/Ui";
import { Box } from "@mui/system";
import moment from "moment";

interface TaskDetailsProps {
  show: string;
  setShow: any;
}

const TaskDetails: React.FC<TaskDetailsProps> = (props) => {
  const cs = taskDetailsStyles();
  const dispatch = useDispatch();
  const { task, pmName, department, member } = useAppSelector(taskDetails);
  const [state, setState] = React.useState<any>({
    images: [],
    files: [],
    selected: null,
  });

  React.useEffect(() => {
    let State = { ...state };
    let mimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
    if (task?.attachedFiles && task?.attachedFiles?.length > 0) {
      let images = task.attachedFiles.filter((item) =>
        mimeTypes.includes(item.mimeType)
      );
      State.images = images;
      let others = task?.attachedFiles.filter(
        (item) => !mimeTypes.includes(item.mimeType)
      );
      State.files = others;
      State.selected = images[0];
    }
    setState(State);
  }, [task]);

  const handleClose = () => {
    dispatch(toggleTask("none"));
  };

  const selectImage = (item: any) => {
    let State = { ...state };
    State.selected = item;
    setState(State);
  };
  return (
    <PopUp
      padding="0px"
      overflowY={false}
      show={props.show}
      minWidthSize="50vw"
      maxWidthSize="60vw"
      minHeight="28vw"
    >
      <Grid container direction={"row"}>
        <Grid xs={6}>
          <img src={state?.selected?.url} width="100%" height={"100%"} />
        </Grid>
        <Grid xs={6} padding={2}>
          <Grid container direction={"row"} className={cs.row1}>
            <Grid item>
              <Grid container direction={"row"}>
                <Grid item>
                  <Typography variant="h4">{task?.name}</Typography>
                </Grid>
                <Grid item className={cs.status}>
                  <Status status={task?.status} />
                </Grid>
                <Grid item>
                  <Status
                    status={moment(task?.deadline).format("DD MMMM yyyy")}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Close className={cs.close} onClick={handleClose} />
            </Grid>
          </Grid>
          <Typography variant="subtitle2" paddingTop={1}>
            Project Manager : {pmName}
          </Typography>
          <Typography variant="subtitle2" paddingTop={1}>
            Department : {department}
          </Typography>
          {member && (
            <Typography variant="subtitle2" paddingTop={1}>
              Team : {member}
            </Typography>
          )}
          <Box className={cs.details}>
            <Typography variant="subtitle2">
              {task?.description ? task?.description : "No description"}
            </Typography>
          </Box>
          <Box display={"inline-flex"} className={cs.images}>
            {state.images.map((item: any) => (
              <img
                onClick={() => selectImage(item)}
                className={cs.image}
                src={item?.url}
              />
            ))}
          </Box>
          <Button></Button>
        </Grid>
      </Grid>
    </PopUp>
  );
};
const taskDetailsStyles = makeStyles({
  row1: {
    justifyContent: "space-between",
  },
  title: {
    color: "#000000",
  },
  status: {
    marginInline: "10px",
  },
  close: {
    fontSize: 14,
    padding: 0,
    margin: 0,
    cursor: "pointer",
  },
  details: {
    marginTop: "20px",
  },
  images: {
    width: "100%",
    overflowX: "scroll",
    height: "80px",
    border: "1px solid #9FA1AB",
    borderRadius: "5px",
    padding: "10px",
    marginTop: "20px",
  },
  image: {
    width: "auto",
    height: "100%",
    cursor: "pointer",
  },
  pm: {
    display: "inline-flex",
  },
});
export default TaskDetails;
