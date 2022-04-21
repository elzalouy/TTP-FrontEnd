import { Dispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  categoriesActions,
  getAllCategories,
  selectAllCategories,
  selectSelectedCategory,
} from "../../redux/Categories";
import {
  getAllDepartments,
  selectAllDepartments,
} from "../../redux/Departments";
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
  const { register, handleSubmit, watch, control, reset } = useForm();
  React.useEffect(() => {
    dispatch(getAllDepartments(null));
    dispatch(getAllCategories(null));
  }, []);
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

  const onSubmit = (data: any) => {
    let newTask = {
      name: data.name,
      categoryId: null,
      subCategoryId: null,
      memberId: data?.memberId,
      projectId: newProject.project?._id,
      status: "inProgress",
      start: new Date().toUTCString(),
      deadline: data.deadline,
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
              <Controller
                name="name"
                control={control}
                render={(props) => (
                  <input
                    {...props}
                    className="input-project"
                    type="text"
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
                  <select
                    className="select-project"
                    {...props}
                    onChange={props.field.onChange}
                    defaultChecked
                  >
                    <option>select</option>

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
                    {...props}
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
                  <select
                    className="select-project"
                    {...props}
                    onChange={props.field.onChange}
                    defaultChecked
                  >
                    <option>select</option>

                    {categories &&
                      categories?.length > 0 &&
                      categories?.map((item) => (
                        <option key={item?._id} value={item._id}>
                          {item.category}
                        </option>
                      ))}
                  </select>
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
                    {...props}
                    className="textarea-project"
                    rows={3}
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
                  <select
                    className="select-project"
                    {...props}
                    onChange={props.field.onChange}
                    defaultChecked
                  >
                    <option>select</option>
                    {selectedCategory?.selectedSubCategory &&
                      selectedCategory?.selectedSubCategory.length > 0 &&
                      selectedCategory.selectedSubCategory.map(
                        (item, index) => (
                          <option key={item._id} value={item._id}>
                            {item.subCategory}
                          </option>
                        )
                      )}
                  </select>
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
                  <select
                    {...props}
                    defaultChecked
                    onChange={props.field.onChange}
                    className="select-project"
                  >
                    <option value="">select</option>
                    {selectedDepartment &&
                      selectedDepartment?.teamsId?.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                  </select>
                )}
              />
            </div>
          </div>
          <div className="files">
            <Controller
              name="file"
              control={control}
              render={(props) => (
                <input {...props} onChange={props.field.onChange} type="file" />
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
