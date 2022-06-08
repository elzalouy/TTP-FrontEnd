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
  createProjectTask,
  createTaskFromBoard,
  ProjectsActions,
  selectLoading,
  selectNewProject,
  selectSelectedDepartment,
  selectSelectedProject,
} from "../../redux/Projects";
import { Close as CloseIcon } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";

import IMAGES from "../../assets/img";
import {
  valdiateCreateTask,
  validateTaskFilesSchema,
} from "../../helpers/validation";
import Joi from "joi";
import moment from "moment";
import { createProjectPopup, selectUi } from "../../redux/Ui/UI.selectors";
import PopUps from "../../pages/PopUps";
import { generateID } from "../../helpers/IdGenerator";

type Props = {
  show: string;
  setShow: (val: string) => void;
};

//SX Style Objects

const createNewTaskNameStyles = {
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
};

const createNewTaskDeadlineStyles = {
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
};

const createNewTaskDescriptionStyles = {
  paddingTop: 1,
  width: "100%",
  "& .MuiOutlinedInput-input": {
    borderRadius: "6px",
    background: "white !important",
  },
};

const createNewTaskFilesStyles = {
  backgroundColor: "#00ACBA",
  width: "46px !important",
  height: "32px",
  borderRadius: "5px",
  paddingX: 1,
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
};

const createNewTaskFilesItemStyles = {
  width: "auto",
  cursor: "pointer",
  height: "32px",
  textAlign: "start",
  alignContent: "center",
  justifySelf: "center",
  justifyContent: "center",
  alignItems: "center",
  display: "inline-flex",
};

