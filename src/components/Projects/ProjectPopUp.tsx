import {
  Step,
  StepLabel,
  Stepper,
  Grid,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  Typography,
  stepIconClasses,
} from "@mui/material";
import "./projectForm.css";
import { FC, useState } from "react";
import PopUp from "../../coreUI/usable-component/popUp";
import { useAppSelector } from "../../redux/hooks";
import { ProjectsActions, selectNewProject } from "../../redux/Projects";
import IMAGES from ".././../assets/img/index";
import TaskForm from "./TaskForm";
import Tasks from "./TasksTable";
import ProjectForm from "./ProjectForm";
import { styled } from "@mui/material/styles";
import { Check } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { UiActions } from "../../redux/Ui";
import { selectUi } from "../../redux/Ui/UI.selectors";
import { immerable } from "immer";

interface NewProjectPopUpProps {
  setShow: (str: string) => void;
}

const NewProjectPopUp: FC<NewProjectPopUpProps> = ({ setShow }) => {
  const steps = ["Project", "Tasks"];
  const dispatch = useDispatch();
  const newProject = useAppSelector(selectNewProject);
  const { createProjectPopup } = useAppSelector(selectUi);
  const [currentStep, setcurrentStep] = useState(0);

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

  const QontoStepIconRoot = styled("div")<{
    ownerState: { active?: boolean; completed?: boolean };
  }>(({ theme, ownerState }) => ({
    color: "transparent",
    backgroundColor: "#F6F6F6",
    borderRadius: "100%",
    display: "flex",
    height: 26,
    width: 26,
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      color: "#00ACBA",
    }),
    ...(ownerState.completed && {
      backgroundColor: "#00ACBA",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "white",
      fontSize: 18,
      backgroundColor: "#00ACBA",
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "100%",
      backgroundColor: ownerState.active ? "#00ACBA" : "",
    },
  }));

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
    return (
      <QontoStepIconRoot
        ownerState={{ active, completed: completed }}
        className={className}
      >
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  const onClose = () => {
    if (currentStep === 1) {
      dispatch(UiActions.fireNewProjectHook(""));
    }
    setcurrentStep(0);
    setShow("none");
  };

  return (
    <PopUp show={createProjectPopup}>
      <Grid
        container
        position="relative"
        direction="column"
        className="projectFormHeader"
      >
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          marginBottom={5}
        >
          <Stepper
            connector={<QontoConnector />}
            className="stepper"
            activeStep={currentStep}
            alternativeLabel
          >
            {steps?.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>
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
      </Grid>
      {currentStep === 0 && (
        <ProjectForm setcurrentStep={setcurrentStep} setShow={setShow} />
      )}
      {currentStep === 1 && (
        <>
          <TaskForm />
          <Tasks setCurrentStep={setcurrentStep} setShow={setShow} />
        </>
      )}
    </PopUp>
  );
};

export default NewProjectPopUp;
