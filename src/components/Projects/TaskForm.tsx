import { Dispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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
import {
  getTechMembersByDeptId,
  selectDepartmentMembers,
} from "../../redux/techMember";

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
  const depMembers = useAppSelector(selectDepartmentMembers);
  const { register, handleSubmit, watch } = useForm();
  React.useEffect(() => {
    let values = watch();
    if (values?.categoryId !== selectedCategory?._id) {
      let category = categories.find((item) => item._id === values.categoryId);
      dispatch(
        categoriesActions.setSelectedCategory(category ? category : null)
      );
    }
    if (values.selectedDepartment !== selectedDepartment) {
      dispatch(
        ProjectsActions.onChangeSelectedDepartment(values.selectedDepartment)
      );
      dispatch(
        getTechMembersByDeptId({ departmentId: values.selectedDepartment })
      );
    }
  }, [register]);
  const onSubmit = (data: any) => {
    console.log(data.memberId);
    let assignedTo = depMembers?.find((item) => item._id === data.memberId);
    let newTask = {
      name: data.name,
      categoryId: null,
      subCategoryId: null,
      memberId: data?.memberId,
      projectId: newProject.project?._id,
      countNotClear: 0,
      countShared: 0,
      status: "inProgress",
      start: new Date().toUTCString(),
      deadline: data.deadline,
      deliveryDate: null,
      done: null,
      turnoverTime: null,
      attachedFiles: null,
      attachedCard: null,
      listId: assignedTo?.listId,
      boardId: assignedTo?.boardId,
      cardId: null,
      file: data.file,
      description: data.description,
    };
    dispatch(createProjectTask(newTask));
  };

  const onCancel = () => {
    setShow("none");
    setCurrentStep(0);
  };
  const onSaveProject = () => {
    toast("Project and Its Tasks have been saved.");
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
                {...register("selectedDepartment", { required: true })}
              >
                {departments && departments.length > 0 ? (
                  departments.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item?.name}
                    </option>
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
              <select className="select-project" {...register("categoryId")}>
                {categories &&
                  categories.length > 0 &&
                  categories.map((item) => (
                    <option key={item?._id} value={item._id}>
                      {item.category}
                    </option>
                  ))}
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
              <select className="select-project" {...register("subCategoryId")}>
                {selectedCategory?.subCategories &&
                  selectedCategory?.subCategories.length > 0 &&
                  selectedCategory.subCategories.map((item, index) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <br />
              <label className="label-project">Assign to Member</label>
              <br />
              <select
                className="select-project"
                {...register("memberId", { required: true })}
              >
                {depMembers?.map((item) => (
                  <option value={item._id}>{item.name.toString()}</option>
                ))}
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
