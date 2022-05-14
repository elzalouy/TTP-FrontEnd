import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import "./popups-style.css";
import { Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import {
  createTaskFromBoard,
  ProjectsActions,
  selectNewProject,
  selectSelectedDepartment,
  selectSelectedProject,
} from "../../redux/Projects";
import { useDispatch } from "react-redux";
import {
  getAllDepartments,
  selectAllDepartments,
} from "../../redux/Departments";
import {
  categoriesActions,
  getAllCategories,
  selectAllCategories,
  selectSelectedCategory,
} from "../../redux/Categories";
import _ from "lodash";

type Props = {
  show: string;
  setShow: (val: string) => void;
};

const CreateTask: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const selectedDepartment = useAppSelector(selectSelectedDepartment);
  const selectedProject = useAppSelector(selectSelectedProject);
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const [Task, setTask] = useState<any>({
    name: "",
    categoryId: "",
    subCategoryId: "",
    memberId: "",
    deadline: "",
    attachedFiles: "",
    selectedDepartmentId: "",
  });

  
  React.useEffect(() => {
    dispatch(getAllDepartments(null));
    dispatch(getAllCategories(null));
  }, []);

  React.useEffect(() => {
    if (Task?.categoryId !== selectedCategory?._id) {
      let category = categories.find((item) => item._id === Task?.categoryId);
      dispatch(
        categoriesActions?.setSelectedCategory(category ? category : null)
      );
    }
    if (Task?.selectedDepartmentId !== selectedDepartment?._id) {
      let dep = departments?.find(
        (item) => item._id === Task.selectedDepartmentId
      );
      dispatch(ProjectsActions.onChangeSelectedDepartment(dep));
    }
  }, [Task]);

  const onSubmit = (data: any) => {
    let newTask = {
      name: Task.name,
      categoryId: Task?.categoryId,
      subCategoryId: Task?.subCategoryId,
      memberId: Task?.memberId,
      projectId: selectedProject?.project?._id,
      status: "inProgress",
      start: new Date().toUTCString(),
      deadline: Task?.deadline,
      deliveryDate: null,
      done: null,
      turnoverTime: null,
      attachedFiles: Task?.attachedFiles,
      listId: selectedDepartment?.teamsId?.find(
        (item) => item._id === Task?.memberId
      )?.listId,
      boardId: selectedDepartment?.boardId,
    };
    dispatch(createTaskFromBoard(newTask));
    props.setShow("none");
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let task = { ...Task };
    task[e.target.name] = e.target.value;
    setTask(task);
  };

  const onDeleteFile = () => {
    let task = { ...Task };
    task.attachedFiles = "";
    setTask(task);
  };

  return (
    <>
      <PopUp show={props.show} minWidthSize="50vw">
        <div>
          <img
            className="closeIcon"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              props.setShow("none");
            }}
          />
        </div>
        <Typography variant="h2" fontWeight={"500"} color={"#30bcc7"}>
          Create task
        </Typography>
        <div className="inputs-grid">
          <div>
            <label className="popup-label">Task name</label>
            <input
              name="name"
              className="popup-input"
              type="text"
              placeholder="Task name"
              value={Task.name}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="popup-label">Department name</label>
            <select
              className="popup-select"
              name="selectedDepartmentId"
              value={Task.selectedDepartmentId}
              onChange={onChange}
            >
              <option value="" key={"0"}>
                Select
              </option>
              {departments &&
                departments?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="popup-label">Deadline date</label>
            <input
              className="popup-input"
              type="date"
              name="deadline"
              value={Task.deadline}
              onChange={onChange}
            />
          </div>
          <div>
            <label className="popup-label">Category</label>
            <select
              className="popup-select"
              onChange={onChange}
              name="categoryId"
              value={Task.categoryId}
            >
              <option value="" key="">
                Select
              </option>
              {categories &&
                categories?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.category}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <div>
              <label className="popup-label">Sub category</label>
              <select
                className="popup-select"
                name="subCategoryId"
                onChange={onChange}
              >
                <option value="" key="">
                  Select
                </option>
                {selectedCategory &&
                  selectedCategory.selectedSubCategory?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.subCategory}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="popup-label">Assign Member</label>
            <select
              defaultChecked
              name="memberId"
              onChange={onChange}
              className="popup-select"
            >
              <option value="" key="">
                select
              </option>
              {selectedDepartment &&
                selectedDepartment?.teamsId?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row-wrap" style={{ paddingTop: "20px" }}>
          <div className="upload-btn-wrapper">
            <button className="btnFile">
              <img src={IMAGES.fileicon} alt="Upload" />
              {Task?.attachedFiles?.length > 0 ? 1 : 0}
            </button>
            <input
              type="file"
              className="custom-file-input"
              name="attachedFiles"
              onChange={onChange}
            />
          </div>
          {Task?.attachedFiles?.length > 0 && (
            <div className="added-file">
              <p className="title-added-file">
                {_.truncate(`${Task?.attachedFiles}`, {
                  length: 30,
                  separator: " ",
                })}
              </p>
              <img
                src={IMAGES.closeicon}
                alt="close"
                width="9"
                height="9"
                style={{ cursor: "pointer" }}
                onClick={onDeleteFile}
              />
            </div>
          )}
        </div>
        <div>
          <button type="submit" className="addTaskBtn" onClick={onSubmit}>
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};
export default CreateTask;
