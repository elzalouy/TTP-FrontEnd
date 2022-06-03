import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Grid,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SelectInput2 from "../../coreUI/usable-component/Inputs/SelectInput2";
import PopUp from "../../coreUI/usable-component/popUp";

import {
  categoriesActions,
  Category,
  selectAllCategories,
  selectSelectedCategory,
} from "../../redux/Categories";
import { Department, selectAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import {
  editTaskFromBoard,
  editTaskLoading,
  ProjectsActions,
  selectAllProjects,
  selectSelectedProject,
} from "../../redux/Projects";
import { Close as CloseIcon } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";

// import { UiActions } from "../../redux/Ui";
import IMAGES from "../../assets/img";
import {
  valdiateCreateTask,
  validateEditTask,
  validateTaskFilesSchema,
} from "../../helpers/validation";
import Joi from "joi";
import moment from "moment";
import { selectUi } from "../../redux/Ui/UI.selectors";
import PopUps from "../../pages/PopUps";
import { generateID } from "../../helpers/IdGenerator";
import { AnyListenerPredicate } from "@reduxjs/toolkit/dist/listenerMiddleware/types";

type Props = {
  show: string;
  setShow: (val: string) => void;
};
const EditTask: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const files = React.useRef<HTMLInputElement>(null);
  const [Files, setFiles] = React.useState<(File | null)[]>([]);
  const [error, setError] = React.useState<{
    error: Joi.ValidationError | undefined;
    value: any;
    warning: Joi.ValidationError | undefined;
  }>({ error: undefined, value: undefined, warning: undefined });
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const loadingTask = useAppSelector(editTaskLoading);
  const selectedProject = useAppSelector(selectSelectedProject);
  const [selectedDepartment, setSelectedDepartment] = React.useState<
    Department | any
  >();
  const [selectedCategory, setSelectCategory] = React.useState<Category>();

  const { editTask: id } = useAppSelector(selectAllProjects);
  const { editTaskPopup } = useAppSelector(selectUi);
  const { register, handleSubmit, control, reset, setValue } = useForm();

  React.useEffect(() => {
    let task = selectedProject.tasks.find((item) => item._id === id);
    if (task) {
      let dep = departments.find((item) => item.boardId === task?.boardId);
      setValue("name", task.name);
      setValue("attachedFiles", task.attachedFiles);
      setValue("categoryId", task.categoryId);
      setValue("deadline", task.deadline === null ? "" : task.deadline);
      setValue("description", task.description);
      setValue("file", task.file);
      setValue("teamId", task.teamId);
      setValue("selectedDepartmentId", dep ? dep._id : "");
      setValue("subCategoryId", task.subCategoryId);
      setSelectCategory(
        categories.find((item) => item._id === task?.categoryId)
      );
      setSelectedDepartment(dep);
    }
  }, [id]);

  const onChangeDepartment = (e: any) => {
    setValue("selectedDepartmentId", e.target.value);
    let dep = departments.find((item) => item._id === e.target.value);
    setSelectedDepartment(dep);
  };
  const onChangeCategory = (e: any) => {
    setValue("categoryId", e.target.value);
    const cat = categories.find((item) => item._id === e.target.value);
    setSelectCategory(cat);
  };

  React.useEffect(() => {
    if (editTaskPopup === "none") {
      reset();
    }
  }, [editTaskPopup]);

  const onSubmit = async (data: any) => {
    let newTask = {
      id: id,
      name: data.name,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      teamId: data?.teamId ? data?.teamId : null,
      projectId: selectedProject?.project?._id,
      status: data?.deadline ? "inProgress" : "Not Started",
      start: new Date().toUTCString(),
      deadline: data?.deadline ? moment(data?.deadline).toDate() : null,
      deliveryDate: null,
      done: null,
      turnoverTime: null,
      attachedFiles: "",
      listId: data?.teamId
        ? selectedDepartment?.teamsId?.find(
            (item: any) => item._id === data.teamId
          )?.listId
        : selectedDepartment?.defaultListId,
      boardId: selectedDepartment?.boardId,
      description: data?.description,
    };
    let validateResult = validateEditTask(newTask);
    if (validateResult.error) {
      setError(validateResult);
      toast.error(validateResult.error.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: generateID(),
      });
    } else {
      let task = new FormData();
      task.append("name", data.name);
      task.append("categoryId", data.categoryId);
      task.append("subCategoryId", data.subCategoryId);
      task.append("teamId", data.teamId);
      task.append(
        "projectId",
        selectedProject?.project?._id ? selectedProject?.project?._id : ""
      );
      task.append("status", data.deadline ? "inProgress" : "Not Started");
      task.append("start", new Date().toUTCString());
      task.append(
        "deadline",
        data?.deadline ? moment(data.deadline).toDate().toUTCString() : ""
      );
      let files: Array<any> = Array.from(Files);
      let result = validateTaskFilesSchema(files);
      if (result.error === null) {
        if (Files) {
          for (let i = 0; i < files.length; i++) {
            task.append("attachedFiles", files[i]);
          }
        }
        task.append(
          "listId",
          data?.teamId
            ? selectedDepartment?.teamsId?.find(
                (item: any) => item._id === data.teamId
              )?.listId
            : selectedDepartment?.defaultListId
        );
        task.append(
          "boardId",
          selectedDepartment?.boardId ? selectedDepartment.boardId : ""
        );
        task.append("description", data?.description);
        dispatch(
          editTaskFromBoard({ data: newTask, dispatch, setShow: props.setShow })
        );
      } else toast.error(result.error);
    }
  };

  const onChangeFiles = () => {
    files.current?.click();
  };
  const onSetFiles = () => {
    let newfiles = files.current?.files;
    if (newfiles) {
      let items = [...Files];
      for (let i = 0; i < newfiles.length; i++) {
        items.push(newfiles.item(i));
      }
      setFiles(items);
    }
  };
  const onRemoveFile = (item: File | null) => {
    let newFiles = Files;
    newFiles = newFiles?.filter((file) => file !== item);
    setFiles(newFiles);
  };
  const onCloseModel = () => {
    dispatch(ProjectsActions.onEditTask(""));
    props.setShow("none");
  };
  return (
    <>
      <PopUp show={props.show} minWidthSize="50vw">
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
            Edit task
          </Typography>
        </Grid>
        <div className="step2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs-grid">
              <div>
                <label className="label-project">Task name</label>
                <br />
                <Controller
                  name="name"
                  control={control}
                  render={(props) => (
                    <TextField
                      {...register("name")}
                      value={props.field.value}
                      error={error.error?.details[0].path.includes("name")}
                      id="outlined-error"
                      sx={{
                        width: "100%",
                        marginTop: 1,
                        "& .MuiOutlinedInput-input": {
                          height: "13px !important",
                          borderRadius: "6px",
                          background: "white !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: "6px",
                        },
                      }}
                      placeholder="Task name"
                      onChange={props.field.onChange}
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
                    <SelectInput2
                      {...register("selectedDepartmentId")}
                      error={error.error?.details[0].path.includes("listId")}
                      handleChange={onChangeDepartment}
                      selectText={
                        departments.find(
                          (item) => item._id === props.field.value
                        )?.name
                      }
                      selectValue={props.field.value}
                      options={
                        departments
                          ? departments?.map((item) => {
                              return {
                                id: item._id,
                                value: item._id,
                                text: item.name,
                              };
                            })
                          : []
                      }
                    />
                  )}
                />
              </div>
              <div>
                <label className="label-project">Deadline date</label>
                <br />
                <Controller
                  name="deadline"
                  control={control}
                  render={(props) => (
                    <MobileDatePicker
                      {...register("deadline")}
                      inputFormat="YYYY-MM-DD"
                      value={props.field.value}
                      onChange={props.field.onChange}
                      leftArrowButtonText="arrow"
                      renderInput={(
                        params: JSX.IntrinsicAttributes & TextFieldProps
                      ) => (
                        <TextField
                          placeholder="deadline"
                          error={error.error?.details[0].path.includes(
                            "deadline"
                          )}
                          {...params}
                          onChange={params.onChange}
                          value={params.value}
                          sx={{
                            width: "100%",
                            paddingTop: 1,
                            "& .MuiOutlinedInput-input": {
                              height: "13px !important",
                              borderRadius: "6px",
                              background: "white !important",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderRadius: "6px",
                            },
                          }}
                        />
                      )}
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
                    <SelectInput2
                      {...register("categoryId")}
                      error={error?.error?.details[0].path.includes(
                        "categoryId"
                      )}
                      handleChange={onChangeCategory}
                      selectText={
                        categories?.find(
                          (item) => item._id === props.field.value
                        )?.category
                      }
                      selectValue={props.field.value}
                      options={
                        categories
                          ? categories?.map((item) => {
                              return {
                                id: item._id ? item._id : "",
                                value: item._id ? item._id : "",
                                text: item.category,
                              };
                            })
                          : []
                      }
                    />
                  )}
                />
              </div>
              <div>
                <label className="label-project">Description</label>
                <br />
                <Controller
                  name="description"
                  control={control}
                  render={(props) => (
                    <TextField
                      error={error.error?.details[0]?.path.includes(
                        "description"
                      )}
                      {...register("description")}
                      value={props.field.value}
                      id="outlined-multiline-static"
                      multiline
                      placeholder="Write about your task"
                      sx={{
                        paddingTop: 1,
                        width: "100%",
                        "& .MuiOutlinedInput-input": {
                          borderRadius: "6px",
                          background: "white !important",
                        },
                      }}
                      rows={5}
                      onChange={props.field.onChange}
                    />
                  )}
                />
              </div>
              <div>
                <label className="label-project">Sub category</label>
                <br />
                <Controller
                  name="subCategoryId"
                  control={control}
                  render={(props) => (
                    <SelectInput2
                      error={error?.error?.details[0].path.includes(
                        "subCategoryId"
                      )}
                      handleChange={props.field.onChange}
                      selectText={
                        selectedCategory?.selectedSubCategory?.find(
                          (item) => item._id === props.field.value
                        )?.subCategory
                      }
                      {...register("subCategoryId")}
                      selectValue={props.field.value}
                      options={
                        selectedCategory?.selectedSubCategory
                          ? selectedCategory?.selectedSubCategory?.map(
                              (item) => {
                                return {
                                  id: item._id ? item._id : "",
                                  value: item._id ? item._id : "",
                                  text: item.subCategory,
                                };
                              }
                            )
                          : []
                      }
                    />
                  )}
                />
                <br />
                <label className="label-project">Assign to Team</label>
                <br />
                <Controller
                  name="teamId"
                  control={control}
                  render={(props) => (
                    <SelectInput2
                      error={error?.error?.details[0]?.path.includes("listId")}
                      handleChange={props.field.onChange}
                      selectText={
                        selectedDepartment?.teamsId?.find(
                          (item: any) => item._id === props.field.value
                        )?.name
                      }
                      {...register("teamId")}
                      selectValue={props.field.value}
                      options={
                        selectedDepartment?.teamsId
                          ? selectedDepartment?.teamsId?.map((item: any) => {
                              return {
                                id: item._id ? item._id : "",
                                value: item._id ? item._id : "",
                                text: item.name,
                              };
                            })
                          : []
                      }
                    />
                  )}
                />
              </div>
            </div>
            {/* <Box
              marginX={1}
              marginY={3}
              alignItems="center"
              width={"100%"}
              overflow="scroll"
              display={"inline-flex"}
              className="files"
            >
              <input
                {...register("file")}
                onChange={onSetFiles}
                ref={files}
                type="file"
                style={{ display: "none" }}
                multiple
              />
              <ButtonBase
                onClick={onChangeFiles}
                sx={{
                  backgroundColor: "#00ACBA",
                  width: "46px !important",
                  height: "32px",
                  borderRadius: "5px",
                  ":hover": {
                    backgroundColor: "#00ACBA",
                  },
                  "& .MuiButton-root": {
                    width: "46px !important",
                    ":hover": {
                      backgroundColor: "#00ACBA",
                      color: "white",
                    },
                  },
                }}
              >
                <img src={IMAGES.fileicon} alt="Upload" />
              </ButtonBase>
              {Files &&
                Files.length > 0 &&
                Files?.map((item, index) => (
                  <Box
                    key={index}
                    marginLeft={1}
                    bgcolor={"#F1F1F5"}
                    padding={0.5}
                    borderRadius={1}
                    display={"inline-flex"}
                    color="#92929D"
                    sx={{
                      cursor: "pointer",
                      height: "32px",
                      textAlign: "center",
                      alignContent: "center",
                      justifySelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => onRemoveFile(item)}
                  >
                    <Typography>{item?.name}</Typography>
                    <CloseIcon
                      sx={{ fontSize: "14px", marginLeft: 0.5 }}
                      htmlColor="#92929D"
                    />
                  </Box>
                ))}
            </Box> */}
            <div>
              <button
                style={{ marginBottom: "20px" }}
                type="submit"
                className="addTaskBtn"
              >
                {loadingTask ? (
                  <CircularProgress
                    sx={{
                      color: "white",
                      width: "25px !important",
                      height: "25px !important",
                    }}
                  />
                ) : (
                  "Update Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </PopUp>
    </>
  );
};

export default EditTask;
