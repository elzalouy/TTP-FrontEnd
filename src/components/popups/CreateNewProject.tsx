import React, { useState } from "react";
import "./popups-style.css";
import IMAGES from "../../assets/img/index";
import PopUp from "../../coreUI/usable-component/popUp";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

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

const CreateNewProject: React.FC<Props> = () => {
  const [currentStep, setcurrentStep] = useState(0);
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

  const [AllTasks, setAllTasks] = useState<taskData[]>([]);
  const steps = ["Project", "Tasks"];

  return (
    <div>
      <button
        className="black-btn"
        onClick={() => {
          setShow("flex");
        }}
      >
        Create new Project
      </button>
      <PopUp show={Show} minWidthSize="50vw">
        <div>
          <img
            className="closeIcon"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={() => {
              setcurrentStep(0);
              setShow("none");
            }}
          />
        </div>

        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel className="stepActiveLabel">{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {currentStep === 0 ? (
          <div>
            <div className="inputs-grid">
              <div>
                <label className="popup-label">Project title</label>

                <input
                  className="popup-input"
                  type="text"
                  placeholder="Project name"
                />
              </div>

              <div>
                <label className="popup-label">Client name</label>

                <select className="popup-select">
                  <option value="0">Ahmed</option>
                  <option value="1">option 2 </option>
                  <option value="2">option 3</option>
                </select>
              </div>

              <div>
                <label className="popup-label">Deadline date</label>

                <input className="popup-input" type="date" />
              </div>

              <div>
                <label className="popup-label">Project manager</label>

                <select className="popup-select">
                  <option value="0">Abdullah</option>
                  <option value="1">option 2 </option>
                  <option value="2">option 3 </option>
                </select>
              </div>

              <div>
                <label className="popup-label">Description</label>

                <textarea
                  maxLength={75}
                  className="popup-textarea"
                  rows={4}
                  placeholder="Write about your project"
                />
              </div>
            </div>
            <div className="controllers">
              <button
                className="controllers-cancel"
                onClick={() => {
                  setcurrentStep(0);
                  setShow("none");
                }}
              >
                Cancel
              </button>
              <button
                className="controllers-done"
                onClick={() => {
                  setcurrentStep(1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
        {currentStep === 1 ? (
          <div className="step2">
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
              <button
                type="submit"
                className="addTaskBtn"
                onClick={() => {
                  setAllTasks([...AllTasks, Task]);
                  setTask({
                    taskName: "",
                    department: "",
                    deadline: "",
                    Category: "",
                    Description: "",
                    SubCategory: "",
                    AttachCard: "",
                    files: [],
                  });
                }}
              >
                Add task
              </button>
            </div>

            <div>
              <h4>All tasks</h4>
              <table
                className="allTask-table"
                style={{
                  borderWidth: "1px",
                  borderColor: "#aaaaaa",
                  borderStyle: "solid",
                }}
              >
                <tr>
                  <th>Task name</th>
                  <th>Team name</th>
                  <th>Category</th>
                  <th>Deadline date</th>
                  <th></th>
                </tr>
                {AllTasks.map((task, index) => {
                  return (
                    <tr>
                      <td width={"30%"}>{task.taskName}</td>
                      <td width={"20%"}>{task.department}</td>
                      <td width={"20%"}>{task.Category}</td>
                      <td width={"20%"}>{task.deadline}</td>
                      <td className="deleteTd" width={"10%"}>
                        <img
                          src={IMAGES.deleteicon}
                          alt="delete"
                          onClick={() => {
                            AllTasks.splice(index, 1);
                            setAllTasks([...AllTasks]);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className="controllers">
              <button
                className="controllers-cancel"
                onClick={() => {
                  setcurrentStep(0);
                  setShow("none");
                }}
              >
                Cancel
              </button>
              <button className="controllers-done">Done</button>
            </div>
          </div>
        ) : null}
      </PopUp>
    </div>
  );
};

export default CreateNewProject;
