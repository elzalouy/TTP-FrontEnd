import React, { useState } from "react";
import "./createNewProject.css";
import IMAGES from ".././../assets/img";
import PopUp from "../../coreUI/usable-component/popUp";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

type Props = {};
interface taskData {
  taskName: string;
  department: string;
  deadline: string;
  Category: string;
  Description: string;
  SubCategory: string;
  AttachCard: string;
}
const CreateNewProject: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
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
  });
  const [AllTasks, setAllTasks] = useState<taskData[]>([]);
  const steps = ["Project", "Tasks"];

  console.log(Task);
  return (
    <div>
      <Box
        id="project-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: "#F1F1F4",
          p: 3,
          mb: 5,
          font: "normal normal 600 16px/30px Cairo",
          color: "#505050",
        }}
      >
        <Box
          id="project-header"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mb: 1,
          }}
        >
          Not started yet
          {expanded ? (
            <ArrowDropUpIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setExpanded(false);
              }}
            ></ArrowDropUpIcon>
          ) : (
            <ArrowDropDownIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setExpanded(true);
              }}
            ></ArrowDropDownIcon>
          )}
        </Box>

        <Box
          onClick={() => {
            setShow("flex");
          }}
          sx={{
            backgroundColor: "#E8E8E8",
            border: "2px solid #9FA1AB",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            py: 0.6,
          }}
        >
          <AddBoxOutlinedIcon sx={{ color: "black" }}></AddBoxOutlinedIcon>
          <h3 style={{ color: "black", fontWeight: "bold" }}>
            Add new project
          </h3>
        </Box>
      </Box>

      <PopUp show={Show}>
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
                <label className="label-project">Project title</label>
                <br />{" "}
                <input
                  className="input-project"
                  type="text"
                  placeholder="Project name"
                />
              </div>

              <div>
                <label className="label-project">Client name</label>
                <br />
                <select className="select-project">
                  <option value="0">Ahmed</option>
                  <option value="1">option 2 </option>
                  <option value="2">option 3</option>
                </select>
              </div>

              <div>
                <label className="label-project">Deadline date</label>
                <br />
                <input className="input-project" type="date" />
              </div>

              <div>
                <label className="label-project">Project manager</label>
                <br />
                <select className="select-project">
                  <option value="0">Abdullah</option>
                  <option value="1">option 2 </option>
                  <option value="2">option 3 </option>
                </select>
              </div>

              <div>
                <label className="label-project">Description</label>
                <br />
                <textarea
                  className="textarea-project"
                  rows={3}
                  placeholder="Write about your project"
                />
              </div>
            </div>
            <div className="controllers">
              <button
                className="cancelBtn"
                onClick={() => {
                  setcurrentStep(0);
                  setShow("none");
                }}
              >
                Cancel
              </button>
              <button
                className="blackBtn"
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
                <label className="label-project">Task name</label>
                <br />
                <input
                  className="input-project"
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
                <label className="label-project">Department name</label>
                <br />
                <select
                  className="select-project"
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
                <label className="label-project">Deadline date</label>
                <br />
                <input
                  className="input-project"
                  type="date"
                  value={Task.deadline}
                  onChange={(e) => {
                    Task.deadline = e.target.value;
                    setTask({ ...Task });
                  }}
                />
              </div>
              <div>
                <label className="label-project">Category</label>
                <br />
                <select
                  className="select-project"
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
                <label className="label-project">Description</label>
                <br />
                <textarea
                  className="textarea-project"
                  rows={3}
                  placeholder="Write about your task"
                  value={Task.Description}
                  onChange={(e) => {
                    Task.Description = e.target.value;
                    setTask({ ...Task });
                  }}
                />
              </div>

              <div>
                <label className="label-project">Sub category</label>
                <br />
                <select
                  className="select-project"
                  onChange={(e) => {
                    Task.SubCategory = e.target.value;
                    setTask({ ...Task });
                  }}
                >
                  <option value="Sub Category">Sub Category</option>
                  <option value="1">option 2 </option>
                  <option value="2">option</option>
                </select>

                <br />
                <label className="label-project">Attach card</label>
                <br />
                <select
                  className="select-project"
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
            <div className="files">
              <input type="file" />
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
                className="cancelBtn"
                onClick={() => {
                  setcurrentStep(0);
                  setShow("none");
                }}
              >
                Cancel
              </button>
              <button className="blackBtn">Done</button>
            </div>
          </div>
        ) : null}
      </PopUp>
    </div>
  );
};

export default CreateNewProject;
