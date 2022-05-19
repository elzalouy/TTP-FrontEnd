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

import { UiActions } from "../../redux/Ui";

interface TaskFormProps {
  setCurrentStep: any;
  setShow: any;
}

const TaskForm: React.FC<TaskFormProps> = ({ setCurrentStep, setShow }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const Dispatch = useDispatch();
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const newProject = useAppSelector(selectNewProject);
  const selectedDepartment = useAppSelector(selectSelectedDepartment);
  const { register, handleSubmit, watch, control, reset } = useForm({
    defaultValues: {
      name: "",
      categoryId: "",
      subCategoryId: "",
      memberId: "",
      deadline: "",
      attachedFiles: "",
      selectedDepartmentId:"",
      description:"",
      file:""
    }
  });

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
  React.useEffect(() => {
    reset()
  }, [setShow])
  const onSubmit = async (data: any) => {
    let newTask = {
      name: data.name,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
      memberId: data?.memberId,
      projectId: newProject?.project?._id,
      status: "inProgress",
      start: new Date().toUTCString(),
      deadline: data?.deadline,
      deliveryDate: null,
      done: null,
      turnoverTime: null,
      attachedFiles: data.file,
      listId: selectedDepartment?.teamsId?.find(
        (item) => item._id === data.memberId
      )?.listId,
      boardId: selectedDepartment?.boardId,
    };
    dispatch(createProjectTask(newTask));
  };

  const onCancel = () => {
    dispatch(UiActions.fireNewProjectHook(""));
    setShow("none");
    setCurrentStep(0);
  };
  const onSaveProject = () => {
    dispatch(UiActions.fireNewProjectHook(""));
    toast("Project and Its Tasks have been saved.");
    setShow("none");
    setCurrentStep(0);
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
                  <input
                    className="input-project"
                    type="text"
                    placeholder="Task name"
                    {...register("name")}
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
                    handleChange={props.field.onChange}
                    selectText={
                      departments.find((item) => item._id === props.field.value)
                        ?.name
                    }
                    {...register("selectedDepartmentId")}
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
              <label className="label-project" {...register("deadline")}>
                Deadline date
              </label>
              <br />
              <Controller
                name="deadline"
                control={control}
                render={(props) => (
                  <input
                  {...register("deadline")}
                    onChange={props.field.onChange}
                    className="input-project"
                    type="date"
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
                    handleChange={props.field.onChange}
                    selectText={
                      categories?.find((item) => item._id === props.field.value)
                        ?.category
                    }
                    {...register("categoryId")}
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
                  <textarea
                    className="textarea-project"
                    rows={3}
                    {...register("description")}
                    placeholder="Write about your task"
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
                    handleChange={props.field.onChange}
                    selectText={
                      selectedCategory?.selectedSubCategory?.find(
                        (item) => item._id === props.field.value
                      )?.subCategory
                    }
                    {...register("subCategoryId")}
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
                defaultValue=""
                render={(props) => (
                  <SelectInput2
                    handleChange={props.field.onChange}
                    selectText={
                      selectedDepartment?.teamsId?.find(
                        (item) => item._id === props.field.value
                      )?.name
                    }
                    {...register("memberId")}
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
          </div>
          <div className="files">
            <Controller
              name="file"
              control={control}
              render={(props) => (
                <input  {...register("file")} onChange={props.field.onChange} type="file" />
              )}
            />
          </div>
          <div>
            <button type="submit" className="addTaskBtn">
              Add task
            </button>
          </div>
        </form>
        <div className="controllers">
          <button className="cancelBtn" onClick={() => {reset(); onCancel();}}>
            Cancel
          </button>
          <button className="blackBtn" onClick={() => onSaveProject()}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