const CreateNewTask: React.FC<Props> = (props) => {
  const dispatch: Dispatch<any> = useDispatch();
  const Dispatch = useDispatch();
  const files = React.useRef<HTMLInputElement>(null);
  const [Files, setFiles] = React.useState<(File | null)[]>([]);
  const [error, setError] = React.useState<{
    error: Joi.ValidationError | undefined;
    value: any;
    warning: Joi.ValidationError | undefined;
  }>({ error: undefined, value: undefined, warning: undefined });
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const selectedProject = useAppSelector(selectSelectedProject);
  const loadingTask = useAppSelector(selectLoading);
  const newProject = useAppSelector(selectNewProject);
  const { createProjectPopup } = useAppSelector(selectUi);
  const [selectedDepartment, setSelectedDepartment] = React.useState<
    Department | any
  >();
  const [selectedCategory, setSelectCategory] = React.useState<Category>();

  const { register, handleSubmit, watch, control, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      categoryId: "",
      subCategoryId: "",
      teamId: "",
      deadline: null,
      attachedFiles: "",
      selectedDepartmentId: "",
      description: "",
      file: "",
    },
  });

  const onSubmit = async (data: any) => {
    let newTask = {
      name: data.name,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      teamId: data?.teamId ? data?.teamId : null,
      projectId: selectedProject?.project?._id,
      status: "Tasks Board",
      start: new Date().toUTCString(),
      deadline: data?.deadline ? moment(data?.deadline).toDate() : null,
      deliveryDate: null,
      done: null,
      turnoverTime: null,
      attachedFiles: Files,
      listId: data?.teamId
        ? selectedDepartment?.teamsId?.find(
            (item: any) => item._id === data.teamId
          )?.listId
        : selectedDepartment?.defaultListId,
      boardId: selectedDepartment?.boardId,
      description: data?.description,
    };
    let validateResult = valdiateCreateTask(newTask);
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
      task.append("status", "Tasks Board");
      task.append("start", new Date().toUTCString());
      task.append(
        "deadline",
        data?.deadline ? moment(data.deadline).toDate().toUTCString() : ""
      );
      let files: Array<any> = Array.from(Files);
      let result = validateTaskFilesSchema(files);
      if (result.error === null) {
        if (files) {
          for (let i = 0; i < files.length; i++) {
            task.append("attachedFiles", files[i]);
          }
        }
        task.append(
          "boardId",
          selectedDepartment?.boardId ? selectedDepartment.boardId : ""
        );
        task.append(
          "listId",
          data?.teamId
            ? selectedDepartment?.teamsId?.find(
                (item: any) => item._id === data.teamId
              )?.listId
            : selectedDepartment?.defaultListId
        );
        task.append("description", data?.description);
        dispatch(
          createTaskFromBoard({
            data: task,
            dispatch: dispatch,
            setShow: props.setShow,
            reset: reset,
          })
        );
        setFiles([]);
      } else toast.error(result.error);
    }
  };

  const onChangeFiles = () => {
    files.current?.click();
  };

  const onSetFiles = () => {
    let newfiles = files.current?.files;
    let items = [...Files];
    if (newfiles) {
      for (let i = 0; i < newfiles.length; i++) {
        items.push(newfiles.item(i));
      }
    }
    setFiles(items);
  };

  const onRemoveFile = (item: File | null) => {
    let newFiles = Files;
    newFiles = newFiles?.filter((file) => file !== item);
    setFiles(newFiles);
  };

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
            onClick={() => {
              setValue("deadline", null);
              props.setShow("none");
              setFiles([]);
              reset();
            }}
          />
          <Typography variant="h2" fontWeight={"500"} color={"#30bcc7"}>
            Create task
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
                      error={error.error?.details[0].path.includes("name")}
                      id="outlined-error"
                      sx={createNewTaskNameStyles}
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <TextField
                            placeholder="Deadline"
                            error={error.error?.details[0].path.includes(
                              "deadline"
                            )}
                            {...params}
                            onChange={params.onChange}
                            sx={createNewTaskDeadlineStyles}
                          />
                          {watch().deadline !== null && (
                            <img
                              className="closeIcon"
                              src={IMAGES.closeicon}
                              style={{
                                width: "10px",
                                height: "10px",
                                position: "absolute",
                                right: "13px",
                                bottom: "17px",
                              }}
                              alt="closeIcon"
                              onClick={() => {
                                setValue("deadline", null);
                              }}
                            />
                          )}
                        </div>
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
                      id="outlined-multiline-static"
                      multiline
                      placeholder="Write about your task"
                      sx={createNewTaskDescriptionStyles}
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
                              if (!item.isDeleted) {
                                return {
                                  id: item._id ? item._id : "",
                                  value: item._id ? item._id : "",
                                  text: item.name,
                                };
                              } else {
                                return {
                                  id: "",
                                  value: "",
                                  text: "",
                                };
                              }
                            })
                          : []
                      }
                    />
                  )}
                />
              </div>
            </div>
            <Box
              marginX={1}
              marginY={3}
              maxWidth={"50vw"}
              width="50vw"
              sx={{
                overflowX: "scroll",
                overflowY: "hidden",
                display: "inline-flex",
              }}
              flexDirection="row"
            >
              <input
                onChange={onSetFiles}
                ref={files}
                type="file"
                style={{ display: "none" }}
                multiple
              />
              <ButtonBase onClick={onChangeFiles} sx={createNewTaskFilesStyles}>
                <img src={IMAGES.fileicon} alt="Upload" />
                <span
                  style={{
                    color: "white",
                    fontSize: "12px",
                    marginLeft: "5px",
                    width: "auto",
                  }}
                >
                  {Files && Files.length > 0 ? Files?.length : ""}
                </span>
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
                    color="#92929D"
                    sx={createNewTaskFilesItemStyles}
                    onClick={() => onRemoveFile(item)}
                  >
                    <Typography
                      lineHeight={"32px"}
                      height={"32px"}
                      width={"calc(100%)"}
                    >
                      {item?.name}
                    </Typography>
                    <CloseIcon
                      sx={{ fontSize: "14px", marginLeft: 0.5 }}
                      htmlColor="#92929D"
                    />
                  </Box>
                ))}
            </Box>
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
                  "Add task"
                )}
              </button>
            </div>
          </form>
        </div>
      </PopUp>
    </>
  );
};

export default CreateNewTask;
