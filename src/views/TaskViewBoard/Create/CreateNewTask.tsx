import * as React from "react";
import _ from "lodash";
import EditTaskTitle from "../Edit/Title";
import Input from "../../../coreUI/components/Inputs/Textfield/Input";
import Select from "../Edit/Select";
import DateInput from "../Edit/DateInput";
import AttachetFiles from "../../../coreUI/components/Lists/AttachFiles";
import moment from "moment";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { selectAllCategories } from "../../../models/Categories";
import { selectAllDepartments } from "../../../models/Departments";
import { useAppSelector } from "../../../models/hooks";
import { Box, CircularProgress } from "@mui/material";
import { selectUi } from "../../../models/Ui/UI.selectors";
import { selectRole } from "../../../models/Auth";
import { valdiateCreateTask } from "../../../services/validations/task.schema";
import {
  createTaskFromBoard,
  selectSelectedProject,
} from "../../../models/Projects";
import {
  CRUDTaskState,
  initialHookFormTaskState,
  initialState,
} from "../../../types/views/BoardView";

interface Props {
  show: string;
  setShow: (val: string) => void;
}

const CreateNewTask = ({ show, setShow }: Props) => {
  const dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const selectedProject = useAppSelector(selectSelectedProject);
  const { createTaskPopup } = useAppSelector(selectUi);
  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: initialHookFormTaskState,
  });
  const role = useAppSelector(selectRole);
  const files = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<CRUDTaskState>(initialState);

  React.useEffect(() => {
    if (createTaskPopup === "none") {
      reset();
    }
  }, [createTaskPopup]);

  const onSubmit = async (data: any) => {
    let State = { ...state };
    let newTask = {
      name: data.name,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      teamId: data?.teamId ? data?.teamId : null,
      projectId: selectedProject?.project?._id,
      status: data?.teamId ? "inProgress" : "Tasks Board",
      start: new Date().toUTCString(),
      deadline: data?.deadline
        ? moment(data?.deadline).toDate().toString()
        : "",
      attachedFiles: state?.newFiles,
      listId: data?.teamId
        ? state.selectedDepartment?.teams?.find(
            (item: any) => item._id === data.teamId
          )?.listId
        : state.selectedDepartment?.lists?.find((l) => l.name === "Tasks Board")
            ?.listId,
      boardId: state.selectedDepartment?.boardId,
      description: data?.description,
    };
    let { error, warning, value, FileError, FormDatatask } =
      valdiateCreateTask(newTask);
    if (error || FileError) {
      State.error = { error, warning, value };
      setState(State);
    } else {
      dispatch(
        createTaskFromBoard({
          data: FormDatatask,
          dispatch,
          resetState,
          setShow: setShow,
        })
      );
    }
  };

  const onChangeDepartment = (e: any) => {
    let State = { ...state };
    setValue("selectedDepartmentId", e.target.value);
    setValue("teamId", "");
    let dep = departments.find((item) => item._id === e.target.value);
    if (dep && dep.teams) {
      State.selectedDepartment = dep;
      console.log(State.selectedDepartment);
      State.selectedDepatmentTeams = dep.teams.filter(
        (item) => item.isDeleted === false
      );
      setState(State);
    }
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
      <PopUp show={show} minWidthSize="50vw">
        <EditTaskTitle
          setShow={setShow}
          reset={resetState}
          title="Create task"
        />
        <div className="step2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs-grid">
            <Input
                name="name"
                label="Task name"
                placeholder="Task name"
                control={control}
                dataTestId="task-name"
                register={register}
                state={state}
              />
              <Select
                state={state}
                control={control}
                dataTestId="department-new-task"
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
                dataTestId="category-new-task"
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
                  <Select
                    name="teamId"
                    label={"Assign to team"}
                    control={control}
                    state={state}
                    register={register}
                    selectValue={watch().teamId}
                    selectText={
                      state.selectedDepatmentTeams?.find(
                        (item) => item._id === watch().teamId
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
                className="addTaskBtn fontSize"
              >
                {selectedProject.loading ? (
                  <CircularProgress
                    sx={{
                      color: "white",
                      width: "25px !important",
                      height: "25px !important",
                    }}
                  />
                ) : (
                  "Add task"
                )}
              </button>
            </div>
          </form>
        </div>
      </PopUp>
    </>
  );
};

export default CreateNewTask;