import {
  Box,
  Button,
  CircularProgress,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SelectInput2 from "../Inputs/SelectInput2";
import "./projectForm.css";
import { Category, selectAllCategories } from "../../../redux/Categories";
import { Department, selectAllDepartments } from "../../../redux/Departments";
import { useAppSelector } from "../../../redux/hooks";
import {
  createProjectTask,
  selectLoading,
  selectNewProject,
} from "../../../redux/Projects";
import { Close as CloseIcon } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import IMAGES from "../../../assets/img/Images";
import Joi from "joi";
import moment from "moment";
import { selectUi } from "../../../redux/Ui/UI.selectors";
import { generateID } from "../../../helpers/IdGenerator";
import { selectRole } from "../../../redux/Auth";
import {
  valdiateCreateTask,
  validateTaskFilesSchema,
} from "../../../services/validations/task.schema";
import { validateDate } from "../../../services/validations/project.schema";
import { getYesterdaysDate } from "../../../helpers/generalUtils";

interface TaskFormProps { }

const TaskForm: React.FC<TaskFormProps> = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const files = React.useRef<HTMLInputElement>(null);
  const [Files, setFiles] = React.useState<(File | null)[]>([]);
  const [error, setError] = React.useState<{
    error: Joi.ValidationError | undefined;
    value: any;
    warning: Joi.ValidationError | undefined;
  }>({ error: undefined, value: undefined, warning: undefined });
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const loadingTask = useAppSelector(selectLoading);
  // const selectedCategory = useAppSelector(selectSelectedCategory);
  const newProject = useAppSelector(selectNewProject);
  const [selectedDepartment, setSelectedDepartment] = React.useState<
    Department | any
  >();
  const [selectedCategory, setSelectCategory] = React.useState<Category>();
  const { createProjectPopup } = useAppSelector(selectUi);
  const role = useAppSelector(selectRole);

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

  const watchDeadline = watch().deadline;

  React.useEffect(() => {
    reset();
  }, [createProjectPopup]);

  React.useEffect(() => {
    //This triggers task form reset only when the response is recieved 
    reset();
    setFiles([]);
    setSelectedDepartment(undefined);
    setSelectCategory(undefined);
  }, [newProject.tasks]);


  const onSubmit = async (data: any) => {
    let newTask = {
      name: data.name,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      teamId: data?.teamId ? data?.teamId : null,
      projectId: newProject?.project?._id,
      status: data?.teamId ? "inProgress" : "Tasks Board",
      start: new Date().toUTCString(),
      deadline: data?.deadline ? moment(data?.deadline).toDate() : null,
      deliveryDate: null,
      done: null,
      turnoverTime: null,
      attachedFiles: null,
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
      if (newTask.teamId !== null) task.append("teamId", data.teamId);
      task.append(
        "projectId",
        newProject?.project?._id ? newProject?.project?._id : ""
      );
      task.append("status", data?.teamId ? "inProgress" : "Tasks Board");
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
        dispatch(createProjectTask(task));
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
        if (
          newfiles &&
          newfiles.item(i) &&
          typeof newfiles.item(i)?.size === "number"
        ) {
          if (newfiles.item(i)!.size < 10000000) {
            items.push(newfiles.item(i));
          } else {
            toast.warn("Please select an attachment with less than 10MB");
          }
        }
      }
      setFiles(items);
    }
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
                    error={error.error?.details[0].path.includes("name")}
                    id="outlined-error"
                    className="textfield"
                    sx={taskFormNameStyles}
                    placeholder="Task name"
                    {...register("name")}
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
                    label="Departments list"
                    error={error.error?.details[0].path.includes("listId")}
                    handleChange={onChangeDepartment}
                    selectText={selectedDepartment?.name}
                    {...register("selectedDepartmentId")}
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
                    inputFormat="YYYY-MM-DD"
                    cancelText={""}
                    okText={""}
                    disableCloseOnSelect={false}
                    value={props.field.value}
                    onChange={(e) => {
                      validateDate(
                        moment(e).toDate(),
                        "Deadline has passed today's date",
                        getYesterdaysDate()
                      );
                      props.field.onChange(moment(e).toDate());
                    }}
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
                          {...params}
                          error={error.error?.details[0].path.includes(
                            "deadline"
                          )}
                          {...register("deadline")}
                          onChange={params.onChange}
                          placeholder="Deadline"
                          sx={taskFormDeadlineStyles}
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
                    label="Categories list"
                    error={error?.error?.details[0].path.includes("categoryId")}
                    handleChange={onChangeCategory}
                    selectText={
                      categories?.find((item) => item._id === props.field.value)
                        ?.category
                    }
                    {...register("categoryId")}
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
                    placeholder="Write about your task"
                    multiline
                    sx={taskFormDescStyles}
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
                    label="Sub Ctegories list"
                    error={error?.error?.details[0].path.includes(
                      "subCategoryId"
                    )}
                    handleChange={props.field.onChange}
                    selectText={
                      selectedCategory?.subCategoriesId?.find(
                        (item) => item._id === props.field.value
                      )?.subCategory
                    }
                    {...register("subCategoryId")}
                    selectValue={props.field.value}
                    options={
                      selectedCategory?.subCategoriesId
                        ? selectedCategory?.subCategoriesId?.map((item) => {
                          return {
                            id: item._id ? item._id : "",
                            value: item._id ? item._id : "",
                            text: item.subCategory,
                          };
                        })
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
                    label="Teams list"
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
            <Box alignItems="center" display={"inline-flex"} className="files">
              <input
                {...register("file")}
                onChange={onSetFiles}
                ref={files}
                type="file"
                style={{ display: "none" }}
                multiple
              />
              <Button onClick={onChangeFiles} sx={taskFormFileAddStyles}>
                <img src={IMAGES.fileicon} alt="Upload" />
                <span
                  style={{
                    color: "white",
                    fontSize: "12px",
                    marginLeft: "5px",
                  }}
                >
                  {Files && Files.length > 0 ? Files?.length : ""}
                </span>
              </Button>
              {Files &&
                Files.length > 0 &&
                Files?.map((item, index) => (
                  <Typography
                    key={index}
                    marginX={0.5}
                    bgcolor={"#F1F1F5"}
                    padding={0.5}
                    borderRadius={1}
                    color="#92929D"
                    sx={taskFormFilesStyles}
                    onClick={() => onRemoveFile(item)}
                  >
                    {item?.name}
                    <CloseIcon
                      sx={{ fontSize: "14px", marginLeft: 0.5 }}
                      htmlColor="#92929D"
                    />
                  </Typography>
                ))}
            </Box>
          </div>
          <div>
            <button type="submit" className="addTaskBtn">
              {loadingTask ? (
                <CircularProgress
                  sx={{
                    color: "white",
                    padding: "0px",
                    height: "25px !important",
                    width: "25px !important",
                  }}
                />
              ) : (
                "Add Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
//SX Styles Objects

const taskFormFilesStyles = {
  cursor: "pointer",
  height: "35px",
  textAlign: "center",
  alignContent: "center",
  paddingTop: 1,
};

const taskFormNameStyles = {
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

const taskFormDescStyles = {
  paddingTop: 1,
  width: "100%",
  "& .MuiOutlinedInput-input": {
    borderRadius: "6px",
    background: "white !important",
  },
};

const taskFormDeadlineStyles = {
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

const taskFormFileAddStyles = {
  backgroundColor: "#00ACBA",
  width: "40px",
  height: "32px",
  borderRadius: "5px",
  ":hover": {
    backgroundColor: "#00ACBA",
  },
  "& .MuiButton-root": {
    ":hover": {
      backgroundColor: "#00ACBA",
      color: "white",
    },
  },
};
