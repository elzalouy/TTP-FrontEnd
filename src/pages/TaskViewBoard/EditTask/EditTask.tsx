import * as React from "react";
import _ from "lodash";
import PopUp from "../../../coreUI/usable-component/Popup/PopUp";
import moment from "moment";
import AttachetFiles from "./AttachedFiles";
import DateInput from "./DateInput";
import Input from "./Input";
import Select from "./Select";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { selectAllCategories } from "../../../redux/Categories";
import { selectUi } from "../../../redux/Ui/UI.selectors";
import { selectRole } from "../../../redux/Auth";
import { validateEditTask } from "../../../services/validations/task.schema";
import { selectAllDepartments } from "../../../redux/Departments";
import { useAppSelector } from "../../../redux/hooks";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import {
  EditTaskProps,
  EditTaskState,
  initialState,
} from "../../../interfaces/views/BoardView";
import {
  editTaskFromBoard,
  editTaskLoading,
  selectAllProjects,
  selectSelectedProject,
} from "../../../redux/Projects";
import EditTaskTitle from "./Title";

const EditTask: React.FC<EditTaskProps> = (props) => {
  const dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const loadingTask = useAppSelector(editTaskLoading);
  const selectedProject = useAppSelector(selectSelectedProject);
  const { editTask: id } = useAppSelector(selectAllProjects);
  const { editTaskPopup } = useAppSelector(selectUi);
  const { register, handleSubmit, control, reset, setValue, watch } = useForm();
  const role = useAppSelector(selectRole);
  const files = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<EditTaskState>(initialState);

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
      State.selectedDepatmentTeams = dep?.teamsId.filter(
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
    let dep = departments.find((item) => item._id === e.target.value);
    State.selectedDepartment = dep;
    State.selectedDepatmentTeams = dep?.teamsId.filter(
      (item) => item.isDeleted === false
    );
    setState(State);
  };

  const onChangeCategory = (e: any) => {
    let State = { ...state };
    setValue("categoryId", e.target.value);
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
      deadline: data?.deadline ? moment(data?.deadline).toDate() : "",
      attachedFiles: state?.newFiles,
      deleteFiles: state.deleteFiles,
      listId: data?.teamId
        ? state.selectedDepartment?.teamsId?.find(
            (item: any) => item._id === data.teamId
          )?.listId
        : state.selectedDepartment?.defaultListId,
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
    setState({
      newFiles: [],
      deleteFiles: [],
      task: state.task,
      error: { error: undefined, value: undefined, warning: undefined },
      selectedCategory: null,
      selectedDepartment: null,
      selectedDepatmentTeams: undefined,
    });
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
        <EditTaskTitle setShow={props.setShow} title="Edit task" />
        <div className="step2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs-grid">
              <Input
                name="name"
                label="Task name"
                placeholder="Task name"
                control={control}
                register={register}
                state={state}
              />
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
                placeholder="deadline"
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
              <Input
                name="description"
                control={control}
                register={register}
                label={"Description"}
                multiline={true}
                rows={5}
                placeholder={"Write about your task"}
                state={state}
              />
              <div>
                <Select
                  name="subCategoryId"
                  label="Sub category"
                  control={control}
                  state={state}
                  register={register}
                  selectText={
                    state.selectedCategory?.subCategoriesId?.find(
                      (item) => item._id === watch().subCategoryId
                    )?.subCategory
                  }
                  selectValue={watch().subCategoryId}
                  options={
                    state.selectedCategory?.subCategoriesId
                      ? state.selectedCategory?.subCategoriesId?.map((item) => {
                          return {
                            id: item._id ? item._id : "",
                            value: item._id ? item._id : "",
                            text: item.subCategory,
                          };
                        })
                      : []
                  }
                />
                <Box paddingTop={2}>
                  {role === "OM" && (
                    <>
                      <Select
                        name="teamId"
                        label={"Assign to team"}
                        control={control}
                        state={state}
                        register={register}
                        selectValue={watch().teamId}
                        selectText={
                          state.selectedDepartment?.teamsId?.find(
                            (item: any) => item._id === watch().teamId
                          )?.name
                        }
                        options={state.selectedDepatmentTeams}
                      />
                    </>
                  )}
                </Box>
              </div>
            </div>
            <Box paddingTop={2}>
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
