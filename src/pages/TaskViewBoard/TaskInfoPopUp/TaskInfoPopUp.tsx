import * as React from "react";
import PopUp from "../../../coreUI/usable-component/Popup/PopUp";
import IMAGES from "../../../assets/img/Images";
import "./TaskInfoPopup.css";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { selectRole } from "../../../redux/Auth";
import { selectViewTask } from "../../../redux/Ui/UI.selectors";
import { Task } from "../../../redux/Projects";
import { toggleViewTaskPopup } from "../../../redux/Ui";

const TaskInfoPopUp: React.FC<Props> = (props) => {
  // here is the clean order of code
  // we want to seperate some rendered lines of design code as a seperated component
  // our State first
  const dispatch = useDispatch();
  const viewTask = useAppSelector(selectViewTask);
  const { register, control, setValue } = useForm();
  const role = useAppSelector(selectRole);

  React.useEffect(() => {
    if (props.task?.deadline) {
      let date = moment(props.task.deadline).format("DD/MM/YYYY");
      setValue("deadline", date);
    } else {
      setValue("deadline", props.task?.deadline);
    }
    setValue("name", props.task?.name);
    setValue("selectedDepartmentId", props.task?.listId);
    setValue("description", props.task?.listId);
    setValue("categoryId", props.task?.categoryId);
    setValue("subCategoryId", props.task?.subCategoryId);
    setValue("teamId", props.task?.teamId);
  }, [viewTask]);

  const onCloseModel = () => {
    dispatch(toggleViewTaskPopup("none"));
  };

  return (
    <>
      <PopUp show={viewTask} minWidthSize="50vw" color="rgb(0 0 0 / 10%)">
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
          />
          <Typography variant="h2" fontWeight={"500"} color={"#30bcc7"}>
            Task Information
          </Typography>
        </Grid>
        <form>
          <div className="inputs-grid">
            <div>
              <label className="label-project">Task name</label>
              <br />
              <Controller
                name="name"
                control={control}
                render={(props) => (
                  <input
                    {...register("name")}
                    value={props.field.value}
                    className="input"
                    readOnly
                    placeholder="Task name"
                  />
                )}
              />
            </div>
            <div>
              <label className="label-project">Department name</label>
              <br />
              <Controller
                name="selectedDepartmentId"
                control={control}
                render={(props) => (
                  <input
                    {...register("selectedDepartmentId")}
                    className="input"
                    value={props.field.value}
                    readOnly
                    placeholder="Department name"
                  />
                )}
              />
            </div>
            {props.task?.deadline && (
              <div>
                <label className="label-project">Deadline date</label>
                <br />
                <Controller
                  name="deadline"
                  control={control}
                  render={(props) => (
                    <input
                      {...register("deadline")}
                      className="input"
                      value={props.field.value}
                      readOnly
                      placeholder="Deadine Date"
                    />
                  )}
                />
              </div>
            )}
            <div>
              <label className="label-project">Category</label>
              <br />
              <Controller
                name="categoryId"
                control={control}
                render={(props) => (
                  <input
                    readOnly
                    {...register("categoryId")}
                    className="input"
                    value={props.field.value}
                    placeholder="Category"
                  />
                )}
              />
            </div>
            {props.task?.subCategoryId && (
              <div>
                <label className="label-project">Sub category</label>
                <br />
                <Controller
                  name="subCategoryId"
                  control={control}
                  render={(props) => (
                    <input
                      readOnly
                      {...register("subCategoryId")}
                      className="input"
                      value={props.field.value}
                      placeholder="Sub Category"
                    />
                  )}
                />
              </div>
            )}
            {role === "OM" && props.task?.teamId && (
              <div>
                <label className="label-project">Assign to Team</label>
                <br />
                <Controller
                  name="teamId"
                  control={control}
                  render={(props) => (
                    <input
                    className="input"
                      readOnly
                      {...register("teamId")}
                      value={props.field.value}
                      placeholder="Assign to Team"
                    />
                  )}
                />
              </div>
            )}
          </div>
          {props.task?.description && (
            <div style={{margin:"10px"}}>
              <label className="label-project">Description</label>
              <br />
              <Controller
                name="description"
                control={control}
                render={(props) => (
                  <textarea
                    readOnly
                    className="textarea"
                    {...register("description")}
                    value={props.field.value}
                    placeholder="Write about your task"
                    rows={5}
                  />
                )}
              />
            </div>
          )}
          <Box
            marginTop={1}
            alignItems="center"
            display={"inline-flex"}
            className="files"
          >
            <>
              {props.task?.attachedFiles &&
                props.task.attachedFiles.length > 0 &&
                props.task.attachedFiles?.map((item: any, index) => (
                  <Typography
                    key={index}
                    marginX={0.5}
                    bgcolor={"#F1F1F5"}
                    padding={0.5}
                    borderRadius={1}
                    color="#92929D"
                    sx={taskFormFilesStyles}
                  >
                    {item?.name}
                    <CloseIcon
                      sx={{ fontSize: "14px", marginLeft: 0.5 }}
                      htmlColor="#92929D"
                    />
                  </Typography>
                ))}
            </>
            <>
              {props.task?.attachedFiles &&
                props.task?.attachedFiles.length > 0 &&
                props.task.attachedFiles?.map((item: any, index) => (
                  <Typography
                    key={index}
                    marginX={0.5}
                    bgcolor={"#F1F1F5"}
                    padding={0.5}
                    borderRadius={1}
                    color="#92929D"
                    sx={taskFormFilesStyles}
                  >
                    {item?.name}
                  </Typography>
                ))}
            </>
          </Box>
        </form>
      </PopUp>
    </>
  );
};

export default TaskInfoPopUp;

type Props = {
  show: string;
  setShow?: (val: string) => void;
  task?: Task;
};

const taskFormFilesStyles = {
  cursor: "pointer",
  height: "35px",
  textAlign: "center",
  alignContent: "center",
  paddingTop: 1,
};
