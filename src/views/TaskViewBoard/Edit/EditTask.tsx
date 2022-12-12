import { Box, Grid, Typography } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AttachetFiles from "src/coreUI/components/Lists/AttachFiles";
import PopUp from "src/coreUI/components/Popovers/Popup/PopUp";
import { selectAllCategories } from "src/models/Categories";
import { selectAllDepartments } from "src/models/Departments";
import { useAppSelector } from "src/models/hooks";
import { selectUi } from "src/models/Ui/UI.selectors";
import { validateEditTask } from "src/services/validations/task.schema";
import {
  editTaskFromBoard,
  editTaskLoading,
  ProjectsActions,
  selectEditTask,
} from "../../../models/Projects";
import {
  CRUDTaskState,
  EditTaskProps,
  IInitialinitialHookFormTaskState,
  initialEditState,
} from "../../../types/views/BoardView";
import DateInput from "./DateInput";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import TextArea from "src/coreUI/components/Inputs/Textfield/StyledArea";
import Button from "src/coreUI/components/Buttons/Button";
import IMAGES from "src/assets/img/Images";
import SelectDialog from "../../../coreUI/components/Inputs/SelectDialog/SelectDialog";
const EditTask: React.FC<EditTaskProps> = (props) => {
  const dispatch = useDispatch();
  const { editTaskPopup } = useAppSelector(selectUi);
  const files = React.useRef<HTMLInputElement>(null);
  const loadingTask = useAppSelector(editTaskLoading);
  const categories = useAppSelector(selectAllCategories);
  const departments = useAppSelector(selectAllDepartments);
  const task = useAppSelector(selectEditTask);
  const [state, setState] = React.useState<CRUDTaskState>({
    ...initialEditState,
  });
  const { register, handleSubmit, control, reset, setValue, watch } =
    useForm<IInitialinitialHookFormTaskState>({
      defaultValues: {
        name: task?.name,
        projectId: task?.projectId,
        categoryId: task?.categoryId,
        subCategoryId: task?.subCategoryId,
        teamId: task?.teamId,
        status: task?.status,
        description: task?.description,
        selectedDepartmentId: departments.find(
          (item) => item.boardId === task?.boardId
        )?._id,
        deadline: task?.deadline,
        attachedFiles: task?.attachedFiles,
        file: null,
      },
    });
  /**
   * Get Task data and also selected department, list, team, category, and sub category
   */
  React.useEffect(() => {
    if (task && task._id) {
      setValue("name", task.name);
      setValue("projectId", task.projectId);
      setValue("categoryId", task.categoryId);
      setValue("subCategoryId", task.subCategoryId);
      setValue("teamId", task.teamId);
      setValue("status", task.status);
      setValue("description", task.description);
      setValue(
        "selectedDepartmentId",
        departments.find((item) => item.boardId === task.boardId)?._id
      );
      setValue("deadline", task.deadline);
      setValue("attachedFiles", task.attachedFiles);
      setValue("file", null);
      let selectedDepartment = departments.find(
        (item) => item.boardId === task.boardId
      );
      let selectedCategory = categories.find(
        (item) => item._id === task.categoryId
      );
      let selectedDepatmentTeams =
        selectedDepartment && selectedDepartment.teams;

      setState({
        ...state,
        task: task,
        selectedDepartment,
        selectedCategory,
        selectedDepatmentTeams,
      });
    }
  }, [departments, categories, task]);

  /**
   * Set task data to the hook-form, after getting the task data from the previous useEffect hook
   */

  React.useEffect(() => {
    if (editTaskPopup === "none") {
      resetState();
    }
  }, [editTaskPopup]);

  const onChangeDepartment = (e: any) => {
    let State = { ...state };
    setValue("selectedDepartmentId", e.target.id);
    setValue("teamId", "");
    let dep = departments.find((item) => item._id === e.target.id);
    State.selectedDepartment = dep;
    State.selectedDepatmentTeams = dep?.teams
      ? dep?.teams?.filter((item) => item.isDeleted === false)
      : [];
    setState(State);
  };

  const onChangeCategory = (e: any) => {
    let State = { ...state };
    setValue("categoryId", e.target.id);
    setValue("subCategoryId", "");
    State.selectedCategory = categories.find(
      (item) => item._id === e.target.id
    );
    setState(State);
  };

  const onSubmit = async () => {
    let data = watch();
    let State = { ...state };
    let newTask: any = {
      id: task?._id,
      cardId: task?.cardId,
      name: data.name,
      categoryId: data?.categoryId,
      status: State.task?.status,
      attachedFiles: state?.newFiles,
      boardId: state.selectedDepartment?.boardId,
      listId: state.task?.listId,
      teamId: data.teamId === "" ? state.task?.teamId : data.teamId,
    };

    if (data.subCategoryId !== "") newTask.subCategoryId = data.subCategoryId;
    if (data.deadline !== "" && data.deadline !== null)
      newTask.deadline = moment(data?.deadline).toDate().toString();
    if (state.newFiles) newTask.attachedFiles = state.newFiles;
    if (data.description) newTask.description = data.description;
    if (state.deleteFiles) newTask.deleteFiles = state.deleteFiles;
    let { error, warning, value, FileError, FormDatatask } =
      validateEditTask(newTask);
    if (error || FileError) {
      State.error = { error, warning, value };
      setState(State);
    } else {
      await dispatch(
        editTaskFromBoard({
          data: FormDatatask,
          dispatch,
          setShow: props.setShow,
        })
      );
    }
  };
  const resetState = () => {
    reset();
    setState({ ...initialEditState });
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
      setState({ ...State });
    }
    if (files?.current?.value) files.current.value = "";
  };

  const onRemoveFile = (item: any) => {
    let State = { ...state };
    if (item?._id && state.task?._id) {
      let task = { ...State.task };
      State.deleteFiles.push(item);
      State.deleteFiles = _.uniq([...State.deleteFiles]);
      let files = [...State.task?.attachedFiles];
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

  const onGetError = (value: string) =>
    state.error?.error?.details.find((item) => item.path.includes(value))
      ? "true"
      : "false";

  const onCloseModel = () => {
    reset();
    dispatch(ProjectsActions.onEditTask(undefined));
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
          <div style={{ position: "relative" }}>
            <div className="closeIconContainer" onClick={onCloseModel}>
              <img
                className="closeIcon"
                src={IMAGES.closeicon}
                alt="closeIcon"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <Typography variant="h2" fontWeight={"500"} color={"#30bcc7"}>
            Edit Task
          </Typography>
        </Grid>
        <div className="step2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs-grid">
              <div>
                <ControlledInput
                  type="input"
                  name="name"
                  label="Task name"
                  placeholder="Task name"
                  dataTestId="edit-task-name"
                  control={control}
                  value={watch().name}
                  required={true}
                  error={onGetError("name")}
                />
              </div>
              <div>
                <ControlledSelect
                  formLabel="Department name"
                  name="selectedDepartmentId"
                  control={control}
                  elementType={"select"}
                  label={"Select"}
                  onSelect={onChangeDepartment}
                  options={[
                    ...departments?.map((item) => {
                      return {
                        id: item._id,
                        value: item._id,
                        text: item.name,
                      };
                    }),
                  ]}
                  error={onGetError("selectedDepartmentId")}
                />
              </div>
              <div>
                <DateInput
                  label={"Deadline date"}
                  name="deadline"
                  state={state}
                  control={control}
                  placeholder="Deadline"
                  register={register}
                  setValue={setValue}
                />
              </div>
              <div>
                <ControlledSelect
                  label="Select"
                  elementType="select"
                  formLabel="Category"
                  name="categoryId"
                  control={control}
                  onSelect={onChangeCategory}
                  error={onGetError("categoryId")}
                  options={categories?.map((item) => {
                    return {
                      id: item._id ? item._id : "",
                      value: item._id ? item._id : "",
                      text: item.category,
                    };
                  })}
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
                        name="create-task-from-board"
                        cols={5}
                        value={watch().description}
                        onChange={props.field.onChange}
                        placeholder={"Write about your task"}
                        rows={4}
                        error={onGetError("description")}
                      />
                    </>
                  )}
                />
              </div>
              <div>
                <div>
                  <ControlledSelect
                    label="Select"
                    elementType="select"
                    formLabel="Sub Category"
                    name="subCategoryId"
                    error={onGetError("subCategoryId")}
                    control={control}
                    onSelect={(e: any) => {
                      setValue("subCategoryId", e.target.id);
                    }}
                    options={
                      categories &&
                      categories
                        .find((item) => item._id === task?.categoryId)
                        ?.subCategoriesId?.map((item) => {
                          return {
                            id: item._id ? item._id : "",
                            value: item._id ? item._id : "",
                            text: item.subCategory,
                          };
                        })
                    }
                  />
                </div>

                <Box paddingTop={0.5}>
                  <ControlledSelect
                    elementType="select"
                    label="Select"
                    formLabel="Assign to team"
                    name="teamId"
                    control={control}
                    onSelect={(e: any) => setValue("teamId", e.target.id)}
                    message={
                      state.selectedDepartment
                        ? `${state.selectedDepartment?.name} department has no teams yet.`
                        : "Please select a department firstly, to can see the teams inside"
                    }
                    options={
                      departments &&
                      departments
                        .find((item) => item.boardId === task?.boardId)
                        ?.teams?.map((item) => {
                          if (item && item._id)
                            return {
                              id: item._id,
                              value: item._id,
                              text: item.name,
                            };
                        })
                    }
                    error={onGetError("teamId")}
                  />
                </Box>
              </div>
            </div>
            <Box>
              <AttachetFiles
                register={register}
                onSetFiles={onSetFiles}
                onChangeFiles={onChangeFiles}
                onRemoveFile={onRemoveFile}
                filesRef={files}
                newFiles={state.newFiles}
                oldFiles={state.task.attachedFiles}
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
                label="Done"
                loading={loadingTask}
                onClick={onSubmit}
                dataTestId="edit-task-submit"
              />
            </div>
          </form>
        </div>
      </PopUp>
    </>
  );
};

export default EditTask;
