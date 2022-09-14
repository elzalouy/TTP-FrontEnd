import { Check } from "@mui/icons-material";
import {
  Grid,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import IMAGES from "src/assets/img/Images";
import PopUp from "src/coreUI/components/Popovers/Popup/PopUp";
import { useAppSelector } from "src/models/hooks";
import { UiActions } from "src/models/Ui";
import { selectUi } from "src/models/Ui/UI.selectors";
import TaskForm from "../CreateTasksForm/TaskForm";
import Tasks from "../CreateTasksForm/TasksTable";
import ProjectForm from "./ProjectForm";
import "./projectForm.css";
import { QontoStepIcon } from "./StepperIcon";

interface NewProjectPopUpProps {
  setShow: (str: string) => void;
}

const NewProjectPopUp: FC<NewProjectPopUpProps> = ({ setShow }) => {
  const steps = ["Project", "Tasks"];
  const dispatch = useDispatch();
  // const newProject = useAppSelector(selectNewProject);
  const { createProjectPopup } = useAppSelector(selectUi);
  const [currentStep, setcurrentStep] = useState(0);
  const [clearErr, setClearErr] = useState<boolean>(false);
  const [backTrigger, setBackTrigger] = useState<boolean>(false);

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 12,
      left: "calc(-50% + 13px)",
      right: "calc(50% + 13px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#707070",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#707070",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === "dark" ? "#707070" : "#707070",
      borderTopWidth: 0.5,
      borderWidth: 0.5,
      borderRadius: 1,
      opacity: 0.3,
    },
  }));

  const onClose = () => {
    if (currentStep === 1) {
      dispatch(UiActions.fireNewProjectHook(""));
      setClearErr(false);
      setBackTrigger(false);
    }
    setBackTrigger(false);
    setcurrentStep(0);
    setShow("none");
    setClearErr(true);
  };

  const onStepProjectForm = () => {
    if (currentStep === 1) {
      setBackTrigger(true);
      setcurrentStep(0);
    }
  }

  return (
    <PopUp
      show={createProjectPopup}
      maxHeight={currentStep === 0 ? undefined : "calc(100% - 20px)"}
      overFlowY={currentStep === 1 ? "scroll" : undefined}
      margin={"30px"}
      containerClassName="projectForm"
    >
      <Grid container direction="column" className="projectFormHeader" sx={{}}>
        <div style={{ position: "relative", width: "100%" }}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <Stepper
              connector={<QontoConnector />}
              className="stepper"
              activeStep={currentStep}
              alternativeLabel
            >
              {steps?.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    StepIconProps={{ style: { cursor: (index === 0 && currentStep === 1) ? "pointer" : "default", } }}
                    onClick={onStepProjectForm}>
                    <Typography
                      fontWeight={currentStep === index ? "700" : "500"}
                      sx={{
                        color: currentStep === index ? "#00ACBA" : "#8D8D8D",
                      }}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <img
            className="closeIconProject"
            width="9"
            height="9"
            src={IMAGES.closeicon}
            alt="closeIcon"
            onClick={onClose}
          />
        </div>
      </Grid>
      <Grid marginTop={5}>
        {currentStep === 0 && (
          <ProjectForm
            setcurrentStep={setcurrentStep}
            setShow={setShow}
            currentStep={currentStep}
            backTrigger={backTrigger}
            setBackTrigger={setBackTrigger} />
        )}
        {currentStep === 1 && (
          <>
            <TaskForm />
            <Tasks
              setCurrentStep={setcurrentStep}
              setShow={setShow}
            />
          </>
        )}
      </Grid>
    </PopUp>
  );
};

export default NewProjectPopUp;
