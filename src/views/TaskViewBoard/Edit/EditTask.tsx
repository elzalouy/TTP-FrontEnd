import { Box } from "@mui/material";
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
  selectAllProjects,
  selectSelectedProject,
} from "../../../models/Projects";
import {
  CRUDTaskState,
  EditTaskProps,
  initialHookFormTaskState,
  initialState,
} from "../../../types/views/BoardView";
import DateInput from "./DateInput";
import EditTaskTitle from "./Title";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import TextArea from "src/coreUI/components/Inputs/Textfield/StyledArea";
import Button from "src/coreUI/components/Buttons/Button";

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
  const files = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<CRUDTaskState>(initialState);

  React.useEffect(() => {
    // TODO add useEffect with condition
    let State = { ...state };
    let task = selectedProject.tasks.find((item) => item._id === id);
    if (task) {
      State.task = task;
      let dep = departments.find((item) => item.boardId === task?.boardId);
      State.selectedCategory = categories.find(
        (item) => item._id === task?.categoryId
      );
      State.selectedDepartment = dep;
      State.selectedDepatmentTeams = dep?.teams?.filter(
        (item) => item.isDeleted === false
      );
      if (dep) setValue("selectedDepartmentId", dep._id);
      setValue("name", task.name);
      setValue("deadline", task.deadline);
      setValue("description", task.description);
      setValue("teamId", task.teamId);
      setValue("categoryId", task.categoryId);
      setValue("subCategoryId", task.subCategoryId);
      setValue("attachedFiles", task.attachedFiles);
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
    setValue("selectedDepartmentId", e.target.id);
    setValue("teamId", "");
    let dep = departments.find((item) => item._id === e.target.id);
    State.selectedDepartment = dep;
    State.selectedDepatmentTeams = dep?.teams?.filter(
      (item) => item.isDeleted === false
    );
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
    let newTask = {
      id: State.task._id,
      name: data.name,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      teamId: data?.teamId ? data?.teamId : null,
      status: State.task.status,
      deadline:
        data.deadline !== "" ? moment(data?.deadline).toDate().toString() : "",
      attachedFiles: state?.newFiles,
      deleteFiles: state.deleteFiles,
      boardId: state.selectedDepartment?.boardId,
      listId: data?.teamId
        ? state.selectedDepartment?.teams?.find(
            (item: any) => item._id === data.teamId
          )?.listId
        : state.selectedDepartment?.lists?.find((l) => l.name === "Tasks Board")
            ?.listId,
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
  const onGetError = (value: string) =>
    state.error?.error?.details[0].path.includes(value) ? "true" : "";
  return (
    <>
      <PopUp show={props.show} minWidthSize="50vw">
        <EditTaskTitle
          setShow={props.setShow}
          reset={resetState}
          title="Edit task"
        />
        <div className="step2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs-grid">
              <div>
                <ControlledInput
                  type="input"
                  name="name"
                  label="Task name"
                  placeholder="Task name"
                  dataTestId="task-name"
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
                  selected={watch().selectedDepartmentId}
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
                  selected={watch().categoryId}
                  onSelect={onChangeCategory}
                  options={[
                    ...categories?.map((item) => {
                      return {
                        id: item._id ? item._id : "",
                        value: item._id ? item._id : "",
                        text: item.category,
                      };
                    }),
                  ]}
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
                        error={
                          state.error?.error?.details[0].path.includes(
                            "description"
                          )
                            ? "true"
                            : ""
                        }
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
                    control={control}
                    selected={watch().subCategoryId}
                    onSelect={(e: any) => {
                      setValue("subCategoryId", e.target.id);
                    }}
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
                </div>
                <Box paddingTop={0.5}>
                  <ControlledSelect
                    elementType="select"
                    label="Select"
                    formLabel="Assign to team"
                    name="teamId"
                    control={control}
                    selected={watch().teamId}
                    onSelect={(e: any) => setValue("teamId", e.target.id)}
                    options={
                      state.selectedDepatmentTeams
                        ? [
                            ...state.selectedDepatmentTeams.map((item) => {
                              if (item && item._id)
                                return {
                                  id: item._id,
                                  value: item._id,
                                  text: item.name,
                                };
                            }),
                          ]
                        : []
                    }
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
              />
            </div>
          </form>
        </div>
      </PopUp>
    </>
  );
};

export default EditTask;
