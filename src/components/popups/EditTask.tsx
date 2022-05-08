import React, { useEffect } from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import "./popups-style.css";
import { useAppSelector } from "../../redux/hooks";
import { editTask, selectEditTaskValues, Task } from "../../redux/Projects";
import { selectAllDepartments } from "../../redux/Departments";
import { selectAllCategories } from "../../redux/Categories";
import { useDispatch } from "react-redux";

type Props = { Show: string; setShow: (val: string) => any };

interface taskData {
  taskName: string;
  department: string;
  deadline: string;
  Category: string;
  Description: string;
  SubCategory: string;
  AttachCard: string;
  files: any;
}

const EditTask: React.FC<Props> = ({ Show, setShow }) => {
  const dispatch = useDispatch();
  const editValues = useAppSelector(selectEditTaskValues);
  const departments = useAppSelector(selectAllDepartments);
  const categories = useAppSelector(selectAllCategories);
  const [Task, setTask] = useState<any>({
    id: "",
    name: "",
    boardId: "",
    deadline: "",
    categoryId: "",
    subCategoryId: "",
    description: "",
    attachedFiles: "",
    memberId: "",
    file: "",
    listId: "",
    departmentId: "",
  });
  useEffect(() => {
    setTask({
      ...editValues,
      departmentId: departments?.find(
        (item) => item.boardId === editValues?.boardId
      )?._id,
    });
  }, [editValues]);
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let data = {
      id: editValues?._id,
      name: Task?.name,
      boardId: Task?.boardId,
      deadline: Task?.deadline,
      categoryId: Task?.categoryId,
      subCategoryId: Task?.subCategoryId,
      description: Task?.description,
      attachedFiles: Task?.attachedFiles,
      memberId: Task?.memberId,
      file: Task?.file,
      listId: Task?.listId,
    };
    dispatch(editTask(data));
    setShow("none");
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};
  return (
    <>
      <PopUp show={Show}>
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              setShow("none");
            }}
          />
        </div>
        <p className="popup-title">Edit task</p>
        <div className="inputs-grid">
          <div>
            <label className="popup-label">Task name</label>
            <input
              name="name"
              className="popup-input"
              type="text"
              placeholder="Task name"
              value={Task?.name}
              onChange={(e) => {
                Task.name = e.target.value;
                setTask({ ...Task });
              }}
            />
          </div>
          <div>
            <label className="popup-label">Department name</label>
            <select
              className="popup-select"
              name="departmentId"
              onChange={(e) => {
                Task.departmentId = e.target.value;
                setTask({ ...Task });
              }}
              value={Task.departmentId}
            >
              <option value="">select</option>
              {departments &&
                departments?.map((item) => (
                  <option
                    key={item._id}
                    selected={item._id === Task.departmentId}
                    value={item._id}
                  >
                    {item?.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="popup-label">Deadline date</label>
            <input
              name="deadline"
              className="popup-input"
              type="date"
              value={Task?.deadline}
              onChange={(e) => {
                Task.deadline = e.target.value;
                setTask({ ...Task });
              }}
            />
          </div>
          <div>
            <label className="popup-label">Category</label>
            <select
              name="categoryId"
              className="popup-select"
              onChange={(e) => {
                Task.categoryId = e.target.value;
                setTask({ ...Task });
              }}
              value={Task.categoryId}
            >
              <option value="">select</option>
              {categories &&
                categories?.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                    selected={item._id === Task.categoryId}
                  >
                    {item.category}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="popup-label">Description</label>
            <textarea
              name="description"
              maxLength={75}
              className="popup-textarea"
              rows={4}
              placeholder="Write about your task"
              value={Task?.description}
              onChange={(e) => {
                Task.description = e.target.value;
                setTask({ ...Task });
              }}
            />
          </div>

          <div>
            <label className="popup-label">Sub category</label>

            <select
              className="popup-select"
              name="subCategoryId"
              onChange={(e) => {
                Task.subCategoryId = e.target.value;
                setTask({ ...Task });
              }}
              value={Task?.subCategoryId}
            >
              <option value="">select</option>
              {categories &&
                categories
                  ?.find((item) => item._id === Task.categoryId)
                  ?.selectedSubCategory?.map((item) => (
                    <option
                      key={item._id}
                      selected={item._id === Task._id}
                      value={item._id}
                    >
                      {item.subCategory}
                    </option>
                  ))}
            </select>

            <label className="popup-label">Memeber</label>
            <select
              className="popup-select"
              name="memberId"
              onChange={(e) => {
                Task.memberId = e.target.value;
                setTask({ ...Task });
              }}
            >
              <option value="">select</option>
              {departments
                .find((dep) => dep._id === Task?.departmentId)
                ?.teamsId.map((item) => (
                  <option key={item?._id} value={item?._id}>
                    {item?.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row-wrap">
          <div className="upload-btn-wrapper">
            <button className="btnFile">
              <img src={IMAGES.fileicon} alt="Upload" /> {Task?.file ? 1 : 0}
            </button>
            <input
              name="file"
              type="file"
              multiple
              className="custom-file-input"
              value={Task?.file}
              onChange={(e) => {
                Task.file = e.target.value;
                setTask({ ...Task });
              }}
            />
          </div>
          {Task?.file && (
            <div className="added-file">
              <p className="title-added-file">{Task.file?.name}</p>
              <img
                src={IMAGES.closeicon}
                alt="close"
                width="9"
                height="9"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  Task.file = null;
                  setTask({ ...Task });
                }}
              />
            </div>
          )}
        </div>
        <div>
          <button onClick={onSubmit} className="addTaskBtn">
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};
export default EditTask;
