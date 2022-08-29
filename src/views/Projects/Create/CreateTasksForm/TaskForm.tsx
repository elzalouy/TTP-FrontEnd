import { Box, TextField, TextFieldProps } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "../CreateProjectForm/projectForm.css";
import { Category, selectAllCategories } from "src/models/Categories";
import { selectAllDepartments } from "src/models/Departments";
import { useAppSelector } from "src/models/hooks";
import {
  createProjectTask,
  selectLoading,
  selectNewProject,
} from "src/models/Projects";
import { MobileDatePicker } from "@mui/x-date-pickers";
import IMAGES from "src/assets/img/Images";
import Joi from "joi";
import moment from "moment";
import { selectUi } from "src/models/Ui/UI.selectors";
import { selectRole } from "src/models/Auth";
import { valdiateCreateTask } from "src/services/validations/task.schema";
import { validateDate } from "src/services/validations/project.schema";
import { getYesterdaysDate } from "src/helpers/generalUtils";
import { IDepartmentState } from "src/types/models/Departments";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import { dataTimePickerInputStyle } from "src/coreUI/themes";
import TextArea from "src/coreUI/components/Inputs/Textfield/StyledArea";
import Upload from "src/coreUI/components/Typos/UploadLabel";
import UploadLabel from "src/coreUI/components/Typos/FileLabel";
import Button from "src/coreUI/components/Buttons/Button";
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
  const newProject = useAppSelector(selectNewProject);
  const [selectedDepartment, setSelectedDepartment] = React.useState<
    IDepartmentState | any
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

  React.useEffect(() => {
    reset();
  }, [createProjectPopup]);

  React.useEffect(() => {
    reset();
    setFiles([]);
    setSelectedDepartment(undefined);
    setSelectCategory(undefined);
  }, [newProject.tasks]);

  const onSubmit = async () => {
    let data = watch();
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
        ? selectedDepartment?.teams?.find(
            (item: any) => item._id === data.teamId
          )?.listId
        : selectedDepartment?.lists?.find((l: any) => (l.name = "Tasks Board"))
            ?.listId,
      boardId: selectedDepartment?.boardId,
      description: data?.description,
    };
    let { error, warning, value, FileError, FormDatatask } =
      valdiateCreateTask(newTask);
    if (error || FileError) {
      let errorResult = { error, warning, value };
      setError(errorResult);
    } else {
      dispatch(createProjectTask(FormDatatask));
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
    if (e.target.id) {
      setValue("selectedDepartmentId", e.target.id);
      let dep = departments.find((item) => item._id === e.target.id);
      setSelectedDepartment(dep);
    }
  };
  const onChangeCategory = (e: any) => {
    setValue("categoryId", e.target.id);
    const cat = categories.find((item) => item._id === e.target.id);
    setSelectCategory(cat);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs-grid">
          <div>
            <Controller
              name="name"
              control={control}
              render={(props) => (
                <Input
                  label="Task name"
                  type="text"
                  onChange={props.field.onChange}
                  placeholder="Task name"
                />
              )}
            />
          </div>
          <div>
            <label className="label-project">Department name</label>
            <Controller
              name="selectedDepartmentId"
              control={control}
              render={(props) => (
                <>
                  <Select
                    name="createProject-task-selectedDepartment"
                    label="Select department"
                    selected={props.field.value}
                    elementType="select"
                    onSelect={(e: any) => {
                      onChangeDepartment(e);
                    }}
                    options={[
                      ...departments.map((item) => {
                        return {
                          id: item._id,
                          value: item._id,
                          text: item.name,
                        };
                      }),
                    ]}
                    error={
                      error?.error?.details[0].path.includes("listId")
                        ? "true"
                        : ""
                    }
                  />
                </>
              )}
            />
          </div>
          <div>
            <label className="label-project">Deadline date</label>
            <Controller
              name="deadline"
              control={control}
              render={(props) => (
                <MobileDatePicker
                  inputFormat="YYYY-MM-DD"
                  value={props.field.value}
                  closeOnSelect
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
                        sx={dataTimePickerInputStyle}
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
                            bottom: "19px",
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
            <Controller
              name="categoryId"
              control={control}
              render={(props) => (
                <>
                  <Select
                    name="createProject-task-selectCategory"
                    label="Categories list"
                    selected={props.field.value}
                    elementType="select"
                    onSelect={(e: any) => onChangeCategory(e)}
                    options={
                      categories.length > 0
                        ? categories?.map((item) => {
                            return {
                              id: item._id,
                              value: item._id,
                              text: item.category,
                            };
                          })
                        : []
                    }
                    error={
                      error?.error?.details[0].path.includes("categoryId")
                        ? "true"
                        : ""
                    }
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              name="description"
              control={control}
              render={(props) => (
                <>
                  <TextArea
                    label="Description"
                    name="create-task-with-project"
                    cols={5}
                    onChange={props.field.onChange}
                    placeholder={"Write about your task"}
                    rows={4}
                    error={
                      error?.error?.details[0].path.includes("description")
                        ? "true"
                        : ""
                    }
                  />
                </>
              )}
            />
          </div>
          <div>
            <label className="label-project">Sub category</label>
            <Controller
              name="subCategoryId"
              control={control}
              render={(props) => (
                <Select
                  name="createProject-task-selectSubCategory"
                  label="Sub Ctegories list"
                  selected={props.field.value}
                  elementType="select"
                  onSelect={(e: any) => setValue("subCategoryId", e.target.id)}
                  options={
                    selectedCategory?.subCategoriesId &&
                    selectedCategory?.subCategoriesId?.length > 0
                      ? selectedCategory?.subCategoriesId.map((item) => {
                          return {
                            id: item._id,
                            value: item._id,
                            text: item.subCategory,
                          };
                        })
                      : []
                  }
                  error={
                    error?.error?.details[0].path.includes("subCategoryId")
                      ? "true"
                      : ""
                  }
                />
              )}
            />
            <br />
            <label className="label-project">Assign to Team</label>
            <Controller
              name="teamId"
              control={control}
              render={(props) => (
                <Select
                  name="createProject-task-selectTeam"
                  label="Teams list"
                  selected={props.field.value}
                  elementType="select"
                  onSelect={(e: any) => setValue("teamId", e.target.id)}
                  options={
                    selectedDepartment?.teams
                      ? selectedDepartment?.teams
                          ?.filter((el: any) => el.isDeleted === false)
                          ?.map((item: any) => {
                            if (!item.isDeleted) {
                              return {
                                id: item.listId,
                                value: item.listId,
                                text: item.name,
                              };
                            }
                          })
                      : []
                  }
                  error={
                    error?.error?.details[0].path.includes("teamId")
                      ? "true"
                      : ""
                  }
                />
              )}
            />
          </div>
        </div>
        <input
          {...register("file")}
          onChange={onSetFiles}
          ref={files}
          type="file"
          data-test-id="project-task-file"
          style={{ display: "none" }}
          multiple
        />
        <Box
          paddingLeft={"5px"}
          paddingTop={"10px"}
          display={"inline-flex"}
          width={"auto"}
        >
          <Upload length={Files.length} onClick={onChangeFiles} />
          <Box
            sx={{
              maxWidth: "60vw",
              display: "inline-flex",
              alignItems: "center",
              overflowX: "scroll",
              marginBottom: "10px",
            }}
          >
            {Files &&
              Files.length > 0 &&
              Files?.map((item, index) => (
                <UploadLabel
                  key={index}
                  onRemove={() => onRemoveFile(item)}
                  fileName={item?.name ? item.name : ""}
                />
              ))}
          </Box>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size="large"
            type="main"
            label="Add Task"
            loading={loadingTask}
            onClick={onSubmit}
          />
        </div>
      </form>
    </>
  );
};

export default TaskForm;
//SX Styles Objects
