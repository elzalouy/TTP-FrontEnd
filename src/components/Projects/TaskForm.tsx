import { Dispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  categoriesActions,
  selectAllCategories,
  selectSelectedCategory,
} from "../../redux/Categories";
import { selectAllDepartments } from "../../redux/Departments";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createProject,
  ProjectsActions,
  selectNewProject,
} from "../../redux/Projects";

interface TaskFormProps {
  setCurrentStep: any;
  setShow: any;
}

const TaskForm: React.FC<TaskFormProps> = ({ setCurrentStep, setShow }) => {
  const dispatch: Dispatch<any> = useAppDispatch();
  const Dispatch = useDispatch();

  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const newProject = useAppSelector(selectNewProject);
  const { register, handleSubmit, watch } = useForm();
  React.useEffect(() => {
    let values = watch();
    if (values?.categoryId !== selectedCategory?.id) {
      let category = categories.find((item) => item.id === values.categoryId);
      dispatch(
        categoriesActions.setSelectedCategory(category ? category : null)
      );
    }
  }, [register]);
  const onSubmit = (data: any) => {
    let newTask = {
      name: data.name,
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId,
      teamId: data.teamId,
      countNotClear: 0,
      countShared: 0,
      status: "",
      start: new Date().toUTCString(),
      deadline: data.deadline,
      deliveryDate: null,
      done: null,
      turnoverTime: null,
      attachedFiles: null,
      attachedCard: null,
      listId: null,
      cardId: data.cardId,
      boardId: null,
      file: data.file,
      description: data.description,
    };
    dispatch(ProjectsActions.onChangeNewProjectTask(newTask));
  };

  const onCancel = () => {
    setShow("none");
    setCurrentStep(0);
  };
  const onSaveProject = () => {
    console.log(newProject);
    let project = { ...newProject.project, tasks: [...newProject.tasks] };
    dispatch(createProject(project));
    setShow("none");
    setCurrentStep(0);
    window.location.reload();
  };
  return (
    <>
      <div className="step2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs-grid">
            <div>
              <label className="label-project">Task name</label>
              <br />
              <input
                className="input-project"
                type="text"
                placeholder="Task name"
                {...register("name", { required: true, minLength: 3 })}
              />
            </div>
            <div>
              <label className="label-project">Department name</label>
              <br />
              <select
                className="select-project"
                {...register("teamId", { required: true })}
              >
                {departments && departments.length > 0 ? (
                  departments.map((item) => (
                    <option value={item._id}>{item?.name}</option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
            <div>
              <label className="label-project" {...register("deadline")}>
                Deadline date
              </label>
              <br />
              <input
                className="input-project"
                type="date"
                {...register("deadline", { required: true })}
              />
            </div>
            <div>
              <label className="label-project">Category</label>
              <br />
              <select
                className="select-project"
                {...register("categoryId", { required: true })}
              >
                {categories && categories.length > 0 ? (
                  categories.map((item) => (
                    <option value={item.id}>{item.category}</option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
            <div>
              <label className="label-project">Description</label>
              <br />
              <textarea
                {...register("description", { required: true })}
                className="textarea-project"
                rows={3}
                placeholder="Write about your task"
              />
            </div>
            <div>
              <label className="label-project">Sub category</label>
              <br />
              <select
                className="select-project"
                {...register("subCategoryId", { required: true })}
              >
                {selectedCategory?.subCategories &&
                selectedCategory?.subCategories.length > 0 ? (
                  selectedCategory.subCategories.map((item) => (
                    <option value={item}>{item}</option>
                  ))
                ) : (
                  <></>
                )}
              </select>
              <br />
              <label className="label-project">Attach card</label>
              <br />
              <select
                className="select-project"
                {...register("cardId", { required: true })}
              >
                <option value="Sub Category">Sub Category</option>
                <option value="1">option 2 </option>
                <option value="2">option</option>
              </select>
            </div>
          </div>
          <div className="files">
            <input type="file" {...register("file")} />
          </div>
          <div>
            <button type="submit" className="addTaskBtn">
              Add task
            </button>
          </div>
        </form>
        <div className="controllers">
          <button className="cancelBtn" onClick={() => onCancel()}>
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
