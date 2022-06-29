import * as React from "react";
import PopUp from "../../../coreUI/usable-component/Popup/PopUp";
import IMAGES from "../../../assets/img/Images";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { selectRole } from "../../../redux/Auth";
import { selectViewTask } from "../../../redux/Ui/UI.selectors";
import { selectTaskDetails } from "../../../redux/Projects";
import { toggleViewTaskPopup } from "../../../redux/Ui";
import { selectAllDepartments } from "../../../redux/Departments";
import { selectDepartmentMembers } from "../../../redux/techMember";
import { Task } from "../../../interfaces/models/Projects";
import {
  selectAllCategories,
  selectSubCategories,
  SubCategory,
} from "../../../redux/Categories";
import "./TaskInfo.css";

const TaskInfoPopUp: React.FC<Props> = (props) => {
  // here is the clean order of code
  // we want to seperate some rendered lines of design code as a seperated component
  // our State first
  const dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const teams = useAppSelector(selectDepartmentMembers);
  const subCategories = useAppSelector(selectSubCategories);
  const viewTask = useAppSelector(selectTaskDetails);
  const { register, control, setValue } = useForm();
  const role = useAppSelector(selectRole);
  const theme = useTheme();
  const LG = useMediaQuery(theme.breakpoints.down("lg"));

  const getAllTaskDetails = (
    depID: string,
    catID: string,
    subCatID: string,
    teamID: string
  ) => {
    let depName = departments.find((item) => item.boardId === depID)?.name;
    let catName = categories.find((item: any) => item._id === catID)?.category;
    let teamName = teams.find((item) => item._id === teamID)?.name;
    let subCatFilter = subCategories.find((item) =>
      item?.find((sub) => sub._id === subCatID)
    );
    let subCatName = subCatFilter
      ? subCatFilter.find((item) => item._id === subCatID)?.subCategory
      : null;
    return {
      depName,
      catName,
      teamName,
      subCatName,
    };
  };

  React.useEffect(() => {
    setValue("name", viewTask?.name);
    setValue("selectedDepartmentId", viewTask?.boardId);
    setValue("description", viewTask?.description);
    setValue("categoryId", viewTask?.categoryId);
    setValue("subCategoryId", viewTask?.subCategoryId);
    setValue("teamId", viewTask?.teamId);
    if (viewTask !== undefined) {
      let names = getAllTaskDetails(
        viewTask?.boardId,
        viewTask?.categoryId,
        viewTask?.subCategoryId,
        viewTask?.teamId
      );
      setValue("selectedDepartmentId", names.depName);
      setValue("categoryId", names.catName);
      setValue("subCategoryId", names.subCatName);
      setValue("teamId", names.teamName);
    }
    if (viewTask?.deadline) {
      let date = moment(viewTask.deadline).format("LL");
      setValue("deadline", date);
    } else {
      setValue("deadline", viewTask?.deadline);
    }
  }, [viewTask]);

  const onCloseModel = () => {
    dispatch(toggleViewTaskPopup("none"));
  };

  return (
    <>
      <PopUp
        minHeightSize="40vh"
        show={props.show}
        minWidthSize="50vw"
        color="rgb(0 0 0 / 10%)"
      >
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
        <Grid
          display={"flex"}
          flex={"1:1"}
          flexDirection={LG ? "column-reverse" : "row"}
          mx={"10px"}
        >
          {viewTask?.attachedFiles && viewTask?.attachedFiles.length > 0 && (
            <Grid
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              flex={1}
              maxHeight={"500px"}
              position={"relative"}
            >
              <Box
                alignItems="center"
                display={"flex"}
                className="files-task-view customScrollbar"
              >
                {viewTask.attachedFiles?.map((item: any) => {
                
                  return (
                    <div className="image-container">
                      <img src={item.url} alt={item.name} className="img" />
                    </div>
                  );
                })}
              </Box>
            </Grid>
          )}
          <Grid
            display="flex"
            flexDirection={"column"}
            justifyContent={"space-between"}
            flex={1}
            maxHeight={"500px"}
            flexWrap={"wrap"}
          >
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
              mb={"3rem"}
            >
              <div className="form-header">
                <br />
                <Controller
                  name="name"
                  control={control}
                  render={(props) => (
                    <Typography typography={"h2"} textTransform={"capitalize"}>
                      {props.field.value}
                    </Typography>
                  )}
                />
              </div>
              <div className="form-header">
                {viewTask?.deadline && (
                  <div className="form-header">
                    <Controller
                      name="deadline"
                      control={control}
                      render={(props) => (
                        <span className="form-header-date">
                          {props.field.value}
                        </span>
                      )}
                    />
                  </div>
                )}
                <div className="form-header">
                  <span
                    className={
                      viewTask?.status === "inProgress"
                        ? "inProgressStatus"
                        : viewTask?.status === "Review"
                        ? "reviewStatus"
                        : viewTask?.status === "Not Clear"
                        ? "notClearStatus"
                        : viewTask?.status === "Tasks Board"
                        ? "notStartedStatus"
                        : viewTask?.status === "Done"
                        ? "doneStatus"
                        : viewTask?.status === "Shared"
                        ? "sharedStatus"
                        : "endedStatus"
                    }
                  >
                    {viewTask?.status}
                  </span>
                </div>
              </div>
            </Grid>
            <div className="form-inputs-grid">
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
              {viewTask?.subCategoryId && (
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
              {role === "OM" && viewTask?.teamId && (
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
            {viewTask?.description && (
              <div>
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
          </Grid>
        </Grid>
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
  wordWrap: "break-all",
};
