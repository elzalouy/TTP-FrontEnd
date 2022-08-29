import _ from "lodash";
import * as React from "react";
import moment from "moment";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import AttachetFiles from "../../../coreUI/components/Lists/AttachFiles";
import DateInput from "./DateInput";
import Input from "../../../coreUI/components/Inputs/Textfield/StyledInput";
import Select from "./Select";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { selectAllCategories, SubCategory } from "../../../models/Categories";
import { selectUi } from "../../../models/Ui/UI.selectors";
import { selectRole } from "../../../models/Auth";
import { validateEditTask } from "../../../services/validations/task.schema";
import { selectAllDepartments } from "../../../models/Departments";
import { useAppSelector } from "../../../models/hooks";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import {
  EditTaskProps,
  CRUDTaskState,
  initialState,
  initialHookFormTaskState,
} from "../../../types/views/BoardView";
import {
  editTaskFromBoard,
  editTaskLoading,
  selectAllProjects,
  selectSelectedProject,
} from "../../../models/Projects";
import EditTaskTitle from "./Title";

const EditTask: React.FC<EditTaskProps> = (props) => {
  const dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const loadingTask = useAppSelector(editTaskLoading);
  const selectedProject = useAppSelector(selectSelectedProject);
  const { editTask: id } = useAppSelector(selectAllProjects);
  const { editTaskPopup } = useAppSelector(selectUi);
  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: initialHookFormTaskState,
  });
  const role = useAppSelector(selectRole);
  const files = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<CRUDTaskState>(initialState);

  React.useEffect(() => {
    let State = { ...state };
    let task = selectedProject.tasks.find((item) => item._id === id);
    if (task) {
      State.task = task;
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
      State.selectedCategory = categories.find(
        (item) => item._id === task?.categoryId
      );
      State.selectedDepartment = dep;
      State.selectedDepatmentTeams = dep?.teams?.filter(
        (item) => item.isDeleted === false
      );
    }
    setState(State);
  }, [id]);

  React.useEffect(() => {
    if (editTaskPopup === "none") {
      reset();
    }
  }, [editTaskPopup]);

  const onChangeDepartment = (e: any) => {
    let State = { ...state };
    setValue("selectedDepartmentId", e.target.value);
    setValue("teamId", "");
    let dep = departments.find((item) => item._id === e.target.value);
    State.selectedDepartment = dep;
    State.selectedDepatmentTeams = dep?.teams?.filter(
      (item) => item.isDeleted === false
    );
    setState(State);
  };

  const onChangeCategory = (e: any) => {
    let State = { ...state };
    setValue("categoryId", e.target.value);
    setValue("subCategoryId", "");
    State.selectedCategory = categories.find(
      (item) => item._id === e.target.value
    );
    setState(State);
  };

  const onSubmit = async (data: any) => {
    let State = { ...state };
    let newTask = {
      id: State.task._id,
      name: data.name,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      teamId: data?.teamId ? data?.teamId : null,
      status: State.task.status,
      deadline: data?.deadline
        ? moment(data?.deadline).toDate().toString()
        : "",
      attachedFiles: state?.newFiles,
      deleteFiles: state.deleteFiles,
      listId: data?.teamId
        ? state.selectedDepartment?.teams?.find(
            (item: any) => item._id === data.teamId
          )?.listId
        : state.selectedDepartment?.lists?.find((l) => l.name === "Tasks Board")
            ?.listId,
      boardId: state.selectedDepartment?.boardId,
      description: data?.description,
      cardId: state.task?.cardId,
    };

    let { error, warning, value, FileError, FormDatatask } =
      validateEditTask(newTask);
    if (error || FileError) {
      State.error = { error, warning, value };
      setState(State);
    } else {
      dispatch(
        editTaskFromBoard({
          data: FormDatatask,
          dispatch,
          resetState,
          setShow: props.setShow,
        })
      );
    }
  };

  const resetState = () => {
    setState(initialState);
    reset();
  };

  const onChangeFiles = () => {
    files.current?.click();
  };

  const onSetFiles = () => {
    let State = { ...state };
    let newfiles = files.current?.files;
    if (newfiles) {
      let items = [...state.newFiles];
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
      items = _.uniq(items);
      State.newFiles = items;
      setState(State);
    }
    if (files?.current?.value) files.current.value = "";
  };

  const onRemoveFile = (item: any) => {
    let State = { ...state };
    if (item?._id) {
      let task = { ...State.task };
      State.deleteFiles.push(item);
      State.deleteFiles = _.uniq([...State.deleteFiles]);
      let files = [...State?.task?.attachedFiles];
      files = files.filter((file) => file._id !== item._id);
      task.attachedFiles = files;
      State.task = task;
    } else if (item?.name && item?.size) {
      let file: File = item;
      let newfiles = [...State.newFiles];
      newfiles = newfiles.filter((file) => file !== item);
      State.newFiles = newfiles;
    }
    setState(State);
  };

  return (
    <>
      <PopUp show={props.show} minWidthSize="50vw">
        {/* Title component */}
        <EditTaskTitle
          reset={resetState}
          setShow={props.setShow}
          title="Edit task"
        />
        <div className="step2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs-grid">
              {/* <Input
                label="Task name"
                placeholder="Task name"
                control={control}
                register={register}
                state={state}
                dataTestId="edit-task-name"
              /> */}
              <Select
                state={state}
                control={control}
                register={register}
                name="selectedDepartmentId"
                label={"Department name"}
                handleChange={onChangeDepartment}
                selectValue={watch().selectedDepartmentId}
                selectText={
                  departments.find(
                    (item) => item._id === watch().selectedDepartmentId
                  )?.name
                }
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
              <DateInput
                label={"Deadline date"}
                name="deadline"
                state={state}
                control={control}
                placeholder="Deadline"
                register={register}
                setValue={setValue}
              />
              <Select
                label="Category"
                name="categoryId"
                control={control}
                register={register}
                state={state}
                selectText={
                  categories?.find((item) => item._id === watch().categoryId)
                    ?.category
                }
                selectValue={watch().categoryId}
                handleChange={onChangeCategory}
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
              {/* <Input
                control={control}
                register={register}
                label={"Description"}
                multiline={true}
                rows={5}
                placeholder={"Write about your task"}
                state={state}
                id="editDescription"
              /> */}
              <div>
                <Select
                  name="subCategoryId"
                  label="Sub category"
                  control={control}
                  state={state}
                  register={register}
                  selectText={
                    state.selectedCategory?.subCategoriesId?.find(
                      (item: SubCategory) => item._id === watch().subCategoryId
                    )?.subCategory
                  }
                  selectValue={watch().subCategoryId}
                  options={
                    state.selectedCategory?.subCategoriesId
                      ? state.selectedCategory?.subCategoriesId?.map(
                          (item: SubCategory) => {
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
                <Box paddingTop={2}>
                  <Select
                    name="teamId"
                    label={"Assign to team"}
                    control={control}
                    state={state}
                    register={register}
                    selectValue={watch().teamId}
                    selectText={
                      state.selectedDepartment?.teams?.find(
                        (item: any) => item._id === watch().teamId
                      )?.name
                    }
                    options={state.selectedDepatmentTeams?.map((item) => {
                      return {
                        id: item._id,
                        value: item._id,
                        text: item.name,
                      };
                    })}
                  />
                </Box>
              </div>
            </div>
            <Box paddingTop={2} paddingX={1}>
              <AttachetFiles
                register={register}
                onSetFiles={onSetFiles}
                onChangeFiles={onChangeFiles}
                state={state}
                onRemoveFile={onRemoveFile}
                files={files}
              />
            </Box>
            <div>
              <button
                style={{ marginBottom: "20px" }}
                type="submit"
                className="addTaskBtn"
                data-test-id="edit-task-button"
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
