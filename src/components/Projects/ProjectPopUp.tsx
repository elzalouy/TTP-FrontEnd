import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import PopUp from "../../coreUI/usable-component/popUp";
import { useAppSelector } from "../../redux/hooks";
import { selectNewProject } from "../../redux/Projects";
import IMAGES from ".././../assets/img/index";
import TaskForm from "./TaskForm";
import Tasks from "./TasksTable";
import ProjectForm from "./ProjectForm";
interface NewProjectPopUpProps {
  setShow: (str: string) => void;
}

const NewProjectPopUp: FC<NewProjectPopUpProps> = ({ setShow }) => {
  const steps = ["Project", "Tasks"];
  const newProject = useAppSelector(selectNewProject);
  const [currentStep, setcurrentStep] = useState(0);
  return (
    <PopUp show={newProject?.showPopUp ? newProject.showPopUp : "none"}>
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
          {steps?.map((label, index) => (
            <Step key={label}>
              <StepLabel className="stepActiveLabel">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {currentStep === 0 && (
        <ProjectForm setcurrentStep={setcurrentStep} setShow={setShow} />
      )}
      {currentStep === 1 && (
        <>
          <TaskForm setCurrentStep={setcurrentStep} setShow={setShow} />
          <Tasks />
        </>
      )}
    </PopUp>
  );
};

export default NewProjectPopUp;
