import { Box, TextField, TextFieldProps } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { Dispatch } from "@reduxjs/toolkit";
import Joi from "joi";
import moment from "moment";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import IMAGES from "src/assets/img/Images";
import {
  Category,
  selectAllCategories,
  selectCategoriesOptions,
} from "src/models/Categories";
import { selectAllDepartments } from "src/models/Departments";
import { useAppSelector } from "src/models/hooks";
import {
  createProjectTask,
  selectLoading,
  selectNewProject,
} from "src/models/Projects";
import { selectUi } from "src/models/Ui/UI.selectors";
import { validateDate } from "src/services/validations/project.schema";
import { valdiateCreateTask } from "src/services/validations/task.schema";
import { getYesterdaysDate } from "src/helpers/generalUtils";
import {
  IDepartmentState,
  IList,
  initDepartmentState,
  ITeam,
} from "src/types/models/Departments";
import {
  IJoiValidation,
  initJoiValidationError,
} from "src/types/servicesValidation";
import "../CreateProjectForm/projectForm.css";
import Input from "src/coreUI/components/Inputs/Textfield/Input";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { dataTimePickerInputStyle } from "src/coreUI/themes";
import TextArea from "src/coreUI/components/Inputs/Textfield/StyledArea";
import AttachetFiles from "src/coreUI/components/Lists/AttachFiles";
import Button from "src/coreUI/components/Buttons/Button";
import { initialHookFormTaskState } from "src/types/views/BoardView";
import { selectClientOptions } from "src/models/Clients";

const TaskForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const files = React.useRef<HTMLInputElement>(null);
  const [Files, setFiles] = React.useState<(File | null)[]>([]);
  const [error, setError] = React.useState<IJoiValidation>(
    initJoiValidationError
  );
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const categroiesOption = useAppSelector(selectCategoriesOptions);
  const clientsOptions = useAppSelector(selectClientOptions);
  const loadingTask = useAppSelector(selectLoading);
  const newProject = useAppSelector(selectNewProject);
  const [selectedDepartment, setSelectedDepartment] = React.useState<
    IDepartmentState | any
  >(initDepartmentState);
  const [selectedCategory, setSelectCategory] = React.useState<Category>();
  const { createProjectPopup } = useAppSelector(selectUi);

  const { register, handleSubmit, watch, control, reset, setValue } = useForm({
    defaultValues: initialHookFormTaskState,
  });

  React.useEffect(() => {
    reset();
  }, [createProjectPopup]);

  React.useEffect(() => {
    onInit();
  }, [newProject.tasks]);
  const onInit = () => {
    reset();
    setFiles([]);
    setSelectedDepartment(initDepartmentState);
    setSelectCategory(undefined);
  };
  const onSubmit = async () => {
    let data = watch();
    let list = data?.teamId === "" ? "Tasks Board" : "In Progress";
    let subCategory = selectedCategory?.subCategoriesId?.find(
      (item) => item._id === data.subCategoryId
    );
    let projectNames = newProject.project.name.split("-");
    let projectPureName = projectNames[projectNames.length - 1];
    const selectedTeam = selectedDepartment.teams?.find(
      (item: ITeam) => item._id === data.teamId
    );

    let newTask: any = {
      name: data.name,
      projectId: newProject?.project?._id,
      status: list,
      start: new Date().toUTCString(),
      listId: selectedDepartment.lists.find((l: IList) => l.name === list)
        ?.listId,
      boardId: selectedDepartment.boardId,
      description: data.description,
      categoryId: data.categoryId,
      teamListId: selectedTeam ? selectedTeam.listId : null,
    };
    if (Files) newTask.attachedFiles = Files;
    if (data.teamId !== "") newTask.teamId = data.teamId;
    if (data.description) newTask.description = data.description;
    if (data.subCategoryId !== "") newTask.subCategoryId = data.subCategoryId;
    if (data.deadline !== "" && data.deadline !== null)
      newTask.deadline = moment(data?.deadline).toDate().toString();

    let { error, warning, value, FileError, FormDatatask } =
      valdiateCreateTask(newTask);
    if (error || FileError) {
      let errorResult = { error, warning, value };
      setError(errorResult);
    } else {
      FormDatatask?.set(
        "name",
        `${
          clientsOptions.find((item) => item.id === newProject.project.clientId)
            ?.text
        }-${projectPureName}-${selectedCategory?.category}-${
          subCategory ? subCategory.subCategory : ""
        } (${data.name})`
      );
      dispatch(createProjectTask({ data: FormDatatask, onInit }));
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
      if (dep) setSelectedDepartment(dep);
      setError(initJoiValidationError);
    }
  };
  const onChangeCategory = (e: any) => {
    setValue("categoryId", e.target.id);
    const cat = categories.find((item) => item._id === e.target.id);
    setSelectCategory(cat);
    setError(initJoiValidationError);
  };
  const onGetError = (val: string) =>
    error.error?.details[0]?.path?.includes(val) ? "true" : "false";
  return (
    <>
      <form
        data-test-id="projects-create-project-task-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="inputs-grid">
          <div>
            <Controller
              name="name"
              control={control}
              render={(props) => (
                <Input
                  label="Task name"
                  type="text"
                  value={watch().name}
                  onChange={(e: any) => {
                    props.field.onChange(e);
                    setError(initJoiValidationError);
                  }}
                  placeholder="Task name"
                  error={onGetError(props.field.name)}
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
                    selected={watch().selectedDepartmentId}
                    elementType="select"
                    onSelect={(e: any) => {
                      onChangeDepartment(e);
                      setError(initJoiValidationError);
                    }}
                    error={onGetError(props.field.name)}
                    options={[
                      ...departments.map((item) => {
                        return {
                          id: item._id,
                          value: item._id,
                          text: item.name,
                        };
                      }),
                    ]}
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
                      {watch().deadline !== "" && (
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
                            setValue("deadline", "");
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
                    selected={watch().categoryId}
                    elementType="select"
                    error={onGetError(props.field.name)}
                    onSelect={(e: any) => onChangeCategory(e)}
                    options={categroiesOption}
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
                    value={watch().description}
                    placeholder={"Write about your task"}
                    rows={4}
                    error={onGetError(props.field.name)}
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
                  label="Sub Categories"
                  selected={watch().subCategoryId}
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
                  error={onGetError(props.field.name)}
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
                  selected={watch().teamId}
                  elementType="select"
                  message={
                    selectedDepartment._id
                      ? `${selectedDepartment?.name} department has no teams yet.`
                      : "Please select a department firstly, to can see the teams inside"
                  }
                  onSelect={(e: any) => setValue("teamId", e.target.id)}
                  options={
                    selectedDepartment?.teams
                      ? selectedDepartment?.teams
                          ?.filter((el: any) => el.isDeleted === false)
                          ?.map((item: any) => {
                            if (!item.isDeleted) {
                              return {
                                id: item._id,
                                value: item._id,
                                text: item.name,
                              };
                            }
                          })
                      : []
                  }
                  error={onGetError(props.field.name)}
                />
              )}
            />
          </div>
        </div>
        <Box>
          <AttachetFiles
            register={register}
            onSetFiles={onSetFiles}
            onChangeFiles={onChangeFiles}
            onRemoveFile={onRemoveFile}
            filesRef={files}
            newFiles={Files}
          />
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
