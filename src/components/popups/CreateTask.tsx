import React from "react";
import IMAGES from "../../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import { useState } from "react";
import "./popups-style.css";

type Props = {};

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

const CreateTask: React.FC<Props> = () => {
  const [Show, setShow] = useState<string>("none");
  const [Task, setTask] = useState<taskData>({
    taskName: "",
    department: "",
    deadline: "",
    Category: "",
    Description: "",
    SubCategory: "",
    AttachCard: "",
    files: [],
  });

  return (
    <>
      <button
        className="black-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Create Task
      </button>

      <PopUp show={Show} minWidthSize="50vw">
        <div>
          <img
            className="closeIcon"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              setShow("none");
            }}
          />
        </div>
        <p className="popup-title">Create task</p>

        <div className="inputs-grid">
          <div>
            <label className="popup-label">Task name</label>

            <input
              className="popup-input"
              type="text"
              placeholder="Task name"
              value={Task.taskName}
              onChange={(e) => {
                Task.taskName = e.target.value;
                setTask({ ...Task });
              }}
            />
          </div>

          <div>
            <label className="popup-label">Department name</label>

            <select
              className="popup-select"
              onChange={(e) => {
                Task.department = e.target.value;
                setTask({ ...Task });
              }}
            >
              <option value="design"> design</option>
              <option value="1">option 2 </option>
              <option value="2">option</option>
            </select>
          </div>

          <div>
            <label className="popup-label">Deadline date</label>

            <input
              className="popup-input"
              type="date"
              value={Task.deadline}
              onChange={(e) => {
                Task.deadline = e.target.value;
                setTask({ ...Task });
              }}
            />
          </div>
          <div>
            <label className="popup-label">Category</label>

            <select
              className="popup-select"
              onChange={(e) => {
                Task.Category = e.target.value;
                setTask({ ...Task });
              }}
            >
              <option value="0">Graphic design</option>
              <option value="1">option 2 </option>
              <option value="2">option</option>
            </select>
          </div>

          <div>
            <label className="popup-label">Description</label>

            <textarea
              maxLength={75}
              className="popup-textarea"
              rows={4}
              placeholder="Write about your task"
              value={Task.Description}
              onChange={(e) => {
                Task.Description = e.target.value;
                setTask({ ...Task });
              }}
            />
          </div>

          <div>
            <label className="popup-label">Sub category</label>

            <select
              className="popup-select"
              onChange={(e) => {
                Task.SubCategory = e.target.value;
                setTask({ ...Task });
              }}
            >
              <option value="Sub Category">Sub Category</option>
              <option value="1">option 2 </option>
              <option value="2">option</option>
            </select>

            <label className="popup-label">Attach card</label>

            <select
              className="popup-select"
              onChange={(e) => {
                Task.AttachCard = e.target.value;
                setTask({ ...Task });
              }}
            >
              <option value="Sub Category">Sub Category</option>
              <option value="1">option 2 </option>
              <option value="2">option</option>
            </select>
          </div>
        </div>
        <div className="row-wrap">
          <div className="upload-btn-wrapper">
            <button className="btnFile">
              <img src={IMAGES.fileicon} alt="Upload" /> {Task.files.length}
            </button>
            <input
              type="file"
              multiple
              className="custom-file-input"
              onChange={(e) => {
                console.log(e.target.files);
                const files = (e.target as HTMLInputElement).files;
                if (files == null) Task.files = [];
                else if (files.length != null) {
                  Task.files = files;
                }

                setTask({ ...Task });
              }}
            />
          </div>

          {Array.from(Task.files).map((el: any, i) => {
            return (
              <div key={i} className="added-file">
                <p className="title-added-file">{el.name}</p>
                <img
                  src={IMAGES.closeicon}
                  alt="close"
                  width="9"
                  height="9"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    let newFileList = Array.from(Task.files);
                    newFileList.splice(i, 1);
                    Task.files = newFileList;
                    setTask({ ...Task });
                    console.log(Task);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div>
          <button type="submit" className="addTaskBtn">
            Done
          </button>
        </div>
      </PopUp>
    </>
  );
};
export default CreateTask;
