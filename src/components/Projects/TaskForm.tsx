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
import SelectInput2 from "../../coreUI/usable-component/Inputs/SelectInput2";
import "./projectForm.css";
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
  ProjectsActions,
  selectLoading,
  selectNewProject,
  selectSelectedDepartment,
} from "../../redux/Projects";
import { Close as CloseIcon } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { UiActions } from "../../redux/Ui";
import IMAGES from "../../assets/img";
import { valdiateCreateTask } from "../../helpers/validation";
import Joi from "joi";
import moment from "moment";
import { createProjectPopup, selectUi } from "../../redux/Ui/UI.selectors";
import { generateID } from "../../helpers/IdGenerator";
// import {createProjectPopup} from '../../'

interface TaskFormProps {}

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
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<Department>();
  const [selectedCategory, setSelectCategory] = React.useState<Category>();
  const { createProjectPopup } = useAppSelector(selectUi);

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

  // React.useEffect(() => {
  //   let values = watch();
  //   if (values?.categoryId !== selectedCategory?._id) {
  //     let category = categories.find((item) => item._id === values.categoryId);
  //     dispatch(
  //       categoriesActions.setSelectedCategory(category ? category : null)
  //     );
  //   }
  //   if (values.selectedDepartmentId !== selectedDepartment?._id) {
  //     let dep = departments.find(
  //       (item) => item._id === values.selectedDepartmentId
  //     );
  //     dispatch(ProjectsActions.onChangeSelectedDepartment(dep));
  //   }
  // }, [watch(), reset]);

  React.useEffect(() => {
    reset();
  }, [createProjectPopup]);

  // console.log(newProject.project._id);

  const onSubmit = async (data: any) => {
    let newTask = {
      name: data.name,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      teamId: data?.teamId ? data?.teamId : null,
      projectId: newProject?.project?._id,
      status: data?.deadline ? "inProgress" : "Not Started",
      start: new Date().toUTCString(),
      deadline: data?.deadline ? moment(data?.deadline).toDate() : null,
      deliveryDate: null,
      done: null,
      turnoverTime: null,
      attachedFiles: [],
      listId: data?.teamId
        ? selectedDepartment?.teamsId?.find((item) => item._id === data.teamId)
            ?.listId
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
      dispatch(createProjectTask(newTask));
      reset();
      setSelectedDepartment(undefined);
      setSelectCategory(undefined);
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
                    value={props.field.value}
                    onChange={props.field.onChange}
                    leftArrowButtonText="arrow"
                    renderInput={(
                      params: JSX.IntrinsicAttributes & TextFieldProps
                    ) => (
                      <TextField
                        {...params}
                        error={error.error?.details[0].path.includes(
                          "deadline"
                        )}
                        {...register("deadline")}
                        onChange={params.onChange}
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
                    multiline
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
                        ? selectedCategory?.selectedSubCategory?.map((item) => {
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
                    error={error?.error?.details[0]?.path.includes("listId")}
                    handleChange={props.field.onChange}
                    selectText={
                      selectedDepartment?.teamsId?.find(
                        (item) => item._id === props.field.value
                      )?.name
                    }
                    {...register("teamId")}
                    selectValue={props.field.value}
                    options={
                      selectedDepartment?.teamsId
                        ? selectedDepartment?.teamsId?.map((item) => {
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
            <Box alignItems="center" display={"inline-flex"} className="files">
              <input
                {...register("file")}
                onChange={onSetFiles}
                ref={files}
                type="file"
                style={{ display: "none" }}
                multiple
              />
              <Button
                onClick={onChangeFiles}
                sx={{
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
                }}
              >
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
                    sx={{
                      cursor: "pointer",
                      height: "35px",
                      textAlign: "center",
                      alignContent: "center",
                      paddingTop: 1,
                    }}
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
              <CircularProgress sx={{ color: "white", padding: "0px" ,height:"25px !important",width:"25px !important"}} />
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
