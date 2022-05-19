import { Box, Button, TextField, Typography } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SelectInput2 from "../../coreUI/usable-component/Inputs/SelectInput2";
import {
  categoriesActions,
  selectAllCategories,
  selectSelectedCategory,
} from "../../redux/Categories";
import { selectAllDepartments } from "../../redux/Departments";
import { useAppSelector } from "../../redux/hooks";
import {
  createProjectTask,
  ProjectsActions,
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

interface TaskFormProps {}

const TaskForm: React.FC<TaskFormProps> = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const Dispatch = useDispatch();
  const files = React.useRef<HTMLInputElement>(null);
  const [Files, setFiles] = React.useState<(File | null)[]>();
  const [error, setError] = React.useState<{
    error: Joi.ValidationError | undefined;
    value: any;
    warning: Joi.ValidationError | undefined;
  }>({ error: undefined, value: undefined, warning: undefined });
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const newProject = useAppSelector(selectNewProject);
  const selectedDepartment = useAppSelector(selectSelectedDepartment);
  const { register, handleSubmit, watch, control, reset } = useForm();

  React.useEffect(() => {
    let values = watch();
    if (values?.categoryId !== selectedCategory?._id) {
      let category = categories.find((item) => item._id === values.categoryId);
      dispatch(
        categoriesActions.setSelectedCategory(category ? category : null)
      );
    }
    if (values.selectedDepartmentId !== selectedDepartment?._id) {
      let dep = departments.find(
        (item) => item._id === values.selectedDepartmentId
      );
      dispatch(ProjectsActions.onChangeSelectedDepartment(dep));
    }
  }, [watch(), reset]);

  const onSubmit = async (data: any) => {
    let newTask = {
      name: data.name,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      memberId: data?.memberId,
      projectId: newProject?.project?._id,
      status: "inProgress",
      start: new Date().toUTCString(),
      deadline: moment(data?.deadline).toDate(),
      deliveryDate: null,
      done: null,
      turnoverTime: null,
      attachedFiles: data.file,
      listId: selectedDepartment?.teamsId?.find(
        (item) => item._id === data.memberId
      )?.listId,
      boardId: selectedDepartment?.boardId,
      description: data?.description,
    };
    // console.log(newTask);
    let validateResult = valdiateCreateTask(newTask);
    if (validateResult.error) {
      setError(validateResult);
      toast(validateResult.error.message);
    } else dispatch(createProjectTask(newTask));
  };
  const onChangeFiles = () => {
    files.current?.click();
  };
  const onSetFiles = () => {
    let newfiles = files.current?.files;
    if (newfiles) {
      let items = [];
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
                    error={error.error?.details[0].path.includes("listId")}
                    handleChange={props.field.onChange}
                    selectText={
                      departments.find((item) => item._id === props.field.value)
                        ?.name
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
                    inputFormat="YYYY-MM-DD"
                    value={props.field.value}
                    onChange={props.field.onChange}
                    leftArrowButtonText="arrow"
                    renderInput={(params) => (
                      <TextField
                        error={error.error?.details[0].path.includes(
                          "deadline"
                        )}
                        {...params}
                        defaultValue=""
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
                    handleChange={props.field.onChange}
                    selectText={
                      categories?.find((item) => item._id === props.field.value)
                        ?.category
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
              <label className="label-project">Assign to Member</label>
              <br />
              <Controller
                name="memberId"
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
              Add task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
