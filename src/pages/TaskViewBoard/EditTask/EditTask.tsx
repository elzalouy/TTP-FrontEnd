import * as React from "react";
import SelectInput2 from "../../../coreUI/usable-component/Inputs/SelectInput2";
import PopUp from "../../../coreUI/usable-component/Popup/PopUp";
import IMAGES from "../../../assets/img/Images";
import Joi from "joi";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Category, selectAllCategories } from "../../../redux/Categories";
import { Department, selectAllDepartments } from "../../../redux/Departments";
import { useAppSelector } from "../../../redux/hooks";
import {
  CircularProgress,
  Grid,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import {
  editTaskFromBoard,
  editTaskLoading,
  ProjectsActions,
  selectAllProjects,
  selectSelectedProject,
} from "../../../redux/Projects";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { selectUi } from "../../../redux/Ui/UI.selectors";
import { generateID } from "../../../helpers/IdGenerator";
import { selectRole } from "../../../redux/Auth";
import { Task } from "../../../interfaces/models/Projects";
import { validateEditTask } from "../../../services/validations/task.schema";
import AttachetFiles from "./AttachedFiles";
import _ from "lodash";
import DateInput from "./DateInput";

const EditTask: React.FC<Props> = (props) => {
  // here is the clean order of code
  // we want to seperate some rendered lines of design code as a seperated component
  // our State first
  const dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const loadingTask = useAppSelector(editTaskLoading);
  const selectedProject = useAppSelector(selectSelectedProject);
  const { editTask: id } = useAppSelector(selectAllProjects);
  const { editTaskPopup } = useAppSelector(selectUi);
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const role = useAppSelector(selectRole);
  const files = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<State>({
    newFiles: [],
    deleteFiles: [],
    task: {
      _id: "",
      name: "",
      projectId: "",
      categoryId: "",
      subCategoryId: "",
      teamId: "",
      status: "",
      start: "",
      deliveryDate: "",
      done: "",
      turnoverTime: "",
      attachedFiles: [],
      attachedCard: "",
      description: "",
      cardId: "",
      listId: "",
      boardId: "",
    },
    error: {
      error: undefined,
      value: null,
      warning: undefined,
    },
    selectedDepartment: null,
    selectedCategory: null,
  });
  // secondly hooks here
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
    }
    setState(State);
  }, [id]);

  React.useEffect(() => {
    if (editTaskPopup === "none") {
      reset();
    }
  }, [editTaskPopup]);

  // finally handling events functions here
  const onChangeDepartment = (e: any) => {
    let State = { ...state };
    setValue("selectedDepartmentId", e.target.value);
    State.selectedDepartment = departments.find(
      (item) => item._id === e.target.value
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

  const onCloseModel = () => {
    dispatch(ProjectsActions.onEditTask(""));
    props.setShow("none");
  };

  return (
    <>
      <PopUp show={props.show} minWidthSize="50vw">
        {/* Title component */}
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
              {/* input component */}
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
                      error={state?.error?.error?.details[0].path.includes(
                        "name"
                      )}
                      id="outlined-error"
                      sx={editTaskNameStyles}
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
                      error={state.error.error?.details[0].path.includes(
                        "listId"
                      )}
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
                <DateInput
                  name="deadline"
                  state={state}
                  control={control}
                  placeholder="deadline"
                  register={register}
                  setValue={setValue}
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
                      error={state.error?.error?.details[0].path.includes(
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
                      error={state.error.error?.details[0]?.path.includes(
                        "description"
                      )}
                      {...register("description")}
                      value={props.field.value}
                      id="outlined-multiline-static"
                      multiline
                      placeholder="Write about your task"
                      sx={editTaskDescStyles}
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
                      error={state.error?.error?.details[0].path.includes(
                        "subCategoryId"
                      )}
                      handleChange={props.field.onChange}
                      selectText={
                        state.selectedCategory?.subCategoriesId?.find(
                          (item) => item._id === props.field.value
                        )?.subCategory
                      }
                      {...register("subCategoryId")}
                      selectValue={props.field.value}
                      options={
                        state.selectedCategory?.subCategoriesId
                          ? state.selectedCategory?.subCategoriesId?.map(
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
                {role === "OM" && (
                  <>
                    <label className="label-project">Assign to Team</label>
                    <br />
                    <Controller
                      name="teamId"
                      control={control}
                      render={(props) => (
                        <SelectInput2
                          error={state.error?.error?.details[0]?.path.includes(
                            "listId"
                          )}
                          handleChange={props.field.onChange}
                          selectText={
                            state.selectedDepartment?.teamsId?.find(
                              (item: any) => item._id === props.field.value
                            )?.name
                          }
                          {...register("teamId")}
                          handleOnClick={() => {
                            if (
                              state.selectedDepartment?.teamsId.length === 0
                            ) {
                              toast.warning("There are no existing teams", {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                toastId: generateID(),
                              });
                            }
                          }}
                          selectValue={props.field.value}
                          options={
                            state.selectedDepartment?.teamsId
                              ? state.selectedDepartment?.teamsId?.map(
                                  (item: any) => {
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
                                  }
                                )
                              : []
                          }
                        />
                      )}
                    />
                  </>
                )}
              </div>
            </div>
            <AttachetFiles
              register={register}
              onSetFiles={onSetFiles}
              onChangeFiles={onChangeFiles}
              state={state}
              onRemoveFile={onRemoveFile}
              files={files}
            />
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

type Props = {
  show: string;
  setShow: (val: string) => void;
};

interface State {
  newFiles: (File | null)[];
  deleteFiles: {
    name: string;
    mimeType: string;
    trelloId: string;
    url: string;
  }[];
  task: Task;
  error: {
    error: Joi.ValidationError | undefined;
    value: any;
    warning: Joi.ValidationError | undefined;
  };
  selectedDepartment: Department | any;
  selectedCategory: Category | null | undefined;
}

//SX Styles Objects

const editTaskDescStyles = {
  paddingTop: 1,
  width: "100%",
  "& .MuiOutlinedInput-input": {
    borderRadius: "6px",
    background: "white !important",
  },
};

const editTaskNameStyles = {
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
