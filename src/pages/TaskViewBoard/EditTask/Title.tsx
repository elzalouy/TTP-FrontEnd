import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import IMAGES from "../../../assets/img/Images";
import { ProjectsActions } from "../../../redux/Projects";

interface EditTaskTitleProps {
  title: string;
  setShow: any;
  reset: any;
}

const EditTaskTitle: React.FC<EditTaskTitleProps> = ({
  title,
  setShow,
  reset,
}) => {
  const dispatch = useDispatch();
  const onCloseModel = () => {
    reset();
    dispatch(ProjectsActions.onEditTask(""));
    setShow("none");
  };

  return (
    <Grid
      direction={"row"}
      justifyContent="space-between"
      marginX={1}
      marginTop={2}
      marginBottom={3.5}
    >
      <img
        className="closeIcon"
        src={IMAGES.closeicon}
        alt="closeIcon"
        onClick={onCloseModel}
      style={{cursor:"pointer"}}
      />
      <Typography variant="h2" fontWeight={"500"} color={"#30bcc7"}>
        {title}
      </Typography>
    </Grid>
  );
};

export default EditTaskTitle;
