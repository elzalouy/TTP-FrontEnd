import * as React from "react";
import _ from "lodash";
import EditTaskTitle from "../Edit/Title";
import DateInput from "../Edit/DateInput";
import AttachetFiles from "../../../coreUI/components/Lists/AttachFiles";
import moment from "moment";
import PopUp from "../../../coreUI/components/Popovers/Popup/PopUp";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { selectAllCategories } from "../../../models/Categories";
import { selectAllDepartments } from "../../../models/Departments";
import { useAppSelector } from "../../../models/hooks";
import { Box } from "@mui/material";
import { selectUi } from "../../../models/Ui/UI.selectors";
import { valdiateCreateTask } from "../../../services/validations/task.schema";
import {
  createTaskFromBoard,
  selectSelectedProject,
} from "../../../models/Projects";
import {
  CRUDTaskState,
  IInitialinitialHookFormTaskState,
  initialCreateState,
  initialHookFormTaskState,
} from "../../../types/views/BoardView";
import ControlledInput from "src/coreUI/compositions/Input/ControlledInput";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import TextArea from "src/coreUI/components/Inputs/Textfield/StyledArea";
import Button from "src/coreUI/components/Buttons/Button";
import { selectClientOptions } from "src/models/Clients";

interface Props {
  show: string;
  setShow: (val: string) => void;
  edit: boolean;
}

const CreateNewTask = ({ show, setShow, edit }: Props) => {
  const dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const selectedProject = useAppSelector(selectSelectedProject);
  const { createTaskPopup } = useAppSelector(selectUi);
  const clientsOptions = useAppSelector(selectClientOptions);
  const { register, handleSubmit, control, reset, setValue, watch } =
    useForm<IInitialinitialHookFormTaskState>({
      defaultValues: { ...initialHookFormTaskState },
    });

  const files = React.useRef<HTMLInputElement>(null);
  const [state, setState] = React.useState<CRUDTaskState>({
    ...initialCreateState,
  });

  React.useEffect(() => {
    if (createTaskPopup === "none") {
      reset();
    }
  }, [createTaskPopup]);

  const onSubmit = async () => {
    let data = watch();
    let State = { ...state };
    if (selectedProject.project) {
      let subCategory = state.selectedCategory?.subCategoriesId?.find(
        (item) => item._id === data.subCategoryId
      );
      let list = data?.teamId === "" ? "Tasks Board" : "inProgress";
      let projectNames = selectedProject.project.name.split("-");
      let projectPureName = projectNames[projectNames.length - 1];
      let newTask: any = {
        name: data.name,
        categoryId: data?.categoryId,
        projectId: selectedProject?.project?._id,
        status: list,
        start: new Date().toUTCString(),
        listId: state.selectedDepartment?.lists?.find((l) => l.name === list)
          ?.listId,
        boardId: state.selectedDepartment?.boardId,
      };
      if (data.subCategoryId !== "") newTask.subCategoryId = data.subCategoryId;
      if (data.teamId !== "") newTask.teamId = data.teamId;
      if (data.deadline !== "" && data.deadline !== null)
        newTask.deadline = moment(data?.deadline).toDate().toString();
      if (state.newFiles) newTask.attachedFiles = state.newFiles;
      if (data.description) newTask.description = data.description;

      let { error, warning, value, FileError, FormDatatask } =
        valdiateCreateTask(newTask);
      if (error || FileError) {
        State.error = { error, warning, value };
        setState(State);
      } else {
        FormDatatask?.set(
          "name",
          `${
            clientsOptions.find(
              (item) => item.id === selectedProject?.project?.clientId
            )?.text
          }-${projectPureName}-${state.selectedCategory?.category}-${
            subCategory ? subCategory.subCategory : ""
          } (${data.name})`
        );
        dispatch(
          createTaskFromBoard({
            data: FormDatatask,
            setShow: setShow,
            resetState,
            reset,
          })
        );
      }
    }
  };

  const onChangeDepartment = (e: any) => {
    let State = { ...state };
    setValue("selectedDepartmentId", e.target.id);
    setValue("teamId", "");
    let dep = departments.find((item) => item._id === e.target.id);
    if (dep && dep.teams) {
      State.selectedDepartment = dep;
      State.selectedDepatmentTeams = dep.teams.filter(
        (item) => item.isDeleted === false
      );
      setState(State);
    }
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

  const resetState = () => {
    setState({ ...initialCreateState });
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
    if (item?.name && item?.size) {
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
      <PopUp show={show} minWidthSize="50vw">
        <EditTaskTitle
          setShow={setShow}
          reset={resetState}
          title="Create task"
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
                  dataTestId="create-task-name"
                  control={control}
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
                  dataTestId="create-task-dep-select"
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
                  dataTestId="create-task-cat-select"
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
                        value={props.field.value}
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
                    onSelect={(e: any) =>
                      setValue("subCategoryId", e.target.id)
                    }
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
                    message={
                      state.selectedDepartment
                        ? `${state.selectedDepartment?.name} department has no teams yet.`
                        : "Please select a department firstly, to can see the teams inside"
                    }
                    control={control}
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
                loading={selectedProject.loading}
                onClick={onSubmit}
                dataTestId="create-task-submit"
              />
            </div>
          </form>
        </div>
      </PopUp>
    </>
  );
};

export default CreateNewTask;
